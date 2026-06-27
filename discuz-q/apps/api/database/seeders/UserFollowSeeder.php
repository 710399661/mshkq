<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\UserFollow;
use Illuminate\Database\Seeder;

class UserFollowSeeder extends Seeder
{
    public function run(): void
    {
        $users = User::all();

        foreach ($users as $user) {
            $followingCount = rand(1, 10);
            $followingUsers = $users->where('id', '!=', $user->id)->random(min($followingCount, $users->count() - 1));

            foreach ($followingUsers as $following) {
                $existing = UserFollow::where('follower_id', $user->id)
                    ->where('following_id', $following->id)
                    ->exists();

                if (!$existing) {
                    $isMutual = fake()->boolean(30);

                    UserFollow::create([
                        'follower_id' => $user->id,
                        'following_id' => $following->id,
                        'is_mutual' => $isMutual,
                    ]);

                    if ($isMutual) {
                        $reverseExisting = UserFollow::where('follower_id', $following->id)
                            ->where('following_id', $user->id)
                            ->exists();

                        if (!$reverseExisting) {
                            UserFollow::create([
                                'follower_id' => $following->id,
                                'following_id' => $user->id,
                                'is_mutual' => true,
                            ]);
                        }
                    }
                }
            }
        }

        $this->updateFollowCounts();
    }

    protected function updateFollowCounts(): void
    {
        $users = User::all();

        foreach ($users as $user) {
            $followCount = UserFollow::where('follower_id', $user->id)->count();
            $fansCount = UserFollow::where('following_id', $user->id)->count();

            $user->update([
                'follow_count' => $followCount,
                'fans_count' => $fansCount,
            ]);
        }
    }
}
