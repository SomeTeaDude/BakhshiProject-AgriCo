<?php

namespace Database\Seeders;

use App\Models\ProductCategory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ProductCategory::create([
            'category' => 'بذر'
        ]);
        ProductCategory::create([
            'category' => 'کود'
        ]);
        ProductCategory::create([
            'category' => 'سم'
        ]);
        ProductCategory::create([
            'category' => 'نهال میوه'
        ]);
        ProductCategory::create([
            'category' => 'ادوات کشاورزی'
        ]);
    }
}
