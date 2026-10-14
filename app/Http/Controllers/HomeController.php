<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Product;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function home()
    {
        $products = Product::where('type', 'product')->limit(6)->orderByDesc('created_at')->get();
        $tools = Product::where('type', 'tool')->limit(6)->orderByDesc('created_at')->get();
        $courses = Course::limit(6)->orderByDesc('created_at')->get();

        return view('home', compact('products', 'tools', 'courses'));
    }

    public function products()
    {
        return view('products');
    }

    public function courses()
    {
        return view('courses');
    }
}
