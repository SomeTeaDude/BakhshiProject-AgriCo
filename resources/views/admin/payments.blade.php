@extends('layouts.dashboard')

@section('title', 'مدیریت پرداخت ها')

@push('assets')
    @vite(['resources/css/user/payments.css', 'resources/css/table.css'])
@endpush

@section('content')
    <section class="payments-content container-fluid py-4">
        <!-- Header Actions -->
        <div class="row mb-4">
            <div class="col-12">
                <div class="d-flex justify-content-between align-items-center flex-wrap">
                    <div class="section-header">
                        <h4>مدیریت پرداخت ها</h4>
                        <p class="text-muted mb-0">
                            مشاهده و مدیریت تمام تراکنش‌های مالی
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Stats Cards -->
        <div class="row mb-4">
            <div class="col-lg-4 col-md-6 mb-3 tw:bslg:w-max tw:bslg:min-w-1/3">
                <x-stats-card :count="$all_payments_count" label="کل پرداخت ها" icon="money-bill-wave" bg="primary" />
            </div>
            <div class="col-lg-4 col-md-6 mb-3 tw:bslg:w-max tw:bslg:min-w-1/3">
                <x-stats-card :count="$success_payments_count" label="پرداخت های موفق" icon="check-circle" bg="success" />
            </div>
            <div class="col-lg-4 col-md-6 mb-3 tw:bslg:w-max tw:bslg:min-w-1/3">
                <x-stats-card :count="$fail_payments_count" label="پرداخت های ناموفق" icon="times-circle" bg="danger" />
            </div>
        </div>
        <livewire:admin.payments />
    </section>
@endsection

@section('modals')
    <livewire:modals.payment-modal />
@endsection
