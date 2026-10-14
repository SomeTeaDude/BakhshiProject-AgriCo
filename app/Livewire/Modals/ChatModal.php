<?php

namespace App\Livewire\Modals;

use App\Models\Ticket;
use App\Models\TicketMessage;
use Illuminate\Support\Facades\Auth;
use Livewire\Component;
use Usernotnull\Toast\Concerns\WireToast;

class ChatModal extends Component
{
    use WireToast;

    public Ticket|null $ticket = null;
    public string $message = '';

    protected $listeners = [
        'openChat' => 'loadTicket'
    ];

    public function loadTicket($id)
    {
        $ticket = Ticket::withTrashed()->find($id);

        if (!$ticket) {
            toast()->danger('متاسفانه تیکت مورد نظر پیدا نشد.', 'خطا!')->push();
            return;
        }

        $this->ticket = $ticket;
    }

    public function closeModal()
    {
        $this->reset();
    }

    public function sendMessage()
    {
        if (!$this->ticket || !auth()->check() || $this->ticket->trashed()) return;

        $user = auth()->user();
        if (
            ($user->isUser() && $this->ticket->user_id !== $user->id) ||
            ($user->role === 'support' && $this->ticket->admin_id && $this->ticket->admin_id !== $user->id) ||
            !in_array($user->role, ['user', 'admin', 'support'])
        ) {
            toast()->danger('شما اجازه ارسال پیام در این تیکت را ندارید.', 'خطا!')->push();
            return;
        }

        $this->validate([
            'message' => 'required|string|max:1000'
        ], [
            'message.required' => 'لطفا کادر را خالی نگذارید.'
        ]);

        $message = new TicketMessage();
        $message->user_id = Auth::id();
        $message->ticket_id = $this->ticket->id;
        $message->content = htmlspecialchars(trim($this->message));
        $message->save();
        if (!$user->isUser()) {
            $this->ticket->admin_id = $user->id;
            $this->ticket->update();
            $this->dispatch('refresh');
        }
        $this->message = '';
    }

    public function render()
    {
        return view('livewire.modals.chat-modal');
    }
}
