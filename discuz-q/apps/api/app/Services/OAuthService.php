<?php

namespace App\Services;

use App\Models\User;
use App\Models\OAuthAccount;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class OAuthService
{
    protected $providers = [
        'wechat' => [
            'client_id' => 'wechat_appid',
            'client_secret' => 'wechat_appsecret',
            'authorize_url' => 'https://open.weixin.qq.com/connect/qrconnect',
            'token_url' => 'https://api.weixin.qq.com/sns/oauth2/access_token',
            'user_url' => 'https://api.weixin.qq.com/sns/userinfo',
        ],
        'qq' => [
            'client_id' => 'qq_appid',
            'client_secret' => 'qq_appkey',
            'authorize_url' => 'https://graph.qq.com/oauth2.0/authorize',
            'token_url' => 'https://graph.qq.com/oauth2.0/token',
            'user_url' => 'https://graph.qq.com/oauth2.0/me',
        ],
        'weibo' => [
            'client_id' => 'weibo_appkey',
            'client_secret' => 'weibo_appsecret',
            'authorize_url' => 'https://api.weibo.com/oauth2/authorize',
            'token_url' => 'https://api.weibo.com/oauth2/access_token',
            'user_url' => 'https://api.weibo.com/2/users/show.json',
        ],
        'google' => [
            'client_id' => 'google_client_id',
            'client_secret' => 'google_client_secret',
            'authorize_url' => 'https://accounts.google.com/o/oauth2/v2/auth',
            'token_url' => 'https://oauth2.googleapis.com/token',
            'user_url' => 'https://www.googleapis.com/oauth2/v2/userinfo',
        ],
        'github' => [
            'client_id' => 'github_client_id',
            'client_secret' => 'github_client_secret',
            'authorize_url' => 'https://github.com/login/oauth/authorize',
            'token_url' => 'https://github.com/login/oauth/access_token',
            'user_url' => 'https://api.github.com/user',
        ],
    ];

    public function getRedirectUrl(string $provider, ?string $callbackUrl = null): string
    {
        $config = $this->getProviderConfig($provider);
        $state = Str::random(40);
        $cacheKey = "oauth_state:{$provider}:{$state}";

        Cache::put($cacheKey, [
            'callback_url' => $callbackUrl,
            'created_at' => time(),
        ], now()->addMinutes(10));

        $params = [
            'client_id' => config("services.{$config['client_id']}"),
            'redirect_uri' => $this->getCallbackUrl($provider),
            'response_type' => 'code',
            'scope' => $this->getScope($provider),
            'state' => $state,
        ];

        if ($provider === 'wechat') {
            $params['appid'] = $params['client_id'];
            unset($params['client_id']);
            return $config['authorize_url'] . '?appid=' . $params['appid'] .
                   '&redirect_uri=' . urlencode($params['redirect_uri']) .
                   '&response_type=code&scope=snsapi_login&state=' . $state . '#wechat_redirect';
        }

        return $config['authorize_url'] . '?' . http_build_query($params);
    }

    public function handleCallback(string $provider, array $params): array
    {
        $config = $this->getProviderConfig($provider);
        $state = $params['state'] ?? '';

        $this->validateState($provider, $state);

        $code = $params['code'] ?? null;

        if ($provider === 'wechat' && isset($params['code'])) {
            return $this->handleWechatCallback($config, $params['code']);
        }

        if ($provider === 'github') {
            return $this->handleGithubCallback($config, $code);
        }

        if ($provider === 'google') {
            return $this->handleGoogleCallback($config, $code);
        }

        throw new \Exception('不支持的第三方登录');
    }

    protected function handleGithubCallback(array $config, ?string $code): array
    {
        $tokenResponse = Http::asForm()->post($config['token_url'], [
            'client_id' => config('services.github_client_id'),
            'client_secret' => config('services.github_client_secret'),
            'code' => $code,
            'redirect_uri' => $this->getCallbackUrl('github'),
        ]);

        parse_str($tokenResponse->body(), $tokenData);

        if (!isset($tokenData['access_token'])) {
            throw new \Exception('获取access_token失败');
        }

        $userResponse = Http::withToken($tokenData['access_token'])
            ->get($config['user_url']);

        $userData = $userResponse->json();

        return $this->findOrCreateUser('github', $userData['id'], [
            'username' => $userData['login'] ?? $userData['name'],
            'avatar' => $userData['avatar_url'],
            'email' => $userData['email'] ?? null,
        ]);
    }

    protected function handleGoogleCallback(array $config, ?string $code): array
    {
        $tokenResponse = Http::asForm()->post($config['token_url'], [
            'client_id' => config('services.google_client_id'),
            'client_secret' => config('services.google_client_secret'),
            'code' => $code,
            'grant_type' => 'authorization_code',
            'redirect_uri' => $this->getCallbackUrl('google'),
        ]);

        $tokenData = $tokenResponse->json();

        if (!isset($tokenData['access_token'])) {
            throw new \Exception('获取access_token失败');
        }

        $userResponse = Http::withToken($tokenData['access_token'])
            ->get($config['user_url']);

        $userData = $userResponse->json();

        return $this->findOrCreateUser('google', $userData['id'], [
            'username' => $userData['name'],
            'avatar' => $userData['picture'],
            'email' => $userData['email'],
        ]);
    }

    protected function handleWechatCallback(array $config, string $code): array
    {
        $appId = config('services.wechat_appid');

        $tokenResponse = Http::get($config['token_url'], [
            'appid' => $appId,
            'secret' => config('services.wechat_appsecret'),
            'code' => $code,
            'grant_type' => 'authorization_code',
        ]);

        $tokenData = $tokenResponse->json();

        if (!isset($tokenData['access_token'])) {
            throw new \Exception('获取access_token失败: ' . ($tokenData['errmsg'] ?? 'unknown'));
        }

        $userResponse = Http::get($config['user_url'], [
            'access_token' => $tokenData['access_token'],
            'openid' => $tokenData['openid'],
        ]);

        $userData = $userResponse->json();

        return $this->findOrCreateUser('wechat', $tokenData['openid'], [
            'username' => $userData['nickname'] ?? '微信用户',
            'avatar' => $userData['headimgurl'] ?? null,
        ]);
    }

    protected function findOrCreateUser(string $provider, string $providerUid, array $userData): array
    {
        $oauthAccount = OAuthAccount::where('provider', $provider)
            ->where('provider_uid', $providerUid)
            ->first();

        if ($oauthAccount) {
            $user = $oauthAccount->user;
            $isNewUser = false;
        } else {
            if (isset($userData['email'])) {
                $existingUser = User::where('email', $userData['email'])->first();
                if ($existingUser) {
                    $existingUser->oauthAccounts()->create([
                        'provider' => $provider,
                        'provider_uid' => $providerUid,
                    ]);
                    $user = $existingUser;
                    $isNewUser = false;
                } else {
                    $user = $this->createUser($provider, $providerUid, $userData);
                    $isNewUser = true;
                }
            } else {
                $username = $userData['username'] ?? ($provider . '_user_' . substr($providerUid, 0, 8));
                $user = User::create([
                    'username' => $this->generateUniqueUsername($username),
                    'password' => bcrypt(Str::random(16)),
                    'avatar' => $userData['avatar'] ?? null,
                    'status' => 1,
                ]);
                $user->oauthAccounts()->create([
                    'provider' => $provider,
                    'provider_uid' => $providerUid,
                ]);
                $isNewUser = true;
            }
        }

        $token = $user->createToken('auth-token')->plainTextToken;

        return [
            'user' => $user,
            'token' => $token,
            'is_new_user' => $isNewUser,
        ];
    }

    protected function createUser(string $provider, string $providerUid, array $userData): User
    {
        $username = $userData['username'] ?? ($provider . '_user_' . substr($providerUid, 0, 8));

        $user = User::create([
            'username' => $this->generateUniqueUsername($username),
            'email' => $userData['email'] ?? null,
            'password' => bcrypt(Str::random(16)),
            'avatar' => $userData['avatar'] ?? null,
            'status' => 1,
        ]);

        $user->oauthAccounts()->create([
            'provider' => $provider,
            'provider_uid' => $providerUid,
        ]);

        return $user;
    }

    protected function generateUniqueUsername(string $baseUsername): string
    {
        $username = $baseUsername;
        $counter = 1;

        while (User::where('username', $username)->exists()) {
            $username = $baseUsername . '_' . $counter;
            $counter++;
        }

        return $username;
    }

    protected function validateState(string $provider, string $state): void
    {
        $cacheKey = "oauth_state:{$provider}:{$state}";

        if (!Cache::has($cacheKey)) {
            throw new \Exception('无效的state参数');
        }

        Cache::forget($cacheKey);
    }

    protected function getProviderConfig(string $provider): array
    {
        if (!isset($this->providers[$provider])) {
            throw new \Exception('不支持的第三方登录提供商');
        }

        return $this->providers[$provider];
    }

    protected function getCallbackUrl(string $provider): string
    {
        return config('app.frontend_url') . "/oauth/{$provider}/callback";
    }

    protected function getScope(string $provider): string
    {
        $scopes = [
            'github' => 'user:email',
            'google' => 'email profile',
            'wechat' => 'snsapi_login',
            'qq' => 'get_user_info',
            'weibo' => 'all',
        ];

        return $scopes[$provider] ?? '';
    }

    public function bindAccount(User $user, string $provider, string $code): void
    {
        $config = $this->getProviderConfig($provider);

        if ($provider === 'github') {
            $tokenResponse = Http::asForm()->post($config['token_url'], [
                'client_id' => config('services.github_client_id'),
                'client_secret' => config('services.github_client_secret'),
                'code' => $code,
            ]);
            parse_str($tokenResponse->body(), $tokenData);
            $accessToken = $tokenData['access_token'] ?? null;
        } else {
            throw new \Exception('暂不支持该绑定方式');
        }

        if (!$accessToken) {
            throw new \Exception('获取授权失败');
        }

        $userResponse = Http::withToken($accessToken)->get($config['user_url']);
        $userData = $userResponse->json();

        $providerUid = $userData['id'] ?? null;

        if (!$providerUid) {
            throw new \Exception('获取用户信息失败');
        }

        if (OAuthAccount::where('provider', $provider)->where('provider_uid', $providerUid)->exists()) {
            throw new \Exception('该账号已被其他用户绑定');
        }

        $user->oauthAccounts()->create([
            'provider' => $provider,
            'provider_uid' => (string) $providerUid,
        ]);
    }

    public function unbindAccount(User $user, string $provider): void
    {
        $count = $user->oauthAccounts()->count();

        if ($count <= 1 && !$user->password) {
            throw new \Exception('请先设置密码后再解除绑定');
        }

        $user->oauthAccounts()->where('provider', $provider)->delete();
    }

    public function getUserBindings(User $user): array
    {
        $bindings = [];

        foreach ($this->providers as $name => $config) {
            $oauthAccount = $user->oauthAccounts()->where('provider', $name)->first();
            $bindings[$name] = [
                'bound' => !!$oauthAccount,
                'bound_at' => $oauthAccount?->created_at,
            ];
        }

        return $bindings;
    }
}
