@extends('layouts.layout')

@section('title', 'ورود و ثبت نام')

@push('assets')
    @vite(['resources/css/home.css', 'resources/css/auth.css', 'resources/js/home.js'])
@endpush

@section('content')
    <livewire:auth.login />
@endsection
