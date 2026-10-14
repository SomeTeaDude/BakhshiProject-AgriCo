@extends('layouts.dashboard')

@section('title', 'مدیریت سفارشات')

@push('assets')
    @vite(['resources/css/user/orders.css', 'resources/css/table.css'])
@endpush

@section('content')
    <livewire:admin.orders />
@endsection

@section('modals')
    <livewire:modals.admin.order-modal />
@endsection
