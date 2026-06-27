<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Api\Controller;
use App\Models\Thread;
use Illuminate\Http\Request;

class ThreadController extends Controller
{
    public function index(Request $request)
    {
        $query = Thread::with(['user', 'category']);

        if ($request->has('keyword')) {
            $keyword = $request->input('keyword');
            $query->where('title', 'like', "%{$keyword}%");
        }

        $perPage = $request->input('per_page', 20);
        $threads = $query->orderBy('created_at', 'desc')->paginate($perPage);

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

    public function show($id)
    {
        $thread = Thread::with(['user', 'category', 'tags'])->findOrFail($id);
        return $this->success($thread);
    }

    public function destroy($id)
    {
        $thread = Thread::findOrFail($id);
        $thread->delete();

        return $this->success(null, '帖子已删除');
    }

    public function sticky($id)
    {
        $thread = Thread::findOrFail($id);
        $thread->is_sticky = true;
        $thread->save();

        return $this->success(null, '已置顶');
    }

    public function unsticky($id)
    {
        $thread = Thread::findOrFail($id);
        $thread->is_sticky = false;
        $thread->save();

        return $this->success(null, '已取消置顶');
    }

    public function essence($id)
    {
        $thread = Thread::findOrFail($id);
        $thread->is_essence = true;
        $thread->save();

        return $this->success(null, '已加精');
    }

    public function unessence($id)
    {
        $thread = Thread::findOrFail($id);
        $thread->is_essence = false;
        $thread->save();

        return $this->success(null, '已取消加精');
    }
}
