@extends('layouts.dashboard')

@section('title', 'سبد خرید')

@push('assets')
    @vite('resources/css/user/cart.css')
@endpush

@section('content')
    <livewire:dashboard-cart :$cartItems />
@endsection
