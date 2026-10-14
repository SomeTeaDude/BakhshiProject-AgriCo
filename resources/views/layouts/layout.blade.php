<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>مهندس بخشی - @yield('title', 'محصولات کشاورزی ارگانیک')</title>
    <link
        href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.rtl.min.css"
        rel="stylesheet"
    />
    <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"
    />
    <link rel="icon" href="/logo.svg">

    @vite(['resources/css/fontawesome/css/all.min.css', 'resources/css/app.css', 'resources/js/app.js'])
    @stack('assets')
</head>
<body class="overflow-x-hidden bg-gradient-to-br from-gray-50 to-green-50">

<livewire:toasts />

<!-- Header -->
<header class="sticked-top">
    <nav class="navbar navbar-expand-lg">
        <div class="container">
            <a class="navbar-brand" href="{{ route('home') }}" aria-label="صفحه اصلی مهندس بخشی">
                <i class="fas fa-seedling"></i>
                مهندس بخشی
            </a>

            <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="منوی ناوبری"
            >
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav me-auto">
                    <li class="nav-item">
                        <a class="nav-link {{ url()->current() === route('home') ? 'active' : '' }}" href="{{ route('home') }}">خانه</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link {{ url()->current() === route('products') ? 'active' : '' }}" href="{{ route('products') }}">محصولات</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link {{ url()->current() === route('courses') ? 'active' : '' }}" href="{{ route('courses') }}">دوره‌ها</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#about">درباره ما</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#contact">تماس با ما</a>
                    </li>
                </ul>
                @if(url()->current() !== route('login'))
                    <div class="auth-buttons tw:flex-row-reverse tw:bslg:flex-row tw:!justify-between">
                        @auth
                            <a
                                class="auth-btn text-decoration-none"
                                href="{{ route('dashboard') }}"
                            >
                                داشبورد
                            </a>
                        @else
                            <a
                                class="auth-btn text-decoration-none"
                                href="{{ route('login') }}"
                            >
                                ورود و ثبت نام
                            </a>
                        @endauth
                        @if(!auth()->check() || (auth()->check() && !auth()->user()->isAdmin()))
                            <livewire:cart-button />
                        @endif
                    </div>
                @endif
            </div>
        </div>
    </nav>
</header>

<main>
    @yield('content')
</main>

<!-- Footer -->
<footer id="contact" class="footer">
    <div class="container">
        <div class="row">
            <div class="col-lg-3 col-md-6 mb-4">
                <div class="footer-section">
                    <h5>
                        <i class="fas fa-seedling me-2"></i>
                        مهندس بخشی
                    </h5>
                    <p>
                        ما با بیش از ۱۵ سال تجربه در زمینه کشاورزی، بهترین محصولات
                        ارگانیک و آموزش‌های تخصصی را ارائه می‌دهیم.
                    </p>
                    <div class="mt-3">
                        <i class="fas fa-phone me-2 text-success"></i>
                        <span>۰۹۳۳۴۵۹۳۶۰۱</span>
                    </div>
                    <div class="mt-2">
                        <i class="fas fa-map-marker-alt me-2 text-success"></i>
                        <span>ایران - تهران</span>
                    </div>
                </div>
            </div>

            <div class="col-md-6 mb-4 tw:flex tw:flex-col tw:bssm:flex-row tw:text-center tw:bssm:text-start">
                <div class="footer-section tw:w-full tw:bssm:!w-1/2">
                    <h5>لینک‌های مفید</h5>
                    <ul>
                        <li class="tw:!mb-0">
                            <a
                                href="{{ route('home') }}"
                                class="tw:inline-block tw:pb-3 tw:hover:!ps-0 tw:hover:-translate-y-1 tw:md:hover:!ps-1 tw:md:hover:!translate-y-0"
                            >
                                خانه
                            </a>
                        </li>
                        <li class="tw:!mb-0">
                            <a
                                href="{{ route('products') }}"
                                class="tw:inline-block tw:pb-3 tw:hover:!ps-0 tw:hover:-translate-y-1 tw:md:hover:!ps-1 tw:md:hover:!translate-y-0"
                            >
                                محصولات
                            </a>
                        </li>
                        <li class="tw:!mb-0">
                            <a
                                href="{{ route('courses') }}"
                                class="tw:inline-block tw:pb-3 tw:hover:!ps-0 tw:hover:-translate-y-1 tw:md:hover:!ps-1 tw:md:hover:!translate-y-0"
                            >
                                دوره‌ها
                            </a>
                        </li>
                        <li class="tw:!mb-0">
                            <a
                                href="#"
                                class="tw:inline-block tw:pb-3 tw:hover:!ps-0 tw:hover:-translate-y-1 tw:md:hover:!ps-1 tw:md:hover:!translate-y-0"
                            >
                                درباره ما
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="footer-section tw:w-full tw:bssm:!w-1/2">
                    <h5>خدمات ما</h5>
                    <ul>
                        <li class="tw:!mb-0">
                            <a
                                href="{{ route('products') }}?c=بذر"
                                class="tw:inline-block tw:pb-3 tw:hover:!ps-0 tw:hover:-translate-y-1 tw:md:hover:!ps-1 tw:md:hover:!translate-y-0"
                            >
                                فروش بذر
                            </a>
                        </li>
                        <li class="tw:!mb-0">
                            <a
                                href="{{ route('products') }}?c=کود"
                                class="tw:inline-block tw:pb-3 tw:hover:!ps-0 tw:hover:-translate-y-1 tw:md:hover:!ps-1 tw:md:hover:!translate-y-0"
                            >
                                کودهای ارگانیک
                            </a>
                        </li>
                        <li class="tw:!mb-0">
                            <a
                                href="{{ route('products') }}?t=tool"
                                class="tw:inline-block tw:pb-3 tw:hover:!ps-0 tw:hover:-translate-y-1 tw:md:hover:!ps-1 tw:md:hover:!translate-y-0"
                            >
                                ابزار کشاورزی
                            </a>
                        </li>
                        <li class="tw:!mb-0">
                            <a
                                href="#"
                                class="tw:inline-block tw:pb-3 tw:hover:!ps-0 tw:hover:-translate-y-1 tw:md:hover:!ps-1 tw:md:hover:!translate-y-0"
                            >
                                مشاوره تخصصی
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="col-lg-3 mb-4">
                <div class="footer-section">
                    <h5>تماس با ما</h5>
                    <div class="contact-form">
                        <input
                            type="text"
                            class="form-control"
                            placeholder="نام شما"
                            required
                            aria-label="نام شما"
                        />
                        <input
                            type="email"
                            class="form-control"
                            placeholder="ایمیل شما"
                            required
                            aria-label="ایمیل شما"
                        />
                        <textarea
                            class="form-control"
                            rows="3"
                            placeholder="پیام شما"
                            required
                            aria-label="پیام شما"
                        ></textarea>
                        <button type="submit" class="submit-btn">
                            <i class="fas fa-paper-plane me-2"></i>
                            ارسال پیام
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="copyright">
            <p>&copy; مهندس بخشی، تمامی حقوق محفوظ است.</p>
        </div>
    </div>
</footer>

@if(!auth()->check() || (auth()->check() && !auth()->user()->isAdmin()))
    <livewire:cart />
@endif

@yield('modals')

<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/js/bootstrap.bundle.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>

@livewireStyles
@livewireScripts

@stack('js')

</body>
</html>
