<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Api\Controller;
use App\Services\OAuthService;
use Illuminate\Http\Request;

class OAuthController extends Controller
{
    protected $oauthService;

    public function __construct(OAuthService $oauthService)
    {
        $this->oauthService = $oauthService;
    }

    public function redirect(Request $request)
    {
        $request->validate([
            'provider' => 'required|in:wechat,qq,weibo,google,github',
        ]);

        $provider = $request->provider;
        $callbackUrl = $request->callback_url;

        $redirectUrl = $this->oauthService->getRedirectUrl($provider, $callbackUrl);

        return $this->success(['url' => $redirectUrl]);
    }

    public function callback(Request $request)
    {
        $request->validate([
            'provider' => 'required|in:wechat,qq,weibo,google,github',
            'code' => 'required_without:oauth_token|string',
            'oauth_token' => 'required_without:code|string',
            'oauth_verifier' => 'string|nullable',
        ]);

        $provider = $request->provider;

        try {
            $result = $this->oauthService->handleCallback(
                $provider,
                $request->only(['code', 'oauth_token', 'oauth_verifier'])
            );

            if ($result['is_new_user']) {
                return $this->success([
                    'is_new_user' => true,
                    'user' => $result['user'],
                    'token' => $result['token'],
                ], '注册成功');
            }

            return $this->success([
                'is_new_user' => false,
                'user' => $result['user'],
                'token' => $result['token'],
            ], '登录成功');
        } catch (\Exception $e) {
            return $this->error('第三方登录失败：' . $e->getMessage());
        }
    }

    public function bind(Request $request)
    {
        $request->validate([
            'provider' => 'required|in:wechat,qq,weibo,google,github',
            'code' => 'required|string',
        ]);

        $user = $request->user();

        try {
            $this->oauthService->bindAccount($user, $request->provider, $request->code);

            return $this->success(null, '绑定成功');
        } catch (\Exception $e) {
            return $this->error('绑定失败：' . $e->getMessage());
        }
    }

    public function unbind(Request $request)
    {
        $request->validate([
            'provider' => 'required|in:wechat,qq,weibo,google,github',
        ]);

        $user = $request->user();

        try {
            $this->oauthService->unbindAccount($user, $request->provider);

            return $this->success(null, '解除绑定成功');
        } catch (\Exception $e) {
            return $this->error('解除绑定失败：' . $e->getMessage());
        }
    }

    public function status(Request $request)
    {
        $user = $request->user();
        $bindings = $this->oauthService->getUserBindings($user);

        return $this->success($bindings);
    }
}
