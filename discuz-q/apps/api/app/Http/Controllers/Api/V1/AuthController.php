<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Api\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Services\AuthService;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    protected $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function register(RegisterRequest $request)
    {
        $validated = $request->validated();
        $user = $this->authService->register($validated);
        $token = $user->createToken('auth-token')->plainTextToken;

        return $this->success([
            'user' => $user,
            'token' => $token,
        ], '注册成功');
    }

    public function login(LoginRequest $request)
    {
        $validated = $request->validated();
        $result = $this->authService->login($validated);

        if (!$result) {
            return $this->error('账号或密码错误', 401);
        }

        return $this->success($result, '登录成功');
    }

    public function logout(Request $request)
    {
        $this->authService->logout($request->user());
        return $this->success(null, '退出成功');
    }

    public function me(Request $request)
    {
        return $this->success($request->user());
    }
}
