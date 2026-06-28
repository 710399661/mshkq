<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Api\Controller;
use App\Models\User;
use App\Services\EmailService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class EmailController extends Controller
{
    protected $emailService;

    public function __construct(EmailService $emailService)
    {
        $this->emailService = $emailService;
    }

    public function sendVerification(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        $user = $request->user();

        if ($user->email === $request->email && $user->hasVerifiedEmail()) {
            return $this->error('该邮箱已经验证过了');
        }

        try {
            $this->emailService->sendVerificationCode($request->email, $user);

            return $this->success(null, '验证码已发送到邮箱');
        } catch (\Exception $e) {
            return $this->error('发送失败：' . $e->getMessage());
        }
    }

    public function verify(Request $request)
    {
        $request->validate([
            'code' => 'required|digits:6',
        ]);

        $user = $request->user();

        if ($user->hasVerifiedEmail()) {
            return $this->error('该邮箱已经验证过了');
        }

        $cacheKey = "email_verification:{$user->id}";

        if (!Cache::has($cacheKey)) {
            return $this->error('验证码已过期，请重新获取');
        }

        $storedCode = Cache::get($cacheKey);

        if ($storedCode !== $request->code) {
            return $this->error('验证码错误');
        }

        $user->markEmailAsVerified();

        Cache::forget($cacheKey);

        return $this->success(null, '邮箱验证成功');
    }
}
