<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('username', 100)->unique()->after('name');
            $table->string('mobile', 20)->default('')->after('username');
            $table->timestamp('mobile_verified_at')->nullable()->after('mobile');
            $table->string('avatar', 255)->default('')->after('mobile_verified_at');
            $table->text('bio')->nullable()->after('avatar');
            $table->string('signature', 255)->default('')->after('bio');
            $table->tinyInteger('gender')->default(0)->after('signature');
            $table->date('birthday')->nullable()->after('gender');
            $table->string('location', 255)->default('')->after('birthday');
            $table->string('website', 255)->default('')->after('location');
            $table->unsignedInteger('thread_count')->default(0)->after('website');
            $table->unsignedInteger('post_count')->default(0)->after('thread_count');
            $table->unsignedInteger('follow_count')->default(0)->after('post_count');
            $table->unsignedInteger('fans_count')->default(0)->after('follow_count');
            $table->unsignedInteger('like_count')->default(0)->after('fans_count');
            $table->string('last_login_ip', 45)->default('')->after('like_count');
            $table->timestamp('last_login_at')->nullable()->after('last_login_ip');
            $table->string('register_ip', 45)->default('')->after('last_login_at');
            $table->tinyInteger('status')->default(0)->after('register_ip');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'username',
                'mobile',
                'mobile_verified_at',
                'avatar',
                'bio',
                'signature',
                'gender',
                'birthday',
                'location',
                'website',
                'thread_count',
                'post_count',
                'follow_count',
                'fans_count',
                'like_count',
                'last_login_ip',
                'last_login_at',
                'register_ip',
                'status',
            ]);
        });
    }
};
