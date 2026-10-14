<section id="profileSection" class="container-fluid py-4">
    <div class="row">
        <div class="col-lg-4">
            <!-- کارت اطلاعات کاربر -->
            <div class="profile-card">
                <div class="card-body text-center">
                    <div class="avatar-upload mb-3">
                        @if($image)
                            @if(in_array($image->getMimeType(), ['image/jpg', 'image/jpeg', 'image/png', 'image/webp']))
                                <img
                                    src="{{ $image->temporaryUrl() }}"
                                    alt="پروفایل"
                                    class="profile-avatar"
                                />
                            @else
                                <img
                                    src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iNjAiIGN5PSI2MCIgcj0iNjAiIGZpbGw9IiM0Q0FGNTAiLz48cGF0aCBkPSJNNjAgMzBDNjkuOTQxNiAzMCA3OCA0MC4xNTg0IDc4IDUyLjVINDJDNDIgNDAuMTU4NCA1MC4wNTg0IDMwIDYwIDMwWiIgZmlsbD0id2hpdGUiLz48Y2lyY2xlIGN4PSI2MCIgY3k9IjYwIiByPSIyMCIgZmlsbD0id2hpdGUiLz48L3N2Zz4="
                                    alt="پروفایل"
                                    class="profile-avatar"
                                />
                            @endif
                        @elseif(auth()->user()->image)
                            <img
                                src="{{ auth()->user()->image() }}"
                                alt="پروفایل"
                                class="profile-avatar"
                            />
                        @else
                            <img
                                src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iNjAiIGN5PSI2MCIgcj0iNjAiIGZpbGw9IiM0Q0FGNTAiLz48cGF0aCBkPSJNNjAgMzBDNjkuOTQxNiAzMCA3OCA0MC4xNTg0IDc4IDUyLjVINDJDNDIgNDAuMTU4NCA1MC4wNTg0IDMwIDYwIDMwWiIgZmlsbD0id2hpdGUiLz48Y2lyY2xlIGN4PSI2MCIgY3k9IjYwIiByPSIyMCIgZmlsbD0id2hpdGUiLz48L3N2Zz4="
                                alt="پروفایل"
                                class="profile-avatar"
                            />
                        @endif
                    </div>
                    <h5 id="profileName">{{ auth()->user()->f_name }} {{ auth()->user()->l_name }}</h5>
                    <p class="text-muted" id="profileEmail">
                        {{ auth()->user()->email ?? 'بدون ایمیل' }}
                    </p>
                    <p class="text-muted">
                        <i class="fas fa-calendar me-1"></i>
                        عضو از <span id="joinDate">{{ auth()->user()->created_at_jalali->format("Y/m/d") }}</span>
                    </p>
                    <div
                        x-data="{ uploading: false, progress: 0, color: 'blue' }"
                        x-on:livewire-upload-start="uploading = true; progress=0;"
                        x-on:livewire-upload-finish="uploading = false; color='green';"
                        x-on:livewire-upload-cancel="uploading = false; progress=0;"
                        x-on:livewire-upload-error="uploading = false; color='red';"
                        x-on:livewire-upload-progress="progress = $event.detail.progress">
                        <div x-show="uploading">
                            <div class="tw:flex tw:items-center tw:gap-1">
                                <div class="progress tw:w-full" role="progressbar" aria-label="Upload progress bar" x-bind:aria-valuenow="progress" aria-valuemin="0" aria-valuemax="100">
                                    <div class="progress-bar progress-bar-striped progress-bar-animated" x-bind:class="progress === 100 ? 'text-bg-success' : ''" x-bind:style="`width: ${progress}%`" x-text="`${progress}%`"></div>
                                </div>
                                <button type="button" wire:loading.attr="disabled" wire:click="$cancelUpload('image')" class="tw:flex tw:justify-center tw:items-center tw:p-1 tw:border tw:border-red-600 tw:rounded-full tw:text-red-600 tw:hover:bg-red-600 tw:hover:text-white tw:transition-all tw:transition-300">
                                    <i class="fas fa-xmark tw:w-3 tw:h-3"></i>
                                </button>
                            </div>
                        </div>
                        @if(!$image)
                            <label
                                for="image"
                                x-bind:class="uploading ? 'tw:hidden' : ''"
                                class="btn btn-outline-primary btn-sm mt-2"
                            >
                                <i class="fas fa-camera ms-1"></i>
                                تغییر تصویر پروفایل
                            </label>
                        @else
                            <div class="tw:flex tw:justify-center tw:items-center tw:gap-2">
                                <button type="button" wire:loading.attr="disabled" wire:click="removeImage" class="tw:flex tw:justify-center tw:items-center tw:gap-2 tw:mt-2 tw:p-2 tw:text-sm tw:border tw:border-red-600 tw:rounded-full tw:text-red-600 tw:hover:bg-red-600 tw:hover:text-white tw:transition-all tw:transition-300">
                                    <i class="fa-regular fa-xmark-circle"></i> لغو
                                </button>
                                <button type="button" wire:loading.attr="disabled" wire:click="updateUserImage" class="tw:flex tw:justify-center tw:items-center tw:gap-2 tw:mt-2 tw:p-2 tw:text-sm tw:border tw:border-blue-600 tw:rounded-full tw:text-blue-600 tw:hover:bg-blue-600 tw:hover:text-white tw:transition-all tw:transition-300">
                                    <i class="fas fa-floppy-disk"></i> ذخیره تصویر
                                </button>
                            </div>
                        @endif
                        <input type="file" accept="image/*" id="image" class="tw:hidden" wire:model="image"/>
                    </div>
                </div>
            </div>

            <!-- کارت آمار حساب -->
            <div class="profile-card mt-4">
                <div class="card-body">
                    <h6 class="card-title mb-3">
                        <i class="fas fa-chart-bar me-2"></i>
                        آمار حساب کاربری
                    </h6>
                    <div class="stats-item">
                        <span>تعداد سفارشات:</span>
                        <strong>{{ $orders_count }}</strong>
                    </div>
                    <div class="stats-item">
                        <span>دوره‌های خریداری شده:</span>
                        <strong>{{ $courses_count }}</strong>
                    </div>
                    <div class="stats-item">
                        <span>مجموع خریدها:</span>
                        <strong>{{ number_format($price_count) }} تومان</strong>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-lg-8">
            <!-- فرم ویرایش اطلاعات شخصی -->
            <div class="profile-card">
                <div class="card-body">
                    <h5 class="card-title mb-4">
                        <i class="fas fa-user-edit me-2"></i>
                        ویرایش اطلاعات شخصی
                    </h5>
                    <form wire:submit.prevent="updateUserProfile">
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label for="f_name" class="form-label">نام</label>
                                <input
                                    type="text"
                                    placeholder="نام خود را وارد کنید"
                                    id="f_name"
                                    class="form-control @error('f_name') tw:!border-red-600 tw:!outline-none @enderror tw:transition-all tw:transition-200"
                                    wire:model="f_name"
                                    wire:loading.class="tw:opacity-50 tw:grayscale tw:pointer-events-none"
                                />
                                @error('f_name')
                                <p class="tw:text-sm tw:text-red-600 tw:mt-1">
                                    {{ $message }}
                                </p>
                                @enderror
                            </div>
                            <div class="col-md-6 mb-3">
                                <label for="l_name" class="form-label">نام خانوادگی</label>
                                <input
                                    type="text"
                                    placeholder="نام خانوادگی خود را وارد کنید"
                                    id="l_name"
                                    class="form-control @error('l_name') tw:!border-red-600 tw:!outline-none @enderror tw:transition-all tw:transition-200"
                                    wire:model="l_name"
                                    wire:loading.class="tw:opacity-50 tw:grayscale tw:pointer-events-none"
                                />
                                @error('l_name')
                                <p class="tw:text-sm tw:text-red-600 tw:mt-1">
                                    {{ $message }}
                                </p>
                                @enderror
                            </div>
                            <div class="col-md-6 mb-3">
                                <label for="email" class="form-label">ایمیل</label>
                                <input
                                    type="email"
                                    placeholder="example@example.com"
                                    id="email"
                                    class="form-control @error('email') tw:!border-red-600 tw:!outline-none @enderror tw:transition-all tw:transition-200"
                                    wire:model="email"
                                />
                                @error('email')
                                <p class="tw:text-sm tw:text-red-600 tw:mt-1">
                                    {{ $message }}
                                </p>
                                @enderror
                            </div>
                            <div class="col-md-6 mb-3">
                                <label for="province" class="form-label">استان</label>
                                <select
                                    id="province"
                                    class="form-control @error('province') tw:!border-red-600 tw:!outline-none @enderror tw:transition-all tw:transition-200"
                                    wire:model="province"
                                >
                                    <option value="">استان خود را وارد کنید</option>
                                    @foreach($provinces as $province)
                                        <option value="{{ $province }}">{{ $province }}</option>
                                    @endforeach
                                </select>
                                @error('province')
                                <p class="tw:text-sm tw:text-red-600 tw:mt-1">
                                    {{ $message }}
                                </p>
                                @enderror
                            </div>
                            <div class="col-12 mb-3">
                                <label for="address" class="form-label">آدرس دقیق</label>
                                <textarea
                                    placeholder="آدرس دقیق خود را اینجا وارد کنید"
                                    id="address"
                                    class="form-control @error('address') tw:!border-red-600 tw:!outline-none @enderror tw:transition-all tw:transition-200"
                                    rows="3"
                                    wire:model="address"
                                >نکا، بلوار انقلاب، پلاک ۱۲۳</textarea>
                                @error('address')
                                <p class="tw:text-sm tw:text-red-600 tw:mt-1">
                                    {{ $message }}
                                </p>
                                @enderror
                            </div>
                            <div class="col-12">
                                <div class="d-flex gap-2">
                                    <button type="submit" class="btn btn-primary tw:w-full tw:md:w-auto">
                                        <i class="fas fa-save me-1"></i>
                                        ذخیره تغییرات
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <div class="profile-card mt-4">
                <div class="card-body">
                    <h5 class="card-title mb-4">
                        <i class="fas fa-phone me-2"></i>
                        تغییر شماره تلفن
                    </h5>

                    <livewire:update-phone />
                </div>
            </div>
        </div>
    </div>
</section>
