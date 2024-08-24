<?php

namespace Database\Seeders;

use App\Models\Domain;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DomainSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Domain::query()->create([
          'domain' => 'Websites, IT & Software'
        ]);
        Domain::query()->create([
          'domain' => 'Accounting'
        ]);
        Domain::query()->create([
          'domain' => 'Writing & Content'
        ]);
        Domain::query()->create([
          'domain' => 'Design, Media & Architecture'
        ]);
        Domain::query()->create([
          'domain' => 'Data Entry & Admain'
        ]);
        Domain::query()->create([
          'domain' => 'Engineering & Science'
        ]);
        Domain::query()->create([
          'domain' => 'Sales & Marketing'
        ]);
        Domain::query()->create([
          'domain' => 'Buisness, Accounting, Human Resources & Legal'
        ]);
        Domain::query()->create([
          'domain' => 'Product Sourcing & Manufacturing'
        ]);
        Domain::query()->create([
          'domain' => 'Mobile Phones & Computing'
        ]);
        Domain::query()->create([
          'domain' => 'Translation & Languages'
        ]);
        Domain::query()->create([
          'domain' => 'Trades & Services'
        ]);
        Domain::query()->create([
          'domain' => 'Freight, Shipping & Transportation'
        ]);
        Domain::query()->create([
          'domain' => 'Telecommunications'
        ]);
        Domain::query()->create([
          'domain' => 'Education'
        ]);
        Domain::query()->create([
          'domain' => 'Health & Medicine'
        ]);
        Domain::query()->create([
          'domain' => 'Artificial Intelligence'
        ]);
        Domain::query()->create([
          'domain' => 'Driving'
        ]);
        Domain::query()->create([
          'domain' => 'Jobs for Anyone'
        ]);
    }
}