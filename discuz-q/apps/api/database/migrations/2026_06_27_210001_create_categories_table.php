<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100);
            $table->string('slug', 100)->unique();
            $table->text('description')->nullable();
            $table->string('icon', 255)->default('');
            $table->unsignedSmallInteger('sort')->default(0);
            $table->unsignedBigInteger('parent_id')->nullable();
            $table->unsignedTinyInteger('depth')->default(0);
            $table->unsignedInteger('thread_count')->default(0);
            $table->boolean('is_enabled')->default(true);
            $table->boolean('is_home')->default(false);
            $table->timestamps();
            $table->softDeletes();

            $table->index('parent_id');
            $table->index('sort');
            $table->index('is_enabled');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('categories');
    }
};
