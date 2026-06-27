<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Database\Eloquent\Relations\HasMany;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasApiTokens, HasFactory, Notifiable, HasRoles;

    protected $fillable = [
        'name',
        'email',
        'password',
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
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'mobile_verified_at' => 'datetime',
            'password' => 'hashed',
            'gender' => 'integer',
            'birthday' => 'date',
            'thread_count' => 'integer',
            'post_count' => 'integer',
            'follow_count' => 'integer',
            'fans_count' => 'integer',
            'like_count' => 'integer',
            'last_login_at' => 'datetime',
            'status' => 'integer',
        ];
    }

    public function threads(): HasMany
    {
        return $this->hasMany(Thread::class);
    }

    public function posts(): HasMany
    {
        return $this->hasMany(Post::class);
    }

    public function following(): HasMany
    {
        return $this->hasMany(UserFollow::class, 'follower_id');
    }

    public function followers(): HasMany
    {
        return $this->hasMany(UserFollow::class, 'following_id');
    }

    public function threadLikes(): HasMany
    {
        return $this->hasMany(ThreadLike::class);
    }

    public function threadCollects(): HasMany
    {
        return $this->hasMany(ThreadCollect::class);
    }

    public function postLikes(): HasMany
    {
        return $this->hasMany(PostLike::class);
    }

    public function wallet()
    {
        return $this->hasOne(\App\Models\Wallet::class);
    }

    public function threadPurchases(): HasMany
    {
        return $this->hasMany(\App\Models\ThreadPurchase::class);
    }
}
