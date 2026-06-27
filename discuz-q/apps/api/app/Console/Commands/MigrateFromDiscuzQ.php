<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class MigrateFromDiscuzQ extends Command
{
    protected $signature = 'migrate:from-discuz-q
                            {--dry-run : 只统计不写入数据}
                            {--limit= : 每表迁移前N条，便于测试}';

    protected $description = '从旧的 Discuz! Q 数据库迁移数据到新数据库';

    protected $oldPrefix = '';

    protected $stats = [];

    protected $chunkSize = 1000;

    public function handle()
    {
        $dryRun = $this->option('dry-run');
        $limit = $this->option('limit');

        $this->info('========================================');
        $this->info('  Discuz! Q 数据迁移工具');
        $this->info('========================================');

        if ($dryRun) {
            $this->warn('⚠  试运行模式 - 不会写入任何数据');
        }

        if ($limit) {
            $this->warn("⚠  限制模式 - 每表只迁移前 {$limit} 条");
        }

        $this->oldPrefix = env('OLD_DB_PREFIX', '');

        if (!$this->connectOldDatabase()) {
            $this->error('无法连接到旧数据库，请检查 OLD_DB_* 环境变量配置');
            return 1;
        }

        $this->info('✓ 旧数据库连接成功');
        $this->newLine();

        $this->disableForeignKeyChecks();

        try {
            $this->migrateUsers();
            $this->migrateCategories();
            $this->migrateTags();
            $this->migrateThreads();
            $this->migratePosts();
            $this->migrateUserFollows();
        } catch (\Exception $e) {
            $this->error('迁移过程中发生错误: ' . $e->getMessage());
            Log::error('迁移失败: ' . $e->getMessage() . "\n" . $e->getTraceAsString());
            $this->enableForeignKeyChecks();
            return 1;
        }

        $this->enableForeignKeyChecks();

        $this->printSummary();

        return 0;
    }

    protected function connectOldDatabase(): bool
    {
        try {
            config(['database.connections.old_db' => [
                'driver' => env('OLD_DB_CONNECTION', 'mysql'),
                'host' => env('OLD_DB_HOST', '127.0.0.1'),
                'port' => env('OLD_DB_PORT', '3306'),
                'database' => env('OLD_DB_DATABASE', ''),
                'username' => env('OLD_DB_USERNAME', 'root'),
                'password' => env('OLD_DB_PASSWORD', ''),
                'charset' => env('OLD_DB_CHARSET', 'utf8mb4'),
                'collation' => env('OLD_DB_COLLATION', 'utf8mb4_unicode_ci'),
                'prefix' => '',
                'strict' => true,
            ]]);

            DB::connection('old_db')->getPdo();
            return true;
        } catch (\Exception $e) {
            $this->error('连接错误: ' . $e->getMessage());
            return false;
        }
    }

    protected function oldTable(string $table): string
    {
        return $this->oldPrefix . $table;
    }

    protected function disableForeignKeyChecks()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0');
    }

    protected function enableForeignKeyChecks()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=1');
    }

    protected function logFailed(string $table, int $id, string $reason)
    {
        Log::warning("迁移失败 [{$table}] ID:{$id} - {$reason}");
        if (!isset($this->stats[$table]['failed'])) {
            $this->stats[$table]['failed'] = 0;
        }
        $this->stats[$table]['failed']++;
    }

    protected function migrateUsers()
    {
        $this->info('【1/6】迁移用户数据...');
        $oldTable = $this->oldTable('users');
        $dryRun = $this->option('dry-run');
        $limit = $this->option('limit');

        $total = DB::connection('old_db')->table($oldTable)->count();
        $this->info("  总记录数: {$total}");

        if ($total == 0) {
            $this->warn('  跳过 - 无数据');
            $this->stats['users'] = ['total' => 0, 'success' => 0, 'failed' => 0];
            return;
        }

        $success = 0;
        $failed = 0;
        $processed = 0;

        $query = DB::connection('old_db')->table($oldTable)->orderBy('id');

        if ($limit) {
            $query->limit($limit);
        }

        $query->chunk($this->chunkSize, function ($users) use ($dryRun, &$success, &$failed, &$processed, $total, $limit) {
            foreach ($users as $user) {
                try {
                    $mobileVerifiedAt = null;
                    if (!empty($user->mobile_confirmed)) {
                        $mobileVerifiedAt = $user->created_at ?? now();
                    }

                    $userData = [
                        'id' => $user->id,
                        'username' => $user->username,
                        'name' => $user->username,
                        'email' => $user->username . '@example.com',
                        'password' => $user->password,
                        'mobile' => $user->mobile ?? '',
                        'mobile_verified_at' => $mobileVerifiedAt,
                        'avatar' => $user->avatar ?? '',
                        'status' => $user->status ?? 0,
                        'thread_count' => $user->thread_count ?? 0,
                        'follow_count' => $user->follow_count ?? 0,
                        'fans_count' => $user->fans_count ?? 0,
                        'last_login_ip' => $user->last_login_ip ?? '',
                        'register_ip' => $user->register_ip ?? '',
                        'last_login_at' => $user->login_at ?? null,
                        'created_at' => $user->created_at,
                        'updated_at' => $user->updated_at,
                    ];

                    if (!$dryRun) {
                        DB::table('users')->upsert($userData, ['id'], array_keys($userData));
                    }

                    $success++;
                } catch (\Exception $e) {
                    $failed++;
                    $this->logFailed('users', $user->id, $e->getMessage());
                }

                $processed++;
            }

            $displayTotal = $limit ? min($total, $limit) : $total;
            $this->output->write("\r  进度: {$processed}/{$displayTotal} (" . intval($processed / $displayTotal * 100) . "%)");
        });

        $this->newLine();
        $this->info("  ✓ 成功: {$success}, 失败: {$failed}");
        $this->stats['users'] = ['total' => $total, 'success' => $success, 'failed' => $failed];
    }

    protected function migrateCategories()
    {
        $this->info('【2/6】迁移分类数据...');
        $oldTable = $this->oldTable('categories');
        $dryRun = $this->option('dry-run');
        $limit = $this->option('limit');

        if (!DB::connection('old_db')->getSchemaBuilder()->hasTable($oldTable)) {
            $this->warn('  跳过 - 旧表不存在');
            $this->stats['categories'] = ['total' => 0, 'success' => 0, 'failed' => 0];
            return;
        }

        $total = DB::connection('old_db')->table($oldTable)->count();
        $this->info("  总记录数: {$total}");

        if ($total == 0) {
            $this->warn('  跳过 - 无数据');
            $this->stats['categories'] = ['total' => 0, 'success' => 0, 'failed' => 0];
            return;
        }

        $success = 0;
        $failed = 0;
        $processed = 0;

        $query = DB::connection('old_db')->table($oldTable)->orderBy('id');

        if ($limit) {
            $query->limit($limit);
        }

        $query->chunk($this->chunkSize, function ($categories) use ($dryRun, &$success, &$failed, &$processed, $total, $limit) {
            foreach ($categories as $category) {
                try {
                    $isHome = false;
                    if (isset($category->property) && $category->property == 1) {
                        $isHome = true;
                    }

                    $categoryData = [
                        'id' => $category->id,
                        'name' => $category->name,
                        'slug' => 'cat-' . $category->id,
                        'description' => $category->description ?? '',
                        'icon' => $category->icon ?? '',
                        'sort' => $category->sort ?? 0,
                        'thread_count' => $category->thread_count ?? 0,
                        'is_home' => $isHome,
                        'created_at' => $category->created_at ?? now(),
                        'updated_at' => $category->updated_at ?? now(),
                    ];

                    if (!$dryRun) {
                        DB::table('categories')->upsert($categoryData, ['id'], array_keys($categoryData));
                    }

                    $success++;
                } catch (\Exception $e) {
                    $failed++;
                    $this->logFailed('categories', $category->id, $e->getMessage());
                }

                $processed++;
            }

            $displayTotal = $limit ? min($total, $limit) : $total;
            $this->output->write("\r  进度: {$processed}/{$displayTotal} (" . intval($processed / $displayTotal * 100) . "%)");
        });

        $this->newLine();
        $this->info("  ✓ 成功: {$success}, 失败: {$failed}");
        $this->stats['categories'] = ['total' => $total, 'success' => $success, 'failed' => $failed];
    }

    protected function migrateTags()
    {
        $this->info('【3/6】迁移标签数据...');
        $oldTable = $this->oldTable('threads');
        $dryRun = $this->option('dry-run');
        $limit = $this->option('limit');

        if (!DB::connection('old_db')->getSchemaBuilder()->hasTable($oldTable)) {
            $this->warn('  跳过 - 旧表不存在');
            $this->stats['tags'] = ['total' => 0, 'success' => 0, 'failed' => 0];
            $this->stats['thread_tag'] = ['total' => 0, 'success' => 0, 'failed' => 0];
            return;
        }

        $allTags = [];
        $threadTags = [];

        $query = DB::connection('old_db')->table($oldTable)->orderBy('id');

        if ($limit) {
            $query->limit($limit);
        }

        $totalThreads = $query->count();
        $this->info("  待扫描帖子数: {$totalThreads}");

        $processed = 0;
        $query->chunk($this->chunkSize, function ($threads) use (&$allTags, &$threadTags, &$processed, $totalThreads, $limit) {
            foreach ($threads as $thread) {
                if (!empty($thread->tag)) {
                    $tags = explode(',', $thread->tag);
                    foreach ($tags as $tag) {
                        $tag = trim($tag);
                        if (!empty($tag)) {
                            if (!isset($allTags[$tag])) {
                                $allTags[$tag] = [
                                    'name' => $tag,
                                    'slug' => Str::slug($tag),
                                    'description' => '',
                                    'icon' => '',
                                    'thread_count' => 0,
                                    'sort' => 0,
                                    'created_at' => now(),
                                    'updated_at' => now(),
                                ];
                            }
                            $allTags[$tag]['thread_count']++;
                            $threadTags[] = ['thread_id' => $thread->id, 'tag_name' => $tag];
                        }
                    }
                }
                $processed++;
            }

            $displayTotal = $limit ? min($totalThreads, $limit) : $totalThreads;
            $this->output->write("\r  扫描进度: {$processed}/{$displayTotal} (" . intval($processed / $displayTotal * 100) . "%)");
        });

        $this->newLine();
        $this->info("  发现标签数: " . count($allTags));
        $this->info("  帖子-标签关联数: " . count($threadTags));

        $success = 0;
        $failed = 0;

        if (!$dryRun && !empty($allTags)) {
            foreach (array_chunk($allTags, $this->chunkSize, true) as $tagChunk) {
                try {
                    foreach ($tagChunk as $tagName => $tagData) {
                        DB::table('tags')->upsert($tagData, ['name'], array_keys($tagData));
                        $success++;
                    }
                } catch (\Exception $e) {
                    $failed += count($tagChunk);
                    Log::warning('标签批量插入失败: ' . $e->getMessage());
                }
            }
        } else {
            $success = count($allTags);
        }

        $this->info("  ✓ 标签成功: {$success}, 失败: {$failed}");
        $this->stats['tags'] = ['total' => count($allTags), 'success' => $success, 'failed' => $failed];

        $relationSuccess = 0;
        $relationFailed = 0;

        if (!$dryRun && !empty($threadTags)) {
            $tagIdMap = DB::table('tags')->pluck('id', 'name')->toArray();

            $relations = [];
            foreach ($threadTags as $threadTag) {
                if (isset($tagIdMap[$threadTag['tag_name']])) {
                    $relations[] = [
                        'thread_id' => $threadTag['thread_id'],
                        'tag_id' => $tagIdMap[$threadTag['tag_name']],
                    ];
                }
            }

            foreach (array_chunk($relations, $this->chunkSize) as $relationChunk) {
                try {
                    DB::table('thread_tag')->insertOrIgnore($relationChunk);
                    $relationSuccess += count($relationChunk);
                } catch (\Exception $e) {
                    $relationFailed += count($relationChunk);
                    Log::warning('帖子标签关联插入失败: ' . $e->getMessage());
                }
            }
        } else {
            $relationSuccess = count($threadTags);
        }

        $this->info("  ✓ 帖子标签关联成功: {$relationSuccess}, 失败: {$relationFailed}");
        $this->stats['thread_tag'] = ['total' => count($threadTags), 'success' => $relationSuccess, 'failed' => $relationFailed];
    }

    protected function migrateThreads()
    {
        $this->info('【4/6】迁移帖子数据...');
        $oldTable = $this->oldTable('threads');
        $oldPostTable = $this->oldTable('posts');
        $dryRun = $this->option('dry-run');
        $limit = $this->option('limit');

        if (!DB::connection('old_db')->getSchemaBuilder()->hasTable($oldTable)) {
            $this->warn('  跳过 - 旧表不存在');
            $this->stats['threads'] = ['total' => 0, 'success' => 0, 'failed' => 0];
            return;
        }

        $total = DB::connection('old_db')->table($oldTable)->count();
        $this->info("  总记录数: {$total}");

        if ($total == 0) {
            $this->warn('  跳过 - 无数据');
            $this->stats['threads'] = ['total' => 0, 'success' => 0, 'failed' => 0];
            return;
        }

        $success = 0;
        $failed = 0;
        $processed = 0;

        $query = DB::connection('old_db')->table($oldTable)->orderBy('id');

        if ($limit) {
            $query->limit($limit);
        }

        $hasOldPosts = DB::connection('old_db')->getSchemaBuilder()->hasTable($oldPostTable);

        $query->chunk($this->chunkSize, function ($threads) use ($dryRun, &$success, &$failed, &$processed, $total, $limit, $oldPostTable, $hasOldPosts) {
            $threadIds = collect($threads)->pluck('id')->toArray();

            $firstPosts = [];
            if ($hasOldPosts && !empty($threadIds)) {
                $firstPosts = DB::connection('old_db')->table($oldPostTable)
                    ->whereIn('thread_id', $threadIds)
                    ->where('is_first', 1)
                    ->pluck('content', 'thread_id')
                    ->toArray();
            }

            foreach ($threads as $thread) {
                try {
                    $summary = '';
                    if (isset($firstPosts[$thread->id])) {
                        $summary = mb_substr(strip_tags($firstPosts[$thread->id]), 0, 200);
                    }

                    $threadData = [
                        'id' => $thread->id,
                        'user_id' => $thread->user_id,
                        'category_id' => $thread->category_id,
                        'last_posted_user_id' => $thread->last_posted_user_id ?? null,
                        'type' => $thread->type ?? 0,
                        'title' => $thread->title ?? '',
                        'summary' => $summary,
                        'price' => $thread->price ?? 0,
                        'post_count' => $thread->post_count ?? 0,
                        'view_count' => $thread->view_count ?? 0,
                        'is_approved' => (bool)($thread->is_approved ?? 1),
                        'is_sticky' => (bool)($thread->is_sticky ?? 0),
                        'is_essence' => (bool)($thread->is_essence ?? 0),
                        'created_at' => $thread->created_at,
                        'updated_at' => $thread->updated_at,
                        'deleted_at' => $thread->deleted_at ?? null,
                        'deleted_user_id' => $thread->deleted_user_id ?? null,
                    ];

                    if (!$dryRun) {
                        DB::table('threads')->upsert($threadData, ['id'], array_keys($threadData));
                    }

                    $success++;
                } catch (\Exception $e) {
                    $failed++;
                    $this->logFailed('threads', $thread->id, $e->getMessage());
                }

                $processed++;
            }

            $displayTotal = $limit ? min($total, $limit) : $total;
            $this->output->write("\r  进度: {$processed}/{$displayTotal} (" . intval($processed / $displayTotal * 100) . "%)");
        });

        $this->newLine();
        $this->info("  ✓ 成功: {$success}, 失败: {$failed}");
        $this->stats['threads'] = ['total' => $total, 'success' => $success, 'failed' => $failed];
    }

    protected function migratePosts()
    {
        $this->info('【5/6】迁移回复数据...');
        $oldTable = $this->oldTable('posts');
        $dryRun = $this->option('dry-run');
        $limit = $this->option('limit');

        if (!DB::connection('old_db')->getSchemaBuilder()->hasTable($oldTable)) {
            $this->warn('  跳过 - 旧表不存在');
            $this->stats['posts'] = ['total' => 0, 'success' => 0, 'failed' => 0];
            return;
        }

        $total = DB::connection('old_db')->table($oldTable)->count();
        $this->info("  总记录数: {$total}");

        if ($total == 0) {
            $this->warn('  跳过 - 无数据');
            $this->stats['posts'] = ['total' => 0, 'success' => 0, 'failed' => 0];
            return;
        }

        $success = 0;
        $failed = 0;
        $processed = 0;

        $query = DB::connection('old_db')->table($oldTable)->orderBy('id');

        if ($limit) {
            $query->limit($limit);
        }

        $query->chunk($this->chunkSize, function ($posts) use ($dryRun, &$success, &$failed, &$processed, $total, $limit) {
            foreach ($posts as $post) {
                try {
                    $contentHtml = $this->markdownToSimpleHtml($post->content ?? '');

                    $postData = [
                        'id' => $post->id,
                        'thread_id' => $post->thread_id,
                        'user_id' => $post->user_id,
                        'reply_post_id' => $post->reply_post_id ?? null,
                        'reply_user_id' => $post->reply_user_id ?? null,
                        'content' => $post->content ?? '',
                        'content_html' => $contentHtml,
                        'reply_count' => $post->reply_count ?? 0,
                        'like_count' => $post->like_count ?? 0,
                        'is_first' => (bool)($post->is_first ?? 0),
                        'is_comment' => (bool)($post->is_comment ?? 0),
                        'is_approved' => (bool)($post->is_approved ?? 1),
                        'created_at' => $post->created_at,
                        'updated_at' => $post->updated_at,
                        'deleted_at' => $post->deleted_at ?? null,
                        'deleted_user_id' => $post->deleted_user_id ?? null,
                    ];

                    if (!$dryRun) {
                        DB::table('posts')->upsert($postData, ['id'], array_keys($postData));
                    }

                    $success++;
                } catch (\Exception $e) {
                    $failed++;
                    $this->logFailed('posts', $post->id, $e->getMessage());
                }

                $processed++;
            }

            $displayTotal = $limit ? min($total, $limit) : $total;
            $this->output->write("\r  进度: {$processed}/{$displayTotal} (" . intval($processed / $displayTotal * 100) . "%)");
        });

        $this->newLine();
        $this->info("  ✓ 成功: {$success}, 失败: {$failed}");
        $this->stats['posts'] = ['total' => $total, 'success' => $success, 'failed' => $failed];
    }

    protected function migrateUserFollows()
    {
        $this->info('【6/6】迁移关注关系数据...');
        $oldTable = $this->oldTable('user_follow');
        $dryRun = $this->option('dry-run');
        $limit = $this->option('limit');

        if (!DB::connection('old_db')->getSchemaBuilder()->hasTable($oldTable)) {
            $this->warn('  跳过 - 旧表不存在');
            $this->stats['user_follows'] = ['total' => 0, 'success' => 0, 'failed' => 0];
            return;
        }

        $total = DB::connection('old_db')->table($oldTable)->count();
        $this->info("  总记录数: {$total}");

        if ($total == 0) {
            $this->warn('  跳过 - 无数据');
            $this->stats['user_follows'] = ['total' => 0, 'success' => 0, 'failed' => 0];
            return;
        }

        $success = 0;
        $failed = 0;
        $processed = 0;

        $query = DB::connection('old_db')->table($oldTable)->orderBy('id');

        if ($limit) {
            $query->limit($limit);
        }

        $query->chunk($this->chunkSize, function ($follows) use ($dryRun, &$success, &$failed, &$processed, $total, $limit) {
            $followData = [];
            foreach ($follows as $follow) {
                try {
                    $followData[] = [
                        'id' => $follow->id,
                        'follower_id' => $follow->from_user_id,
                        'following_id' => $follow->to_user_id,
                        'is_mutual' => (bool)($follow->is_mutual ?? 0),
                        'created_at' => $follow->created_at ?? now(),
                        'updated_at' => $follow->updated_at ?? now(),
                    ];
                    $success++;
                } catch (\Exception $e) {
                    $failed++;
                    $this->logFailed('user_follows', $follow->id, $e->getMessage());
                }
                $processed++;
            }

            if (!$dryRun && !empty($followData)) {
                try {
                    DB::table('user_follows')->upsert($followData, ['id'], array_keys($followData[0]));
                } catch (\Exception $e) {
                    $failed += count($followData);
                    Log::warning('关注关系批量插入失败: ' . $e->getMessage());
                }
            }

            $displayTotal = $limit ? min($total, $limit) : $total;
            $this->output->write("\r  进度: {$processed}/{$displayTotal} (" . intval($processed / $displayTotal * 100) . "%)");
        });

        $this->newLine();
        $this->info("  ✓ 成功: {$success}, 失败: {$failed}");
        $this->stats['user_follows'] = ['total' => $total, 'success' => $success, 'failed' => $failed];
    }

    protected function markdownToSimpleHtml(string $markdown): string
    {
        $html = htmlspecialchars($markdown, ENT_QUOTES, 'UTF-8');
        $html = preg_replace('/\*\*(.*?)\*\*/', '<strong>$1</strong>', $html);
        $html = preg_replace('/\*(.*?)\*/', '<em>$1</em>', $html);
        $html = preg_replace('/\n/', '<br>', $html);
        return $html;
    }

    protected function printSummary()
    {
        $this->newLine();
        $this->info('========================================');
        $this->info('  迁移完成 - 汇总统计');
        $this->info('========================================');

        $labels = [
            'users' => '用户',
            'categories' => '分类',
            'tags' => '标签',
            'thread_tag' => '帖子标签关联',
            'threads' => '帖子',
            'posts' => '回复',
            'user_follows' => '关注关系',
        ];

        $totalSuccess = 0;
        $totalFailed = 0;

        foreach ($labels as $key => $label) {
            if (isset($this->stats[$key])) {
                $stat = $this->stats[$key];
                $this->info("  {$label}: 总计 {$stat['total']}, 成功 {$stat['success']}, 失败 {$stat['failed']}");
                $totalSuccess += $stat['success'];
                $totalFailed += $stat['failed'];
            }
        }

        $this->info('----------------------------------------');
        $this->info("  总计: 成功 {$totalSuccess}, 失败 {$totalFailed}");
        $this->info('========================================');

        if ($this->option('dry-run')) {
            $this->warn('  ⚠  试运行模式 - 以上为预估数据，未实际写入');
        }
    }
}
