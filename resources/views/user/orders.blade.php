@extends('layouts.dashboard')

@section('title', 'سفارشات')

@push('assets')
    @vite(['resources/css/user/orders.css', 'resources/css/table.css'])
@endpush

@section('content')
    <livewire:user.orders />
@endsection

@section('modals')
    <livewire:modals.order-modal />
@endsection
