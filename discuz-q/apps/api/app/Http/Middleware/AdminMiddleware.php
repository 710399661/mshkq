<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (!$user) {
            abort(401, '未登录');
        }

        if (!$user->hasAnyRole(['super_admin', 'admin'])) {
            abort(403, '没有管理员权限');
        }

        return $next($request);
    }
}
