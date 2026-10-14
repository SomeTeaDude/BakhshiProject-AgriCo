<div>
    <!-- Filters and Search -->
    <div class="row mb-4">
        <div class="col-12">
            <div class="filters-card">
                <div class="row g-3">
                    <div class="col-lg-3 col-md-6">
                        <label class="form-label">وضعیت پرداخت</label>
                        <select class="form-select" wire:model.live="status">
                            <option value="">همه وضعیت‌ها</option>
                            <option value="success">موفق</option>
                            <option value="fail">ناموفق</option>
                        </select>
                    </div>
                    <div class="col-lg-3 col-md-6">
                        <label class="form-label">نوع تراکنش</label>
                        <select class="form-select" wire:model.live="type">
                            <option value="">همه انواع</option>
                            <option value="course">دوره آموزشی</option>
                            <option value="product">محصول</option>
                        </select>
                    </div>
                    <div class="col-lg-3 col-md-6">
                        <label class="form-label">بازه زمانی</label>
                        <select class="form-select" wire:model.live="date">
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
                <div class="row mt-3" id="customDateRange" style="display: none">
                    <div class="col-md-6">
                        <label class="form-label">از تاریخ</label>
                        <input type="date" class="form-control" id="startDate">
                    </div>
                    <div class="col-md-6">
                        <label class="form-label">تا تاریخ</label>
                        <input type="date" class="form-control" id="endDate">
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row mb-4">
        <div class="col-12">
            <div class="filters-card">
                <div class="row g-3">
                    <div class="col-lg-3 col-md-6">
                        <label for="userName" class="form-label">نام مشتری</label>
                        <input type="text" id="userName" placeholder="جستوجوی تراکنش با نام مشتری" class="tw:w-full tw:p-2 tw:rounded-sm tw:border tw:border-gray-600/25 tw:hover:border-gray-600 tw:focus:border-gray-600 tw:outline-none tw:transition-all tw:transition-200" wire:model.live="name">
                    </div>
                    <div class="col-lg-3 col-md-6">
                        <label for="userPhone" class="form-label">شماره مشتری</label>
                        <input type="text" id="userPhone" placeholder="جستوجوی تراکنش با شماره مشتری" class="tw:w-full tw:p-2 tw:rounded-sm tw:border tw:border-gray-600/25 tw:hover:border-gray-600 tw:focus:border-gray-600 tw:outline-none tw:transition-all tw:transition-200" wire:model.live="phone">
                    </div>
                    <div class="col-lg-3 col-md-6">
                        <label for="userEmail" class="form-label">ایمیل مشتری</label>
                        <input type="text" id="userEmail" placeholder="جستوجوی تراکنش با ایمیل مشتری" class="tw:w-full tw:p-2 tw:rounded-sm tw:border tw:border-gray-600/25 tw:hover:border-gray-600 tw:focus:border-gray-600 tw:outline-none tw:transition-all tw:transition-200" wire:model.live="email">
                    </div>
                </div>
                <div class="row mt-3" id="customDateRange" style="display: none">
                    <div class="col-md-6">
                        <label class="form-label">از تاریخ</label>
                        <input type="date" class="form-control" id="startDate">
                    </div>
                    <div class="col-md-6">
                        <label class="form-label">تا تاریخ</label>
                        <input type="date" class="form-control" id="endDate">
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Payments Table -->
    <div class="row">
        <div class="col-12">
            <div class="payments-table-card">
                <div class="table-header">
                    <h5>لیست پرداخت ها</h5>
                </div>

                @if(count($payments) > 0)
                    <div class="table-responsive">
                        <table class="table table-hover" id="paymentsTable">
                            <thead>
                            <tr>
                                <th>ردیف</th>
                                <th>شماره پیگیری</th>
                                <th>نام مشتری</th>
                                <th>تاریخ و زمان</th>
                                <th>مبلغ (تومان)</th>
                                <th>وضعیت</th>
                                <th>توضیحات</th>
                                <th>جزئیات</th>
                            </tr>
                            </thead>
                            <tbody id="paymentsTableBody">
                            @foreach($payments as $payment)
                                <tr class="fade-in-up">
                                    <td>{{ ($payments->currentPage() - 1) * $payments->perPage() + $loop->iteration }}</td>
                                    <td>
                                        <strong>{{ $payment->reference_id ?? '---' }}</strong>
                                    </td>
                                    <td>
                                        {{ $payment->user->f_name . ' ' . $payment->user->l_name }}
                                    </td>
                                    <td>
                                        <div>{{ $payment->created_at_jalali->format('Y/m/d') }}</div>
                                        <small class="text-muted">{{ $payment->created_at_jalali->format("H:i") }}</small>
                                    </td>
                                    <td>
                                        <strong>
                                            {{ number_format($payment->price) }}
                                        </strong>
                                    </td>
                                    <td>
                                        <span class="status-badge status-{{ $payment->status }}">
                                            {{ $payment->status === 'success' ? 'موفق' : 'ناموفق' }}
                                        </span>
                                    </td>
                                    <td>{{ $payment->description }}</td>
                                    <td>
                                        <div class="btn-group btn-group-sm">
                                            <button
                                                class="btn btn-outline-primary btn-action"
                                                title="مشاهده جزئیات"
                                                data-bs-toggle="modal"
                                                data-bs-target="#paymentDetailsModal"
                                                wire:click="paymentDetails({{ $payment->id }})"
                                                wire:loading.attr="disabled"
                                                wire:target="paymentDetails({{ $payment->id }})"
                                            >
                                                <i class="fas fa-eye"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            @endforeach
                            </tbody>
                        </table>
                    </div>
                @else
                    <p class="tw:text-red-500 tw:text-center tw:my-4">متاسفانه هیچ پرداختی پیدا نشد.</p>
                @endif

                <!-- Pagination -->
                <div class="tw:mx-3 tw:my-4">
                    {{ $payments->links(data: ['scrollTo' => false]) }}
                </div>
            </div>
        </div>
    </div>
</div>
