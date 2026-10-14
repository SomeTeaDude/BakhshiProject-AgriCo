<section id="supportSection" class="container-fluid py-4">
    <div class="row tw:flex-col tw:bsxl:flex-row">
        <div class="col-xl-8">
            <div class="card mb-4" x-data="{toggleTab: true}">
                <div class="card-header bg-light">
                    <h5 class="card-title mb-0">
                        <i class="fas fa-headset me-2"></i>
                        گفتگو با پشتیبانی
                    </h5>
                </div>
                <div class="card-body p-0">
                    <div class="d-flex border-bottom" id="supportTabs">
                        <button
                            class="btn btn-outline-primary rounded-0 border-0"
                            x-bind:class="!toggleTab ? 'active' : ''"
                            @click="toggleTab = false"
                        >
                            <i class="fas fa-plus me-2"></i>تیکت جدید
                        </button>
                        <button
                            class="btn btn-outline-secondary rounded-0 border-0"
                            x-bind:class="toggleTab ? 'active' : ''"
                            @click="toggleTab = true"
                        >
                            <i class="fas fa-list me-2"></i>تیکت‌های من
                            @if($ticketsCount)
                                <span class="badge bg-primary ms-1">{{ $ticketsCount }}</span>
                            @endif
                        </button>
                    </div>

                    <!-- بخش تیکت جدید -->
                    <div class="support-tab" x-bind:class="!toggleTab ? 'active' : ''">
                        <div class="tw:flex tw:flex-col tw:justify-start tw:items-start tw:gap-4 tw:w-full tw:p-4">
                            <div class="tw:flex tw:flex-col tw:bssm:flex-row tw:items-center tw:gap-4 tw:w-full">
                                <div class="tw:w-full tw:bssm:w-1/2">
                                    <div class="tw:flex tw:justify-between tw:items-center tw:gap-1 tw:w-full">
                                        <label for="title" class="form-label tw:text-nowrap">عنوان تیکت <span
                                                class="tw:text-red-600">*</span></label>
                                        @error('title')
                                        <p class="tw:mb-0 tw:text-xs tw:text-red-600">{{ $message }}</p>
                                        @enderror
                                    </div>
                                    <input type="text" id="title"
                                           class="tw:w-full tw:p-2 tw:rounded-sm tw:border @error('title') tw:border-red-600 @else tw:border-gray-600/25 tw:hover:border-gray-600 tw:focus:border-gray-600 @enderror tw:outline-none tw:transition-all tw:transition-200"
                                           wire:model.live="title">
                                </div>
                                <div class="tw:w-full tw:bssm:w-1/2">
                                    <div class="tw:flex tw:justify-between tw:items-center tw:gap-1 tw:w-full">
                                        <label for="topic" class="form-label tw:text-nowrap">موضوع <span
                                                class="tw:text-red-600">*</span></label>
                                        @error('topic')
                                        <p class="tw:mb-0 tw:text-xs tw:text-red-600">{{ $message }}</p>
                                        @enderror
                                    </div>
                                    <select id="topic"
                                            class="tw:w-full tw:p-2 tw:rounded-sm tw:border @error('topic') tw:border-red-600 @else tw:border-gray-600/25 tw:hover:border-gray-600 tw:focus:border-gray-600 @enderror tw:outline-none tw:transition-all tw:transition-200"
                                            wire:model.live="topic">
                                        <option value="">انتخاب موضوع...</option>
                                        <option value="درباره محصولات">
                                            درباره محصولات
                                        </option>
                                        <option value="مشکل در خرید">مشکل در خرید</option>
                                        <option value="پیشنهاد یا انتقاد">
                                            پیشنهاد یا انتقاد
                                        </option>
                                        <option value="مشکل فنی">مشکل فنی</option>
                                        <option value="سایر">سایر</option>
                                    </select>
                                </div>
                            </div>
                            <div class="tw:w-full tw:mb-4">
                                <div class="tw:flex tw:justify-between tw:items-center tw:gap-1 tw:w-full">
                                    <label for="message" class="form-label tw:text-nowrap">پیام شما <span
                                            class="tw:text-red-600">*</span></label>
                                    @error('message')
                                        <p class="tw:mb-0 tw:text-xs tw:text-red-600">{{ $message }}</p>
                                    @enderror
                                </div>
                                <textarea
                                    class="tw:w-full tw:p-2 tw:rounded-sm tw:border @error('message') tw:border-red-600 @else tw:border-gray-600/25 tw:hover:border-gray-600 tw:focus:border-gray-600 @enderror tw:outline-none tw:transition-all tw:transition-200"
                                    id="message"
                                    rows="5"
                                    placeholder="متن پیام خود را با جزئیات کامل بنویسید..."
                                    wire:model.live="message"
                                ></textarea>
                            </div>

                            <div class="tw:w-full tw:bsxl:w-1/2 tw:mb-4"
                                 x-data="{ uploading: false, progress: 0, color: 'blue' }"
                                 x-on:livewire-upload-start="uploading = true; progress=0;"
                                 x-on:livewire-upload-finish="uploading = false; color='green';"
                                 x-on:livewire-upload-cancel="uploading = false; progress=0;"
                                 x-on:livewire-upload-error="uploading = false; color='red';"
                                 x-on:livewire-upload-progress="progress = $event.detail.progress">
                                <label for="image" class="form-label tw:text-nowrap">عکس ضمیم (اختیاری):</label>
                                <div class="tw:flex tw:justify-between tw:items-start tw:gap-1">
                                    <div class="tw:flex tw:flex-col tw:justify-between tw:gap-1 tw:w-[calc(100%-80px)]" style="height: -moz-available; height: -webkit-fill-available;">
                                        <div class="tw:flex tw:flex-col tw:justify-between tw:items-start tw:gap-1 tw:w-full">
                                            <input type="file" accept="image/*" id="image" class="tw:hidden" wire:model="image">
                                            @if($image)
                                                <div class="tw:flex tw:justify-start tw:items-center tw:gap-1">
                                                    <button type="button" class="btn btn-outline-danger btn-sm tw:text-nowrap" wire:click="removeImage"
                                                            wire:loading.attr="disabled"
                                                            wire:target="removeImage"
                                                            x-bind:class="uploading ? 'tw:opacity-50 tw:pointer-events-none' : ''">برداشتن عکس</button>
                                                </div>
                                            @else
                                                <div class="tw:flex tw:justify-start tw:items-center tw:gap-1">
                                                    <label for="image" class="btn btn-outline-primary btn-sm tw:text-nowrap"
                                                           x-bind:class="uploading ? 'tw:opacity-50 tw:pointer-events-none' : ''">انتخاب عکس</label>
                                                    <span class="tw:text-xs">(فایل های مجاز: jpg, jpeg, png, webp)</span>
                                                </div>
                                            @endif
                                            @error('image')
                                                <p class="tw:mb-0 tw:text-xs tw:text-red-600">{{ $message }}</p>
                                            @enderror
                                        </div>
                                        <div x-show="uploading">
                                            <div class="tw:flex tw:items-center tw:gap-1 tw:mb-1 tw:me-1">
                                                <div class="progress tw:w-full" role="progressbar" aria-label="Upload progress bar" x-bind:aria-valuenow="progress" aria-valuemin="0" aria-valuemax="100">
                                                    <div class="progress-bar progress-bar-striped progress-bar-animated" x-bind:class="progress === 100 ? 'text-bg-success' : ''" x-bind:style="`width: ${progress}%`" x-text="`${progress}%`"></div>
                                                </div>
                                                <button type="button" wire:loading.attr="disabled" wire:click="$cancelUpload('image')" class="tw:flex tw:justify-center tw:items-center tw:p-1 tw:border tw:border-red-600 tw:rounded-full tw:text-red-600 tw:hover:bg-red-600 tw:hover:text-white tw:transition-all tw:transition-300">
                                                    <i class="fas fa-xmark tw:w-3 tw:h-3"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="tw:relative tw:flex tw:justify-center tw:items-center tw:w-[80px] tw:h-[80px] tw:bg-slate-600/20 tw:rounded-md tw:overflow-hidden">
                                        @if($image)
                                            @if(in_array($image->getMimeType(), ['image/jpg', 'image/jpeg', 'image/png', 'image/webp']))
                                                <img
                                                    src="{{ $image->temporaryUrl() }}"
                                                    alt="عکس ضمیمه" class="tw:w-[80px] tw:h-[80px]"
                                                >
                                            @else
                                                <i class="fas fa-seedling tw:text-green-600"></i>
                                            @endif
                                        @else
                                            <i class="fas fa-seedling tw:text-green-600"></i>
                                        @endif
                                    </div>
                                </div>
                            </div>
                            <button
                                type="button"
                                class="btn btn-primary"
                                wire:click="createTicket"
                                wire:loading.attr="disabled"
                                wire:target="createTicket"
                            >
                                <i class="fas fa-paper-plane me-1"></i>
                                ارسال تیکت
                            </button>
                        </div>
                    </div>

                        <!-- بخش لیست تیکت‌ها -->
                    <div class="support-tab"
                         x-bind:class="toggleTab ? 'active' : ''">
                        <div class="p-3">
                            <div class="input-group mb-3">
                                <input
                                    name="searchTicket"
                                    type="text"
                                    class="form-control"
                                    placeholder="جستجو در تیکت‌ها..."
                                    wire:model.live="searchTitle"
                                />
                            </div>

                            <div class="table-responsive">
                                <table class="table table-hover">
                                    <thead>
                                    <tr>
                                        <th>شماره تیکت</th>
                                        <th>عنوان</th>
                                        <th>تاریخ ایجاد</th>
                                        <th>وضعیت</th>
                                        <th>عملیات</th>
                                    </tr>
                                    </thead>
                                    <tbody id="ticketsTable">
                                    @forelse($tickets as $ticket)
                                        <tr>
                                            <td>#TKT-100{{ $ticket->id }}</td>
                                            <td>{{ $ticket->title }}</td>
                                            <td>{{ $ticket->created_at_jalali->format('Y/m/d - H:i') }}</td>
                                            <td wire:poll.5s>
                                                @if($ticket->trashed())
                                                    <span class="ticket-status-badge status-closed">بسته شده</span>
                                                @elseif($ticket->admin_id)
                                                    <span class="ticket-status-badge status-open">باز</span>
                                                @else
                                                    <span class="ticket-status-badge status-pending">در انتظار</span>
                                                @endif
                                            </td>
                                            <td>
                                                <button
                                                    class="btn btn-sm btn-outline-primary"
                                                    title="مشاهده گفتوگو"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#chatModal"
                                                    wire:click="openChat({{ $ticket->id }})"
                                                    >
                                                    <i class="fa-duotone fa-comments"></i>
                                                </button>
                                                @if(!$ticket->trashed())
                                                    <button
                                                        class="btn btn-sm btn-outline-danger"
                                                        title="بستن تیکت"
                                                        wire:click="closeTicket({{ $ticket->id }})"
                                                        wire:loading.attr="disabled"
                                                        wire:target="closeTicket({{ $ticket->id }})"
                                                        wire:confirm="آیا از بستن تیکت مطمئن هستید؟\nبعد از بستن تیکت دیگر امکان ارسال پیام در آن وجود ندارد."
                                                    >
                                                        <i class="fas fa-hand"></i>
                                                    </button>
                                                @endif
                                            </td>
                                        </tr>
                                    @empty
                                        <tr>
                                            <td colspan="5">
                                                <p class="tw:w-full tw:text-center tw:text-red-600 tw:text-sm tw:my-3">
                                                    هیچ تیکتی برای نمایش پیدا نشد.</p>
                                            </td>
                                        </tr>
                                    @endforelse
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-xl-4">
            <!-- اطلاعات تماس و راهنما -->
            <div class="card mb-4">
                <div class="card-header bg-light">
                    <h6 class="card-title mb-0">راهنمای پشتیبانی</h6>
                </div>
                <div class="card-body">
                    <div class="mb-3">
                        <i class="fas fa-clock text-primary me-2"></i>
                        <strong>ساعات پاسخگویی:</strong>
                        <p class="text-muted small mb-0">
                            شنبه تا پنجشنبه: ۸:۰۰ تا ۱۸:۰۰
                        </p>
                    </div>
                    <div class="mb-3">
                        <i class="fas fa-phone text-primary me-2"></i>
                        <strong>تلفن پشتیبانی:</strong>
                        <p class="text-muted small mb-0">۰۲۱-۱۲۳۴۵۶۷۸</p>
                    </div>
                    <div class="mb-3">
                        <i class="fas fa-envelope text-primary me-2"></i>
                        <strong>ایمیل:</strong>
                        <p class="text-muted small mb-0">support@keshavarzi.com</p>
                    </div>
                    <hr/>
                    <h6>نکات مهم:</h6>
                    <ul class="small text-muted">
                        <li>پاسخ تیکت‌ها حداکثر طی ۲۴ ساعت داده می‌شود</li>
                        <li>برای مشکلات فوری از تلفن تماس بگیرید</li>
                        <li>پیام خود را با جزئیات کامل ارسال کنید</li>
                        <li>در هر 24 ساعت، تنها 5 بار مجاز به ساختن تیکت هستید</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</section>
