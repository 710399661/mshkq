<?php

namespace App\Services;

use App\Repositories\ThreadRepository;

class ThreadService extends BaseService
{
    protected $repository;

    public function __construct(ThreadRepository $threadRepository)
    {
        $this->repository = $threadRepository;
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
}
