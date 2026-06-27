<?php

namespace App\Http\Requests\Post;

use Illuminate\Foundation\Http\FormRequest;

class CreatePostRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'thread_id' => 'required|integer|exists:threads,id',
            'content' => 'required|string',
            'reply_post_id' => 'nullable|integer|exists:posts,id',
            'reply_user_id' => 'nullable|integer|exists:users,id',
            'parent_id' => 'nullable|integer|exists:posts,id',
        ];
    }
}
