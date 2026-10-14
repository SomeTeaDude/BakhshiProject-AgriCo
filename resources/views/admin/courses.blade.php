@extends('layouts.dashboard')

@section('title', 'مدیریت دوره ها')

@push('assets')
    @vite('resources/css/table.css')
@endpush

@section('content')
    <livewire:admin.courses />
@endsection

@section('modals')
    <livewire:modals.admin.create-course-modal />
    <livewire:modals.admin.edit-course-modal />
    <livewire:modals.admin.manage-course-modal />
    <livewire:modals.admin.create-course-episode-modal />
    <livewire:modals.admin.edit-course-episode-modal />
@endsection
