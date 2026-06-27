<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserFactory extends Factory
{
    protected static ?string $password;

    public function definition(): array
    {
        $username = fake()->unique()->userName();

        return [
            'username' => $username,
            'name' => fake()->name(),
            'email' => $username . '@example.com',
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
            'mobile' => fake()->phoneNumber(),
            'mobile_verified_at' => fake()->dateTime(),
            'avatar' => '',
            'bio' => fake()->text(100),
            'signature' => fake()->text(50),
            'gender' => fake()->randomElement([0, 1, 2]),
            'birthday' => fake()->date(),
            'location' => fake()->city(),
            'website' => fake()->url(),
            'thread_count' => rand(0, 50),
            'post_count' => rand(0, 200),
            'follow_count' => rand(0, 100),
            'fans_count' => rand(0, 100),
            'like_count' => rand(0, 500),
            'last_login_ip' => fake()->ipv4(),
            'last_login_at' => fake()->dateTime(),
            'register_ip' => fake()->ipv4(),
            'status' => 0,
        ];
    }

    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
