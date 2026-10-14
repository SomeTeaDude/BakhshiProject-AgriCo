<section class="container-fluid py-4">
    <div class="row mb-4">
        <div class="col-12">
            <div class="filters-card">
                <div class="row g-3">
                    <div class="col-lg-3 col-md-6">
                        <label class="form-label">شماره سفارش</label>
                        <input type="text" class="tw:w-full tw:p-2 tw:rounded-sm tw:border tw:border-gray-600/25 tw:hover:border-gray-600 tw:outline-none tw:transition-all tw:transition-200" wire:model.live="orderId">
                    </div>
                    <div class="col-lg-3 col-md-6">
                        <label class="form-label">بازه زمانی</label>
                        <select class="tw:w-full tw:p-2 tw:rounded-sm tw:border tw:border-gray-600/25 tw:hover:border-gray-600 tw:outline-none tw:transition-all tw:transition-200" wire:model.live="date">
                            <option value="">همه زمان‌ها</option>
                            <option value="today">امروز</option>
                            <option value="week">هفته جاری</option>
                            <option value="month">ماه جاری</option>
                            <option value="year">سال جاری</option>
                            <option value="custom">انتخاب تاریخ</option>
                        </select>
                    </div>
                    @if($showExtraDates)
                        <div class="col-lg-3 col-md-6 tw:flex tw:flex-col tw:sm:flex-row tw:justify-center tw:items-center tw:gap-2">
                            <div class="tw:w-full sm:tw:w-auto">
                                <label class="form-label">از</label>
                                <div class="input-group">
                                    <x-persian-datepicker
                                        wirePropertyName="from_date"
                                        showFormat="jYYYY/jMM/jDD"
                                        returnFormat="X"
                                        :showIcon="false"
                                        :setNullInput="true"
                                        :ignoreWire="true"
                                    />
                                </div>
                            </div>
                            <div class="tw:w-full sm:tw:w-auto">
                                <label class="form-label">تا</label>
                                <div class="input-group">
                                    <x-persian-datepicker
                                        wirePropertyName="to_date"
                                        showFormat="jYYYY/jMM/jDD"
                                        returnFormat="X"
                                        :showIcon="false"
                                        :setNullInput="true"
                                        :ignoreWire="true"
                                    />
                                </div>
                            </div>
                        </div>
                    @endif
                </div>
            </div>
        </div>
    </div>

    @php
        $statuses = [
          'waiting' => ['clock', 'در انتظار', 'amber', 'سفارش در انتظار برای تایید از سمت مدیر فروشگاه میباشد.'],
          'pending' => ['gear', 'آماده سازی', 'sky', 'محصول در حال آماده سازی برای ارسال به دست مشتری میباشد.'],
          'sending' => ['truck-fast', 'درحال ارسال', 'violet', 'محصول آماده سازی شده و در حال ارسال به دست مشتری است.'],
          'completed' => ['check-circle', 'تکمیل شده', 'green', 'محصول با موفقیت به دست مشتری رسیده و سفارش کامل شده.'],
          'canceled' => ['ban', 'لغو شده', 'red', 'مشکلی در مراحل سفارش بوجود آمده و از طرف سایت یا مشتری لغو شده.'],
        ];
    @endphp
    <div class="tw:flex tw:flex-col tw:lg:flex-row tw:justify-between tw:items-center mb-4">
        <h4 class="tw:text-center tw:lg:text-start tw:text-wrap tw:lg:text-nowrap">
            <span class="tw:me-1">سفارش های شما</span>
            <span class="tw:group tw:relative tw:outline-none" tabindex="-1">
                <span class="tw:text-sm tw:animate-pulse">
                    <i class="fas fa-exclamation-circle"></i>
                </span>
                <div class="
                        tw:absolute
                        tw:group-hover:bottom-0
                        tw:group-hover:opacity-100
                        tw:group-hover:visible
                        tw:group-focus:bottom-0
                        tw:group-focus:opacity-100
                        tw:group-focus:visible
                        tw:-bottom-2
                        tw:opacity-0
                        tw:invisible
                        tw:md:right-0
                        tw:bssm:right-1/2
                        tw:right-full
                        tw:md:translate-x-0
                        tw:bssm:translate-x-1/2
                        tw:translate-x-4/5
                        tw:translate-y-full
                        tw:w-68
                        tw:bg-white
                        tw:rounded-md
                        tw:border
                        tw:border-slate-700/20
                        tw:shadow-[0_5px_10px_1px_#33333359]
                        tw:overflow-hidden
                        tw:transition-all
                        tw:transition-200
                        tw:z-20
                    "
                >
                    <p class="tw:m-2 tw:pb-1 tw:text-sm tw:text-start tw:border-b tw:border-dashed tw:border-slate-700/50">توضیح وضعیت ها:</p>
                    @foreach($statuses as $statusName => $statusInf)
                        <div
                            class="
                                tw:flex
                                tw:flex-col
                                tw:w-auto
                                tw:m-1
                                tw:p-2
                                tw:text-start
                                tw:border
                                tw:border-slate-700/20
                                tw:hover:border-{{ $statusInf[2] }}-600/20
                                tw:rounded-md
                                tw:text-slate-700
                                tw:bg-{{ $statusInf[2] }}-600/20
                                tw:transition-all tw:transition-200
                            "
                        >
                            <p class="tw:text-xs tw:mb-0 tw:mt-2">
                                <i class="fas fa-{{ $statusInf[0] }} tw:text-{{ $statusInf[2] }}-600"></i>
                                <strong class="tw:inline-block tw:me-1">{{ $statusInf[1] }}:</strong>
                                <span class="tw:text-wrap">{{ $statusInf[3] }}</span>
                            </p>
                        </div>
                    @endforeach
                </div>
            </span>
        </h4>
        <div class="tw:flex tw:flex-wrap tw:justify-center lg:tw:justify-end tw:items-center tw:gap-2">
            <label for="status-all" class="status-badge tw:relative tw:bg-gray-600/20 tw:text-gray-600 tw:hover:text-white tw:hover:bg-gray-600 tw:has-checked:text-white tw:has-checked:bg-gray-600 tw:cursor-pointer tw:transition-all tw:transition-200">
                همه
                <input type="radio" name="status" id="status-all" value="" class="tw:hidden" wire:model.live="status" checked>
            </label>
            <label for="status-waiting" class="status-badge tw:relative tw:bg-amber-600/20 tw:text-amber-600 tw:hover:text-white tw:hover:bg-amber-600 tw:has-checked:text-white tw:has-checked:bg-amber-600 tw:cursor-pointer tw:transition-all tw:transition-200">
                <i class="fas fa-clock me-1"></i>
                در انتظار
                <input type="radio" name="status" id="status-waiting" value="waiting" class="tw:hidden" wire:model.live="status">
            </label>
            <label for="status-pending" class="status-badge tw:relative tw:bg-sky-600/20 tw:text-sky-600 tw:hover:text-white tw:hover:bg-sky-600 tw:has-checked:text-white tw:has-checked:bg-sky-600 tw:cursor-pointer tw:transition-all tw:transition-200">
                <i class="fas fa-gear me-1"></i>
                آماده سازی
                <input type="radio" name="status" id="status-pending" value="pending" class="tw:hidden" wire:model.live="status">
            </label>
            <label for="status-sending" class="status-badge tw:relative tw:bg-violet-600/20 tw:text-violet-600 tw:hover:text-white tw:hover:bg-violet-600 tw:has-checked:text-white tw:has-checked:bg-violet-600 tw:cursor-pointer tw:transition-all tw:transition-200">
                <i class="fas fa-truck-fast me-1"></i>
                درحال ارسال
                <input type="radio" name="status" id="status-sending" value="sending" class="tw:hidden" wire:model.live="status">
            </label>
            <label for="status-completed" class="status-badge tw:relative tw:bg-green-600/20 tw:text-green-600 tw:hover:text-white tw:hover:bg-green-600 tw:has-checked:text-white tw:has-checked:bg-green-600 tw:cursor-pointer tw:transition-all tw:transition-200">
                <i class="fas fa-check-circle me-1"></i>
                تکمیل شده
                <input type="radio" name="status" id="status-completed" value="completed" class="tw:hidden" wire:model.live="status">
            </label>
            <label for="status-canceled" class="status-badge tw:relative tw:bg-red-600/20 tw:text-red-600 tw:hover:text-white tw:hover:bg-red-600 tw:has-checked:text-white tw:has-checked:bg-red-600 tw:cursor-pointer tw:transition-all tw:transition-200">
                <i class="fas fa-ban me-1"></i>
                لغو شده
                <input type="radio" name="status" id="status-canceled" value="canceled" class="tw:hidden" wire:model.live="status">
            </label>
        </div>
    </div>

    <div class="table-container">
        <div class="table-responsive">
            @if(count($orders) > 0)
                <table class="table table-hover mb-0">
                    <thead>
                        <tr>
                            <th>شماره سفارش</th>
                            <th>توضیحات</th>
                            <th>تاریخ خرید</th>
                            <th>قیمت (تومان)</th>
                            <th>وضعیت</th>
                            <th>عملیات</th>
                        </tr>
                    </thead>
                    <tbody id="productsTable">
                        @foreach($orders as $order)
                            <tr class="fade-in">
                                <td>
                                    ORD-100{{ $order->id }}
                                </td>
                                <td>
                                    {{ $order->payment->description }}
                                </td>
                                <td>{{ $order->created_at_jalali->format('Y/m/d') }}</td>
                                <td>{{ number_format($order->payment->price) }}</td>
                                @php
                                    $icons = [
                                      'waiting' => ['clock', 'در انتظار', 'amber'],
                                      'pending' => ['gear', 'آماده سازی', 'sky'],
                                      'sending' => ['truck-fast', 'درحال ارسال', 'violet'],
                                      'completed' => ['check-circle', 'تکمیل شده', 'green'],
                                      'canceled' => ['ban', 'لغو شده', 'red'],
                                    ];
                                @endphp
                                <td>
                                    <div class="tw:flex tw:flex-col tw:justify-center tw:items-start tw:gap-1">
                                        <span class="status-badge tw:bg-{{ $icons[$order->status][2] }}-600/20 tw:text-{{ $icons[$order->status][2] }}-600">
                                            <i class="fas fa-{{ $icons[$order->status][0] }} me-1"></i>
                                            {{ $icons[$order->status][1] }}
                                        </span>
                                        @if($order->finished_at && $order->status === 'completed')
                                            <small
                                                class="text-muted tw:ms-2">تحویل: {{ $order->finished_at_jalali->format("Y/m/d") }}</small>
                                        @elseif($order->finished_at)
                                            <small
                                                class="text-muted tw:ms-2">تخمینی: {{ $order->finished_at_jalali->format("Y/m/d") }}</small>
                                        @else
                                            <small class="text-muted tw:ms-2">تخمینی: نامشخص</small>
                                        @endif
                                    </div>
                                </td>
                                <td>
                                    <button class="btn btn-sm btn-outline-primary"
                                            data-bs-toggle="modal"
                                            data-bs-target="#orderModal"
                                            title="جزئیات"
                                            wire:click="orderDetails({{ $order->id }})"
                                    >
                                        <i class="fas fa-eye"></i>
                                    </button>
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            @else
                <p class="tw:text-red-500 tw:text-center tw:my-4">متاسفانه هیچ سفارشی پیدا نشد.</p>
            @endif

            <!-- Pagination -->
            <div class="tw:mx-3 tw:my-4">
                {{ $orders->links(data: ['scrollTo' => false]) }}
            </div>
        </div>
    </div>
</section>
