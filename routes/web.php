<?php

use App\Http\Controllers\{AdminController,
    CourseController,
    FileController,
    HomeController,
    AuthController,
    DashboardController,
    PaymentController};
use Illuminate\Support\Facades\Route;


Route::controller(HomeController::class)->group(function () {
    Route::get('/', 'home')->name('home');
    Route::get('products', 'products')->name('products');
    Route::get('courses', 'courses')->name('courses');
});

Route::controller(AuthController::class)->group(function () {
    Route::middleware('auth')->group(function () {
        Route::get('register', 'registerPage')->name('register');
        Route::patch('register', 'register')->name('register');
        Route::post('logout', 'logout')->name('logout');
    });
    Route::get('login', 'loginPage')->middleware('guest')->name('login');
});
Route::middleware(['auth', 'register'])->prefix('dashboard')->name('dashboard')->controller(DashboardController::class)->group(function () {
    Route::get('/', 'dashboard');
    Route::middleware('only:user')->group(function () {
        Route::get('cart', 'cart')->name('.cart');
        Route::get('courses', 'courses')->name('.courses');
        Route::get('orders', 'orders')->name('.orders');
        Route::get('payments', 'payments')->name('.payments');
        Route::get('tickets', 'tickets')->name('.tickets');
        Route::get('profile', 'profile')->name('.profile');
    });
});
Route::middleware(['auth', 'register'])->prefix('admin')->name('admin')->controller(AdminController::class)->group(function () {
    Route::middleware('only:admin')->group(function () {
        Route::get('courses', 'courses')->name('.courses');
        Route::get('products', 'products')->name('.products');
        Route::get('users', 'users')->name('.users');
    });
    Route::middleware('only:admin,support')->group(function () {
        Route::get('dashboard', 'dashboard')->name('.dashboard');
        Route::get('orders', 'orders')->name('.orders');
        Route::get('payments', 'payments')->name('.payments');
        Route::get('tickets', 'tickets')->name('.tickets');
    });
});

Route::controller(PaymentController::class)->middleware(['auth', 'only:user'])->prefix('payment')->name('payment.')->group(function () {
    Route::prefix('request')->name('request.')->group(function () {
        Route::post('cart', 'requestCart')->name('cart');
        Route::post('course/{course}', 'requestCourse')->name('course');
    });
    Route::prefix('verify')->name('verify.')->group(function () {
        Route::get('cart', 'verifyCart')->name('cart');
        Route::get('course', 'verifyCourse')->name('course');
    });
});

Route::controller(CourseController::class)->group(function () {
    Route::get('/videos/{courseEpisode}', 'video')
        ->middleware(['auth', 'signed'])
        ->name('courses.videos.stream');
    Route::get('/pdfs/{courseEpisode}', 'pdf')
        ->middleware(['auth', 'signed'])
        ->name('courses.pdfs.stream');
});
