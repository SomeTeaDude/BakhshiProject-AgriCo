@extends('layouts.dashboard')

@section('title', 'مدیریت محصولات')

@push('assets')
    @vite('resources/css/table.css')
@endpush

@section('content')
    <livewire:admin.products />
@endsection

@section('modals')
    <livewire:modals.admin.create-product-modal />
    <livewire:modals.admin.edit-product-modal />
@endsection
