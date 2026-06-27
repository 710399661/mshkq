<?php

namespace App\Repositories;

use App\Models\Tag;

class TagRepository extends BaseRepository
{
    public function __construct(Tag $model)
    {
        parent::__construct($model);
    }

    public function getList(string $sort = 'thread_count', string $order = 'desc', int $perPage = 20)
    {
        return $this->model
            ->orderBy($sort, $order)
            ->orderBy('id', 'asc')
            ->paginate($perPage);
    }

    public function getHotTags(int $limit = 20)
    {
        return $this->model
            ->orderBy('thread_count', 'desc')
            ->orderBy('sort', 'asc')
            ->limit($limit)
            ->get();
    }

    public function search(string $keyword, int $perPage = 20)
    {
        return $this->model
            ->where('name', 'like', "%{$keyword}%")
            ->orderBy('thread_count', 'desc')
            ->paginate($perPage);
    }

    public function findById(int $id)
    {
        return $this->model->find($id);
    }

    public function getTagThreads(int $tagId, int $perPage = 20)
    {
        $tag = $this->findById($tagId);
        if (!$tag) {
            return null;
        }
        return $tag->threads()
            ->where('is_approved', true)
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);
    }
}
