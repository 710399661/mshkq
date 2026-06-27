<?php

use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    Route::get('/health', function () {
        return response()->json([
            'code' => 0,
            'message' => 'success',
            'data' => ['status' => 'ok'],
        ]);
    })->middleware('throttle:60,1');

    Route::prefix('auth')->middleware('throttle:auth')->group(function () {
        Route::post('/register', [\App\Http\Controllers\Api\V1\AuthController::class, 'register']);
        Route::post('/login', [\App\Http\Controllers\Api\V1\AuthController::class, 'login']);
    });

    Route::middleware('throttle:api')->group(function () {
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
    });

    Route::middleware(['auth:sanctum', 'throttle:api'])->group(function () {
        Route::prefix('auth')->group(function () {
            Route::post('/logout', [\App\Http\Controllers\Api\V1\AuthController::class, 'logout']);
            Route::get('/me', [\App\Http\Controllers\Api\V1\AuthController::class, 'me']);
        });

        Route::prefix('user')->group(function () {
            Route::put('/profile', [\App\Http\Controllers\Api\V1\UserController::class, 'updateProfile']);
        });

        Route::post('/users/{id}/follow', [\App\Http\Controllers\Api\V1\UserController::class, 'follow']);

        Route::middleware('throttle:post')->group(function () {
            Route::post('/threads', [\App\Http\Controllers\Api\V1\ThreadController::class, 'store']);
            Route::put('/threads/{id}', [\App\Http\Controllers\Api\V1\ThreadController::class, 'update']);
            Route::delete('/threads/{id}', [\App\Http\Controllers\Api\V1\ThreadController::class, 'destroy']);
            Route::post('/threads/{id}/like', [\App\Http\Controllers\Api\V1\ThreadController::class, 'like']);
            Route::post('/threads/{id}/collect', [\App\Http\Controllers\Api\V1\ThreadController::class, 'collect']);
            Route::post('/threads/{id}/purchase', [\App\Http\Controllers\Api\V1\ThreadController::class, 'purchase']);
            Route::get('/threads/{id}/purchases', [\App\Http\Controllers\Api\V1\ThreadController::class, 'purchases']);

            Route::post('/posts', [\App\Http\Controllers\Api\V1\PostController::class, 'store']);
            Route::put('/posts/{id}', [\App\Http\Controllers\Api\V1\PostController::class, 'update']);
            Route::delete('/posts/{id}', [\App\Http\Controllers\Api\V1\PostController::class, 'destroy']);
            Route::post('/posts/{id}/like', [\App\Http\Controllers\Api\V1\PostController::class, 'like']);
        });

        Route::prefix('notifications')->group(function () {
            Route::get('/', [\App\Http\Controllers\Api\V1\NotificationController::class, 'index']);
            Route::get('/unread-count', [\App\Http\Controllers\Api\V1\NotificationController::class, 'unreadCount']);
            Route::post('/read-all', [\App\Http\Controllers\Api\V1\NotificationController::class, 'readAll']);
            Route::post('/{id}/read', [\App\Http\Controllers\Api\V1\NotificationController::class, 'read']);
        });

        Route::prefix('wallet')->group(function () {
            Route::get('/', [\App\Http\Controllers\Api\V1\WalletController::class, 'show']);
            Route::get('/logs', [\App\Http\Controllers\Api\V1\WalletController::class, 'logs']);
            Route::post('/recharge', [\App\Http\Controllers\Api\V1\WalletController::class, 'recharge']);
            Route::post('/withdraw', [\App\Http\Controllers\Api\V1\WalletController::class, 'withdraw']);
        });

        Route::prefix('conversations')->group(function () {
            Route::get('/', [\App\Http\Controllers\Api\V1\ConversationController::class, 'index']);
            Route::post('/', [\App\Http\Controllers\Api\V1\ConversationController::class, 'store']);
            Route::get('/unread-count', [\App\Http\Controllers\Api\V1\ConversationController::class, 'unreadCount']);
            Route::get('/{id}/messages', [\App\Http\Controllers\Api\V1\ConversationController::class, 'messages']);
            Route::post('/{id}/messages', [\App\Http\Controllers\Api\V1\ConversationController::class, 'sendMessage']);
            Route::post('/{id}/read', [\App\Http\Controllers\Api\V1\ConversationController::class, 'read']);
        });

        Route::prefix('user')->group(function () {
            Route::get('/purchased', [\App\Http\Controllers\Api\V1\ThreadController::class, 'purchased']);
        });
    });

    Route::prefix('admin')->middleware(['auth:sanctum', 'admin', 'throttle:api'])->group(function () {
        Route::get('/stats', [\App\Http\Controllers\Api\V1\Admin\StatsController::class, 'index']);

        Route::prefix('users')->group(function () {
            Route::get('/', [\App\Http\Controllers\Api\V1\Admin\UserController::class, 'index']);
            Route::get('/{id}', [\App\Http\Controllers\Api\V1\Admin\UserController::class, 'show']);
            Route::post('/{id}/ban', [\App\Http\Controllers\Api\V1\Admin\UserController::class, 'ban']);
            Route::post('/{id}/unban', [\App\Http\Controllers\Api\V1\Admin\UserController::class, 'unban']);
        });

        Route::prefix('threads')->group(function () {
            Route::get('/', [\App\Http\Controllers\Api\V1\Admin\ThreadController::class, 'index']);
            Route::get('/{id}', [\App\Http\Controllers\Api\V1\Admin\ThreadController::class, 'show']);
            Route::delete('/{id}', [\App\Http\Controllers\Api\V1\Admin\ThreadController::class, 'destroy']);
            Route::post('/{id}/sticky', [\App\Http\Controllers\Api\V1\Admin\ThreadController::class, 'sticky']);
            Route::post('/{id}/unsticky', [\App\Http\Controllers\Api\V1\Admin\ThreadController::class, 'unsticky']);
            Route::post('/{id}/essence', [\App\Http\Controllers\Api\V1\Admin\ThreadController::class, 'essence']);
            Route::post('/{id}/unessence', [\App\Http\Controllers\Api\V1\Admin\ThreadController::class, 'unessence']);
        });

        Route::prefix('posts')->group(function () {
            Route::get('/', [\App\Http\Controllers\Api\V1\Admin\PostController::class, 'index']);
            Route::delete('/{id}', [\App\Http\Controllers\Api\V1\Admin\PostController::class, 'destroy']);
        });

        Route::prefix('categories')->group(function () {
            Route::get('/', [\App\Http\Controllers\Api\V1\Admin\CategoryController::class, 'index']);
            Route::post('/', [\App\Http\Controllers\Api\V1\Admin\CategoryController::class, 'store']);
            Route::put('/{id}', [\App\Http\Controllers\Api\V1\Admin\CategoryController::class, 'update']);
            Route::delete('/{id}', [\App\Http\Controllers\Api\V1\Admin\CategoryController::class, 'destroy']);
        });

        Route::prefix('tags')->group(function () {
            Route::get('/', [\App\Http\Controllers\Api\V1\Admin\TagController::class, 'index']);
            Route::post('/', [\App\Http\Controllers\Api\V1\Admin\TagController::class, 'store']);
            Route::put('/{id}', [\App\Http\Controllers\Api\V1\Admin\TagController::class, 'update']);
            Route::delete('/{id}', [\App\Http\Controllers\Api\V1\Admin\TagController::class, 'destroy']);
        });
    });
});
