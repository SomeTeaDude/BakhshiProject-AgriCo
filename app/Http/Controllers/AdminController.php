<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Payment;
use App\Models\Product;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class AdminController extends Controller
{
    public function dashboard()
    {
        Carbon::setLocale('fa');
        $startOfWeek = Carbon::now()->startOfWeek();
        $endOfWeek = Carbon::now()->endOfWeek();

        $orders = DB::table('orders')
            ->join('payments', 'orders.payment_id', '=', 'payments.id')
            ->select(
                DB::raw('DATE(orders.created_at) as date'),
                DB::raw('SUM(payments.price) as total')
            )
            ->whereBetween('orders.created_at', [$startOfWeek, $endOfWeek])
            ->groupBy(DB::raw('DATE(orders.created_at)'))
            ->orderBy('date')
            ->get();

        // Initialize all days of the week with 0
        $weekDays = collect();
        foreach (range(0, 6) as $i) {
            $date = $startOfWeek->copy()->addDays($i);
            $weekDays[$date->format('l')] = 0;
        }

        // Fill in totals from query
        foreach ($orders as $order) {
            $dayName = Carbon::parse($order->date)->format('l');
            $weekDays[$dayName] = $order->total;
        }

        $orders = Order::all();
        $users_count = User::all()->select('id')->count();
        $orders_count = $orders->count();
        $products_count = Product::all()->select('id')->count();
        $price_count = $orders->reduce(fn ($acc, $order) => $acc + $order->payment->price, 0);

        return view('admin.dashboard', [
            ...compact('users_count', 'orders_count', 'products_count', 'price_count'),
            'totals' => json_decode($weekDays->values())
        ]);
    }

    public function orders()
    {
        return view('admin.orders');
    }

    public function products()
    {
        return view('admin.products');
    }

    public function payments()
    {
        $all_payments_count = 0;
        $success_payments_count = 0;
        $fail_payments_count = 0;

        Payment::all()->each(function ($item) use (&$all_payments_count, &$success_payments_count, &$fail_payments_count) {
            $all_payments_count++;
            if ($item->status === 'success') {
                $success_payments_count++;
            } else {
                $fail_payments_count++;
            }
        });

        return view('admin.payments', compact('all_payments_count', 'success_payments_count', 'fail_payments_count'));
    }

    public function users()
    {
        return view('admin.users');
    }

    public function courses()
    {
        return view('admin.courses');
    }

    public function tickets()
    {
        return view('admin.tickets');
    }
}
