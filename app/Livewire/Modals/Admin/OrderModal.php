<?php

namespace App\Livewire\Modals\Admin;

use App\Models\Order;
use App\Models\OrderLog;
use App\Models\OrderStatus;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;
use Livewire\Component;
use Morilog\Jalali\Jalalian;
use Usernotnull\Toast\Concerns\WireToast;

class OrderModal extends Component
{
    use WireToast;

    public Order|null $order = null;
    public string|null $status = null;
    public string|null $finished_at = null;
    public string|null $initialStatus = null;
    public bool $isDropdownOpen = false;
    public array $allowed = [
        'waiting' => ['waiting', 'pending', 'canceled'],
        'pending' => ['waiting', 'pending', 'sending', 'canceled'],
        'sending' => ['waiting', 'pending', 'sending', 'completed', 'canceled'],
        'completed' => [],
        'canceled' => []
    ];

    protected $listeners = [
        'showOrder' => 'loadOrder'
    ];

    public function loadOrder(Order $order)
    {
        $this->order = $order;
        $this->status = $this->order->status;
        $this->initialStatus = $this->order->status;
    }

    public function closeModal()
    {
        $this->order = null;
        $this->status = null;
        $this->initialStatus = null;
        $this->finished_at = null;
    }

    public function setStatus($status)
    {
        if ($this->initialStatus === 'canceled' || $this->initialStatus === 'completed') return;
        if (!in_array($status, ['waiting', 'pending', 'sending', 'completed', 'canceled'])) {
            toast()->danger('مقدار وضعیت جدید صحیح نمیباشد لطفا صفحه را رفرش کنید و دوباره تلاش کنید.', 'خطا!')->push();
            return;
        }
        $this->status = $status;
    }

    public function updateOrder()
    {
        if (!$this->order) return;
        if ($this->initialStatus === 'canceled' || $this->initialStatus === 'completed') return;
        if ($this->status !== $this->initialStatus && !in_array($this->status, $this->allowed[$this->initialStatus])) {
            toast()->danger('فقط میتوانید وضعیت سفارش را به یک مرحله بالاتر عوض کنید.', 'خطا!')->push();
            return;
        }

        $statusUpdated = false;
        $finishedAtUpdated = false;

        try {
            if ($this->finished_at) {
                $dt = \DateTime::createFromFormat('U', intval($this->finished_at) + 3600 * 24, new \DateTimeZone('Asia/Tehran'));

                if ($dt === false) {
                    // Handle invalid timestamp
                    throw new \Exception("لطفا یک تاریخ درست انتخاب کنید.");
                }

                $estimatedFinishedAt = Jalalian::fromDateTime($dt)->toCarbon();

                if ($estimatedFinishedAt < now()) {
                    throw new \Exception('تاریخ انتخابی نباید قبل تر از امروز باشد.');
                }
                $this->order->finished_at = $estimatedFinishedAt;
                $finishedAtUpdated = true;
            }
        } catch (\Exception $e) {
            toast()->danger($e->getMessage(), 'خطا!')->push();
            return;
        }

        $orderLog = new OrderLog();
        $orderLog->order_id = $this->order->id;
        $orderLog->status_changed_by_user_id = Auth::id();
        if ($this->status || $this->status !== $this->initialStatus) {
            $orderLog->from_status = $this->order->status;
            $this->order->status = $this->status;
            $orderLog->to_status = $this->order->status;
            if ($this->status === 'canceled' || $this->status === 'completed') {
                $this->order->finished_at = now();
            }
            $statusUpdated = true;
        }

        if (!$statusUpdated && !$finishedAtUpdated) return;

        $this->order->update();
        $orderLog->save();
        OrderStatus::updateOrCreate([
            'status' => $this->initialStatus,
            'order_id' => $this->order->id
        ], [
            'changed_at' => now()
        ]);
        $this->loadOrder($this->order);
        toast()->success('وضعیت سفارش با موفقیت بروزرسانی شد.', 'موفق!')->push();
        $this->dispatch('orderUpdated');
        if ($this->status === 'canceled' && $this->order->payment->type === 'product') {
            foreach (json_decode($this->order->payment->items, true) as $item) {
                $product = Product::find($item['id']);
                if ($product) {
                    $product->quantity += $item['quantity'];
                    $product->update();
                }
            }
        }
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
            } elseif ($orderStatus && $orderStatus->status === $this->order->status) {
                $orderStatus->delete();
                $result['state'] = 'current';
                $result['icon'] = 'spinner fa-spin';
                $currentFound = true;
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

            if ($result['state'] === 'current' && $this->initialStatus === 'completed') {
                $result['state'] = 'completed';
                $result['date'] = $this->order->finished_at ? $this->order->finished_at_jalali->format('Y/m/d - H:i') : 'نامشخص';
                $result['icon'] = 'check';
            }
            if (($result['state'] === 'current' || $result['state'] === '') && $this->initialStatus === 'canceled') {
                $result['state'] = 'canceled';
                $result['date'] = 'لغو شده';
                $result['icon'] = 'xmark';
            }

            return $result;
        }, $states);
    }

    public function render()
    {
        return view('livewire.modals.admin.order-modal');
    }
}
