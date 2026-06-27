<?php

namespace Tests\Feature\Api;

use App\Models\Category;
use App\Models\Thread;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ThreadTest extends TestCase
{
    use RefreshDatabase;

    public function test_get_thread_list(): void
    {
        $category = Category::factory()->create();
        $user = User::factory()->create();
        Thread::factory()->count(15)->create([
            'category_id' => $category->id,
            'user_id' => $user->id,
        ]);

        $response = $this->getJson('/api/v1/threads');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'code',
                'data' => [
                    'data' => [
                        '*' => [
                            'id',
                            'title',
                            'summary',
                        ],
                    ],
                    'meta' => [
                        'current_page',
                        'per_page',
                        'total',
                        'last_page',
                    ],
                ],
            ])
            ->assertJson([
                'code' => 0,
            ]);

        $this->assertEquals(15, $response->json('data.meta.total'));
        $this->assertEquals(20, $response->json('data.meta.per_page'));
    }

    public function test_get_thread_list_with_pagination(): void
    {
        $category = Category::factory()->create();
        $user = User::factory()->create();
        Thread::factory()->count(25)->create([
            'category_id' => $category->id,
            'user_id' => $user->id,
        ]);

        $response = $this->getJson('/api/v1/threads?page=2&per_page=10');

        $response->assertStatus(200)
            ->assertJson([
                'code' => 0,
            ]);

        $this->assertEquals(2, $response->json('data.meta.current_page'));
        $this->assertEquals(10, $response->json('data.meta.per_page'));
        $this->assertEquals(25, $response->json('data.meta.total'));
        $this->assertEquals(3, $response->json('data.meta.last_page'));
        $this->assertCount(10, $response->json('data.data'));
    }

    public function test_get_thread_detail(): void
    {
        $category = Category::factory()->create();
        $user = User::factory()->create();
        $thread = Thread::factory()->create([
            'category_id' => $category->id,
            'user_id' => $user->id,
        ]);

        $response = $this->getJson('/api/v1/threads/' . $thread->id);

        $response->assertStatus(200)
            ->assertJsonStructure([
                'code',
                'data' => [
                    'id',
                    'title',
                    'summary',
                    'user',
                    'category',
                ],
            ])
            ->assertJson([
                'code' => 0,
                'data' => [
                    'id' => $thread->id,
                    'title' => $thread->title,
                ],
            ]);
    }

    public function test_get_thread_detail_not_found(): void
    {
        $response = $this->getJson('/api/v1/threads/999999');

        $response->assertStatus(404)
            ->assertJson([
                'message' => '帖子不存在',
            ]);
    }

    public function test_create_thread_success(): void
    {
        $user = User::factory()->create();
        $category = Category::factory()->create();
        $token = $user->createToken('auth-token')->plainTextToken;

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->postJson('/api/v1/threads', [
            'category_id' => $category->id,
            'title' => 'Test Thread Title',
            'content' => 'This is the content of the test thread.',
            'type' => 0,
        ]);

        $response->assertStatus(200)
            ->assertJsonStructure([
                'code',
                'message',
                'data' => [
                    'id',
                    'title',
                    'user',
                ],
            ])
            ->assertJson([
                'code' => 0,
                'message' => '发帖成功',
                'data' => [
                    'title' => 'Test Thread Title',
                ],
            ]);

        $this->assertDatabaseHas('threads', [
            'title' => 'Test Thread Title',
            'user_id' => $user->id,
            'category_id' => $category->id,
            'is_approved' => true,
        ]);
    }

    public function test_create_thread_without_auth(): void
    {
        $category = Category::factory()->create();

        $response = $this->postJson('/api/v1/threads', [
            'category_id' => $category->id,
            'title' => 'Test Thread Title',
            'content' => 'This is the content of the test thread.',
        ]);

        $response->assertStatus(401);
    }

    public function test_create_thread_validation_error(): void
    {
        $user = User::factory()->create();
        $token = $user->createToken('auth-token')->plainTextToken;

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->postJson('/api/v1/threads', [
            'title' => '',
            'content' => '',
        ]);

        $response->assertStatus(422);
    }

    public function test_update_thread_success(): void
    {
        $user = User::factory()->create();
        $category = Category::factory()->create();
        $thread = Thread::factory()->create([
            'user_id' => $user->id,
            'category_id' => $category->id,
        ]);
        $token = $user->createToken('auth-token')->plainTextToken;

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->putJson('/api/v1/threads/' . $thread->id, [
            'title' => 'Updated Thread Title',
            'content' => 'Updated content of the test thread.',
        ]);

        $response->assertStatus(200)
            ->assertJson([
                'code' => 0,
                'message' => '帖子更新成功',
                'data' => [
                    'id' => $thread->id,
                    'title' => 'Updated Thread Title',
                ],
            ]);

        $this->assertDatabaseHas('threads', [
            'id' => $thread->id,
            'title' => 'Updated Thread Title',
        ]);
    }

    public function test_update_thread_without_permission(): void
    {
        $user1 = User::factory()->create();
        $user2 = User::factory()->create();
        $category = Category::factory()->create();
        $thread = Thread::factory()->create([
            'user_id' => $user1->id,
            'category_id' => $category->id,
        ]);
        $token = $user2->createToken('auth-token')->plainTextToken;

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->putJson('/api/v1/threads/' . $thread->id, [
            'title' => 'Updated Title',
            'content' => 'Updated content.',
        ]);

        $response->assertStatus(403)
            ->assertJson([
                'message' => '没有权限编辑此帖子',
            ]);
    }

    public function test_update_thread_not_found(): void
    {
        $user = User::factory()->create();
        $token = $user->createToken('auth-token')->plainTextToken;

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->putJson('/api/v1/threads/999999', [
            'title' => 'Updated Title',
            'content' => 'Updated content.',
        ]);

        $response->assertStatus(404)
            ->assertJson([
                'message' => '帖子不存在',
            ]);
    }

    public function test_delete_thread_success(): void
    {
        $user = User::factory()->create();
        $category = Category::factory()->create();
        $thread = Thread::factory()->create([
            'user_id' => $user->id,
            'category_id' => $category->id,
        ]);
        $token = $user->createToken('auth-token')->plainTextToken;

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->deleteJson('/api/v1/threads/' . $thread->id);

        $response->assertStatus(200)
            ->assertJson([
                'code' => 0,
                'message' => '帖子删除成功',
            ]);

        $this->assertSoftDeleted('threads', [
            'id' => $thread->id,
            'deleted_user_id' => $user->id,
        ]);
    }

    public function test_delete_thread_without_permission(): void
    {
        $user1 = User::factory()->create();
        $user2 = User::factory()->create();
        $category = Category::factory()->create();
        $thread = Thread::factory()->create([
            'user_id' => $user1->id,
            'category_id' => $category->id,
        ]);
        $token = $user2->createToken('auth-token')->plainTextToken;

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->deleteJson('/api/v1/threads/' . $thread->id);

        $response->assertStatus(403)
            ->assertJson([
                'message' => '没有权限删除此帖子',
            ]);
    }

    public function test_delete_thread_not_found(): void
    {
        $user = User::factory()->create();
        $token = $user->createToken('auth-token')->plainTextToken;

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->deleteJson('/api/v1/threads/999999');

        $response->assertStatus(404)
            ->assertJson([
                'message' => '帖子不存在',
            ]);
    }
}
