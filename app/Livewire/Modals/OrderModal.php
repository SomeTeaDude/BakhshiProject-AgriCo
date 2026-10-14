<?php

namespace App\Livewire\Modals;

use App\Models\Order;
use App\Models\OrderStatus;
use Livewire\Component;
use Morilog\Jalali\Jalalian;

class OrderModal extends Component
{
    public Order|null $order = null;

    protected $listeners = [
        'showOrder' => 'loadOrder'
    ];

    public function loadOrder(Order $order)
    {
        $this->order = $order;
    }

    public function closeModal()
    {
        $this->order = null;
    }

    public function getTimeline(): array
    {
        if (!$this->order) return [];

        $states = [
            ['waiting', 'تایید پرداخت'],
            ['pending', 'آماده سازی'],
            ['sending', 'ارسال'],
            ['completed', 'تحویل']
        ];

        $currentFound = false;
        return array_map(function ($state) use (&$currentFound) {
            [$state, $name] = $state;
            $orderStatus = OrderStatus::where('status', $state)->where('order_id', $this->order->id)->first();

            $result = [
                'name' => $name,
                'date' => 'در انتظار',
                'icon' => 'check'
            ];

            if ($orderStatus && $currentFound) {
                $orderStatus->delete();
                $result['state'] = '';
                $result['icon'] = 'clock';
            } elseif ($orderStatus) {
                $result['state'] = 'completed';
                $result['date'] = Jalalian::fromCarbon($orderStatus->changed_at)->format('Y/m/d - H:i');
            } elseif ($state === $this->order->status) {
                $result['state'] = 'current';
                $result['icon'] = 'spinner fa-spin';
                $currentFound = true;
            } else {
                $result['state'] = '';
                $result['icon'] = 'clock';
            }

            if ($result['state'] === 'current' && $this->order->status === 'completed') {
                $result['state'] = 'completed';
                $result['date'] = $this->order->finished_at ? $this->order->finished_at_jalali->format('Y/m/d - H:i') : 'نامشخص';
                $result['icon'] = 'check';
            }
            if (($result['state'] === 'current' || $result['state'] === '') && $this->order->status === 'canceled') {
                $result['state'] = 'canceled';
                $result['date'] = 'لغو شده';
                $result['icon'] = 'xmark';
            }

            return $result;
        }, $states);
    }

    public function render()
    {
        return view('livewire.modals.order-modal');
    }
}
