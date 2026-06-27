<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Api\Controller;
use App\Http\Requests\Post\CreatePostRequest;
use App\Http\Requests\Post\UpdatePostRequest;
use App\Http\Resources\PostResource;
use App\Http\Resources\PostListItemResource;
use App\Services\PostService;
use Illuminate\Http\Request;

class PostController extends Controller
{
    protected $postService;

    public function __construct(PostService $postService)
    {
        $this->postService = $postService;
    }

    public function index(int $threadId, Request $request)
    {
        $perPage = $request->input('per_page', 20);
        $posts = $this->postService->getThreadPosts($threadId, $perPage);

        return $this->success([
            'data' => PostListItemResource::collection($posts->items()),
            'meta' => [
                'current_page' => $posts->currentPage(),
                'per_page' => $posts->perPage(),
                'total' => $posts->total(),
                'last_page' => $posts->lastPage(),
            ],
        ]);
    }

    public function store(CreatePostRequest $request)
    {
        $validated = $request->validated();
        $post = $this->postService->createPost($validated, $request->user()->id);

        return $this->success(new PostResource($post), '回复成功');
    }

    public function show(int $id)
    {
        $post = $this->postService->getPostById($id);

        if (!$post) {
            return $this->notFound('回复不存在');
        }

        return $this->success(new PostResource($post));
    }

    public function update(int $id, UpdatePostRequest $request)
    {
        $post = $this->postService->getPostById($id);

        if (!$post) {
            return $this->notFound('回复不存在');
        }

        if (!$this->postService->canEdit($id, $request->user()->id)) {
            return $this->forbidden('没有权限编辑此回复');
        }

        $validated = $request->validated();
        $post = $this->postService->updatePost($id, $validated);

        return $this->success(new PostResource($post), '回复更新成功');
    }

    public function destroy(int $id, Request $request)
    {
        $post = $this->postService->getPostById($id);

        if (!$post) {
            return $this->notFound('回复不存在');
        }

        if (!$this->postService->canEdit($id, $request->user()->id)) {
            return $this->forbidden('没有权限删除此回复');
        }

        $this->postService->deletePost($id, $request->user()->id);

        return $this->success(null, '回复删除成功');
    }

    public function like(int $id, Request $request)
    {
        $post = $this->postService->getPostById($id);

        if (!$post) {
            return $this->notFound('回复不存在');
        }

        $result = $this->postService->toggleLike($id, $request->user()->id);

        $message = $result['liked'] ? '点赞成功' : '取消点赞成功';
        return $this->success($result, $message);
    }
}
