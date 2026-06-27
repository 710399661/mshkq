<?php

namespace App\Repositories;

use App\Models\Category;

class CategoryRepository extends BaseRepository
{
    public function __construct(Category $model)
    {
        parent::__construct($model);
    }

    public function getAllEnabled()
    {
        return $this->model->where('is_enabled', true)
            ->orderBy('sort', 'asc')
            ->orderBy('id', 'asc')
            ->get();
    }

    public function getTree()
    {
        $categories = $this->getAllEnabled();
        return $this->buildTree($categories->toArray());
    }

    protected function buildTree(array $categories, int $parentId = 0): array
    {
        $tree = [];
        foreach ($categories as $category) {
            if ($category['parent_id'] == $parentId) {
                $category['children'] = $this->buildTree($categories, $category['id']);
                $tree[] = $category;
            }
        }
        return $tree;
    }

    public function findById(int $id)
    {
        return $this->model->where('is_enabled', true)->find($id);
    }

    public function getCategoryThreads(int $categoryId, int $perPage = 20)
    {
        $category = $this->findById($categoryId);
        if (!$category) {
            return null;
        }
        return $category->threads()
            ->where('is_approved', true)
            ->orderBy('is_sticky', 'desc')
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);
    }
}
