<?php

use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    Route::get('/health', function () {
        return response()->json([
            'code' => 0,
            'message' => 'success',
            'data' => ['status' => 'ok'],
        ]);
    });

    Route::prefix('auth')->group(function () {
        Route::post('/register', [\App\Http\Controllers\Api\V1\AuthController::class, 'register']);
        Route::post('/login', [\App\Http\Controllers\Api\V1\AuthController::class, 'login']);
    });

    Route::get('/users/{id}', [\App\Http\Controllers\Api\V1\UserController::class, 'show']);
    Route::get('/users/{id}/threads', [\App\Http\Controllers\Api\V1\UserController::class, 'threads']);
    Route::get('/users/{id}/posts', [\App\Http\Controllers\Api\V1\UserController::class, 'posts']);
    Route::get('/users/{id}/following', [\App\Http\Controllers\Api\V1\UserController::class, 'following']);
    Route::get('/users/{id}/followers', [\App\Http\Controllers\Api\V1\UserController::class, 'followers']);

    Route::get('/categories', [\App\Http\Controllers\Api\V1\CategoryController::class, 'index']);
    Route::get('/categories/{id}', [\App\Http\Controllers\Api\V1\CategoryController::class, 'show']);
    Route::get('/categories/{id}/threads', [\App\Http\Controllers\Api\V1\CategoryController::class, 'threads']);

    Route::get('/tags', [\App\Http\Controllers\Api\V1\TagController::class, 'index']);
    Route::get('/tags/search', [\App\Http\Controllers\Api\V1\TagController::class, 'search']);
    Route::get('/tags/{id}', [\App\Http\Controllers\Api\V1\TagController::class, 'show']);
    Route::get('/tags/{id}/threads', [\App\Http\Controllers\Api\V1\TagController::class, 'threads']);

    Route::get('/threads', [\App\Http\Controllers\Api\V1\ThreadController::class, 'index']);
    Route::get('/threads/{id}', [\App\Http\Controllers\Api\V1\ThreadController::class, 'show']);

    Route::get('/threads/{threadId}/posts', [\App\Http\Controllers\Api\V1\PostController::class, 'index']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::prefix('auth')->group(function () {
            Route::post('/logout', [\App\Http\Controllers\Api\V1\AuthController::class, 'logout']);
            Route::get('/me', [\App\Http\Controllers\Api\V1\AuthController::class, 'me']);
        });

        Route::prefix('user')->group(function () {
            Route::put('/profile', [\App\Http\Controllers\Api\V1\UserController::class, 'updateProfile']);
        });

        Route::post('/users/{id}/follow', [\App\Http\Controllers\Api\V1\UserController::class, 'follow']);

        Route::post('/threads', [\App\Http\Controllers\Api\V1\ThreadController::class, 'store']);
        Route::put('/threads/{id}', [\App\Http\Controllers\Api\V1\ThreadController::class, 'update']);
        Route::delete('/threads/{id}', [\App\Http\Controllers\Api\V1\ThreadController::class, 'destroy']);
        Route::post('/threads/{id}/like', [\App\Http\Controllers\Api\V1\ThreadController::class, 'like']);
        Route::post('/threads/{id}/collect', [\App\Http\Controllers\Api\V1\ThreadController::class, 'collect']);

        Route::post('/posts', [\App\Http\Controllers\Api\V1\PostController::class, 'store']);
        Route::put('/posts/{id}', [\App\Http\Controllers\Api\V1\PostController::class, 'update']);
        Route::delete('/posts/{id}', [\App\Http\Controllers\Api\V1\PostController::class, 'destroy']);
        Route::post('/posts/{id}/like', [\App\Http\Controllers\Api\V1\PostController::class, 'like']);

        Route::prefix('notifications')->group(function () {
            Route::get('/', [\App\Http\Controllers\Api\V1\NotificationController::class, 'index']);
            Route::get('/unread-count', [\App\Http\Controllers\Api\V1\NotificationController::class, 'unreadCount']);
            Route::post('/read-all', [\App\Http\Controllers\Api\V1\NotificationController::class, 'readAll']);
            Route::post('/{id}/read', [\App\Http\Controllers\Api\V1\NotificationController::class, 'read']);
        });
    });
});
