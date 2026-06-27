<?php

namespace App\Services;

use App\Repositories\CategoryRepository;

class CategoryService extends BaseService
{
    protected $repository;

    public function __construct(CategoryRepository $categoryRepository)
    {
        $this->repository = $categoryRepository;
    }

    public function getAllCategories()
    {
        return $this->repository->getAllEnabled();
    }

    public function getCategoryTree()
    {
        return $this->repository->getTree();
    }

    public function getCategoryById(int $id)
    {
        return $this->repository->findById($id);
    }

    public function getCategoryThreads(int $categoryId, int $perPage = 20)
    {
        return $this->repository->getCategoryThreads($categoryId, $perPage);
    }
}
