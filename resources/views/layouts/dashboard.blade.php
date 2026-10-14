<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>@yield('title', 'داشبورد') - {{ auth()->check() ? auth()->user()->isAdmin() ? 'پنل ادمین' : 'پنل کاربری' : 'پنل کاربری' }}</title>

    <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.rtl.min.css"
        rel="stylesheet"
    />
    <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
    />
    <link rel="icon" href="/logo.svg">

    @vite(['resources/css/fontawesome/css/all.min.css', 'resources/css/user/dashboard.css', 'resources/js/app.js', 'resources/css/app.css'])
    @stack('assets')
</head>
<body class="tw:has-[#toggleNav:checked]:overflow-hidden">

<livewire:toasts />

<nav class="
    tw:peer
    tw:max-h-screen
    tw:h-full
    tw:bg-linear-[135deg,var(--primary-green),var(--earth-brown)]
    tw:text-white
    tw:shadow-md
    tw:fixed
    tw:top-0
    tw:right-0
    tw:bssm:w-[var(--sidebar-width)]
    tw:w-full
    tw:overflow-auto
    tw:has-checked:translate-x-0 tw:translate-x-full tw:bslg:translate-x-0
    tw:transition-all
    tw:transition-300
    tw:z-[1000]
    ">
    <input type="checkbox" class="tw:hidden" id="toggleNav">
    <div class="tw:flex tw:justify-between tw:items-center tw:gap-2 p-4">
        <h4 class="tw:flex tw:justify-start tw:items-center tw:gap-2">
            @if(auth()->user()->isAdmin())
                <i class="fas fa-gear me-2"></i>
                پنل ادمین
            @elseif(auth()->user()->isUser())
                <i class="fas fa-user-circle me-2"></i>
                پنل کاربری
            @else
                <i class="fas fa-user-headset me-2"></i>
                پنل پشتیبانی
            @endif
        </h4>
        <label
            for="toggleNav"
            class="
            tw:inline-flex
            tw:bssm:hidden
            tw:justify-center
            tw:items-center
            tw:w-8
            tw:h-8
            tw:text-white
            tw:border
            tw:border-white/50
            tw:hover:border-white
            tw:rounded-full
            tw:rotate-0
            tw:hover:rotate-180
            tw:cursor-pointer
            tw:transition-all tw:transition-300"
            id="toggleSidebar"
        >
            <i class="fas fa-xmark"></i>
        </label>
    </div>

    <nav class="nav flex-column tw:h-max">
        @if(!auth()->user()->isUser())
            <a
                class="nav-link @if(url()->current() === route('admin.dashboard')) active @endif"
                href="{{ route('admin.dashboard') }}"
            >
                <i class="fa-duotone fa-chart-line me-2"></i>
                داشبورد
            </a>
            @if(auth()->user()->isAdmin())
                <a
                    class="nav-link @if(url()->current() === route('admin.products')) active @endif"
                    href="{{ route('admin.products') }}"
                >
                    <i class="fa-duotone fa-seedling me-2"></i>
                    مدیریت محصولات
                </a>
                <a
                    class="nav-link @if(url()->current() === route('admin.courses')) active @endif"
                    href="{{ route('admin.courses') }}"
                >
                    <i class="fa-duotone fa-light fa-chalkboard-teacher me-2"></i>
                    مدیریت دوره ها
                </a>
            @endif
            <a
                class="nav-link @if(url()->current() === route('admin.orders')) active @endif"
                href="{{ route('admin.orders') }}"
            >
                <i class="fa-duotone fa-box me-2"></i>
                مدیریت سفارشات
            </a>
            <a
                class="nav-link @if(url()->current() === route('admin.payments')) active @endif"
                href="{{ route('admin.payments') }}"
            >
                <i class="fa-duotone fa-credit-card me-2"></i>
                مدیریت پرداخت
            </a>
            @if(auth()->user()->isAdmin())
                <a
                    class="nav-link @if(url()->current() === route('admin.users')) active @endif"
                    href="{{ route('admin.users') }}"
                >
                    <i class="fa-duotone fa-users me-2"></i>
                    مدیریت کاربران
                </a>
            @endif
            <a class="nav-link @if(url()->current() === route('admin.tickets')) active @endif" href="{{ route('admin.tickets') }}">
                <i class="fa-duotone fa-headset me-2"></i>
                پشتیبانی و چت
            </a>
        @else
            <a
                class="nav-link @if(url()->current() === route('dashboard')) active @endif"
                href="{{ route('dashboard') }}"
            >
                <i class="fa-duotone fa-chart-pie me-2"></i>
                داشبورد
            </a>
            <a
                class="nav-link @if(url()->current() === route('dashboard.payments')) active @endif"
                href="{{ route('dashboard.payments') }}"
            >
                <i class="fa-duotone fa-credit-card me-2"></i>
                پرداخت ها
            </a>
            <a
                class="nav-link @if(url()->current() === route('dashboard.cart')) active @endif"
                href="{{ route('dashboard.cart') }}"
            >
                <i class="fa-duotone fa-shopping-cart me-2"></i>
                سبد خرید
            </a>
            <a
                class="nav-link @if(url()->current() === route('dashboard.courses')) active @endif"
                href="{{ route('dashboard.courses') }}"
            >
                <i class="fa-duotone fa-chalkboard-user me-2"></i>
                دوره‌های من
            </a>
            <a
                class="nav-link @if(url()->current() === route('dashboard.orders')) active @endif"
                href="{{ route('dashboard.orders') }}"
            >
                <i class="fa-duotone fa-box me-2"></i>
                سفارشات
            </a>
            <a class="nav-link @if(url()->current() === route('dashboard.tickets')) active @endif" href="{{ route('dashboard.tickets') }}">
                <i class="fa-duotone fa-headset me-2"></i>
                پیام به پشتیبانی
            </a>
            <a
                class="nav-link @if(url()->current() === route('dashboard.profile')) active @endif"
                href="{{ route('dashboard.profile') }}"
            >
                <i class="fa-duotone fa-user-edit me-2"></i>
                ویرایش پروفایل
            </a>
        @endif
        <hr class="my-3" />
        <a class="nav-link" href="{{ route('home') }}">
            <i class="fa-duotone fa-store me-2"></i>
            مشاهده فروشگاه
        </a>
        <button
            class="nav-link"
            data-bs-toggle="modal"
            data-bs-target="#logoutModal"
            style="width: -moz-available; width: -webkit-fill-available;"
        >
            <i class="fa-duotone fa-sign-out-alt me-2"></i>
            خروج
        </button>
    </nav>
</nav>
<label for="toggleNav"
       class="
           tw:fixed
           tw:top-0
           tw:right-0
           tw:w-dvw
           tw:h-full
           tw:bg-black/30
           tw:opacity-0
           tw:peer-has-checked:opacity-100
           tw:invisible
           tw:peer-has-checked:visible
           tw:z-[999]
           tw:transition-all tw:transition-300"></label>

<div class="main-content">
    <header class="header">
        <div class="container-fluid">
            <div class="row align-items-center">
                <div class="col-6 col-md-8">
                    <div class="d-flex justify-content-start align-items-center tw:gap-2">
                        <label
                            for="toggleNav"
                            class="btn btn-outline-success d-lg-none tw:!m-0 tw:cursor-pointer"
                            id="toggleSidebar"
                        >
                            <i class="fas fa-bars"></i>
                        </label>
                        <h3 class="mb-0">@yield('title', 'داشبورد')</h3>
                    </div>
                </div>
                <div class="col-6 col-md-4">
                    <livewire:little-profile />
                </div>
            </div>
        </div>
    </header>

    <section class="dashboard-content container-fluid py-4">
        @yield('content')
    </section>
</div>

<div class="modal fade" id="logoutModal" tabindex="-1" aria-labelledby="logoutModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="logoutModalLabel">خروج از حساب کاربری</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="tw:my-2">
                    <p class="tw:mb-0">آیا مطمئن هستید که میخواهید از حساب خود خارج شوید؟</p>
                    <p class="tw:mb-0">بعد از خروج در صورت نیاز باید دوباره وارد حساب کاربری خود شوید.</p>
                </div>
            </div>
            <div class="modal-footer tw:justify-between">
                <button type="button" class="btn btn-outline-success" data-bs-dismiss="modal">لغو</button>
                <form action="{{ route('logout') }}" method="post">
                    @csrf
                    <button class="btn btn-outline-danger tw:flex tw:justify-start tw:items-center tw:gap-2">خروج از حساب <i class="fa-duotone fa-left-from-bracket"></i></button>
                </form>
            </div>
        </div>
    </div>
</div>
@yield('modals')

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

@stack('cdn')

@livewireStyles
@livewireScripts

@stack('js')

</body>
</html>
