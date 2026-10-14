<div class="product-card tw:relative">
    <div class="product-image">
        @if($product->image())
            @if($product->quantity > 0)
                <img src="{{ $product->image() }}" alt="product-image">
            @else
                <img src="{{ $product->image() }}" alt="product-image" class="tw:grayscale">
            @endif
        @else
            @if($product->quantity > 0)
                <i class="fas fa-seedling"></i>
            @else
                <i class="fas fa-seedling tw:grayscale"></i>
            @endif
        @endif
    </div>
    <h4 class="product-title">{{ $product->name }}</h4>
    <p class="product-description">{{ truncate_text($product->description, 50) }}</p>
    <div class="product-price">
        <p class="tw:m-0">{{ number_format($product->price) }} تومان</p>
        @if($product->quantity <= 3)
            <p class="tw:text-xs tw:text-red-600 tw:mb-0 tw:mt-2 tw:font-thin">
                @if($product->quantity <= 0)
                    اتمام موجودی
                @else
                    تعداد محدود
                @endif
                <i class="fas fa-exclamation-circle"></i>
            </p>
        @endif
    </div>
    <div class="product-actions">
        @if($product->quantity > 0)
            <button
                class="add-to-cart-btn"
                type="button"
                Wire:click="addToCart"
                wire:loading.attr="disabled"
            >
                <i class="fas fa-cart-plus me-2"></i>افزودن به سبد خرید
            </button>
        @else
            <button
                class="add-to-cart-btn tw:grayscale tw:pointer-events-none"
                type="button"
                disabled
            >
                <i class="fas fa-ban me-2"></i>بدون موجودی
            </button>
        @endif
        <button
            class="details-btn"
            type="button"
            wire:click="loadProduct"
            data-bs-toggle="modal" data-bs-target="#productDetailsModal"
        >
            <i class="fas fa-info-circle me-2"></i>جزئیات
        </button>
    </div>
</div>
