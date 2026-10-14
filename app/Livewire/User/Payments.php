<?php

namespace App\Livewire\User;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Livewire\Component;
use Livewire\WithoutUrlPagination;
use Livewire\WithPagination;
use Morilog\Jalali\Jalalian;

class Payments extends Component
{
    use WithPagination, WithoutUrlPagination;

    public string|null $type = null;
    public string|null $status = null;
    public string|null $date = null;

    public string|null $from_date = null;
    public string|null $to_date = null;

    public function paymentDetails($id)
    {
        $this->dispatch('showPayment', $id);
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
        $payments = Auth::user()->payments()->orderByDesc('created_at')
            ->when($this->type, function ($q, $t) {
                $q->where('type', $t);
            })->when($this->status, function ($q, $s) {
                $q->where('status', $s);
            })->when($this->date && $this->date !== 'custom', function ($q, $d) {
                $now = Carbon::now();

                match ($this->date) {
                    'today' => $q->whereDate('created_at', $now->toDateString()),

                    'week' => $q->whereBetween('created_at', [
                        $now->clone()->startOfWeek(),
                        $now->clone()->endOfWeek(),
                    ]),

                    'month' => $q->whereMonth('created_at', $now->month)
                        ->whereYear('created_at', $now->year),

                    'year' => $q->whereYear('created_at', $now->year),

                    default => null,
                };
            })->when($this->date === 'custom' && $this->from_date, function (Builder $q) {
                $from_date = Jalalian::fromDateTime(\DateTime::createFromFormat('U', $this->from_date))->toCarbon();
                $to_date = null;
                if ($this->to_date) {
                    $to_date = Jalalian::fromDateTime(\DateTime::createFromFormat('U', $this->to_date))->toCarbon();
                    $q->whereBetween('created_at', [$from_date, $to_date]);
                } else {
                    $q->whereDate('created_at', '>', $from_date);
                }
            })->orderByDesc('created_at')->paginate(10);

        $this->resetPage();

        return view('livewire.user.payments', compact('payments', 'showExtraDates'));
    }
}
