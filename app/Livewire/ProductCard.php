<?php

namespace App\Livewire;

use App\Models\Product;
use Illuminate\Support\Facades\Auth;
use Livewire\Component;
use Usernotnull\Toast\Concerns\WireToast;

class ProductCard extends Component
{
    use WireToast;

    public Product $product;

    public function loadProduct()
    {
        $this->dispatch('showProduct', $this->product->id);
    }

    public function addToCart()
    {
        if (Auth::check() && !Auth::user()->isUser()) {
            toast()->danger('فقط کاربران معمولی اجازه ی خرید از سایت دارند.', 'خطا!')->push();
            return;
        }
        $this->dispatch('addToCart', $this->product->id, true);
    }

    public function render()
    {
        return view('livewire.product-card');
    }
}
