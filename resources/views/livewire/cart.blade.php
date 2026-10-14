<div
    class="cart-modal"
    id="cartModal"
    aria-labelledby="cartTitle"
    wire:ignore.self
>
    <div class="cart-content">
        <div class="cart-header">
            <h4 id="cartTitle">سبد خرید شما</h4>
            <button
                class="cart-close-btn"
                id="closeCart"
                type="button"
                aria-label="بستن سبد خرید"
            >
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div class="cart-items" id="cartItems">
            @forelse($this->getItemsProperty() as $cartItem)
                <div class="cart-item" style="animation-delay: 0s"
                     wire:loading.class="disabled"
                     wire:target="decrement({{ $cartItem->product->id }})"
                     wire:key="cart-item-{{ $cartItem->product->id }}">
                    <div class="cart-item-image">
                        @if($cartItem->product->image())
                            <img src="{{ $cartItem->product->image() }}" alt="{{ $cartItem->product->name }}">
                        @else
                            <i class="fas fa-seedling"></i>
                        @endif
                    </div>
                    <div class="cart-item-details"
                         wire:loading.class="disabled"
                         wire:target="addCartItem({{ $cartItem->product->id }})">
                        <div class="cart-item-title">{{ $cartItem->product->name }}</div>
                        <div class="cart-item-price">{{ number_format($cartItem->product->price) }} تومان</div>
                        <div class="quantity-controls"
                             wire:loading.class="disabled"
                             wire:target="removeCartItem({{ $cartItem->product->id }})">
                            <button
                                class="quantity-btn"
                                type="button"
                                aria-label="کاهش تعداد"
                                wire:click="decrement({{ $cartItem->product->id }})"
                                @if($cartItem->quantity <= 1) disabled @endif
                            >
                                <i class="fas fa-minus"></i>
                            </button>
                            <span class="quantity-display">
                                <span>{{ $cartItem->quantity }}</span>
                            </span>
                            <button
                                class="quantity-btn"
                                type="button"
                                aria-label="افزایش تعداد"
                                wire:click="addCartItem({{ $cartItem->product->id }})"
                            >
                                <i class="fas fa-plus"></i>
                            </button>
                            <button
                                class="remove-btn"
                                type="button"
                                aria-label="حذف محصول"
                                wire:click="removeCartItem({{ $cartItem->product->id }})"
                            >
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            @empty
                <div class="cart-empty">
                    <i class="fas fa-shopping-cart"></i>
                    <h5>سبد خرید شما خالی است</h5>
                    <p>برای شروع خرید، محصولاتی را به سبد اضافه کنید</p>
                </div>
            @endforelse
        </div>
        <div class="cart-summary">
            <div class="cart-total" id="cartTotal">مجموع: {{ number_format($this->calcTotalPrice()) }} تومان</div>
            @if(count($cartItems) > 0)
                <a
                    href="{{ route('dashboard.cart') }}"
                    class="checkout-btn tw:block text-center text-decoration-none"
                    style="width: -moz-available; width: -webkit-fill-available;"
                >
                    <i class="fas fa-credit-card me-2"></i>تسویه حساب
                </a>
            @else
                <button
                    class="checkout-btn tw:block"
                    id="checkoutBtn"
                    type="button"
                    disabled
                    style="width: -moz-available; width: -webkit-fill-available;"
                >
                    <i class="fas fa-shopping-cart me-2"></i>سبد خرید خالی است
                </button>
            @endif
        </div>
    </div>
</div>
