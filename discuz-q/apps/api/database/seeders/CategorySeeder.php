<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => '技术交流', 'slug' => 'tech', 'is_home' => true, 'sort' => 1],
            ['name' => '产品建议', 'slug' => 'suggestions', 'sort' => 2],
            ['name' => '灌水闲聊', 'slug' => 'chat', 'sort' => 3],
            ['name' => '资源分享', 'slug' => 'resources', 'sort' => 4],
            ['name' => '问答求助', 'slug' => 'qa', 'sort' => 5],
        ];

        foreach ($categories as $category) {
            Category::factory()->create($category);
        }
    }
}
