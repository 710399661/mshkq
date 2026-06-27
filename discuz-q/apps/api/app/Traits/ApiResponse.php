<?php

namespace App\Traits;

use App\Enums\ApiCode;
use Illuminate\Http\JsonResponse;

trait ApiResponse
{
    public function success(mixed $data = null, string $message = '', int $code = 0): JsonResponse
    {
        return response()->json([
            'code' => $code,
            'message' => $message ?: ApiCode::SUCCESS->message(),
            'data' => $data,
        ]);
    }

    public function error(string $message = '', int $code = 1, mixed $data = null, int $statusCode = 200): JsonResponse
    {
        return response()->json([
            'code' => $code,
            'message' => $message ?: ApiCode::ERROR->message(),
            'data' => $data,
        ], $statusCode);
    }

    public function unauthorized(string $message = ''): JsonResponse
    {
        return $this->error(
            $message ?: ApiCode::UNAUTHORIZED->message(),
            ApiCode::UNAUTHORIZED->value,
            null,
            401
        );
    }

    public function forbidden(string $message = ''): JsonResponse
    {
        return $this->error(
            $message ?: ApiCode::FORBIDDEN->message(),
            ApiCode::FORBIDDEN->value,
            null,
            403
        );
    }

    public function notFound(string $message = ''): JsonResponse
    {
        return $this->error(
            $message ?: ApiCode::NOT_FOUND->message(),
            ApiCode::NOT_FOUND->value,
            null,
            404
        );
    }

    public function validationError(mixed $errors = [], string $message = ''): JsonResponse
    {
        return $this->error(
            $message ?: ApiCode::VALIDATION_ERROR->message(),
            ApiCode::VALIDATION_ERROR->value,
            $errors,
            422
        );
    }
}
