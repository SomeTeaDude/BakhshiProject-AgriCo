<?php

namespace App\Traits;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Usernotnull\Toast\Concerns\WireToast;

trait HasCodeSending {
    use WireToast;

    public string $phone;
    public string $code;
    public bool $okToLogin = false;

    public function mount()
    {
        if (!$this->hasCode()) {
            $this->forgetCode();
        }
    }

    protected function rateLimit(string $key, int $maxAttempts = 1, int $decaySeconds = 120): bool
    {
        if (RateLimiter::tooManyAttempts($key, $maxAttempts)) {
            return false;
        }

        RateLimiter::hit($key, $decaySeconds);
        return true;
    }

    private function hasCode()
    {
        return session()->has('code') && session()->get('code_expires_at') > now();
    }

    private function forgetCode(bool $forgetPhone = true)
    {
        session()->forget('code');
        if ($forgetPhone) session()->forget('phone');
        session()->forget('code_expires_at');
        $this->code = '';
        $this->phone = '';
    }

    public function sendCode(bool $updating = false)
    {
        $key = 'action:' . (Auth::id() ?? request()->ip());

        if ($updating) {
            $this->validate([
                'phone' => 'required|min:11|max:11|unique:users,phone,' . Auth::id()
            ], [
                'phone.unique' => 'این شماره تلفن قبلا انتخاب شده است.'
            ]);
        } else {
            $this->validate([
                'phone' => 'required|min:11|max:11'
            ]);
        }

        $user = User::withTrashed()->where('phone', $this->phone)->first();

        if ($user && $user->trashed()) {
            toast()->danger('این شماره از سایت مسدود شده است. برای اطلاعات بیشتر با مدیر سایت تماس بگیرید.', 'خطا!')->push();
            return;
        }

        if (!$updating && !$user) {
            $this->shouldRegister = true;
        } else {
            $this->shouldRegister = false;
        }

        if (!$this->rateLimit($key, 2, 120)) {
            $this->addError('phone', "هر 2 دقیقه دو بار مجاز به ارسال کد می‌باشید.");
            return;
        }

        session()->put('code', rand(100000, 999999));
        session()->put('phone', $this->phone);
        session()->put('code_expires_at', now()->addSeconds(120));
    }

    private function validateForm()
    {
        $this->validate([
            'code' => 'required|integer'
        ]);

        if (intval($this->code) !== session()->get('code')) {
            $this->addError('code', 'کد وارد شده اشتباه میباشد.');
            return false;
        }
        return true;
    }
}
