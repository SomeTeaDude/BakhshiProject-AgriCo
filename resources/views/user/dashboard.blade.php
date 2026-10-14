@extends('layouts.dashboard')

@section('content')
    <!-- Stats Cards -->
    <div class="row mb-4">
        <div class="col-lg-3 col-md-6 mb-3 tw:bslg:w-max tw:bslg:min-w-1/4">
            <x-stats-card :count="$orders_count" label="سفارش‌های من" icon="shopping-bag" bg="success" />
        </div>
        <div class="col-lg-3 col-md-6 mb-3 tw:bslg:w-max tw:bslg:min-w-1/4">
            <x-stats-card :count="$courses_count" label="دوره‌های من" icon="graduation-cap" bg="primary" />
        </div>
        <div class="col-lg-3 col-md-6 mb-3 tw:bslg:w-max tw:bslg:min-w-1/4">
            <x-stats-card :count="number_format($price_count)" label="کل خرید (تومان)" icon="wallet" bg="brown" />
        </div>
        <div class="col-lg-3 col-md-6 mb-3 tw:bslg:w-max tw:bslg:min-w-1/4">
            <x-stats-card :count="$cart_count" label="آیتم در سبد" icon="shopping-cart" bg="warning" />
        </div>
    </div>

    <!-- Quick Access -->
    <div class="row mb-4">
        <div class="col-12">
            <h5 class="mb-3">دسترسی سریع</h5>
        </div>
        <div class="col-lg-2 col-md-4 col-6 mb-3">
            <a
                class="quick-access-card text-center tw:block"
                href="{{ route('dashboard.cart') }}"
            >
                <i class="fas fa-shopping-cart fa-2x text-warning mb-3"></i>
                <h6>سبد خرید</h6>
                <small class="text-muted">مشاهده سبد</small>
            </a>
        </div>
        <div class="col-lg-2 col-md-4 col-6 mb-3">
            <a
                class="quick-access-card text-center tw:block"
                href="{{ route('dashboard.courses') }}"
            >
                <i class="fas fa-graduation-cap fa-2x text-success mb-3"></i>
                <h6>دوره‌های من</h6>
                <small class="text-muted">ادامه یادگیری</small>
            </a>
        </div>
        <div class="col-lg-2 col-md-4 col-6 mb-3">
            <a
                class="quick-access-card text-center tw:block"
                href="{{ route('dashboard.courses') }}"
            >
                <i class="fas fa-box fa-2x text-primary mb-3"></i>
                <h6>محصولات من</h6>
                <small class="text-muted">وضعیت سفارش‌ها</small>
            </a>
        </div>
        <div class="col-lg-2 col-md-4 col-6 mb-3">
            <a
                class="quick-access-card text-center tw:block"
                href="{{ route('dashboard.payments') }}"
            >
                <i class="fas fa-credit-card fa-2x text-info mb-3"></i>
                <h6>پرداخت ها</h6>
                <small class="text-muted">تاریخچه تراکنش</small>
            </a>
        </div>
        <div class="col-lg-2 col-md-4 col-6 mb-3">
            <a
                class="quick-access-card text-center tw:block"
                href="{{ route('dashboard.profile') }}"
            >
                <i class="fas fa-user-edit fa-2x text-danger mb-3"></i>
                <h6>پروفایل</h6>
                <small class="text-muted">ویرایش اطلاعات حساب</small>
            </a>
        </div>
        <div class="col-lg-2 col-md-4 col-6 mb-3">
            <a
                class="quick-access-card text-center tw:block"
                href="{{ route('dashboard.tickets')}}"
            >
                <i class="fas fa-headset fa-2x text-secondary mb-3"></i>
                <h6>پشتیبانی</h6>
                <small class="text-muted">ارتباط با ما</small>
            </a>
        </div>
    </div>
@endsection
