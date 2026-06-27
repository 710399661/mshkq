<?php

namespace App\Services;

use App\Repositories\TagRepository;
use Illuminate\Support\Facades\Cache;

class TagService extends BaseService
{
    protected $repository;

    public function __construct(TagRepository $tagRepository)
    {
        $this->repository = $tagRepository;
    }

    public function getTagList(string $sort = 'thread_count', string $order = 'desc', int $perPage = 20)
    {
        return $this->repository->getList($sort, $order, $perPage);
    }

    public function getHotTags(int $limit = 20)
    {
        return Cache::remember("tags:hot:{$limit}", 3600, function () use ($limit) {
            return $this->repository->getHotTags($limit);
        });
    }

    public function searchTags(string $keyword, int $perPage = 20)
    {
        return $this->repository->search($keyword, $perPage);
    }

    public function getTagById(int $id)
    {
        return Cache::remember("tags:{$id}", 3600, function () use ($id) {
            return $this->repository->findById($id);
        });
    }

    public function getTagThreads(int $tagId, int $perPage = 20)
    {
        return $this->repository->getTagThreads($tagId, $perPage);
    }

    public function clearTagCache(): void
    {
        Cache::forget('tags:hot:20');
        Cache::forget('tags:hot:15');
        Cache::forget('tags:hot:10');
    }
}
