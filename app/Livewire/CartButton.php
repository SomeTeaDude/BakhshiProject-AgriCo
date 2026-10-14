<?php

namespace App\Livewire;

use Illuminate\Support\Facades\Auth;
use Livewire\Component;

class CartButton extends Component
{
    public $cartItems;
    public int $cartCount = 0;

    protected $listeners = [
        'cartUpdated' => 'mount'
    ];

    public function mount()
    {
        if (Auth::check()) {
            $this->loadDatabaseCart();
        } else {
            $this->cartItems = session('cart', []);
        }

        $this->cartCount = array_reduce($this->cartItems, fn ($acc, $item) => $acc + $item['quantity'], 0);
    }

    public function loadDatabaseCart(): void
    {
        $this->cartItems = auth()->user()->cartItems()->get()->map(fn ($item) => [
            'id' => $item->item_id,
            'quantity' => $item->quantity
        ])->toArray();
    }

    public function render()
    {
        return view('livewire.cart-button');
    }
}
