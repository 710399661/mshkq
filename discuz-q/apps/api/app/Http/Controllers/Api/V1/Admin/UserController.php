<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Api\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $query = User::query();

        if ($request->has('keyword')) {
            $keyword = $request->input('keyword');
            $query->where(function ($q) use ($keyword) {
                $q->where('username', 'like', "%{$keyword}%")
                    ->orWhere('email', 'like', "%{$keyword}%");
            });
        }

        $perPage = $request->input('per_page', 20);
        $users = $query->orderBy('created_at', 'desc')->paginate($perPage);

        return $this->success([
            'data' => $users->items(),
            'meta' => [
                'current_page' => $users->currentPage(),
                'per_page' => $users->perPage(),
                'total' => $users->total(),
                'last_page' => $users->lastPage(),
            ],
        ]);
    }

    public function show($id)
    {
        $user = User::findOrFail($id);
        return $this->success($user);
    }

    public function ban($id)
    {
        $user = User::findOrFail($id);
        $user->status = 2;
        $user->save();

        return $this->success(null, '用户已封禁');
    }

    public function unban($id)
    {
        $user = User::findOrFail($id);
        $user->status = 0;
        $user->save();

        return $this->success(null, '用户已解封');
    }
}
