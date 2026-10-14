<?php

namespace App\Livewire\Modals;

use App\Models\Payment;
use Livewire\Component;

class PaymentModal extends Component
{
    public Payment|null $payment = null;

    protected $listeners = [
        'showPayment' => 'loadPayment'
    ];

    public function loadPayment(Payment $payment)
    {
        $this->payment = $payment;
    }

    public function closeModal()
    {
        $this->payment = null;
    }

    public function render()
    {
        return view('livewire.modals.payment-modal');
    }
}
