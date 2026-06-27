<?php

namespace App\Http\Requests\Thread;

use Illuminate\Foundation\Http\FormRequest;

class CreateThreadRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'category_id' => 'required|integer|exists:categories,id',
            'title' => 'required|string|min:5|max:255',
            'content' => 'required|string|min:5|max:50000',
            'type' => 'nullable|integer',
            'tags' => 'nullable|array|max:10',
            'tags.*' => 'integer|exists:tags,id',
        ];
    }
}
