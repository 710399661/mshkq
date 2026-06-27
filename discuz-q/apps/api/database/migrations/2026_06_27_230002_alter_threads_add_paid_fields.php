<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('threads', function (Blueprint $table) {
            $table->boolean('is_paid')->default(false)->after('is_locked');
            $table->unsignedInteger('free_words')->default(0)->after('is_paid');
        });
    }

    public function down(): void
    {
        Schema::table('threads', function (Blueprint $table) {
            $table->dropColumn('is_paid');
            $table->dropColumn('free_words');
        });
    }
};
