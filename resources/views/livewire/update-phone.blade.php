<div class="auth-content tw:max-w-[450px] tw:mx-auto">
    @if($this->okToLogin || $this->hasCode())
        <form wire:submit="updatePhone" class="auth-step active">
            <p>لطفا کد ارسالی به شماره {{ session()->get('phone') }} را وارد نمایید. <a href="javascript:void(0)" wire:click.prevent="changeCode" class="tw:text-sm tw:text-green-600 tw:no-underline tw:hover:underline">تعویض شماره</a></p>
            <p>کد: {{ session()->get('code') }}</p>

            <div class="form-group">
                <div class="d-flex justify-content-between align-items-center">
                    <label class="form-label" id="loginLabel">کد ارسالی:</label>
                    @error('code')
                    <span class="error text-danger">{{ $message }}</span>
                    @enderror
                </div>
                <div class="position-relative">
                    <input type="text" class="form-control has-icon @error('code') tw:!border-red-600 @enderror" id="loginInput" placeholder="XXXXXX" wire:model="code">
                    <i class="input-icon fas fa-lock @error('code') tw:!text-red-600 @enderror"></i>
                </div>
            </div>

            <p wire:poll.1s.keep-alive class="text-center">زمان باقی مانده: <span class="fw-bold">{{ abs(session()->get('code_expires_at')->floorSecond()->diffInSeconds(now()->floorSecond())) }}</span> ثانیه</p>

            <button class="btn-auth" wire:loading.attr="disabled" wire:target="updatePhone, changeCode">
                <span wire:loading.remove wire:target="updatePhone, changeCode">
                    <i class="fa-regular fa-check-circle me-2"></i> تایید کد
                </span>
                <span wire:loading wire:loading.class="d-flex justify-content-center align-items-center"  wire:target="updatePhone, changeCode">
                    <div class="spinner-border spinner-border-sm text-success" role="status">
                      <span class="visually-hidden">Loading...</span>
                    </div>
                </span>
            </button>
        </form>
    @else
        <form wire:submit="checkPhone" class="auth-step active">
            <p>لطفا شماره تماس جدید خود را در کادر پایین وارد کنید.</p>

            <div class="form-group">
                <div class="d-flex justify-content-between align-items-center">
                    <label class="form-label" id="loginLabel">شماره تلفن</label>
                    @error('phone')
                        <span class="error text-danger">{{ $message }}</span>
                    @enderror
                </div>
                <div class="position-relative">
                    <input type="text" class="form-control has-icon @error('phone') tw:!border-red-600 @enderror" id="loginInput" placeholder="09xxxxxxxxx" wire:model="phone">
                    <i class="input-icon fas fa-phone @error('phone') tw:!text-red-600 @enderror"></i>
                </div>
            </div>

            <button class="btn-auth" wire:loading.attr="disabled">
                <span wire:loading.remove>
                    <i class="fas fa-paper-plane me-2"></i> ارسال کد
                </span>
                <span wire:loading wire:loading.class="d-flex justify-content-center align-items-center">
                    <div class="spinner-border spinner-border-sm text-success" role="status">
                      <span class="visually-hidden">Loading...</span>
                    </div>
                </span>
            </button>
        </form>
    @endif
</div>
