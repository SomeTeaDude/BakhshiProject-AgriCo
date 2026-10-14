@extends('layouts.layout')

@push('assets')
    @vite(['resources/css/home.css', 'resources/js/home.js'])
@endpush

@section('content')
    <section id="home" class="hero-section">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-8">
                    <div class="hero-content">
                        <h1 class="hero-title">محصولات کشاورزی تازه و ارگانیک</h1>
                        <p class="hero-subtitle">
                            خرید کنید و از تجربه یک مهندس کشاورزی بیاموزید
                        </p>
                        <div class="hero-buttons">
                            <a href="#products" class="btn btn-primary-custom"
                            >مشاهده محصولات</a
                            >
                            <a href="{{ route('dashboard') }}" class="btn btn-secondary-custom"
                            >شروع یادگیری</a
                            >
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section id="products" class="slider-section">
        <div class="container">
            <h2 class="section-title">محصولات کشاورزی</h2>

            <div class="mb-5">
                <h3 class="text-center mb-4" style="color: var(--dark-green)">
                    محصولات کشاورزی
                </h3>
                <div class="slider-container">
                    <div class="swiper productsSwiper">
                        <div class="swiper-wrapper">
                            @forelse($products as $product)
                                <div class="swiper-slide">
                                    <livewire:product-card :$product wire:key="product-{{ $loop->index }}" />
                                </div>
                            @empty
                                <p class="w-100 text-center text-danger">محصولی برای نمایش پیدا نشد.</p>
                            @endforelse
                        </div>
                        <div class="swiper-button-next" aria-label="محصول بعدی"></div>
                        <div class="swiper-button-prev" aria-label="محصول قبلی"></div>
                    </div>
                </div>
            </div>

            <div class="mb-5">
                <h3 class="text-center mb-4" style="color: var(--dark-green)">
                    ادوات کشاورزی
                </h3>
                <div class="slider-container">
                    <div class="swiper toolsSwiper">
                        <div class="swiper-wrapper">
                            @forelse($tools as $product)
                                <div class="swiper-slide">
                                    <livewire:product-card :$product wire:key="tool-{{ $loop->index }}" />
                                </div>
                            @empty
                                <p class="w-100 text-center text-danger">محصولی برای نمایش پیدا نشد.</p>
                            @endforelse
                        </div>
                        <div class="swiper-button-next" aria-label="ابزار بعدی"></div>
                        <div class="swiper-button-prev" aria-label="ابزار قبلی"></div>
                    </div>
                </div>
            </div>

            <div class="mb-5">
                <h3 class="text-center mb-4" style="color: var(--dark-green)">
                    دوره‌های آموزشی
                </h3>
                <div class="slider-container">
                    <div class="swiper coursesSwiper">
                        <div class="swiper-wrapper">
                            @forelse($courses as $course)
                                <div class="swiper-slide">
                                    <livewire:course-card :$course wire:key="course-{{ $loop->index }}" />
                                </div>
                            @empty
                                <p class="w-100 text-center text-danger">دوره ای برای نمایش پیدا نشد.</p>
                            @endforelse
                        </div>
                        <div class="swiper-button-next" aria-label="دوره بعدی"></div>
                        <div class="swiper-button-prev" aria-label="دوره قبلی"></div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section id="about" class="stats-section">
        <div class="container">
            <div class="row">
                <div class="col-lg-3 col-md-6">
                    <div class="stat-item">
                        <span class="stat-number">۹۵٪</span>
                        <span class="stat-text">رضایت مشتریان</span>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6">
                    <div class="stat-item">
                        <span class="stat-number">۱۲۰+</span>
                        <span class="stat-text">محصول متنوع</span>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6">
                    <div class="stat-item">
                        <span class="stat-number">۵۰+</span>
                        <span class="stat-text">دوره آموزشی</span>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6">
                    <div class="stat-item">
                        <span class="stat-number">۱۵</span>
                        <span class="stat-text">سال تجربه</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection

@section('modals')
    <livewire:product-modal />
    <livewire:course-modal />
@endsection
