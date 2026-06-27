<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Thread;
use App\Models\Post;
use Illuminate\Database\Eloquent\Factories\Factory;

class PostFactory extends Factory
{
    public function definition(): array
    {
        $content = fake()->paragraphs(rand(1, 5), true);

        return [
            'thread_id' => Thread::inRandomOrder()->value('id') ?? Thread::factory(),
            'user_id' => User::inRandomOrder()->value('id') ?? User::factory(),
            'parent_id' => null,
            'reply_post_id' => null,
            'reply_user_id' => null,
            'content' => $content,
            'content_html' => $this->markdownToSimpleHtml($content),
            'ip' => fake()->ipv4(),
            'reply_count' => 0,
            'like_count' => rand(0, 50),
            'is_first' => false,
            'is_comment' => false,
            'is_approved' => true,
            'created_at' => fake()->dateTimeBetween('-6 months', 'now'),
            'updated_at' => fake()->dateTimeBetween('-1 month', 'now'),
        ];
    }

    public function first(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_first' => true,
        ]);
    }

    public function comment(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_comment' => true,
        ]);
    }

    protected function markdownToSimpleHtml(string $markdown): string
    {
        $html = htmlspecialchars($markdown, ENT_QUOTES, 'UTF-8');
        $html = preg_replace('/\*\*(.*?)\*\*/', '<strong>$1</strong>', $html);
        $html = preg_replace('/\*(.*?)\*/', '<em>$1</em>', $html);
        $html = preg_replace('/\n/', '<br>', $html);
        return $html;
    }
}
