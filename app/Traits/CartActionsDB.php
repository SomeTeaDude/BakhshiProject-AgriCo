<?php

namespace App\Traits;

use App\Models\CartItem;
use App\Models\Product;
use App\Models\Tool;
use Illuminate\Support\Facades\Auth;
use Usernotnull\Toast\Concerns\WireToast;

trait CartActionsDB {
    use WireToast;

    public bool $pressed = true;
    public function loadDatabaseCart(): void
    {
        if ($this->pressed) {
            $this->cartItems = auth()->user()->cartItems()->get()->map(fn ($item) => [
                'id' => $item->product_id,
                'quantity' => $item->quantity
            ])->toArray();
        } else {
            $this->cartItems = Auth::user()->cartItems;
        }
    }
    public function addItemToDatabase($id, $withToast = false)
    {
        $product = Product::find($id);
        if (!$product) {
            toast()->danger('متاسفانه محصول مورد نظر پیدا نشد.', 'خطا!')->push();
            return;
        }
        if ($product->quantity === 0) {
            toast()->danger('متاسفانه موجودی محصول مورد نظر در انبار صفر میباشد.', 'خطا!')->push();
            return;
        }

        $cartItem = CartItem::firstOrNew([
            'user_id' => Auth::id(),
            'product_id' => $id,
        ]);

        if ($cartItem->quantity + 1 > $product->quantity) {
            toast()->danger('بیشتر از این تعداد از این محصول موجود نمیباشد.', 'خطا!')->push();
            if ($cartItem->quantity === 0) $cartItem->delete();
            return;
        }

        $cartItem->quantity += 1;
        $cartItem->save();

        $this->loadDatabaseCart();
        if ($withToast) toast()->success('محصول با موفقیت به سبد خرید شما اضافه شد.', 'موفق!')->push();
    }
    public function decrementItemFromDatabase($id)
    {
        $cartItem = CartItem::where('user_id', Auth::id())->where('product_id', $id)->first();
        if (!$cartItem) return;

        if ($cartItem->quantity > 1) {
            $cartItem->quantity--;
            $cartItem->update();
        }

        $this->loadDatabaseCart();
    }
    public function removeItemFromDatabase($id)
    {
        $cartItem = CartItem::where('user_id', Auth::id())->where('product_id', $id)->first();
        if (!$cartItem) return;

        $cartItem->delete();

        $this->loadDatabaseCart();
    }

    public function clearCart()
    {
        CartItem::where('user_id', Auth::id())->delete();

        $this->loadDatabaseCart();
    }
}
