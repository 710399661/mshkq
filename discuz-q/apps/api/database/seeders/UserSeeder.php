<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        Role::firstOrCreate(['name' => 'super_admin', 'guard_name' => 'web']);
        Role::firstOrCreate(['name' => 'admin', 'guard_name' => 'web']);
        Role::firstOrCreate(['name' => 'moderator', 'guard_name' => 'web']);
        Role::firstOrCreate(['name' => 'member', 'guard_name' => 'web']);

        User::factory(20)->create()->each(function (User $user) {
            $user->assignRole('member');
        });

        $admin = User::factory()->create([
            'username' => 'admin',
            'name' => '管理员',
            'email' => 'admin@example.com',
            'status' => 0,
        ]);

        $admin->assignRole('super_admin');
    }
}
