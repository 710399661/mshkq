<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Api\Controller;
use App\Http\Requests\Thread\CreateThreadRequest;
use App\Http\Requests\Thread\UpdateThreadRequest;
use App\Http\Resources\ThreadResource;
use App\Http\Resources\ThreadListItemResource;
use App\Services\ThreadService;
use Illuminate\Http\Request;

class ThreadController extends Controller
{
    protected $threadService;

    public function __construct(ThreadService $threadService)
    {
        $this->threadService = $threadService;
    }

    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 20);
        $threads = $this->threadService->getThreadList($perPage);

        return $this->success([
            'data' => ThreadListItemResource::collection($threads->items()),
            'meta' => [
                'current_page' => $threads->currentPage(),
                'per_page' => $threads->perPage(),
                'total' => $threads->total(),
                'last_page' => $threads->lastPage(),
            ],
        ]);
    }

    public function show(int $id)
    {
        $thread = $this->threadService->getThreadWithFirstPost($id);

        if (!$thread) {
            return $this->notFound('帖子不存在');
        }

        return $this->success(new ThreadResource($thread));
    }

    public function store(CreateThreadRequest $request)
    {
        $validated = $request->validated();
        $tagIds = $validated['tags'] ?? [];

        $threadData = array_diff_key($validated, ['tags' => true]);

        $thread = $this->threadService->createThread(
            $threadData,
            $request->user()->id,
            $tagIds
        );

        return $this->success(new ThreadResource($thread), '发帖成功');
    }

    public function update(int $id, UpdateThreadRequest $request)
    {
        $thread = $this->threadService->getThreadById($id);

        if (!$thread) {
            return $this->notFound('帖子不存在');
        }

        if (!$this->threadService->canEdit($id, $request->user()->id)) {
            return $this->forbidden('没有权限编辑此帖子');
        }

        $validated = $request->validated();
        $tagIds = isset($validated['tags']) ? $validated['tags'] : null;

        $threadData = array_diff_key($validated, ['tags' => true]);

        $thread = $this->threadService->updateThread($id, $threadData, $tagIds);

        return $this->success(new ThreadResource($thread), '帖子更新成功');
    }

    public function destroy(int $id, Request $request)
    {
        $thread = $this->threadService->getThreadById($id);

        if (!$thread) {
            return $this->notFound('帖子不存在');
        }

        if (!$this->threadService->canEdit($id, $request->user()->id)) {
            return $this->forbidden('没有权限删除此帖子');
        }

        $this->threadService->deleteThread($id, $request->user()->id);

        return $this->success(null, '帖子删除成功');
    }

    public function like(int $id, Request $request)
    {
        $thread = $this->threadService->getThreadById($id);

        if (!$thread) {
            return $this->notFound('帖子不存在');
        }

        $result = $this->threadService->toggleLike($id, $request->user()->id);

        $message = $result['liked'] ? '点赞成功' : '取消点赞成功';
        return $this->success($result, $message);
    }

    public function collect(int $id, Request $request)
    {
        $thread = $this->threadService->getThreadById($id);

        if (!$thread) {
            return $this->notFound('帖子不存在');
        }

        $result = $this->threadService->toggleCollect($id, $request->user()->id);

        $message = $result['collected'] ? '收藏成功' : '取消收藏成功';
        return $this->success($result, $message);
    }
}
