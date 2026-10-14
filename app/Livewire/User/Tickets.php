<?php

namespace App\Livewire\User;

use App\Models\Ticket;
use App\Models\TicketMessage;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Storage;
use Livewire\Component;
use Livewire\WithFileUploads;
use Usernotnull\Toast\Concerns\WireToast;

class Tickets extends Component
{
    use WireToast, WithFileUploads;

    public string $searchTitle = '';
    public string $title = '';
    public string $topic = '';
    public string $message = '';
    public $image = null;

    protected function rateLimit(string $key, int $maxAttempts = 1, int $decaySeconds = 120): bool
    {
        if (RateLimiter::tooManyAttempts($key, $maxAttempts)) {
            return false;
        }

        RateLimiter::hit($key, $decaySeconds);
        return true;
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

    public function createTicket()
    {
        $key = 'createTicket:' . (Auth::id() ?? request()->ip());

        $this->validate([
            'title' => 'required|string|max:50',
            'topic' => 'required|string',
            'message' => 'required|string|min:20|max:1000',
            'image' => 'nullable|file|mimes:jpg,jpeg,png,webp|max:5120'
        ]);

        if (!in_array($this->topic, ['درباره محصولات', 'مشکل در خرید', 'پیشنهاد یا انتقاد', 'مشکل فنی', 'سایر'])) {
            $this->addError('topic', 'لطفا یک مقدار درست انتخاب کنید.');
            return;
        }

        if (!$this->rateLimit($key, 5, 3600 * 24)) {
            toast()->danger('در هر 24 ساعت، تنها 5 بار مجاز به ساختن تیکت هستید.', 'خطا!')->push();
            return;
        }

        $ticket = new Ticket();
        $ticket->title = trim($this->title);
        $ticket->topic = $this->topic;
        $ticket->user_id = Auth::id();

        $ticket->save();
        if ($this->image) {
            $filename = basename($this->image->store(options: 'ticket_attachments', path: "ticket_".$ticket->id));
            $ticket->attachment_path = $filename;
            $ticket->update();
        }

        $firstMessage = new TicketMessage();
        $firstMessage->user_id = Auth::id();
        $firstMessage->ticket_id = $ticket->id;
        $firstMessage->content = $this->message;
        $firstMessage->save();

        toast()->success('تیکت جدید با موفیقت ساخته شد.', 'موفق!')->push();
        $this->reset();
    }

    public function render()
    {
        $tickets = Auth::user()->tickets()->when($this->searchTitle, function ($q, $s) {
            $q->whereLike('title', "%$s%");
        })->orderByDesc('created_at')->get();
        $ticketsCount = Auth::user()->tickets()->withoutTrashed()->count();

        return view('livewire.user.tickets', compact('tickets', 'ticketsCount'));
    }
}
