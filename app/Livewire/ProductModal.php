<?php

namespace App\Livewire;

use App\Models\Product;
use App\Models\Tool;
use Illuminate\Support\Facades\Auth;
use Livewire\Component;
use Usernotnull\Toast\Concerns\WireToast;

class ProductModal extends Component
{
    use WireToast;

    public Product|Tool|null $product = null;

    protected $listeners = [
        'showProduct' => 'loadProduct',
    ];

    public function loadProduct(Product $product)
    {
        $this->product = $product;
    }

    public function addToCart()
    {
        if (!$this->product) return;
        if (Auth::check() && !Auth::user()->isUser()) {
            toast()->danger('فقط کاربران معمولی اجازه ی خرید از سایت دارند.', 'خطا!')->push();
            return;
        }
        $this->dispatch('addToCart', $this->product->id, true);
    }

    public function closeModal()
    {
        $this->product = null;
    }

    public function render()
    {
        return view('livewire.product-modal');
    }
}
