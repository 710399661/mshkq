<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tags', function (Blueprint $table) {
            $table->id();
            $table->string('name', 50)->unique();
            $table->string('slug', 50)->unique();
            $table->string('description', 255)->default('');
            $table->string('icon', 255)->default('');
            $table->unsignedInteger('thread_count')->default(0);
            $table->unsignedSmallInteger('sort')->default(0);
            $table->timestamps();

            $table->index('sort');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tags');
    }
};
