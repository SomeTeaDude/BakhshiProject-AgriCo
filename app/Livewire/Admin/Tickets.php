<?php

namespace App\Livewire\Admin;

use App\Models\Ticket;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Livewire\Component;
use Livewire\WithoutUrlPagination;
use Livewire\WithPagination;
use Usernotnull\Toast\Concerns\WireToast;

class Tickets extends Component
{
    use WireToast, WithPagination, WithoutUrlPagination;

    public string $filter = '';
    public string $topic = '';
    public string $message = '';

    public string $status = '';
    public string $searchTopic = '';
    public string $ticketId = '';
    public string $name = '';
    public string $phone = '';

    protected $listeners = [
        'refresh' => '$refresh'
    ];

    public function refreshList()
    {
        $this->dispatch('refresh');
    }

    public function openChat($id)
    {
        $this->dispatch('openChat', $id);
    }

    public function closeTicket($id)
    {
        $ticket = Ticket::withTrashed()->find($id);

        if (!$ticket) {
            toast()->danger('متاسفانه تیکت مورد نظر پیدا نشد.', 'خطا!')->push();
            return;
        }
        if (!Auth::user()->isAdmin() && $ticket->admin_id !== Auth::id() && $ticket->user_id !== Auth::id()) {
            toast()->danger('شما اجازه ی بستن این تیکت را ندارید.', 'خطا!')->push();
            return;
        }

        $ticket->delete();
        toast()->success('تیکت با موفقیت بسته شد!', 'موفق!')->push();
    }

    public function updated($property)
    {
        if (in_array($property, ['ticketId', 'status', 'searchTopic', 'name', 'phone'])) {
            if ($property === 'ticketId') {
                $this->status = '';
                $this->searchTopic = '';
                $this->name = '';
                $this->phone = '';
            }
            $this->resetPage();
        }
    }

    public function render()
    {
        $tickets = Ticket::when(!$this->filter || !in_array($this->filter, ['', 'mine']), function ($q, $f) {
            $q->withoutTrashed()->whereNull('admin_id');
        })->when($this->filter === 'mine', function ($q, $f) {
            $q->withTrashed()->where('admin_id', Auth::id());
        })->when($this->topic, function ($q, $t) {
            $q->where('topic', $t);
        })->orderByRaw('CASE WHEN deleted_at IS NULL THEN 0 ELSE 1 END')
            ->orderByDesc('created_at')
            ->limit(10)
            ->get();

        $allTickets = Ticket::withTrashed()->when($this->status === 'pending', function ($q) {
            $q->withoutTrashed()->whereNull('admin_id');
        })->when($this->status === 'open', function ($q) {
            $q->withoutTrashed()->whereNotNull('admin_id');
        })->when($this->status === 'closed', function ($q) {
            $q->onlyTrashed();
        })->when($this->searchTopic, function ($q, $t) {
            $q->where('topic', $t);
        })->when($this->ticketId, function ($q, $t) {
            $t = str_replace('TKT-100', '', $t);
            $q->where('id', $t);
        })->when($this->name, function ($q, $n) {
            $q->whereHas('user', function ($q) use ($n) {
                $driver = DB::getDriverName();

                $concat = match ($driver) {
                    'sqlite' => "f_name || ' ' || l_name",
                    default  => "CONCAT(f_name, ' ', l_name)",
                };

                $q->whereLike(DB::raw($concat), "%$n%");
            });
        })->when($this->phone, function ($q, $p) {
            $q->whereHas('user', function ($q) use ($p) {
                $q->whereLike('phone', "$p%");
            });
        })->orderByDesc('created_at')->paginate(10);

        return view('livewire.admin.tickets', compact('tickets', 'allTickets'));
    }
}
