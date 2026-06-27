<?php

use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
        apiPrefix: 'api',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->statefulApi();
        $middleware->append(\App\Http\Middleware\SecurityHeaders::class);
        $middleware->alias([
            'role' => \Spatie\Permission\Middleware\RoleMiddleware::class,
            'permission' => \Spatie\Permission\Middleware\PermissionMiddleware::class,
            'role_or_permission' => \Spatie\Permission\Middleware\RoleOrPermissionMiddleware::class,
            'admin' => \App\Http\Middleware\AdminMiddleware::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->render(function (Throwable $e, Request $request) {
            if ($request->is('api/*')) {
                $code = 1;
                $message = $e->getMessage() ?: '服务器内部错误';
                $statusCode = 500;
                $data = null;

                if ($e instanceof ValidationException) {
                    $code = 422;
                    $message = '数据验证失败';
                    $statusCode = 422;
                    $data = $e->errors();
                } elseif ($e instanceof NotFoundHttpException) {
                    $code = 404;
                    $message = '资源不存在';
                    $statusCode = 404;
                } elseif ($e instanceof AccessDeniedHttpException) {
                    $code = 403;
                    $message = '没有权限访问';
                    $statusCode = 403;
                } elseif ($e instanceof AuthenticationException) {
                    $code = 401;
                    $message = '未登录或登录已过期';
                    $statusCode = 401;
                }

                return response()->json([
                    'code' => $code,
                    'message' => $message,
                    'data' => $data,
                ], $statusCode);
            }
        });
    })->create();
