<div
    class="modal fade"
    id="paymentDetailsModal"
    aria-labelledby="paymentDetailsModalLabel"
    tabindex="-1"
    wire:ignore.self
>
    <div class="modal-dialog modal-lg"
         wire:mousedown.outside="closeModal">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="paymentDetailsModalLabel">
                    جزئیات پرداخت
                </h5>
                <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    wire:click="closeModal"
                ></button>
            </div>
            <div class="modal-body" id="paymentDetailsContent">
                @if($payment)
                    <div class="row">
                        <div class="col-md-6">
                            <h6>اطلاعات پایه</h6>
                            <table class="table table-bordered">
                                <tbody>
                                    <tr>
                                        <td>شماره پیگیری</td>
                                        <td><strong>{{ $payment->reference_id ?? '---' }}</strong></td>
                                    </tr>
                                    <tr>
                                        <td>تاریخ و زمان</td>
                                        <td>{{ $payment->created_at_jalali->format("Y/m/d - H:i") }}</td>
                                    </tr>
                                    <tr>
                                        <td>مبلغ</td>
                                        <td><strong class="text-success">{{ number_format($payment->price) }} تومان</strong></td>
                                    </tr>
                                    <tr>
                                        <td>وضعیت</td>
                                        <td><span class="status-badge status-{{ $payment->status }}">{{ $payment->status === 'success' ? 'موفق' : 'ناموفق' }}</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="col-md-6">
                            <h6>اطلاعات تکمیلی</h6>
                            <table class="table table-bordered">
                                <tbody>
                                    <tr>
                                        <td>نوع تراکنش</td>
                                        <td>{{ $payment->type === 'product' ? 'محصول' : 'دوره' }}</td>
                                    </tr>
                                    @if($payment->type === 'product')
                                        <tr>
                                            <td>تعداد کل</td>
                                            <td>{{ $payment->itemsCount() }} مورد</td>
                                        </tr>
                                    @else
                                        <tr>
                                            <td>نام دوره</td>
                                            <td>{{ $payment->items()['course_name'] ?? 'نامشخص' }}</td>
                                        </tr>
                                    @endif
                                    <tr>
                                        <td>توضیحات</td>
                                        <td>{{ $payment->description }}</td>
                                    </tr>
                                    @if($payment->status === 'fail' && $payment->error_message)
                                        <tr>
                                            <td>پیام خطا</td>
                                            <td>{{ $payment->error_message }}</td>
                                        </tr>
                                    @endif
                                </tbody>
                            </table>
                        </div>
                        @if(auth()->check() && auth()->user()->isAdmin())
                            <div class="col-md-12">
                                <h6>اطلاعات مشتری</h6>
                                <table class="table table-bordered">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <strong>نام کامل</strong>
                                            </td>
                                            <td>{{ $payment->user->f_name . ' ' . $payment->user->l_name }}</td>
                                            <td>
                                                <strong>شماره همراه</strong>
                                            </td>
                                            <td>{{ $payment->user->phone }}</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <strong>ایمیل</strong>
                                            </td>
                                            @if($payment->user->email)
                                                <td>{{ $payment->user->email }}</td>
                                            @else
                                                <td class="tw:!text-yellow-600">{{ 'بدون ایمیل' }}</td>
                                            @endif
                                            <td>
                                                <strong>آدرس</strong>
                                            </td>
                                            @if($payment->user->address())
                                                <td>{{ $payment->user->address() }}</td>
                                            @else
                                                <td class="tw:!text-red-600">{{ 'بدون آدرس' }}</td>
                                            @endif
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        @endif
                    </div>
                    @if($payment->type === 'product')
                        <div class="row mt-3">
                            <div class="col-12">
                                <h6>آیتم‌های خریداری شده</h6>
                                <ul class="list-group">
                                    @foreach(json_decode($payment->items, true) as $product)
                                        <li class="list-group-item tw:group">
                                            <div class="tw:relative tw:flex tw:justify-between tw:items-center tw:py-2">
                                                <input type="checkbox" class="tw:absolute tw:top-0 tw:left-0 tw:w-full tw:h-full tw:opacity-0 tw:cursor-pointer">
                                                <span><strong>{{ $product['name'] }}</strong> × {{ $product['quantity'] }}</span>
                                                <span>
                                                <i class="fa-solid fa-caret-left tw:inline tw:group-has-checked:hidden"></i>
                                                <i class="fa-solid fa-caret-down tw:hidden tw:group-has-checked:inline"></i>
                                            </span>
                                            </div>
                                            <div class="product-details-content tw:hidden tw:group-has-checked:block">
                                                <div class="detail-section">
                                                    <h6>اطلاعات کلی</h6>
                                                    <div class="detail-item">
                                                        <span class="detail-label">نام محصول:</span>
                                                        <span class="detail-value">{{ $product['name'] }}</span>
                                                    </div>
                                                    <div class="detail-item">
                                                        <span class="detail-label">قیمت:</span>
                                                        <span class="detail-value">{{ number_format($product['price']) }} تومان</span>
                                                    </div>
                                                    <div class="detail-item">
                                                        <span class="detail-label">توضیحات:</span>
                                                        <span class="detail-value">{{ $product['description'] }}</span>
                                                    </div>
                                                </div>

                                                <div class="detail-section">
                                                    <h6>مشخصات فنی</h6>
                                                    @forelse(json_decode($product['details'], true) as $name => $value)
                                                        <div class="detail-item">
                                                            <span class="detail-label">{{ $name }}:</span>
                                                            <span class="detail-value">{{ $value }}</span>
                                                        </div>
                                                    @empty
                                                        <p class="text-center text-danger">مشخصاتی برای این کالا ثیت نشده است.</p>
                                                    @endforelse
                                                </div>
                                            </div>
                                        </li>
                                    @endforeach
                                </ul>
                            </div>
                        </div>
                    @endif
                @else
                    <span class="tw:flex tw:justify-center tw:items-center">
                        <div class="spinner-border spinner-border-sm text-success" role="status">
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
