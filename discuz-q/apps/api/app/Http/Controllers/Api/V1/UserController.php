<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Api\Controller;
use App\Http\Requests\User\UpdateProfileRequest;
use App\Http\Resources\UserResource;
use App\Services\UserService;
use Illuminate\Http\Request;

class UserController extends Controller
{
    protected $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function show(int $id)
    {
        $user = $this->userService->getUserById($id);

        if (!$user) {
            return $this->notFound('用户不存在');
        }

        return $this->success(new UserResource($user));
    }

    public function threads(int $id, Request $request)
    {
        $perPage = $request->input('per_page', 20);
        $threads = $this->userService->getUserThreads($id, $perPage);

        if ($threads === null) {
            return $this->notFound('用户不存在');
        }

        return $this->success([
            'data' => $threads->items(),
            'meta' => [
                'current_page' => $threads->currentPage(),
                'per_page' => $threads->perPage(),
                'total' => $threads->total(),
                'last_page' => $threads->lastPage(),
            ],
        ]);
    }

    public function posts(int $id, Request $request)
    {
        $perPage = $request->input('per_page', 20);
        $posts = $this->userService->getUserPosts($id, $perPage);

        if ($posts === null) {
            return $this->notFound('用户不存在');
        }

        return $this->success([
            'data' => $posts->items(),
            'meta' => [
                'current_page' => $posts->currentPage(),
                'per_page' => $posts->perPage(),
                'total' => $posts->total(),
                'last_page' => $posts->lastPage(),
            ],
        ]);
    }

    public function following(int $id, Request $request)
    {
        $perPage = $request->input('per_page', 20);
        $following = $this->userService->getFollowing($id, $perPage);

        if ($following === null) {
            return $this->notFound('用户不存在');
        }

        $users = $following->getCollection()->map(function ($item) {
            return new UserResource($item->following);
        });

        return $this->success([
            'data' => $users,
            'meta' => [
                'current_page' => $following->currentPage(),
                'per_page' => $following->perPage(),
                'total' => $following->total(),
                'last_page' => $following->lastPage(),
            ],
        ]);
    }

    public function followers(int $id, Request $request)
    {
        $perPage = $request->input('per_page', 20);
        $followers = $this->userService->getFollowers($id, $perPage);

        if ($followers === null) {
            return $this->notFound('用户不存在');
        }

        $users = $followers->getCollection()->map(function ($item) {
            return new UserResource($item->follower);
        });

        return $this->success([
            'data' => $users,
            'meta' => [
                'current_page' => $followers->currentPage(),
                'per_page' => $followers->perPage(),
                'total' => $followers->total(),
                'last_page' => $followers->lastPage(),
            ],
        ]);
    }

    public function updateProfile(UpdateProfileRequest $request)
    {
        $validated = $request->validated();
        $user = $this->userService->updateProfile($request->user()->id, $validated);

        return $this->success(new UserResource($user), '资料更新成功');
    }

    public function follow(int $id, Request $request)
    {
        $result = $this->userService->toggleFollow($request->user()->id, $id);

        $message = $result['followed'] ? '关注成功' : '取消关注成功';
        return $this->success($result, $message);
    }
}
