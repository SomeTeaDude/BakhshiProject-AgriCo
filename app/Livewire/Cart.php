<?php

namespace App\Livewire;

use App\Models\Product;
use App\Models\Tool;
use App\Traits\CartActionsDB;
use Illuminate\Support\Facades\Auth;
use Livewire\Component;
use Usernotnull\Toast\Concerns\WireToast;

class Cart extends Component
{
    use CartActionsDB, WireToast;

    public $cartItems = [];

    protected $listeners = [
        'addToCart' => 'addCartItem',
        'removeFromCart' => 'removeCartItem',
        'decrement' => 'decrement'
    ];

    public function mount()
    {
        if (Auth::check()) {
            $this->loadDatabaseCart();
        } else {
            $this->cartItems = session('cart', []);
        }
    }

    public function addCartItem($id, $withToast = false): void
    {
        if (Auth::check()) {
            if (!Auth::user()->isUser()) {
                toast()->danger('فقط کاربران معمولی اجازه ی خرید از سایت دارند.', 'خطا!')->push();
                return;
            }
            $this->addItemToDatabase($id, $withToast);
        } else {
            $this->addItemToSession($id, $withToast);
        }
        $this->dispatch('cartUpdated');
    }

    public function decrement($id): void
    {
        if (Auth::check()) {
            $this->decrementItemFromDatabase($id);
        } else {
            $this->decrementItemFromSession($id);
        }
        $this->dispatch('cartUpdated');
    }

    public function removeCartItem($id): void
    {
        if (Auth::check()) {
            $this->removeItemFromDatabase($id);
        } else {
            $this->removeItemFromSession($id);
        }
        $this->dispatch('cartUpdated');
    }

    public function addItemToSession($id, $withToast = false)
    {
        $cart = session('cart', []);
        $found = false;

        foreach ($cart as &$cart_item) {
            if ($cart_item['id'] === $id) {
                $product = Product::find($id);

                if ($cart_item['quantity'] + 1 > $product->quantity) {
                    toast()->danger('بیشتر از این تعداد از این محصول در انبار موجود نمیباشد.', 'خطا!')->push();
                    return;
                }
                $cart_item['quantity']++;
                $found = true;
                break;
            }
        }

        if (!$found) {
            $cart[] = [
                'id' => $id,
                'quantity' => 1
            ];
        }

        session(compact('cart'));
        $this->cartItems = $cart;
        if ($withToast) toast()->success('محصول با موفقیت به سبد خرید شما اضافه شد.', 'موفق!')->push();
    }

    public function decrementItemFromSession($id)
    {
        $cart = session('cart', []);

        foreach ($cart as &$item) {
            if ($item['id'] === $id && $item['quantity'] > 1) {
                $item['quantity']--;
                break;
            }
        }

        session(compact('cart'));
        $this->cartItems = $cart;
    }

    public function removeItemFromSession($id)
    {
        $cart = session('cart', []);

        $cart = array_values(array_filter($cart, fn($item) => $item['id'] !== $id));

        session(compact('cart'));
        $this->cartItems = $cart;
    }

    public function getItemsProperty()
    {
        return collect($this->cartItems)->map(function ($item) {
            $product = Product::find($item['id']);
            $quantity = $item['quantity'];

            return (object)compact('product', 'quantity');
        });
    }

    public function calcTotalPrice(): int
    {
        $sum = 0;

        foreach ($this->getItemsProperty() as $item) {
            $sum += $item->product->price * $item->quantity;
        }

        return $sum;
    }

    public function render()
    {
        return view('livewire.cart');
    }
}
