@extends('layouts.dashboard')

@section('title', 'پروفایل')

@push('assets')
    @vite('resources/css/user/profile.css')
@endpush

@section('content')
    <livewire:user.profile />
@endsection
