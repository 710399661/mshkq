<?php

namespace Database\Seeders;

use App\Models\Thread;
use App\Models\Tag;
use Illuminate\Database\Seeder;

class ThreadSeeder extends Seeder
{
    public function run(): void
    {
        $threads = Thread::factory(50)->create();

        $tagIds = Tag::pluck('id')->toArray();

        foreach ($threads as $thread) {
            $randomTags = collect($tagIds)->random(rand(1, 3))->toArray();
            $thread->tags()->attach($randomTags);
        }
    }
}
