<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Api\Controller;
use App\Models\Post;
use App\Models\Thread;
use App\Models\User;
use Illuminate\Http\Request;

class StatsController extends Controller
{
    public function index(Request $request)
    {
        $userCount = User::count();
        $threadCount = Thread::count();
        $postCount = Post::count();

        $todayUsers = User::whereDate('created_at', now()->toDateString())->count();
        $todayThreads = Thread::whereDate('created_at', now()->toDateString())->count();
        $todayPosts = Post::whereDate('created_at', now()->toDateString())->count();

        return $this->success([
            'total_users' => $userCount,
            'total_threads' => $threadCount,
            'total_posts' => $postCount,
            'today_users' => $todayUsers,
            'today_threads' => $todayThreads,
            'today_posts' => $todayPosts,
        ]);
    }
}
