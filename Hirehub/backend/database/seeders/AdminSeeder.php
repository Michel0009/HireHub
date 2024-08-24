<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Wallet;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::query()->create([
          'username' => 'admin',
          'email' => 'admin@gmail.com',
          'password' => '12345',
          'user_type' => 3,
          'reporting_state' => false,
          'verification_code' => '000000'
        ]);

        Wallet::query()->create([
          'user_id' => 1,
          'account_number' => 1234567890
        ]);
    }
}
