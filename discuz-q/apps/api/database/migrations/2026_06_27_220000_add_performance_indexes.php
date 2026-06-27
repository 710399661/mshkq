<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('threads', function (Blueprint $table) {
            $table->index(['is_approved', 'category_id', 'created_at'], 'threads_approved_category_created_at_index');
            $table->index(['is_approved', 'user_id', 'created_at'], 'threads_approved_user_created_at_index');
            $table->index(['is_sticky', 'is_approved', 'created_at'], 'threads_sticky_approved_created_at_index');
            $table->index(['is_essence', 'is_approved', 'created_at'], 'threads_essence_approved_created_at_index');
            $table->index(['view_count', 'created_at'], 'threads_view_count_created_at_index');
            $table->index(['post_count', 'created_at'], 'threads_post_count_created_at_index');
            $table->index(['like_count', 'created_at'], 'threads_like_count_created_at_index');
        });

        Schema::table('posts', function (Blueprint $table) {
            $table->index(['thread_id', 'is_approved', 'created_at'], 'posts_thread_approved_created_at_index');
            $table->index(['thread_id', 'parent_id', 'is_approved', 'created_at'], 'posts_thread_parent_approved_index');
            $table->index(['user_id', 'is_approved', 'created_at'], 'posts_user_approved_created_at_index');
        });

        Schema::table('users', function (Blueprint $table) {
            if (!Schema::hasColumn('users', 'status')) {
                return;
            }
            $table->index('status', 'users_status_index');
            $table->index('username', 'users_username_index');
            $table->index('mobile', 'users_mobile_index');
            $table->index('created_at', 'users_created_at_index');
        });

        Schema::table('thread_tag', function (Blueprint $table) {
            $table->index(['tag_id', 'thread_id'], 'thread_tag_tag_thread_index');
        });

        Schema::table('user_follows', function (Blueprint $table) {
            $table->index(['follower_id', 'following_id'], 'user_follows_follower_following_index');
            $table->index(['following_id', 'follower_id'], 'user_follows_following_follower_index');
        });

        Schema::table('categories', function (Blueprint $table) {
            $table->index(['is_enabled', 'parent_id', 'sort'], 'categories_enabled_parent_sort_index');
        });

        Schema::table('tags', function (Blueprint $table) {
            $table->index(['thread_count', 'sort'], 'tags_thread_count_sort_index');
        });

        Schema::table('thread_likes', function (Blueprint $table) {
            $table->index(['thread_id', 'user_id'], 'thread_likes_thread_user_index');
            $table->index(['user_id', 'thread_id'], 'thread_likes_user_thread_index');
        });

        Schema::table('thread_collects', function (Blueprint $table) {
            $table->index(['thread_id', 'user_id'], 'thread_collects_thread_user_index');
            $table->index(['user_id', 'thread_id'], 'thread_collects_user_thread_index');
        });

        Schema::table('post_likes', function (Blueprint $table) {
            $table->index(['post_id', 'user_id'], 'post_likes_post_user_index');
            $table->index(['user_id', 'post_id'], 'post_likes_user_post_index');
        });
    }

    public function down(): void
    {
        Schema::table('threads', function (Blueprint $table) {
            $table->dropIndex('threads_approved_category_created_at_index');
            $table->dropIndex('threads_approved_user_created_at_index');
            $table->dropIndex('threads_sticky_approved_created_at_index');
            $table->dropIndex('threads_essence_approved_created_at_index');
            $table->dropIndex('threads_view_count_created_at_index');
            $table->dropIndex('threads_post_count_created_at_index');
            $table->dropIndex('threads_like_count_created_at_index');
        });

        Schema::table('posts', function (Blueprint $table) {
            $table->dropIndex('posts_thread_approved_created_at_index');
            $table->dropIndex('posts_thread_parent_approved_index');
            $table->dropIndex('posts_user_approved_created_at_index');
        });

        Schema::table('users', function (Blueprint $table) {
            if (Schema::hasIndex('users', 'users_status_index')) {
                $table->dropIndex('users_status_index');
            }
            if (Schema::hasIndex('users', 'users_username_index')) {
                $table->dropIndex('users_username_index');
            }
            if (Schema::hasIndex('users', 'users_mobile_index')) {
                $table->dropIndex('users_mobile_index');
            }
            if (Schema::hasIndex('users', 'users_created_at_index')) {
                $table->dropIndex('users_created_at_index');
            }
        });

        Schema::table('thread_tag', function (Blueprint $table) {
            $table->dropIndex('thread_tag_tag_thread_index');
        });

        Schema::table('user_follows', function (Blueprint $table) {
            $table->dropIndex('user_follows_follower_following_index');
            $table->dropIndex('user_follows_following_follower_index');
        });

        Schema::table('categories', function (Blueprint $table) {
            $table->dropIndex('categories_enabled_parent_sort_index');
        });

        Schema::table('tags', function (Blueprint $table) {
            $table->dropIndex('tags_thread_count_sort_index');
        });

        Schema::table('thread_likes', function (Blueprint $table) {
            $table->dropIndex('thread_likes_thread_user_index');
            $table->dropIndex('thread_likes_user_thread_index');
        });

        Schema::table('thread_collects', function (Blueprint $table) {
            $table->dropIndex('thread_collects_thread_user_index');
            $table->dropIndex('thread_collects_user_thread_index');
        });

        Schema::table('post_likes', function (Blueprint $table) {
            $table->dropIndex('post_likes_post_user_index');
            $table->dropIndex('post_likes_user_post_index');
        });
    }
};
