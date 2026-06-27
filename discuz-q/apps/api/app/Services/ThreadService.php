<?php

namespace App\Services;

use App\Repositories\ThreadRepository;
use App\Repositories\ThreadPurchaseRepository;
use Illuminate\Support\Facades\DB;

class ThreadService extends BaseService
{
    protected $repository;
    protected $purchaseRepository;
    protected $walletService;

    public function __construct(
        ThreadRepository $threadRepository,
        ThreadPurchaseRepository $purchaseRepository,
        WalletService $walletService
    ) {
        $this->repository = $threadRepository;
        $this->purchaseRepository = $purchaseRepository;
        $this->walletService = $walletService;
    }

    public function getThreadList(int $perPage = 20)
    {
        return $this->repository->getList($perPage);
    }

    public function getThreadById(int $id)
    {
        return $this->repository->findById($id);
    }

    public function getThreadWithFirstPost(int $id)
    {
        $thread = $this->repository->findWithFirstPost($id);
        if ($thread) {
            $this->repository->incrementViewCount($id);
        }
        return $thread;
    }

    public function createThread(array $data, int $userId, array $tagIds = [])
    {
        $data['user_id'] = $userId;
        $data['is_approved'] = true;
        $data['last_posted_user_id'] = $userId;
        $data['last_posted_at'] = now();

        return $this->repository->createThread($data, $tagIds);
    }

    public function updateThread(int $id, array $data, ?array $tagIds = null)
    {
        return $this->repository->updateThread($id, $data, $tagIds);
    }

    public function deleteThread(int $id, int $userId): bool
    {
        return $this->repository->deleteThread($id, $userId);
    }

    public function toggleLike(int $threadId, int $userId): array
    {
        return $this->repository->toggleLike($threadId, $userId);
    }

    public function toggleCollect(int $threadId, int $userId): array
    {
        return $this->repository->toggleCollect($threadId, $userId);
    }

    public function canEdit(int $threadId, int $userId): bool
    {
        $thread = $this->repository->findById($threadId);
        if (!$thread) {
            return false;
        }
        return $thread->user_id === $userId;
    }

    public function isPurchased(int $threadId, int $userId): bool
    {
        $thread = $this->repository->findById($threadId);
        if (!$thread) {
            return false;
        }
        if (!$thread->is_paid) {
            return true;
        }
        if ($thread->user_id === $userId) {
            return true;
        }
        return $this->purchaseRepository->hasPurchased($userId, $threadId);
    }

    public function purchaseThread(int $threadId, int $userId)
    {
        $thread = $this->repository->findById($threadId);
        if (!$thread) {
            throw new \RuntimeException('帖子不存在');
        }

        if (!$thread->is_paid || $thread->price <= 0) {
            throw new \RuntimeException('该帖子不是付费帖');
        }

        if ($thread->user_id === $userId) {
            throw new \RuntimeException('不能购买自己的帖子');
        }

        if ($this->purchaseRepository->hasPurchased($userId, $threadId)) {
            throw new \RuntimeException('您已购买过该帖子');
        }

        return DB::transaction(function () use ($thread, $userId) {
            $this->walletService->pay(
                $userId,
                (float) $thread->price,
                '购买帖子：' . $thread->title,
                'thread_purchase',
                $thread->id
            );

            $this->walletService->income(
                $thread->user_id,
                (float) $thread->price,
                '出售帖子：' . $thread->title,
                'thread_sale',
                $thread->id
            );

            $purchase = $this->purchaseRepository->createPurchase(
                $userId,
                $thread->id,
                (float) $thread->price
            );

            return $purchase;
        });
    }

    public function getThreadPurchases(int $threadId, int $perPage = 20)
    {
        return $this->purchaseRepository->getPurchasesByThread($threadId, $perPage);
    }

    public function getPurchasedThreads(int $userId, int $perPage = 20)
    {
        return $this->purchaseRepository->getPurchasedThreads($userId, $perPage);
    }
}
