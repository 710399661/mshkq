<?php

namespace App\Services;

use App\Repositories\TagRepository;

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
        return $this->repository->getHotTags($limit);
    }

    public function searchTags(string $keyword, int $perPage = 20)
    {
        return $this->repository->search($keyword, $perPage);
    }

    public function getTagById(int $id)
    {
        return $this->repository->findById($id);
    }

    public function getTagThreads(int $tagId, int $perPage = 20)
    {
        return $this->repository->getTagThreads($tagId, $perPage);
    }
}
