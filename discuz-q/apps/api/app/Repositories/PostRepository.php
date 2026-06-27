<?php

namespace App\Repositories;

use App\Models\Post;
use App\Models\PostLike;
use Illuminate\Support\Facades\DB;

class PostRepository extends BaseRepository
{
    public function __construct(Post $model)
    {
        parent::__construct($model);
    }

    public function getThreadPosts(int $threadId, int $perPage = 20)
    {
        return $this->model
            ->where('thread_id', $threadId)
            ->where('is_approved', true)
            ->whereNull('parent_id')
            ->with(['user', 'replyUser'])
            ->with(['replies' => function ($query) {
                $query->where('is_approved', true)
                    ->with(['user', 'replyUser'])
                    ->orderBy('created_at', 'asc')
                    ->limit(5);
            }])
            ->orderBy('is_first', 'desc')
            ->orderBy('created_at', 'asc')
            ->paginate($perPage);
    }

    public function findById(int $id)
    {
        return $this->model
            ->with(['user', 'thread'])
            ->find($id);
    }

    public function createPost(array $data)
    {
        return DB::transaction(function () use ($data) {
            $post = $this->model->create($data);

            $threadId = $data['thread_id'];
            $userId = $data['user_id'];

            DB::table('threads')->where('id', $threadId)->increment('post_count');
            DB::table('threads')->where('id', $threadId)->update([
                'last_posted_user_id' => $userId,
                'last_posted_at' => now(),
            ]);

            DB::table('users')->where('id', $userId)->increment('post_count');

            if (!empty($data['parent_id'])) {
                DB::table('posts')->where('id', $data['parent_id'])->increment('reply_count');
            }

            return $post->load(['user', 'thread', 'replyUser']);
        });
    }

    public function updatePost(int $id, array $data)
    {
        $post = $this->model->findOrFail($id);
        $post->update($data);
        return $post->load(['user', 'thread', 'replyUser']);
    }

    public function deletePost(int $id, int $userId): bool
    {
        return DB::transaction(function () use ($id, $userId) {
            $post = $this->model->findOrFail($id);

            $threadId = $post->thread_id;
            $postUserId = $post->user_id;
            $parentId = $post->parent_id;

            $post->update([
                'deleted_user_id' => $userId,
            ]);

            $post->delete();

            DB::table('threads')->where('id', $threadId)->decrement('post_count');
            DB::table('users')->where('id', $postUserId)->decrement('post_count');

            if (!empty($parentId)) {
                DB::table('posts')->where('id', $parentId)->decrement('reply_count');
            }

            return true;
        });
    }

    public function toggleLike(int $postId, int $userId): array
    {
        $like = PostLike::where('post_id', $postId)
            ->where('user_id', $userId)
            ->first();

        $liked = false;

        DB::transaction(function () use ($postId, $userId, $like, &$liked) {
            if ($like) {
                $like->delete();
                DB::table('posts')->where('id', $postId)->decrement('like_count');
                $liked = false;
            } else {
                PostLike::create([
                    'post_id' => $postId,
                    'user_id' => $userId,
                ]);
                DB::table('posts')->where('id', $postId)->increment('like_count');
                $liked = true;
            }
        });

        return ['liked' => $liked];
    }

    public function isLiked(int $postId, int $userId): bool
    {
        return PostLike::where('post_id', $postId)
            ->where('user_id', $userId)
            ->exists();
    }
}
