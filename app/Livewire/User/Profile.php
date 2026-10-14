<?php

namespace App\Livewire\User;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Livewire\Component;
use Livewire\WithFileUploads;
use Usernotnull\Toast\Concerns\WireToast;

class Profile extends Component
{
    use WireToast, WithFileUploads;

    public array $provinces;

    public string $f_name;
    public string $l_name;
    public string|null $email = null;
    public string|null $province = null;
    public string|null $address = null;

    public $image;

    public function mount()
    {
        $this->provinces = User::provinces();

        $user = Auth::user();
        $this->f_name = $user->f_name;
        $this->l_name = $user->l_name;
        $this->email = $user->email;
        $this->province = $user->province;
        $this->address = $user->address;
    }

    public function updateUserProfile()
    {
        $this->validate([
            'f_name' => 'required|max:40',
            'l_name' => 'required|max:40',
            'email' => 'email|nullable|max:150',
            'province' => 'nullable|max:255',
            'address' => 'nullable|max:255'
        ]);

        if ($this->province && !in_array($this->province, $this->provinces)) {
            $this->addError('province', 'لطفا یک استان درست از لیست انتخاب کنید.');
            return;
        }

        if (($this->province || $this->address) && !($this->province && $this->address)) {
            if (!$this->province) {
                $this->addError('province', 'لطفا استان و آدرس را باهم وارد کنید.');
                return;
            }
            if (!$this->address) {
                $this->addError('address', 'لطفا آدرس و استان را باهم وارد کنید.');
                return;
            }
        }

        try {
            Auth::user()->update([
                'f_name' => $this->f_name,
                'l_name' => $this->l_name,
                'email' => $this->email,
                'province' => $this->province,
                'address' => $this->address,
            ]);
        } catch (\Throwable $e) {
            toast()->danger('مشکلی در هنگام ذخیره اطلاعات بوجود آمد. لطفا دوباره تلاش کنید.', 'خطا!')->push();
            return;
        }

        toast()->success('اطلاعات پروفایل شما با موفقیت بروزرسانی شدند.', 'موفق!')->push();
        $this->dispatch('profileUpdated');
    }

    public function updateUserImage()
    {
        $this->validate([
            'image' => 'required|file|mimes:jpg,jpeg,png,webp|max:10240',
        ],[
            'image.max' => 'حجم فایل باید کمتر از 10 مگابایت باشد.'
        ]);

        $prevImage = Auth::user()->image ? "user_".Auth::id() . "/" . Auth::user()->image : null;
        try {
            $filename = basename($this->image->store(options: 'user_images', path: "user_".Auth::id()));
        } catch (\Throwable $e) {
            toast()->danger('مشکلی در هنگام ذخیره تصویر رخ داد. لطفا دوباره تلاش کنید.', 'خطا!')->push();
            return;
        }
        auth()->user()->update([
            'image' => $filename
        ]);
        if ($prevImage) {
            Storage::disk('user_images')->delete($prevImage);
        }
        $this->removeImage();
        toast()->success('تصویر پروفایل شما با موفقیت بروزرسانی شد.', 'موفق!')->push();
        $this->dispatch('profileUpdated');
    }

    public function removeImage()
    {
        $this->image = null;
        $this->dispatch('removeImage');
    }

    public function render()
    {
        $orders_count = Auth::user()->orders()->count();
        $courses_count = Auth::user()->courses()->count();
        $price_count = Auth::user()->orders()->get()->reduce(fn($acc, $order) => $acc + $order->payment->price, 0);

        return view('livewire.user.profile', compact('orders_count', 'courses_count', 'price_count'));
    }
}
