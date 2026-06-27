<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('threads', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->nullable()->index();
            $table->unsignedBigInteger('category_id')->nullable()->index();
            $table->unsignedBigInteger('last_posted_user_id')->nullable();
            $table->tinyInteger('type')->default(0);
            $table->string('title', 255)->default('');
            $table->string('summary', 500)->default('');
            $table->decimal('price', 10, 2)->default(0);
            $table->string('cover_image', 255)->default('');
            $table->json('images')->nullable();
            $table->unsignedInteger('post_count')->default(0);
            $table->unsignedInteger('view_count')->default(0);
            $table->unsignedInteger('like_count')->default(0);
            $table->unsignedInteger('share_count')->default(0);
            $table->unsignedInteger('collect_count')->default(0);
            $table->boolean('is_approved')->default(true);
            $table->boolean('is_sticky')->default(false);
            $table->boolean('is_essence')->default(false);
            $table->boolean('is_locked')->default(false);
            $table->timestamp('last_posted_at')->nullable();
            $table->timestamps();
            $table->softDeletes();
            $table->unsignedBigInteger('deleted_user_id')->nullable();

            $table->index('last_posted_user_id');
            $table->index('is_approved');
            $table->index('is_sticky');
            $table->index('is_essence');
            $table->index('created_at');
            $table->index('last_posted_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('threads');
    }
};
