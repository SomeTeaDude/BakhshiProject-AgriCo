<?php

namespace App\Livewire\Auth;

use App\Models\CartItem;
use App\Models\Product;
use App\Models\Tool;
use App\Models\User;
use App\Traits\HasCodeSending;
use Livewire\Component;
use Illuminate\Support\Facades\Auth;

class Login extends Component
{
    use HasCodeSending;

    public bool $shouldRegister = false;

    public function submitAuth()
    {
        if (!$this->hasCode()) return;

        $okToLogin= $this->validateForm();

        if (!$okToLogin) return;

        $this->okToLogin = true;
    }

    public function login()
    {
        if (!$this->okToLogin) return;
        $phone = session()->get('phone');
        $user = User::where('phone', $phone)->first();

        if ($user) {
            $this->mergeSessionCartToDatabase($user->id, $user->isAdmin());
            Auth::loginUsingId($user->id);

            $this->forgetCode();

            return $this->redirectRoute('dashboard');
        } else {
            $user = User::create(compact('phone'));
            $this->mergeSessionCartToDatabase($user->id, $user->isAdmin());
            Auth::loginUsingId($user->id);

            $this->forgetCode();

            return $this->redirectRoute('register');
        }
    }

    protected function mergeSessionCartToDatabase(int $userId, bool $isAdmin)
    {
        if (!$isAdmin) {
            $sessionCart = session('cart', []);

            foreach ($sessionCart as $item) {
                $cartItem = CartItem::firstOrNew([
                    'user_id' => $userId,
                    'product_id' => $item['id'],
                ]);

                $cartItem->quantity += $item['quantity'];
                $cartItem->save();
            }
        }

        session()->forget('cart');
    }

    public function changeCode()
    {
        $this->forgetCode(false);
    }

    public function render()
    {
        return view('livewire.auth.login');
    }
}
