<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class TagFactory extends Factory
{
    public function definition(): array
    {
        $name = fake()->unique()->word();

        return [
            'name' => $name,
            'slug' => Str::slug($name),
            'description' => fake()->text(50),
            'icon' => '',
            'thread_count' => rand(0, 50),
            'sort' => fake()->numberBetween(0, 100),
        ];
    }
}
