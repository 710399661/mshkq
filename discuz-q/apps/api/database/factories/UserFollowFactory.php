<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class UserFollowFactory extends Factory
{
    public function definition(): array
    {
        $follower = User::inRandomOrder()->first() ?? User::factory()->create();
        $following = User::where('id', '!=', $follower->id)->inRandomOrder()->first() ?? User::factory()->create();

        return [
            'follower_id' => $follower->id,
            'following_id' => $following->id,
            'is_mutual' => fake()->boolean(30),
            'created_at' => fake()->dateTimeBetween('-6 months', 'now'),
            'updated_at' => fake()->dateTimeBetween('-1 month', 'now'),
        ];
    }

    public function mutual(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_mutual' => true,
        ]);
    }
}
