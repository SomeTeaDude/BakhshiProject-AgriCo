<div
    id="orderModal"
    class="modal fade"
    wire:ignore.self>
    <div class="modal-dialog modal-xl"
         wire:mousedown.outside="closeModal">
        <span class="
        tw:bg-amber-600
        tw:bg-sky-600
        tw:bg-violet-600
        tw:bg-green-600
        tw:bg-red-600
        tw:hover:bg-amber-600/20
        tw:hover:bg-sky-600/20
        tw:hover:bg-violet-600/20
        tw:hover:bg-green-600/20
        tw:hover:bg-red-600/20"></span>
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">جزئیات سفارش</h5>
                <button
                    type="button"
                    class="btn-close btn-close-white"
                    data-bs-dismiss="modal"
                    wire:click="closeModal"
                ></button>
            </div>
            <div class="modal-body" id="orderDetails">
                @if($order)
                    <div class="row">
                        <div class="col-md-6">
                            <div class="order-details-section">
                                <h6>اطلاعات سفارش</h6>
                                <div class="row tw:gap-y-2">
                                    <div class="col-6 tw:flex tw:flex-col tw:justify-start tw:items-start tw:gap-1">
                                        <strong>شماره سفارش:</strong>
                                        <span>{{ $order->id }}</span>
                                    </div>
                                    <div class="col-6 tw:flex tw:flex-col tw:justify-start tw:items-start tw:gap-1">
                                        <strong>نوع سفارش:</strong>
                                        @if($order->payment->type === 'product')
                                            <span class="tw:inline-flex tw:justify-start tw:items-center tw:gap-2 tw:px-3 tw:py-1 tw:bg-green-600 tw:text-white tw:rounded-lg"><i class="fas fa-box"></i> محصول</span>
                                        @else
                                            <span class="tw:inline-flex tw:justify-start tw:items-center tw:gap-2 tw:px-3 tw:py-1 tw:bg-sky-600 tw:text-white tw:rounded-lg"><i class="fas fa-clock"></i> دوره</span>
                                        @endif
                                    </div>
                                    <div class="col-6 mt-2 tw:flex tw:flex-col tw:justify-start tw:items-start tw:gap-1">
                                        <strong>وضعیت پرداخت:</strong>
                                        <span class="status-badge status-completed">موفق</span>
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
                                    <div class="col-6 mt-2 tw:flex tw:flex-col tw:justify-start tw:items-start tw:gap-1">
                                        <strong>وضعیت سفارش:</strong>
                                        @if($initialStatus === 'canceled')
                                            <span class="status-badge status-canceled tw:text-red-600">لغو شده</span>
                                        @elseif($initialStatus === 'completed')
                                            <span class="status-badge status-completed tw:text-red-600">تکمیل شده</span>
                                        @else
                                            <div class="tw:relative" x-on:click.outside="() => document.getElementById('statusDropdown').checked = false">
                                                <input type="checkbox" id="statusDropdown" class="tw:peer tw:hidden">
                                                <label for="statusDropdown" class="status-badge status-{{ $status }} tw:peer-checked:[&_.fas]:rotate-180 tw:inline-flex tw:justify-start tw:items-center tw:gap-2 tw:cursor-pointer tw:select-none tw:transition-all tw:transition-300">
                                                    <span>{{ $statuses[$status][1] }}</span>
                                                    <i class="fas fa-caret-down tw:rotate-0 tw:transition-all tw:transition-300"></i>
                                                </label>
                                                <div class="
                                            tw:absolute
                                            tw:peer-checked:-bottom-2
                                            tw:peer-checked:opacity-100
                                            tw:peer-checked:visible
                                            tw:bottom-0
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
                                            tw:z-20">
                                                    @foreach($statuses as $statusName => $statusInf)
                                                        <button
                                                            type="button"
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
                                                            @if($statusName === $status)
                                                            tw:text-white
                                                            tw:bg-{{ $statusInf[2] }}-600
                                                            tw:pointer-events-none
                                                            @else
                                                            tw:bg-white
                                                            tw:text-slate-700
                                                            tw:hover:bg-{{ $statusInf[2] }}-600/20
                                                            @endif
                                                            tw:transition-all tw:transition-200"
                                                            @if($statusName !== $status && !in_array($statusName, $allowed[$initialStatus]))
                                                                disabled
                                                            @elseif($statusName !== $status)
                                                                wire:click="setStatus('{{ $statusName }}')"
                                                            wire:loading.class="tw:pointer-events-none"
                                                            wire:target="setStatus('{{ $statusName }}')"
                                                            @endif
                                                        >
                                                            <p class="tw:text-xs tw:mb-0 tw:mt-2">
                                                                <i wire:loading.remove wire:target="setStatus('{{ $statusName }}')" class="fas fa-{{ $statusInf[0] }} @if($statusName === $status) tw:text-white @endif tw:text-{{ $statusInf[2] }}-600"></i>
                                                                <i wire:loading wire:target="setStatus('{{ $statusName }}')" class="fa-solid fa-loader tw:animate-spin tw:text-{{ $statusInf[2] }}-600"></i>
                                                                <strong class="tw:inline-block tw:me-1">{{ $statusInf[1] }}:</strong>
                                                                {{ $statusInf[3] }}
                                                            </p>
                                                        </button>
                                                    @endforeach
                                                </div>
                                            </div>
                                        @endif
                                    </div>
                                    <div class="col-6 tw:flex tw:flex-col tw:justify-start tw:items-start tw:gap-1">
                                        <strong>تاریخ سفارش:</strong>
                                        <span>{{ $order->created_at_jalali->format("Y/m/d - H:i") }}</span>
                                    </div>
                                    <div class="col-6 mt-2 tw:flex tw:flex-col tw:justify-start tw:items-start tw:gap-1">
                                        <strong>مبلغ کل:</strong>
                                        <span>{{ number_format($order->payment->price) }} تومان</span>
                                    </div>
                                    <div class="col-12 tw:flex tw:flex-col tw:justify-start tw:items-start tw:gap-1">
                                        @if($initialStatus === 'canceled' || $initialStatus === 'completed')
                                            <strong>تاریخ پایان سفارش:</strong>
                                            <span>{{ $order->finished_at ? $order->finished_at_jalali->format('Y/m/d') : 'نامشخص' }}</span>
                                        @else
                                            <strong>تاریخ پایان تخمینی: <span class="tw:text-sm tw:font-thin">({{ $order->finished_at ? $order->finished_at_jalali->format('Y/m/d') : 'نامشخص' }})</span></strong>
                                            <span>
                                                <x-persian-datepicker
                                                    wirePropertyName="finished_at"
                                                    showFormat="jYYYY/jMM/jDD"
                                                    returnFormat="X"
                                                    :showIcon="false"
                                                    :setNullInput="true"
                                                    :ignoreWire="true"
                                                    :defaultDate="$order->finished_at"
                                                    :minDate="now()"
                                                />
                                            </span>
                                        @endif
                                    </div>
                                </div>
                            </div>

                            <div class="order-details-section">
                                <h6>اطلاعات مشتری</h6>
                                <div class="row tw:gap-y-2">
                                    <div class="col-6 tw:flex tw:flex-col tw:justify-start tw:items-start tw:gap-1">
                                        <strong>نام مشتری:</strong>
                                        <span>{{ $order->user->f_name }} {{ $order->user->l_name }}</span>
                                    </div>
                                    <div class="col-6 tw:flex tw:flex-col tw:justify-start tw:items-start tw:gap-1">
                                        <strong>تلفن:</strong>
                                        <span>{{ $order->user->phone }}</span>
                                    </div>
                                    <div class="col-12 tw:flex tw:flex-col tw:justify-start tw:items-start tw:gap-1">
                                        <strong>آدرس:</strong>
                                        @if($order->user->address)
                                            <span>{{ $order->user->address }}</span>
                                        @else
                                            <span class="tw:text-sm tw:text-red-600">آدرسی برای این کاربر ثبت نشده است. با ایشان تماس گرفته و پیگیری کنید.</span>
                                        @endif
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="order-details-section">
                                <h6>آیتم‌های سفارش</h6>

                                @php
                                    $items = json_decode($order->payment->items, true);
                                @endphp
                                @foreach($items as $item)
                                    <div class="order-item">
                                        <div class="tw:flex tw:flex-col tw:justify-start tw:items-start tw:gap-1">
                                            <strong>{{ $item['name'] }}</strong>
                                            <small class="text-muted">تعداد: {{ $item['quantity'] }}</small>
                                        </div>
                                        <div class="tw:flex tw:flex-col tw:justify-start tw:items-end tw:gap-1">
                                            <div>{{ number_format($item['price']) }} تومان</div>
                                            <small class="text-muted">مجموع: {{ number_format($item['quantity'] * $item['price']) }} تومان</small>
                                        </div>
                                    </div>
                                @endforeach

                                <div class="order-item" style="border-top: 2px solid #ddd; font-weight: bold;">
                                    <div>جمع کل:</div>
                                    <div>{{ number_format(array_reduce($items, fn ($acc, $item) => $acc + ($item['quantity'] * $item['price']), 0)) }} تومان</div>
                                </div>
                            </div>

                            <div class="order-details-section">
                                <h6>روند سفارش</h6>
                                <div class="order-timeline">
                                    <div class="timeline-step completed">
                                        <div class="timeline-icon">
                                            <i class="fas fa-check"></i>
                                        </div>
                                        <div class="timeline-content">
                                            <div>ثبت سفارش</div>
                                            <small>{{ $order->created_at_jalali->format('Y/m/d - H:i') }}</small>
                                        </div>
                                    </div>
                                    @foreach($this->getTimeline() as $state)
                                        <div class="timeline-step {{ $state['state'] }}">
                                            <div class="timeline-icon">
                                                <i class="fas fa-{{ $state['icon'] }}"></i>
                                            </div>
                                            <div class="timeline-content">
                                                <div>{{ $state['name'] }}</div>
                                                <small>{{ $state['date'] }}</small>
                                            </div>
                                        </div>
                                    @endforeach
                                </div>
                            </div>
                        </div>
                    </div>
                @else
                    <span class="tw:flex tw:justify-center tw:items-center">
                        <div class="spinner-border spinner-border-md text-success" role="status">
                          <span class="visually-hidden">Loading...</span>
                        </div>
                    </span>
                @endif
            </div>
            <div class="modal-footer">
                @if($order && ($status !== $initialStatus || $finished_at))
                    @if($initialStatus === 'canceled' || $initialStatus === 'completed')
                        <button type="button" class="btn btn-secondary" disabled>بروزرسانی وضعیت</button>
                    @else
                        @if($status === 'completed' || $status === 'canceled')
                            <button
                                type="button"
                                class="btn btn-primary"
                                wire:key="update-order-confirm"
                                wire:click="updateOrder"
                                wire:loading.attr="disabled"
                                wire:confirm="{{ 'پس از تعویض وضعیت سفارش به حالت "' . $statuses[$status][1] . '" دیگر امکان تغییر وضعیت وجود ندارد.\nآیا مطمئن هستید؟' }}"
                            >بروزرسانی سفارش</button>
                        @else
                            <button
                                type="button"
                                class="btn btn-primary"
                                wire:key="update-order"
                                wire:click="updateOrder"
                                wire:loading.attr="disabled"
                            >بروزرسانی سفارش</button>
                        @endif
                    @endif
                @else
                    <button type="button" class="btn btn-secondary" disabled>بروزرسانی وضعیت</button>
                @endif
                <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                    wire:click="closeModal"
                >
                    بستن
                </button>
            </div>
        </div>
    </div>
</div>
