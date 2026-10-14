@extends('layouts.dashboard')

@section('title', 'دوره های من')

@push('assets')
    @vite('resources/css/user/courses.css')
@endpush

@section('content')
    <livewire:user.courses />
@endsection

@section('modals')
    <livewire:modals.course-player-modal />
@endsection
