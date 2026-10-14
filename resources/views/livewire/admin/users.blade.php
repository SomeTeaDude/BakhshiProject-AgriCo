<section class="payments-content container-fluid py-4">
    <div class="row mb-4">
        <div class="col-12">
            <div class="d-flex justify-content-between align-items-center flex-wrap">
                <div class="section-header">
                    <h4>مدیریت کاربران</h4>
                    <p class="text-muted mb-0">
                        مشاهده و مدیریت تمام کاربران سایت
                    </p>
                </div>
            </div>
        </div>
    </div>

    <div class="row mb-4">
        <div class="col-lg-4 col-md-6 mb-3 tw:bslg:w-max tw:bslg:min-w-1/3">
            <x-stats-card :count="$all_users_count" label="کل کاربران" icon="users" bg="primary" />
        </div>
        <div class="col-lg-4 col-md-6 mb-3 tw:bslg:w-max tw:bslg:min-w-1/3">
            <x-stats-card :count="$users_count" label="کاربران فعال" icon="user-plus" bg="success" />
        </div>
        <div class="col-lg-4 col-md-6 mb-3 tw:bslg:w-max tw:bslg:min-w-1/3">
            <x-stats-card :count="$banned_users_count" label="کاربران مسدود" icon="user-alt-slash" bg="danger" />
        </div>
    </div>

    <div class="row mb-4">
        <div class="col-12">
            <div class="filters-card">
                <div class="row g-3">
                    <div class="col-lg-3 col-md-6">
                        <label for="userName" class="form-label">نام مشتری</label>
                        <input type="text" id="userName" placeholder="جستوجوی تراکنش با نام مشتری" class="tw:w-full tw:p-2 tw:rounded-sm tw:border tw:border-slate-600/25 tw:hover:border-slate-600 tw:focus:border-slate-600 tw:outline-none tw:transition-all tw:transition-200" wire:model.live="name">
                    </div>
                    <div class="col-lg-3 col-md-6">
                        <label for="userPhone" class="form-label">شماره مشتری</label>
                        <input type="text" id="userPhone" placeholder="جستوجوی تراکنش با شماره مشتری" class="tw:w-full tw:p-2 tw:rounded-sm tw:border tw:border-slate-600/25 tw:hover:border-slate-600 tw:focus:border-slate-600 tw:outline-none tw:transition-all tw:transition-200" wire:model.live="phone">
                    </div>
                    <div class="col-lg-3 col-md-6">
                        <label for="userEmail" class="form-label">ایمیل مشتری</label>
                        <input type="text" id="userEmail" placeholder="جستوجوی تراکنش با ایمیل مشتری" class="tw:w-full tw:p-2 tw:rounded-sm tw:border tw:border-slate-600/25 tw:hover:border-slate-600 tw:focus:border-slate-600 tw:outline-none tw:transition-all tw:transition-200" wire:model.live="email">
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

    <div class="row">
        <div class="col-12">
            <div class="payments-table-card">
                <div class="tw:flex tw:flex-col tw:lg:flex-row tw:justify-between tw:items-center mb-4">
                    <h4 class="tw:text-center tw:lg:text-start tw:text-wrap tw:lg:text-nowrap">کاربران</h4>
                    <div class="tw:flex tw:flex-wrap tw:justify-center lg:tw:justify-end tw:items-center tw:gap-2">
                        <label for="status-all" class="status-badge tw:relative tw:bg-gray-600/20 tw:text-gray-600 tw:hover:text-white tw:hover:bg-gray-600 tw:has-checked:text-white tw:has-checked:bg-gray-600 tw:cursor-pointer tw:transition-all tw:transition-200">
                            همه
                            <input type="radio" name="status" id="status-all" value="" class="tw:hidden" wire:model.live="status">
                        </label>
                        <label for="status-active" class="status-badge tw:relative tw:bg-green-600/20 tw:text-green-600 tw:hover:text-white tw:hover:bg-green-600 tw:has-checked:text-white tw:has-checked:bg-green-600 tw:cursor-pointer tw:transition-all tw:transition-200">
                            <i class="fas fa-check-circle me-1"></i>
                            فعال
                            <input type="radio" name="status" id="status-active" value="active" class="tw:hidden" wire:model.live="status">
                        </label>
                        <label for="status-banned" class="status-badge tw:relative tw:bg-red-600/20 tw:text-red-600 tw:hover:text-white tw:hover:bg-red-600 tw:has-checked:text-white tw:has-checked:bg-red-600 tw:cursor-pointer tw:transition-all tw:transition-200">
                            <i class="fas fa-ban me-1"></i>
                            مسدود
                            <input type="radio" name="status" id="status-banned" value="banned" class="tw:hidden" wire:model.live="status">
                        </label>
                        <label for="status-support" class="status-badge tw:relative tw:bg-sky-600/20 tw:text-sky-600 tw:hover:text-white tw:hover:bg-sky-600 tw:has-checked:text-white tw:has-checked:bg-sky-600 tw:cursor-pointer tw:transition-all tw:transition-200">
                            <i class="fas fa-user-headset me-1"></i>
                            پشتیبانی
                            <input type="radio" name="status" id="status-support" value="support" class="tw:hidden" wire:model.live="status">
                        </label>
                    </div>
                </div>

                @if(count($users) > 0)
                    <div class="table-responsive">
                        <table class="table table-hover" id="paymentsTable">
                            <thead>
                            <tr>
                                <th>تصویر</th>
                                <th>نام کامل</th>
                                <th>تاریخ ثبت نام</th>
                                <th>شماره تماس</th>
                                <th>ایمیل</th>
                                <th>آدرس</th>
                                <th>عملیات</th>
                            </tr>
                            </thead>
                            <tbody id="paymentsTableBody">
                            @foreach($users as $user)
                                <tr class="fade-in-up">
                                    <td>
                                        <img src="{{ $user->image() }}" alt="تصویر {{ $user->name() }}" class="tw:w-12 tw:h-12">
                                    </td>
                                    <td>
                                        {{ $user->name() }}
                                    </td>
                                    <td>
                                        <div>{{ $user->created_at_jalali->format('Y/m/d') }}</div>
                                        <small class="text-muted">{{ $user->created_at_jalali->format("H:i") }}</small>
                                    </td>
                                    <td>
                                        {{ $user->phone }}
                                    </td>
                                    <td>
                                        {{ $user->email ?? 'بدون ایمیل' }}
                                    </td>
                                    <td>
                                        {{ $user->address() ?? 'بدون آدرس' }}
                                    </td>
                                    <td>
                                        <div>
                                            @if($user->trashed())
                                                <button
                                                    class="btn btn-sm btn-outline-primary btn-action"
                                                    title="بازگردانی کاربر"
                                                    wire:click="restoreUser({{ $user->id }})"
                                                    wire:loading.attr="disabled"
                                                    wire:target="restoreUser({{ $user->id }})"
                                                    wire:key="restore-{{ $user->id }}"
                                                >
                                                    <i class="fas fa-arrows-rotate"></i>
                                                </button>
                                                <button
                                                    class="btn btn-sm btn-outline-danger btn-action"
                                                    title="حذف کردن کاربر"
                                                    wire:click="deleteUser({{ $user->id }})"
                                                    wire:loading.attr="disabled"
                                                    wire:target="deleteUser({{ $user->id }})"
                                                    wire:confirm="آیا از حذف کردن کاربر مطمئن هستید؟\nبا حذف شدن کاربر تمام اطلاعات موجود از او در سایت نیز حذف خواهند شد."
                                                    wire:key="delete-{{ $user->id }}"
                                                >
                                                    <i class="fas fa-trash"></i>
                                                </button>
                                            @else
                                                <button
                                                    class="btn btn-sm btn-outline-danger btn-action"
                                                    title="مسدود کردن کاربر"
                                                    wire:click="banUser({{ $user->id }})"
                                                    wire:loading.attr="disabled"
                                                    wire:target="banUser({{ $user->id }})"
                                                    wire:confirm="آیا از مسدود کردن کاربر مطمئن هستید؟\nبعد از مسدود شدن، کاربر از سایت خارج شده و دیگر اجازه ورود ندارد."
                                                    wire:key="ban-{{ $user->id }}"
                                                >
                                                    <i class="fas fa-ban"></i>
                                                </button>
                                            @endif
                                        </div>
                                    </td>
                                </tr>
                            @endforeach
                            </tbody>
                        </table>
                    </div>
                @else
                    <p class="tw:text-red-500 tw:text-center tw:my-4">متاسفانه هیچ کاربری پیدا نشد.</p>
                @endif

                <!-- Pagination -->
                <div class="tw:mx-3 tw:my-4">
                    {{ $users->links(data: ['scrollTo' => false]) }}
                </div>
            </div>
        </div>
    </div>
</section>
