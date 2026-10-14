<?php

namespace Database\Seeders;

use App\Models\Course;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CourseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Course::create([
            'name' => "دوره آبیاری درختان سیاه ریشه",
            'price' => 150000,
            'category' => 'آبیاری',
            'description' => 'آموزش تخصصی روش‌های آبیاری درختان خاص',
            'details' => json_encode([
                'مدرس' => "دکتر محمد حسینی",
                "سطح دوره" => "متوسط",
            ])
        ]);
        Course::create([
            'name' => "دوره کشاورزی هوشمند با IoT",
            'price' => 220000,
            'category' => 'تکنولوژی',
            'description' => 'استفاده از تکنولوژی برای کشاورزی مدرن',
            'details' => json_encode([
                'مدرس' => "مهندس علی بخشی",
                "سطح دوره" => "پیشرفته",
            ])
        ]);
        Course::create([
            'name' => "دوره سیستم آبیاری نوین",
            'price' => 180000,
            'category' => 'آبیاری',
            'description' => 'آموزش روش‌های پیشرفته آبیاری و صرفه‌جویی',
            'details' => json_encode([
                'مدرس' => "دکتر فاطمه محمدی",
                "سطح دوره" => "مقدماتی تا متوسط",
            ])
        ]);
        Course::create([
            'name' => "دوره کشت هیدروپونیک",
            'price' => 250000,
            'category' => 'کشت',
            'description' => 'آموزش کشت بدون خاک برای محصولات سالم',
            'details' => json_encode([
                'مدرس' => "مهندس سارا کریمی",
                "سطح دوره" => "پیشرفته",
            ])
        ]);
    }
}
