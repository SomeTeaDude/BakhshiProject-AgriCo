@extends('layouts.dashboard')

@section('title', 'مدیریت کاربران')

@push('assets')
    @vite('resources/css/table.css')
@endpush

@section('content')
    <livewire:admin.users />
@endsection

@section('modals')
    <livewire:modals.payment-modal />
@endsection
