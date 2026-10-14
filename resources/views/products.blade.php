@extends('layouts.layout')

@section('title', 'محصولات')

@push('assets')
    @vite(['resources/css/home.css', 'resources/css/table.css', 'resources/js/home.js'])
@endpush

@section('content')
    <livewire:products />
@endsection

@section('modals')
    <livewire:product-modal />
@endsection
