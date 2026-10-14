<button
    class="btn cart-btn tw:ms-0 tw:bslg:ms-4"
    id="cartButton"
    type="button"
    aria-label="مشاهده سبد خرید"
>
    <i class="fas fa-shopping-cart"></i>
    <span id="cartCount">سبد خرید</span>
    <span class="cart-badge @if($cartCount > 0) show @endif" id="cartBadge">{{ $cartCount }}</span>
</button>
