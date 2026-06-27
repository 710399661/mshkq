<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Api\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index(Request $request)
    {
        $categories = Category::orderBy('sort', 'asc')->orderBy('id', 'asc')->get();
        return $this->success($categories);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:50|unique:categories,name',
            'description' => 'nullable|string|max:255',
            'sort' => 'nullable|integer|min:0',
            'icon' => 'nullable|string|max:255',
        ]);

        $category = Category::create($validated);

        return $this->success($category, '分类创建成功');
    }

    public function update(Request $request, $id)
    {
        $category = Category::findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|string|max:50|unique:categories,name,' . $id,
            'description' => 'nullable|string|max:255',
            'sort' => 'nullable|integer|min:0',
            'icon' => 'nullable|string|max:255',
        ]);

        $category->update($validated);

        return $this->success($category, '分类更新成功');
    }

    public function destroy($id)
    {
        $category = Category::findOrFail($id);
        $category->delete();

        return $this->success(null, '分类已删除');
    }
}
