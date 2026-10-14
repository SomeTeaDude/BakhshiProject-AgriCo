@extends('layouts.dashboard')

@section('title', 'پشتیبانی و تیکت')

@push('assets')
    @vite(['resources/css/admin/tickets.css', 'resources/css/chat.css'])
    <script defer src="https://cdn.jsdelivr.net/npm/@alpinejs/intersect@3.x.x/dist/cdn.min.js"></script>
@endpush

@section('content')
    <livewire:admin.tickets />
@endsection

@section('modals')
    <livewire:modals.chat-modal />
@endsection
