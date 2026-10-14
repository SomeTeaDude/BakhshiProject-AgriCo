<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{

    public function dashboard()
    {
        if (!Auth::check()) abort(401);

        if (Auth::user()->role === 'admin' || Auth::user()->role === 'support') {
            return redirect()->route('admin.dashboard');
        }

        $orders_count = Auth::user()->orders()->count();
        $courses_count = Auth::user()->courses()->count();
        $price_count = Auth::user()->orders()->select('payment_id')->get()->reduce(fn ($acc, $order) => $acc + $order->payment->price, 0);
        $cart_count = Auth::user()->cartItems()->select('quantity')->get()->reduce(fn ($acc, $item) => $acc + $item->quantity, 0);

        return view('user.dashboard', compact('orders_count', 'courses_count', 'price_count', 'cart_count'));
    }

    public function cart()
    {
        $cartItems = auth()->user()->cartItems;

        return view('user.cart', compact('cartItems'));
    }

    public function courses()
    {
        return view('user.courses');
    }

    public function orders()
    {
        return view('user.orders');
    }

    public function payments()
    {
        $all_payments_count = 0;
        $success_payments_count = 0;
        $fail_payments_count = 0;

        Auth::user()->payments()->each(function ($item) use (&$all_payments_count, &$success_payments_count, &$fail_payments_count) {
            $all_payments_count++;
            if ($item->status === 'success') {
                $success_payments_count++;
            } else {
                $fail_payments_count++;
            }
        });

        return view('user.payments', compact('all_payments_count', 'success_payments_count', 'fail_payments_count'));
    }

    public function tickets()
    {
        return view('user.tickets');
    }

    public function profile()
    {
        return view('user.profile');
    }
}
