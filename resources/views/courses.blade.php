@extends('layouts.layout')

@section('title', 'دوره ها')

@push('assets')
    @vite(['resources/css/home.css', 'resources/css/table.css', 'resources/js/home.js'])
@endpush

@section('content')
    <livewire:courses />
@endsection

@section('modals')
    <livewire:course-modal />
@endsection
