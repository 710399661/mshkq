<?php

namespace App\Http\Requests\Thread;

use Illuminate\Foundation\Http\FormRequest;

class UpdateThreadRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'category_id' => 'sometimes|integer|exists:categories,id',
            'title' => 'sometimes|string|min:5|max:255',
            'content' => 'sometimes|string|min:5|max:50000',
            'type' => 'nullable|integer',
            'tags' => 'nullable|array|max:10',
            'tags.*' => 'integer|exists:tags,id',
        ];
    }
}
