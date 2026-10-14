<section class="tw:mx-4 tw:bssm:mx-0">
    <div class="auth-container" id="registerPage">
        <div class="auth-header">
            <h2><i class="fas fa-user"></i> ورود یا ثبت نام</h2>
        </div>
        <div class="auth-content">
            @if($this->okToLogin || $this->hasCode())
                @if($this->okToLogin)
                    <p class="text-center text-success">کد ارسالی تایید شد! برای ادامه لطفا بر روی دکمه زیر کلیک کنید. </p>
                    <button class="btn-auth" type="button" wire:click.prevent="login" wire:loading.attr="disabled">
                        <span wire:loading.remove wire:target="login">
                            <i class="fas fa-arrow-right me-2"></i>
                            ادامه
                        </span>
                        <span wire:loading wire:loading.class="d-flex justify-content-center align-items-center"  wire:target="login">
                            <div class="spinner-border spinner-border-sm text-success" role="status">
                              <span class="visually-hidden">Loading...</span>
                            </div>
                        </span>
                    </button>
                @else
                    <form wire:submit="submitAuth" class="auth-step active">

                        <p>
                            @if($shouldRegister)
                                شماره {{ session()->get('phone') }} در سایت وجود ندارد. برای <strong>ثبت نام</strong>، کد ارسالی به شماره را در کادر زیر وارد نمایید.
                            @else
                                برای <strong>ورود</strong> به حساب، لطفا کد ارسالی به شماره {{ session()->get('phone') }} را در کادر زیر وارد نمایید.
                            @endif
                            <a href="javascript:void(0)" wire:click.prevent="changeCode" class="tw:text-sm tw:text-green-600 tw:no-underline tw:hover:underline">تعویض شماره</a>
                        </p>
                        <p>کد: {{ session()->get('code') }}</p>

                        <div class="form-group">
                            <div class="d-flex justify-content-between align-items-center">
                                <label class="form-label" id="loginLabel">کد ارسالی:</label>
                                @error('code')
                                <span class="error text-danger">{{ $message }}</span>
                                @enderror
                            </div>
                            <div class="position-relative">
                                <input type="text" autocomplete="off" class="form-control has-icon @error('code') error @enderror" id="loginInput" placeholder="XXXXXX" wire:model="code">
                                <i class="input-icon fas fa-lock"></i>
                            </div>
                        </div>

                        <p wire:poll.1s.keep-alive class="text-center">زمان باقی مانده: <span class="fw-bold">{{ abs(session()->get('code_expires_at')->floorSecond()->diffInSeconds(now()->floorSecond())) }}</span> ثانیه</p>

                        <button class="btn-auth" wire:loading.attr="disabled" wire:target="submitAuth, changeCode">
                            <span wire:loading.remove wire:target="submitAuth, changeCode">
                                <i class="fas fa-sign-in-alt me-2"></i> تایید کد
                            </span>
                            <span wire:loading wire:loading.class="d-flex justify-content-center align-items-center"  wire:target="submitAuth, changeCode">
                                <div class="spinner-border spinner-border-sm text-success" role="status">
                                  <span class="visually-hidden">Loading...</span>
                                </div>
                            </span>
                        </button>
                    </form>
                @endif
            @else
                <form wire:submit="sendCode" class="auth-step active">
                    <p>لطفا شماره تماس خود را در کادر پایین وارد کنید.</p>

                    <div class="form-group">
                        <div class="d-flex justify-content-between align-items-center">
                            <label class="form-label" id="loginLabel">شماره تماس</label>
                            @error('phone')
                                <span class="error text-danger">{{ $message }}</span>
                            @enderror
                        </div>
                        <div class="position-relative">
                            <input type="text" autocomplete="off" class="form-control has-icon @error('phone') error @enderror" id="loginInput" placeholder="09xxxxxxxxx" wire:model="phone">
                            <i class="input-icon fas fa-phone"></i>
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
    </div>
</section>
