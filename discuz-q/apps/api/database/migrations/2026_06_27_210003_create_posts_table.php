<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('thread_id')->index();
            $table->unsignedBigInteger('user_id')->nullable()->index();
            $table->unsignedBigInteger('parent_id')->nullable()->index();
            $table->unsignedBigInteger('reply_post_id')->nullable();
            $table->unsignedBigInteger('reply_user_id')->nullable();
            $table->text('content');
            $table->text('content_html')->nullable();
            $table->string('ip', 45)->default('');
            $table->unsignedInteger('reply_count')->default(0);
            $table->unsignedInteger('like_count')->default(0);
            $table->boolean('is_first')->default(false);
            $table->boolean('is_comment')->default(false);
            $table->boolean('is_approved')->default(true);
            $table->timestamps();
            $table->softDeletes();
            $table->unsignedBigInteger('deleted_user_id')->nullable();

            $table->index('reply_post_id');
            $table->index('reply_user_id');
            $table->index('is_first');
            $table->index('is_comment');
            $table->index('is_approved');
            $table->index('created_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
