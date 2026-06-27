<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Api\Controller;
use App\Http\Resources\TagResource;
use App\Services\TagService;
use Illuminate\Http\Request;

class TagController extends Controller
{
    protected $tagService;

    public function __construct(TagService $tagService)
    {
        $this->tagService = $tagService;
    }

    public function index(Request $request)
    {
        $sort = $request->input('sort', 'thread_count');
        $order = $request->input('order', 'desc');
        $perPage = $request->input('per_page', 20);

        $tags = $this->tagService->getTagList($sort, $order, $perPage);

        return $this->success([
            'data' => TagResource::collection($tags->items()),
            'meta' => [
                'current_page' => $tags->currentPage(),
                'per_page' => $tags->perPage(),
                'total' => $tags->total(),
                'last_page' => $tags->lastPage(),
            ],
        ]);
    }

    public function show(int $id)
    {
        $tag = $this->tagService->getTagById($id);

        if (!$tag) {
            return $this->notFound('标签不存在');
        }

        return $this->success(new TagResource($tag));
    }

    public function threads(int $id, Request $request)
    {
        $perPage = $request->input('per_page', 20);
        $threads = $this->tagService->getTagThreads($id, $perPage);

        if ($threads === null) {
            return $this->notFound('标签不存在');
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

    public function search(Request $request)
    {
        $keyword = $request->input('keyword', '');
        $perPage = $request->input('per_page', 20);

        if (empty($keyword)) {
            return $this->success([
                'data' => [],
                'meta' => [
                    'current_page' => 1,
                    'per_page' => $perPage,
                    'total' => 0,
                    'last_page' => 0,
                ],
            ]);
        }

        $tags = $this->tagService->searchTags($keyword, $perPage);

        return $this->success([
            'data' => TagResource::collection($tags->items()),
            'meta' => [
                'current_page' => $tags->currentPage(),
                'per_page' => $tags->perPage(),
                'total' => $tags->total(),
                'last_page' => $tags->lastPage(),
            ],
        ]);
    }
}
