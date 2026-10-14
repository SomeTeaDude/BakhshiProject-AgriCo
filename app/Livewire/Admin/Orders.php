<?php

namespace App\Livewire\Admin;

use App\Models\Order;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Livewire\Component;
use Livewire\WithoutUrlPagination;
use Livewire\WithPagination;
use Morilog\Jalali\Jalalian;

class Orders extends Component
{
    use WithPagination, WithoutUrlPagination;

    public string|null $username = null;
    public string|null $orderId = null;
    public string|null $date = null;
    public string|null $from_date = null;
    public string|null $to_date = null;
    public string|null $status = null;

    protected $listeners = [
        'orderUpdated' => '$refresh'
    ];

    public function orderDetails($id)
    {
        $this->dispatch('showOrder', $id);
    }

    public function updated($property)
    {
        if (in_array($property, ['username', 'orderId', 'status', 'date', 'from_date', 'to_date'])) {
            if ($property === 'orderId') {
                $this->username = '';
                $this->status = '';
                $this->date = '';
                $this->from_date = '';
                $this->to_date = '';
            }
            $this->resetPage();
        }
    }

    public function render()
    {
        $showExtraDates = false;
        if ($this->date !== 'custom') {
            $this->from_date = null;
            $this->to_date = null;
        } else {
            $showExtraDates = true;
        }

        $orders = Order::when($this->orderId, function ($q, $id) {
            $id = str_replace('ORD-100', '', $id);
            $q->where('orders.id', $id);
        })->when($this->username, function ($q, $u) {
            $q->whereHas('payment.user', function ($query) use ($u) {
                $driver = DB::getDriverName();
                $concat = match ($driver) {
                    'sqlite' => "f_name || ' ' || l_name",
                    default  => "CONCAT(f_name, ' ', l_name)",
                };
                $query->whereLike('f_name', "%$u%")
                    ->orWhereLike('l_name', "%$u%")
                    ->orWhereLike(DB::raw($concat), "%$u%");
            });
        })->when($this->status, function($q, $s) {
            if (!in_array($s, ['waiting', 'pending', 'sending', 'completed', 'canceled'])) return;
            $q->where('orders.status', $s);
        })->when($this->date && $this->date !== 'custom', function ($q, $d) {
            $now = Carbon::now();

            match ($this->date) {
                'today' => $q->whereDate('orders.created_at', $now->toDateString()),

                'week' => $q->whereBetween('orders.created_at', [
                    $now->clone()->startOfWeek(),
                    $now->clone()->endOfWeek(),
                ]),

                'month' => $q->whereMonth('orders.created_at', $now->month)
                    ->whereYear('orders.created_at', $now->year),

                'year' => $q->whereYear('orders.created_at', $now->year),

                default => null,
            };
        })->when($this->date === 'custom' && $this->from_date, function (Builder $q) {
            $from_date = Jalalian::fromDateTime(\DateTime::createFromFormat('U', $this->from_date))->toCarbon();
            $to_date = null;
            if ($this->to_date) {
                $to_date = Jalalian::fromDateTime(\DateTime::createFromFormat('U', $this->to_date))->toCarbon();
                $q->whereBetween('orders.created_at', [$from_date, $to_date]);
            } else {
                $q->whereDate('orders.created_at', '>', $from_date);
            }
        })->orderByDesc('created_at')->paginate(6);

        return view('livewire.admin.orders', compact('orders', 'showExtraDates'));
    }
}
