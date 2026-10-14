<div
    id="orderModal"
    class="modal fade"
    tabindex="-1"
    wire:ignore.self>
    <div class="modal-dialog modal-xl"
         wire:mousedown.outside="closeModal">
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
                                <div class="col-6 tw:flex tw:flex-col tw:justify-start tw:items-start tw:gap-1">
                                    <strong>تاریخ سفارش:</strong>
                                    <span>{{ $order->created_at_jalali->format("Y/m/d - H:i") }}</span>
                                </div>
                                <div class="col-6 mt-2 tw:flex tw:flex-col tw:justify-start tw:items-start tw:gap-1">
                                    <strong>مبلغ کل:</strong>
                                    <span>{{ number_format($order->payment->price) }} تومان</span>
                                </div>
                                <div class="col-6 mt-2 tw:flex tw:flex-col tw:justify-start tw:items-start tw:gap-1">
                                    <strong>وضعیت پرداخت:</strong>
                                    <span class="status-badge status-completed">موفق</span>
                                </div>
                                @php
                                    $statuses = [
                                      'waiting' => 'در انتظار',
                                      'pending' => 'آماده سازی',
                                      'sending' => 'درحال ارسال',
                                      'completed' => 'تکمیل شده',
                                      'canceled' => 'لغو شده',
                                    ];
                                @endphp
                                <div class="col-6 mt-2 tw:flex tw:flex-col tw:justify-start tw:items-start tw:gap-1">
                                    <strong>وضعیت سفارش:</strong>
                                    <span class="status-badge status-{{ $order->status }}">{{ $statuses[$order->status] }}</span>
                                </div>
                                @if($order->status === 'canceled' || $order->status === 'completed')
                                    <strong>تاریخ پایان سفارش:</strong>
                                    <span>{{ $order->finished_at ? $order->finished_at_jalali->format('Y/m/d') : 'نامشخص' }}</span>
                                @else
                                    <strong>تاریخ پایان تخمینی:</strong>
                                    <span>{{ $order->finished_at ? $order->finished_at_jalali->format('Y/m/d') : 'نامشخص' }}</span>
                                @endif
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
                                    @if($order->user->address())
                                        <span>{{ $order->user->address() }}</span>
                                    @else
                                        <span class="tw:text-sm tw:text-red-600">آدرسی برای شما ثبت نشده است. لطفا هرچه سریعتر برای تکمیل آدرس محل ارسال کالاها از طریق صفحه "ویرایش پروفایل" اقدام نمایید.</span>
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
