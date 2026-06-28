<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Api\Controller;
use App\Services\SmsService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class SmsController extends Controller
{
    protected $smsService;

    public function __construct(SmsService $smsService)
    {
        $this->smsService = $smsService;
    }

    public function sendVerificationCode(Request $request)
    {
        $request->validate([
            'mobile' => 'required|regex:/^1[3-9]\d{9}$/',
            'type' => 'required|in:login,register,bind,reset_password',
        ]);

        $mobile = $request->mobile;
        $type = $request->type;
        $cacheKey = "sms_verify:{$type}:{$mobile}";

        if (Cache::has($cacheKey)) {
            $ttl = Cache::ttl($cacheKey);
            if ($ttl > 0) {
                return $this->error("请 {$ttl} 秒后再试");
            }
        }

        try {
            $result = $this->smsService->sendVerificationCode($mobile, $type);

            return $this->success([
                'expire_seconds' => $result['expire_seconds'],
            ], '验证码已发送');
        } catch (\Exception $e) {
            return $this->error('发送失败：' . $e->getMessage());
        }
    }

    public function verifyCode(Request $request)
    {
        $request->validate([
            'mobile' => 'required|regex:/^1[3-9]\d{9}$/',
            'code' => 'required|digits:6',
        ]);

        $mobile = $request->mobile;
        $code = $request->code;

        if ($this->smsService->verifyCode($mobile, $code)) {
            return $this->success(null, '验证成功');
        }

        return $this->error('验证码错误或已过期');
    }
}
