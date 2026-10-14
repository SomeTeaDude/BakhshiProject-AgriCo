<div class="product-card tw:relative">
    <div class="product-image">
        @if($course->image())
            <img src="{{ $course->image() }}" alt="دوره {{ $course->name }}">
        @else
            <i class="fas fa-seedling"></i>
        @endif
    </div>
    <h4 class="product-title">{{ $course->name }}</h4>
    <p class="product-description">{{ truncate_text($course->description, 50) }}</p>
    <div class="product-price">
        <p class="tw:m-0">{{ number_format($course->price) }} تومان</p>
        @if($course->isBought())
            <p class="tw:text-xs tw:text-green-600 tw:mb-0 tw:mt-2">خریداری شده <i class="fas fa-exclamation-circle"></i></p>
        @endif
    </div>
    <div class="product-actions">
        <button
            class="details-btn"
            type="button"
            wire:click="loadCourse"
            data-bs-toggle="modal" data-bs-target="#courseDetailsModal"
        >
            <i class="fas fa-info-circle me-2"></i>جزئیات
        </button>
    </div>
</div>
