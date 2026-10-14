<section id="cartSection" class="container-fluid py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
        <h4>سبد خرید شما</h4>
        <div>
            <span class="me-3">جمع کل: <strong id="cartTotal">{{ number_format($this->totalPrice()) }}</strong> تومان</span>
            @if(count($cartItems) > 0 && $this->totalPrice() > 0)
                <form action="{{ route('payment.request.cart') }}" method="post" class="tw:inline">
                    @csrf
                    <button class="btn btn-success" id="checkoutBtn">
                        <i class="fas fa-credit-card ms-1"></i>
                        پرداخت
                    </button>
                </form>
            @endif
        </div>
    </div>

    <div id="cartItemsContainer">
        @if(count($cartItems) > 0)
            @foreach($cartItems as $cart_item)
                <div class="cart-item fade-in tw:will-change-[transform]" wire:key="{{ $cart_item->id }}" wire:loading.class="disabled" wire:target="addItemToDatabase({{ $cart_item->product->id }})">
                    <div class="d-flex align-items-center tw:gap-2 md:tw:gap-0" wire:loading.class="disabled" wire:target="decrementItemFromDatabase({{ $cart_item->product->id }})">
                        @if($cart_item->product->image())
                            <img
                                src="{{ $cart_item->product->image() }}"
                                alt="{{ $cart_item->product->name }}" class="rounded tw:me-0 md:tw:me-4" width="60" height="60" loading="lazy">
                        @else
                            <i class="fas fa-seedling rounded tw:me-0 md:tw:me-4 tw:!flex tw:justify-center tw:items-center tw:bg-green-400 tw:text-white tw:text-4xl tw:w-[60px] tw:h-[60px]"></i>
                        @endif
                        <div class="flex-grow-1">
                            <h6 class="mb-1">{{ $cart_item->product->name }}</h6>
                            <small class="text-muted">دسته بندی: {{ $cart_item->product->category }}</small>
                            <div class="mt-2">
                                <span class="text-success fw-bold">{{ number_format($cart_item->product->price) }} تومان</span>
                            </div>
                        </div>
                        <div class="d-flex align-items-center tw:gap-2 md:tw:gap-0" wire:loading.class="disabled" wire:target="removeItemFromDatabase({{ $cart_item->product->id }}">
                            <div class="quantity-controls tw:me-0 md:tw:me-4">
                                <button class="quantity-btn" wire:click="addItemToDatabase({{ $cart_item->product->id }})" wire:loading.attr="disabled" wire:target="clearCart">+</button>
                                <span class="quantity-input tw:flex tw:justify-center tw:items-center">{{ $cart_item->quantity }}</span>
                                <button class="quantity-btn" wire:click="decrementItemFromDatabase({{ $cart_item->product->id }})" wire:loading.attr="disabled" wire:target="clearCart">-</button>
                            </div>
                            <span class="text-nowrap tw:me-0 md:tw:me-4 fw-bold">{{ number_format($cart_item->product->price * $cart_item->quantity) }} تومان</span>
                            <button class="btn btn-sm btn-outline-danger" wire:click="removeItemFromDatabase({{ $cart_item->product->id }})" wire:loading.attr="disabled" wire:target="clearCart" title="حذف">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            @endforeach
            <div class="text-center mt-3">
                <button class="btn btn-outline-danger" wire:click="clearCart" wire:loading.attr="disabled">
                    <i class="fas fa-trash me-1"></i>
                    پاک کردن کل سبد خرید
                </button>
            </div>
        @else
            <div class="text-center">
                <p class="tw:text-red-400">متاسفانه در حال حاضر سبد خرید شما خالی میباشد.</p>
                <a href="{{ route('home') }}" class="btn btn-primary">فروشگاه</a>
            </div>
        @endif
    </div>
</section>
