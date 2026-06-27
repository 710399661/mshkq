<?php

namespace App\Repositories;

use App\Models\Thread;
use App\Models\ThreadLike;
use App\Models\ThreadCollect;
use Illuminate\Support\Facades\DB;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\AllowedSort;

class ThreadRepository extends BaseRepository
{
    public function __construct(Thread $model)
    {
        parent::__construct($model);
    }

    public function getList(int $perPage = 20)
    {
        return QueryBuilder::for($this->model->query())
            ->where('is_approved', true)
            ->allowedFilters([
                AllowedFilter::exact('category_id'),
                AllowedFilter::exact('user_id'),
                AllowedFilter::exact('type'),
                AllowedFilter::exact('is_essence'),
                AllowedFilter::exact('is_sticky'),
                AllowedFilter::callback('search', function ($query, $value) {
                    $query->where('title', 'like', "%{$value}%");
                }),
                AllowedFilter::callback('tag_id', function ($query, $value) {
                    $query->whereHas('tags', function ($q) use ($value) {
                        $q->where('tags.id', $value);
                    });
                }),
            ])
            ->allowedSorts([
                AllowedSort::field('created_at'),
                AllowedSort::field('updated_at'),
                AllowedSort::field('view_count'),
                AllowedSort::field('post_count'),
                AllowedSort::field('like_count'),
            ])
            ->defaultSort('-is_sticky', '-created_at')
            ->with(['user', 'category', 'tags'])
            ->paginate($perPage);
    }

    public function findById(int $id)
    {
        return $this->model
            ->with(['user', 'category', 'tags'])
            ->find($id);
    }

    public function findWithFirstPost(int $id)
    {
        return $this->model
            ->with(['user', 'category', 'tags'])
            ->with(['firstPost' => function ($query) {
                $query->where('is_first', true)->with('user');
            }])
            ->find($id);
    }

    public function incrementViewCount(int $id): void
    {
        $this->model->where('id', $id)->increment('view_count');
    }

    public function createThread(array $data, array $tagIds = [])
    {
        return DB::transaction(function () use ($data, $tagIds) {
            $thread = $this->model->create($data);

            if (!empty($tagIds)) {
                $thread->tags()->sync($tagIds);
            }

            DB::table('users')->where('id', $data['user_id'])->increment('thread_count');
            DB::table('categories')->where('id', $data['category_id'])->increment('thread_count');

            if (!empty($tagIds)) {
                DB::table('tags')->whereIn('id', $tagIds)->increment('thread_count');
            }

            return $thread->load(['user', 'category', 'tags']);
        });
    }

    public function updateThread(int $id, array $data, ?array $tagIds = null)
    {
        return DB::transaction(function () use ($id, $data, $tagIds) {
            $thread = $this->model->findOrFail($id);

            $oldCategoryId = $thread->category_id;

            $thread->update($data);

            if ($tagIds !== null) {
                $oldTagIds = $thread->tags()->pluck('tags.id')->toArray();

                $thread->tags()->sync($tagIds);

                $addedTags = array_diff($tagIds, $oldTagIds);
                $removedTags = array_diff($oldTagIds, $tagIds);

                if (!empty($addedTags)) {
                    DB::table('tags')->whereIn('id', $addedTags)->increment('thread_count');
                }
                if (!empty($removedTags)) {
                    DB::table('tags')->whereIn('id', $removedTags)->decrement('thread_count');
                }
            }

            if (isset($data['category_id']) && $data['category_id'] != $oldCategoryId) {
                DB::table('categories')->where('id', $oldCategoryId)->decrement('thread_count');
                DB::table('categories')->where('id', $data['category_id'])->increment('thread_count');
            }

            return $thread->load(['user', 'category', 'tags']);
        });
    }

    public function deleteThread(int $id, int $userId): bool
    {
        return DB::transaction(function () use ($id, $userId) {
            $thread = $this->model->findOrFail($id);

            $tagIds = $thread->tags()->pluck('tags.id')->toArray();

            $thread->update([
                'deleted_user_id' => $userId,
            ]);

            $thread->delete();

            DB::table('users')->where('id', $thread->user_id)->decrement('thread_count');
            DB::table('categories')->where('id', $thread->category_id)->decrement('thread_count');

            if (!empty($tagIds)) {
                DB::table('tags')->whereIn('id', $tagIds)->decrement('thread_count');
            }

            return true;
        });
    }

    public function toggleLike(int $threadId, int $userId): array
    {
        $like = ThreadLike::where('thread_id', $threadId)
            ->where('user_id', $userId)
            ->first();

        $liked = false;

        DB::transaction(function () use ($threadId, $userId, $like, &$liked) {
            if ($like) {
                $like->delete();
                DB::table('threads')->where('id', $threadId)->decrement('like_count');
                DB::table('users')->where('id', function ($query) use ($threadId) {
                    $query->select('user_id')->from('threads')->where('id', $threadId);
                })->decrement('like_count');
                $liked = false;
            } else {
                ThreadLike::create([
                    'thread_id' => $threadId,
                    'user_id' => $userId,
                ]);
                DB::table('threads')->where('id', $threadId)->increment('like_count');
                DB::table('users')->where('id', function ($query) use ($threadId) {
                    $query->select('user_id')->from('threads')->where('id', $threadId);
                })->increment('like_count');
                $liked = true;
            }
        });

        return ['liked' => $liked];
    }

    public function toggleCollect(int $threadId, int $userId): array
    {
        $collect = ThreadCollect::where('thread_id', $threadId)
            ->where('user_id', $userId)
            ->first();

        $collected = false;

        DB::transaction(function () use ($threadId, $userId, $collect, &$collected) {
            if ($collect) {
                $collect->delete();
                DB::table('threads')->where('id', $threadId)->decrement('collect_count');
                $collected = false;
            } else {
                ThreadCollect::create([
                    'thread_id' => $threadId,
                    'user_id' => $userId,
                ]);
                DB::table('threads')->where('id', $threadId)->increment('collect_count');
                $collected = true;
            }
        });

        return ['collected' => $collected];
    }

    public function isLiked(int $threadId, int $userId): bool
    {
        return ThreadLike::where('thread_id', $threadId)
            ->where('user_id', $userId)
            ->exists();
    }

    public function isCollected(int $threadId, int $userId): bool
    {
        return ThreadCollect::where('thread_id', $threadId)
            ->where('user_id', $userId)
            ->exists();
    }
}
