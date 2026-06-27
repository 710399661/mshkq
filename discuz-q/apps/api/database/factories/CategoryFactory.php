<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class CategoryFactory extends Factory
{
    public function definition(): array
    {
        $name = fake()->unique()->word();

        return [
            'name' => $name,
            'slug' => Str::slug($name),
            'description' => fake()->text(100),
            'icon' => '',
            'sort' => fake()->numberBetween(0, 100),
            'parent_id' => null,
            'depth' => 0,
            'thread_count' => rand(0, 100),
            'is_enabled' => true,
            'is_home' => fake()->boolean(20),
        ];
    }

    public function home(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_home' => true,
        ]);
    }
}
