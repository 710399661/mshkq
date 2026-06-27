<?php

namespace App\Services;

use App\Repositories\UserRepository;
use App\Models\UserFollow;
use Illuminate\Support\Facades\DB;

class UserService extends BaseService
{
    protected $repository;

    public function __construct(UserRepository $userRepository)
    {
        $this->repository = $userRepository;
    }

    public function getUserById(int $id)
    {
        return $this->repository->findById($id);
    }

    public function updateProfile(int $userId, array $data)
    {
        return $this->repository->update($userId, $data);
    }

    public function getUserThreads(int $userId, int $perPage = 20)
    {
        $user = $this->repository->findById($userId);
        if (!$user) {
            return null;
        }
        return $user->threads()
            ->where('is_approved', true)
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);
    }

    public function getUserPosts(int $userId, int $perPage = 20)
    {
        $user = $this->repository->findById($userId);
        if (!$user) {
            return null;
        }
        return $user->posts()
            ->where('is_approved', true)
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);
    }

    public function getFollowing(int $userId, int $perPage = 20)
    {
        $user = $this->repository->findById($userId);
        if (!$user) {
            return null;
        }
        return $user->following()
            ->with('following')
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);
    }

    public function getFollowers(int $userId, int $perPage = 20)
    {
        $user = $this->repository->findById($userId);
        if (!$user) {
            return null;
        }
        return $user->followers()
            ->with('follower')
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);
    }

    public function toggleFollow(int $followerId, int $followingId): array
    {
        if ($followerId === $followingId) {
            return ['followed' => false, 'message' => '不能关注自己'];
        }

        $follow = UserFollow::where('follower_id', $followerId)
            ->where('following_id', $followingId)
            ->first();

        DB::transaction(function () use ($followerId, $followingId, &$follow) {
            if ($follow) {
                $follow->delete();
                $follow = null;

                DB::table('users')->where('id', $followerId)->decrement('follow_count');
                DB::table('users')->where('id', $followingId)->decrement('fans_count');

                $reverseFollow = UserFollow::where('follower_id', $followingId)
                    ->where('following_id', $followerId)
                    ->first();
                if ($reverseFollow) {
                    $reverseFollow->update(['is_mutual' => false]);
                }
            } else {
                $follow = UserFollow::create([
                    'follower_id' => $followerId,
                    'following_id' => $followingId,
                    'is_mutual' => false,
                ]);

                DB::table('users')->where('id', $followerId)->increment('follow_count');
                DB::table('users')->where('id', $followingId)->increment('fans_count');

                $reverseFollow = UserFollow::where('follower_id', $followingId)
                    ->where('following_id', $followerId)
                    ->first();
                if ($reverseFollow) {
                    $reverseFollow->update(['is_mutual' => true]);
                    $follow->update(['is_mutual' => true]);
                }
            }
        });

        return [
            'followed' => $follow !== null,
            'is_mutual' => $follow?->is_mutual ?? false,
        ];
    }
}
