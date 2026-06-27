<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

class ThreadFactory extends Factory
{
    public function definition(): array
    {
        $title = fake()->sentence(rand(5, 10));
        $content = fake()->paragraphs(rand(3, 8), true);
        $summary = mb_substr(strip_tags($content), 0, 200);

        return [
            'user_id' => User::inRandomOrder()->value('id') ?? User::factory(),
            'category_id' => Category::inRandomOrder()->value('id') ?? Category::factory(),
            'last_posted_user_id' => User::inRandomOrder()->value('id') ?? User::factory(),
            'type' => rand(0, 2),
            'title' => $title,
            'summary' => $summary,
            'price' => 0,
            'cover_image' => '',
            'images' => null,
            'post_count' => rand(1, 20),
            'view_count' => rand(10, 5000),
            'like_count' => rand(0, 200),
            'share_count' => rand(0, 50),
            'collect_count' => rand(0, 100),
            'is_approved' => true,
            'is_sticky' => fake()->boolean(10),
            'is_essence' => fake()->boolean(15),
            'is_locked' => fake()->boolean(5),
            'last_posted_at' => fake()->dateTimeBetween('-1 month', 'now'),
            'created_at' => fake()->dateTimeBetween('-6 months', 'now'),
            'updated_at' => fake()->dateTimeBetween('-1 month', 'now'),
        ];
    }

    public function sticky(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_sticky' => true,
        ]);
    }

    public function essence(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_essence' => true,
        ]);
    }
}
