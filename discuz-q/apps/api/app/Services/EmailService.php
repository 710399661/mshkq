<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Mail;
use App\Models\User;

class EmailService
{
    protected $fromEmail;
    protected $fromName;

    public function __construct()
    {
        $this->fromEmail = config('mail.from.address', 'noreply@discuzq.com');
        $this->fromName = config('mail.from.name', 'Discuz! Q');
    }

    public function sendVerificationCode(string $email, User $user): void
    {
        $code = $this->generateCode();
        $cacheKey = "email_verification:{$user->id}";

        Cache::put($cacheKey, $code, now()->addMinutes(10));

        $data = [
            'code' => $code,
            'username' => $user->username,
            'expireMinutes' => 10,
        ];

        Mail::to($email)->send(new \App\Mail\VerificationCode($data));
    }

    public function sendPasswordResetCode(string $email): bool
    {
        $user = User::where('email', $email)->first();

        if (!$user) {
            return false;
        }

        $code = $this->generateCode();
        $cacheKey = "password_reset:{$user->id}";

        Cache::put($cacheKey, $code, now()->addMinutes(15));

        $data = [
            'code' => $code,
            'username' => $user->username,
            'expireMinutes' => 15,
        ];

        Mail::to($email)->send(new \App\Mail\PasswordResetCode($data));

        return true;
    }

    protected function generateCode(): string
    {
        return str_pad((string) random_int(0, 999999), 6, '0', STR_PAD_LEFT);
    }
}
