<?php

namespace Tests\Feature\Api;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthTest extends TestCase
{
    use RefreshDatabase;

    public function test_register_success(): void
    {
        $response = $this->postJson('/api/v1/auth/register', [
            'username' => 'testuser',
            'email' => 'test@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ]);

        $response->assertStatus(200)
            ->assertJsonStructure([
                'code',
                'message',
                'data' => [
                    'user' => [
                        'id',
                        'username',
                        'name',
                        'email',
                    ],
                    'token',
                ],
            ])
            ->assertJson([
                'code' => 0,
                'message' => '注册成功',
            ]);

        $this->assertDatabaseHas('users', [
            'username' => 'testuser',
            'email' => 'test@example.com',
        ]);
    }

    public function test_register_validation_error(): void
    {
        $response = $this->postJson('/api/v1/auth/register', [
            'username' => '',
            'password' => 'short',
            'password_confirmation' => 'nomatch',
        ]);

        $response->assertStatus(422);
    }

    public function test_login_success_with_username(): void
    {
        $user = User::factory()->create([
            'username' => 'testuser',
            'password' => bcrypt('password123'),
        ]);

        $response = $this->postJson('/api/v1/auth/login', [
            'account' => 'testuser',
            'password' => 'password123',
        ]);

        $response->assertStatus(200)
            ->assertJsonStructure([
                'code',
                'message',
                'data' => [
                    'user' => [
                        'id',
                        'username',
                        'name',
                        'email',
                    ],
                    'token',
                ],
            ])
            ->assertJson([
                'code' => 0,
                'message' => '登录成功',
            ]);
    }

    public function test_login_success_with_email(): void
    {
        $user = User::factory()->create([
            'email' => 'test@example.com',
            'password' => bcrypt('password123'),
        ]);

        $response = $this->postJson('/api/v1/auth/login', [
            'account' => 'test@example.com',
            'password' => 'password123',
        ]);

        $response->assertStatus(200)
            ->assertJson([
                'code' => 0,
                'message' => '登录成功',
            ]);
    }

    public function test_login_failed_with_wrong_password(): void
    {
        $user = User::factory()->create([
            'username' => 'testuser',
            'password' => bcrypt('password123'),
        ]);

        $response = $this->postJson('/api/v1/auth/login', [
            'account' => 'testuser',
            'password' => 'wrongpassword',
        ]);

        $response->assertStatus(200)
            ->assertJson([
                'code' => 401,
                'message' => '账号或密码错误',
            ]);
    }

    public function test_logout_success(): void
    {
        $user = User::factory()->create();
        $token = $user->createToken('auth-token')->plainTextToken;

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->postJson('/api/v1/auth/logout');

        $response->assertStatus(200)
            ->assertJson([
                'code' => 0,
                'message' => '退出成功',
            ]);
    }

    public function test_logout_without_token(): void
    {
        $response = $this->postJson('/api/v1/auth/logout');

        $response->assertStatus(401);
    }

    public function test_get_current_user(): void
    {
        $user = User::factory()->create();
        $token = $user->createToken('auth-token')->plainTextToken;

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->getJson('/api/v1/auth/me');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'code',
                'data' => [
                    'id',
                    'username',
                    'name',
                    'email',
                ],
            ])
            ->assertJson([
                'code' => 0,
            ]);

        $this->assertEquals($user->id, $response->json('data.id'));
        $this->assertEquals($user->username, $response->json('data.username'));
    }

    public function test_get_current_user_without_token(): void
    {
        $response = $this->getJson('/api/v1/auth/me');

        $response->assertStatus(401);
    }
}
