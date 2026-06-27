<?php

namespace App\Services;

use App\Repositories\CategoryRepository;
use Illuminate\Support\Facades\Cache;

class CategoryService extends BaseService
{
    protected $repository;

    public function __construct(CategoryRepository $categoryRepository)
    {
        $this->repository = $categoryRepository;
    }

    public function getAllCategories()
    {
        return Cache::remember('categories:all', 3600, function () {
            return $this->repository->getAllEnabled();
        });
    }

    public function getCategoryTree()
    {
        return Cache::remember('categories:tree', 3600, function () {
            return $this->repository->getTree();
        });
    }

    public function getCategoryById(int $id)
    {
        return Cache::remember("categories:{$id}", 3600, function () use ($id) {
            return $this->repository->findById($id);
        });
    }

    public function getCategoryThreads(int $categoryId, int $perPage = 20)
    {
        return $this->repository->getCategoryThreads($categoryId, $perPage);
    }

    public function clearCategoryCache(): void
    {
        Cache::forget('categories:all');
        Cache::forget('categories:tree');
        $keys = Cache::get('categories:keys', []);
        foreach ($keys as $key) {
            Cache::forget($key);
        }
    }
}
