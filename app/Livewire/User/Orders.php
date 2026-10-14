<?php

namespace App\Livewire\User;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Carbon;
use Livewire\Component;
use Livewire\WithoutUrlPagination;
use Livewire\WithPagination;
use Morilog\Jalali\Jalalian;

class Orders extends Component
{
    use WithPagination, WithoutUrlPagination;

    public string|null $orderId = null;
    public string|null $date = null;
    public string|null $from_date = null;
    public string|null $to_date = null;
    public string|null $status = null;

    public function orderDetails($id)
    {
        $this->dispatch('showOrder', $id);
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
        $orders = auth()->user()->orders()->when($this->orderId, function ($q, $id) {
            $q->where('orders.id', $id);
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

        $this->resetPage();

        return view('livewire.user.orders', compact('orders', 'showExtraDates'));
    }
}
