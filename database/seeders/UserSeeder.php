<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'f_name' => 'ادمین',
            'l_name' => 'کاربر',
            'phone' => '09123456789',
            'role' => 'admin'
        ]);
        User::create([
            'f_name' => 'پشتیبان',
            'l_name' => 'کاربر',
            'phone' => '09123456788',
            'role' => 'support'
        ]);
    }
}
