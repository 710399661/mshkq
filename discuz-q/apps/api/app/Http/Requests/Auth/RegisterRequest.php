<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'username' => 'required|string|min:3|max:20|regex:/^[a-zA-Z0-9_\x{4e00}-\x{9fa5}]+$/u|unique:users,username',
            'email' => 'nullable|string|email|max:255|unique:users,email',
            'mobile' => 'nullable|string|regex:/^1[3-9]\d{9}$/|max:20|unique:users,mobile',
            'password' => 'required|string|min:8|max:128|confirmed',
        ];
    }

    public function messages(): array
    {
        return [
            'username.regex' => '用户名只能包含字母、数字、下划线和中文',
            'username.min' => '用户名至少需要 3 个字符',
            'username.max' => '用户名不能超过 20 个字符',
            'password.min' => '密码至少需要 8 个字符',
            'password.max' => '密码不能超过 128 个字符',
            'mobile.regex' => '请输入有效的手机号码',
        ];
    }
}
