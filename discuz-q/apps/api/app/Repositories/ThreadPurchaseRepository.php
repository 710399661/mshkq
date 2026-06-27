<?php

namespace App\Repositories;

use App\Models\ThreadPurchase;
use Illuminate\Support\Facades\DB;

class ThreadPurchaseRepository extends BaseRepository
{
    public function __construct(ThreadPurchase $model)
    {
        parent::__construct($model);
    }

    public function findByUserAndThread(int $userId, int $threadId)
    {
        return $this->model
            ->where('user_id', $userId)
            ->where('thread_id', $threadId)
            ->first();
    }

    public function hasPurchased(int $userId, int $threadId): bool
    {
        return $this->model
            ->where('user_id', $userId)
            ->where('thread_id', $threadId)
            ->exists();
    }

    public function createPurchase(int $userId, int $threadId, float $price)
    {
        return $this->model->create([
            'user_id' => $userId,
            'thread_id' => $threadId,
            'price' => $price,
            'paid_at' => now(),
        ]);
    }

    public function getPurchasesByThread(int $threadId, int $perPage = 20)
    {
        return $this->model
            ->where('thread_id', $threadId)
            ->with('user')
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);
    }

    public function getPurchasedThreads(int $userId, int $perPage = 20)
    {
        return $this->model
            ->where('user_id', $userId)
            ->with(['thread', 'thread.user', 'thread.category', 'thread.tags'])
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);
    }
}
