<?php

namespace Database\Seeders;

use App\Models\Thread;
use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Seeder;

class PostSeeder extends Seeder
{
    public function run(): void
    {
        $threads = Thread::all();
        $userIds = User::pluck('id')->toArray();

        foreach ($threads as $thread) {
            $firstPostUserId = $thread->user_id;
            $firstPost = Post::factory()->first()->create([
                'thread_id' => $thread->id,
                'user_id' => $firstPostUserId,
            ]);

            $replyCount = rand(2, 9);
            $posts = collect([$firstPost]);

            for ($i = 0; $i < $replyCount; $i++) {
                $replyUserId = $userIds[array_rand($userIds)];
                $replyToPost = $posts->random();

                $post = Post::factory()->create([
                    'thread_id' => $thread->id,
                    'user_id' => $replyUserId,
                    'reply_post_id' => $replyToPost->id,
                    'reply_user_id' => $replyToPost->user_id,
                ]);

                $posts->push($post);
            }

            $thread->update([
                'post_count' => $posts->count(),
                'last_posted_user_id' => $posts->last()->user_id,
                'last_posted_at' => $posts->last()->created_at,
            ]);
        }
    }
}
