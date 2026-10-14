<?php

namespace App\Livewire;

use App\Models\CartItem;
use App\Traits\CartActionsDB;
use Livewire\Component;

class DashboardCart extends Component
{
    use CartActionsDB;

    /** @var CartItem[] */
    public $cartItems = [];

    public function mount()
    {
        $this->pressed = false;
    }

    public function totalPrice()
    {
        return $this->cartItems->reduce(fn($acc, $item) => $acc + ($item->product->price * $item->quantity), 0);
    }

    public function render()
    {
        return view('livewire.dashboard-cart');
    }
}
