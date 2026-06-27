<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProfileRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'bio' => 'nullable|string|max:500',
            'signature' => 'nullable|string|max:255',
            'avatar' => 'nullable|string|max:255',
            'gender' => 'nullable|integer|in:0,1,2',
            'birthday' => 'nullable|date',
            'location' => 'nullable|string|max:255',
            'website' => 'nullable|string|max:255',
        ];
    }
}
