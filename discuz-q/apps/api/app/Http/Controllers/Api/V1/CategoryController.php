<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Api\Controller;
use App\Http\Resources\CategoryResource;
use App\Services\CategoryService;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    protected $categoryService;

    public function __construct(CategoryService $categoryService)
    {
        $this->categoryService = $categoryService;
    }

    public function index(Request $request)
    {
        $type = $request->input('type', 'flat');

        if ($type === 'tree') {
            $categories = $this->categoryService->getCategoryTree();
            return $this->success($categories);
        }

        $categories = $this->categoryService->getAllCategories();
        return $this->success(CategoryResource::collection($categories));
    }

    public function show(int $id)
    {
        $category = $this->categoryService->getCategoryById($id);

        if (!$category) {
            return $this->notFound('分类不存在');
        }

        return $this->success(new CategoryResource($category));
    }

    public function threads(int $id, Request $request)
    {
        $perPage = $request->input('per_page', 20);
        $threads = $this->categoryService->getCategoryThreads($id, $perPage);

        if ($threads === null) {
            return $this->notFound('分类不存在');
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
}
