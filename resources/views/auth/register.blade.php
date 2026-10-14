@extends('layouts.layout')

@section('title', 'ثبت نام')

@push('assets')
    @vite(['resources/css/home.css', 'resources/css/auth.css', 'resources/js/home.js'])
@endpush

@section('content')
    <section class="tw:mx-4 tw:bssm:mx-0">
        <div class="auth-container" id="registerPage">
            <div class="auth-header">
                <h2><i class="fas fa-user-plus"></i> تکمیل حساب</h2>
            </div>
            <div class="auth-content">
                <p class="text-center text-success">برای ورود به پنل خود ابتدا فرم زیر که شامل اطلاعات شما میباشد را پر کنید.</p>
                <form action="{{ route('register') }}" method="POST" class="auth-step active">
                    @csrf
                    @method("PATCH")
                    <x-input name="f_name" placeholder="نام خود را وارد کنید" icon="user" label="نام" required />
                    <x-input name="l_name" placeholder="نام خانوادگی خود را وارد کنید" icon="user" label="نام خانوادگی" required />
                    <x-input type="email" name="email" placeholder="example@example.com" icon="envelope" label="ایمیل(اختیاری)" />

                    <button class="btn-auth">
                        <i class="fas fa-arrow-right me-2"></i> وورد
                    </button>
                </form>
            </div>
        </div>
    </section>

@endsection
