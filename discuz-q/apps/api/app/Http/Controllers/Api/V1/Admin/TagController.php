<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Api\Controller;
use App\Models\Tag;
use Illuminate\Http\Request;

class TagController extends Controller
{
    public function index(Request $request)
    {
        $query = Tag::query();

        if ($request->has('keyword')) {
            $keyword = $request->input('keyword');
            $query->where('name', 'like', "%{$keyword}%");
        }

        $perPage = $request->input('per_page', 20);
        $tags = $query->orderBy('thread_count', 'desc')->paginate($perPage);

        return $this->success([
            'data' => $tags->items(),
            'meta' => [
                'current_page' => $tags->currentPage(),
                'per_page' => $tags->perPage(),
                'total' => $tags->total(),
                'last_page' => $tags->lastPage(),
            ],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:30|unique:tags,name',
            'description' => 'nullable|string|max:255',
            'icon' => 'nullable|string|max:255',
        ]);

        $tag = Tag::create($validated);

        return $this->success($tag, '标签创建成功');
    }

    public function update(Request $request, $id)
    {
        $tag = Tag::findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|string|max:30|unique:tags,name,' . $id,
            'description' => 'nullable|string|max:255',
            'icon' => 'nullable|string|max:255',
        ]);

        $tag->update($validated);

        return $this->success($tag, '标签更新成功');
    }

    public function destroy($id)
    {
        $tag = Tag::findOrFail($id);
        $tag->delete();

        return $this->success(null, '标签已删除');
    }
}
