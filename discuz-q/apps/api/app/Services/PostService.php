<?php

namespace App\Services;

use App\Repositories\PostRepository;
use App\Repositories\ThreadRepository;

class PostService extends BaseService
{
    protected $repository;
    protected $threadRepository;

    public function __construct(PostRepository $postRepository, ThreadRepository $threadRepository)
    {
        $this->repository = $postRepository;
        $this->threadRepository = $threadRepository;
    }

    public function getThreadPosts(int $threadId, int $perPage = 20)
    {
        return $this->repository->getThreadPosts($threadId, $perPage);
    }

    public function getPostById(int $id)
    {
        return $this->repository->findById($id);
    }

    public function createPost(array $data, int $userId)
    {
        $data['user_id'] = $userId;
        $data['is_approved'] = true;
        $data['ip'] = request()->ip();

        if (empty($data['parent_id'])) {
            $data['parent_id'] = 0;
        }

        return $this->repository->createPost($data);
    }

    public function updatePost(int $id, array $data)
    {
        return $this->repository->updatePost($id, $data);
    }

    public function deletePost(int $id, int $userId): bool
    {
        return $this->repository->deletePost($id, $userId);
    }

    public function toggleLike(int $postId, int $userId): array
    {
        return $this->repository->toggleLike($postId, $userId);
    }

    public function canEdit(int $postId, int $userId): bool
    {
        $post = $this->repository->findById($postId);
        if (!$post) {
            return false;
        }
        return $post->user_id === $userId;
    }

    public function threadExists(int $threadId): bool
    {
        return $this->threadRepository->findById($threadId) !== null;
    }
}
