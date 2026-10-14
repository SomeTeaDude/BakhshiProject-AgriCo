<?php

namespace App\Livewire;

use App\Traits\HasCodeSending;
use Illuminate\Support\Facades\Auth;
use Livewire\Component;
use Usernotnull\Toast\Concerns\WireToast;

class UpdatePhone extends Component
{
    use HasCodeSending, WireToast;

    public function checkPhone()
    {
        if ($this->phone === Auth::user()->phone) {
            $this->addError('phone', 'لطفا شماره ای به جز شماره تلفن خود را وارد کنید');
            return;
        }

        $this->sendCode(true);
    }

    public function changeCode()
    {
        $this->forgetCode(false);
    }

    public function updatePhone()
    {
        try {
            Auth::user()->update([
                'phone' => session('phone')
            ]);
        } catch (\Throwable $e) {
            toast()->danger('متاسفانه هنگام تعویض شماره تلفن مشکلی رخ داد. لطفا دوباره تلاش کنید.', 'خطا!')->push();
            return;
        }
        toast()->success('شماره تماس شما با موفقیت عوض شد.', 'موفق!')->push();
        $this->forgetCode();
    }

    public function render()
    {
        return view('livewire.update-phone');
    }
}
