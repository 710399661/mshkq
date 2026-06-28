<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class SmsService
{
    protected $driver;
    protected $config;

    public function __construct()
    {
        $this->driver = config('sms.driver', 'aliyun');
        $this->config = config('sms.drivers.' . $this->driver, []);
    }

    public function sendVerificationCode(string $mobile, string $type = 'verify'): array
    {
        $code = $this->generateCode();
        $expireSeconds = 600;
        $cacheKey = "sms_verify:{$type}:{$mobile}";

        Cache::put($cacheKey, $code, $expireSeconds);

        $templateCode = $this->getTemplateCode($type);
        $templateParams = ['code' => $code];

        try {
            $result = $this->send($mobile, $templateCode, $templateParams);

            Log::info('SMS sent successfully', [
                'mobile' => substr($mobile, 0, 3) . '****' . substr($mobile, -4),
                'type' => $type,
                'driver' => $this->driver,
            ]);

            return [
                'code' => $code,
                'expire_seconds' => $expireSeconds,
                'success' => $result,
            ];
        } catch (\Exception $e) {
            Log::error('SMS send failed', [
                'mobile' => substr($mobile, 0, 3) . '****' . substr($mobile, -4),
                'type' => $type,
                'error' => $e->getMessage(),
            ]);

            throw $e;
        }
    }

    public function verifyCode(string $mobile, string $code, string $type = 'verify'): bool
    {
        $cacheKey = "sms_verify:{$type}:{$mobile}";
        $storedCode = Cache::get($cacheKey);

        if (!$storedCode) {
            return false;
        }

        if ($storedCode !== $code) {
            return false;
        }

        Cache::forget($cacheKey);

        return true;
    }

    protected function send(string $mobile, string $templateCode, array $params): bool
    {
        if ($this->driver === 'aliyun') {
            return $this->sendViaAliyun($mobile, $templateCode, $params);
        }

        if ($this->driver === 'qcloud') {
            return $this->sendViaQcloud($mobile, $templateCode, $params);
        }

        if ($this->driver === 'mock') {
            return $this->mockSend($mobile, $templateCode, $params);
        }

        throw new \Exception("SMS driver '{$this->driver}' is not supported");
    }

    protected function sendViaAliyun(string $mobile, string $templateCode, array $params): bool
    {
        $accessKeyId = $this->config['access_key_id'] ?? '';
        $accessKeySecret = $this->config['access_key_secret'] ?? '';
        $signName = $this->config['sign_name'] ?? '';

        if (empty($accessKeyId) || empty($accessKeySecret)) {
            return $this->mockSend($mobile, $templateCode, $params);
        }

        $paramsStr = json_encode($params);

        $signature = $this->signAliyunRequest([
            'AccessKeyId' => $accessKeyId,
            'Format' => 'JSON',
            'SignatureMethod' => 'HMAC-SHA1',
            'SignatureNonce' => uniqid(),
            'SignatureVersion' => '1.0',
            'Timestamp' => gmdate('Y-m-d\TH:i:s\Z'),
            'Version' => '2017-05-25',
            'Action' => 'SendSms',
            'PhoneNumbers' => $mobile,
            'SignName' => $signName,
            'TemplateCode' => $templateCode,
            'TemplateParam' => $paramsStr,
        ], $accessKeySecret);

        $response = Http::timeout(10)->post('https://dysmsapi.aliyuncs.com/?Signature=' . urlencode($signature), [
            'AccessKeyId' => $accessKeyId,
            'Format' => 'JSON',
            'SignatureMethod' => 'HMAC-SHA1',
            'SignatureNonce' => uniqid(),
            'SignatureVersion' => '1.0',
            'Timestamp' => gmdate('Y-m-d\TH:i:s\Z'),
            'Version' => '2017-05-25',
            'Action' => 'SendSms',
            'PhoneNumbers' => $mobile,
            'SignName' => $signName,
            'TemplateCode' => $templateCode,
            'TemplateParam' => $paramsStr,
        ]);

        $result = $response->json();

        return ($result['Code'] ?? '') === 'OK';
    }

    protected function sendViaQcloud(string $mobile, string $templateCode, array $params): bool
    {
        $appId = $this->config['app_id'] ?? '';
        $appKey = $this->config['app_key'] ?? '';
        $signName = $this->config['sign_name'] ?? '';

        if (empty($appId) || empty($appKey)) {
            return $this->mockSend($mobile, $templateCode, $params);
        }

        return true;
    }

    protected function mockSend(string $mobile, string $templateCode, array $params): bool
    {
        Log::info('Mock SMS sent (configure SMS provider for real sending)', [
            'mobile' => substr($mobile, 0, 3) . '****' . substr($mobile, -4),
            'template' => $templateCode,
            'params' => $params,
        ]);

        return true;
    }

    protected function getTemplateCode(string $type): string
    {
        $templates = [
            'verify' => $this->config['templates']['verify'] ?? 'SMS_0001',
            'login' => $this->config['templates']['login'] ?? 'SMS_0002',
            'register' => $this->config['templates']['register'] ?? 'SMS_0003',
            'reset_password' => $this->config['templates']['reset_password'] ?? 'SMS_0004',
            'bind' => $this->config['templates']['bind'] ?? 'SMS_0005',
        ];

        return $templates[$type] ?? 'SMS_0001';
    }

    protected function generateCode(): string
    {
        return str_pad((string) random_int(0, 999999), 6, '0', STR_PAD_LEFT);
    }

    protected function signAliyunRequest(array $params, string $accessKeySecret): string
    {
        ksort($params);
        $stringToSign = 'GET&%2F&' . urlencode(http_build_query($params, '', '&', PHP_QUERY_RFC3986));
        return base64_encode(hash_hmac('sha1', $stringToSign, $accessKeySecret . '&', true));
    }
}
