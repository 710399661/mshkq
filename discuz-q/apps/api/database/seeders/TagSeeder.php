<?php

namespace Database\Seeders;

use App\Models\Tag;
use Illuminate\Database\Seeder;

class TagSeeder extends Seeder
{
    public function run(): void
    {
        $tags = [
            'Laravel', 'PHP', 'JavaScript', 'Vue.js', 'React',
            'Node.js', 'Python', 'Java', 'Go', 'Rust',
            '数据库', 'MySQL', 'Redis', '前端', '后端',
            '全栈', 'DevOps', 'Docker', 'Kubernetes', 'AI',
        ];

        foreach ($tags as $index => $tagName) {
            Tag::factory()->create([
                'name' => $tagName,
                'slug' => strtolower(str_replace(['.', ' '], '-', $tagName)),
                'sort' => $index + 1,
            ]);
        }
    }
}
