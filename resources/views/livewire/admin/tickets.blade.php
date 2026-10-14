<section id="supportSection" class="container-fluid py-4 fade-in">
    <div class="row tw:flex-col tw:bsxl:flex-row tw:gap-4 tw:xl:gap-0">
        <div class="col-xl-4">
            <div class="filter-section">
                <div class="filter-title">فیلتر بر اساس موضوع</div>
                <div class="filter-buttons">
                    <label
                        class="filter-btn tw:hover:bg-lime-700 tw:has-checked:bg-lime-700 tw:hover:text-white tw:has-checked:text-white tw:cursor-pointer">
                        همه
                        <input type="radio" name="topic" value="" class="tw:hidden" wire:model.live="topic" checked>
                    </label>
                    <label
                        class="filter-btn tw:hover:bg-lime-700 tw:has-checked:bg-lime-700 tw:hover:text-white tw:has-checked:text-white tw:cursor-pointer">
                        درباره محصول
                        <input type="radio" name="topic" value="درباره محصول" class="tw:hidden" wire:model.live="topic">
                    </label>
                    <label
                        class="filter-btn tw:hover:bg-lime-700 tw:has-checked:bg-lime-700 tw:hover:text-white tw:has-checked:text-white tw:cursor-pointer">
                        مشکل در خرید
                        <input type="radio" name="topic" value="مشکل در خرید" class="tw:hidden" wire:model.live="topic">
                    </label>
                    <label
                        class="filter-btn tw:hover:bg-lime-700 tw:has-checked:bg-lime-700 tw:hover:text-white tw:has-checked:text-white tw:cursor-pointer">
                        پیشنهاد یا انتقاد
                        <input type="radio" name="topic" value="پیشنهاد یا انتقاد" class="tw:hidden" wire:model.live="topic">
                    </label>
                    <label
                        class="filter-btn tw:hover:bg-lime-700 tw:has-checked:bg-lime-700 tw:hover:text-white tw:has-checked:text-white tw:cursor-pointer">
                        مشکل فنی
                        <input type="radio" name="topic" value="مشکل فنی" class="tw:hidden" wire:model.live="topic">
                    </label>
                    <label
                        class="filter-btn tw:hover:bg-lime-700 tw:has-checked:bg-lime-700 tw:hover:text-white tw:has-checked:text-white tw:cursor-pointer">
                        سایر
                        <input type="radio" name="topic" value="سایر" class="tw:hidden" wire:model.live="topic">
                    </label>
                </div>
            </div>

            <div class="card">
                <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                    <h5 class="mb-0">لیست کاربران</h5>
                    <span class="tw:grayscale tw:pointer-events-none"></span>
                    <div class="btn-group tw:bg-black tw:rounded-md">
                        <label
                            class="btn btn-sm btn-light @if(!$filter) active @endif tw:transition-all tw:transition-300"
                            wire:loading.class="disabled tw:grayscale tw:pointer-events-none"
                            wire:target="filter"
                        >
                            جدید
                            <input type="radio" name="filter" value="" class="tw:hidden" wire:model.live="filter">
                        </label>
                        <label
                            class="btn btn-sm btn-light @if($filter === 'mine') active @endif tw:transition-all tw:transition-300"
                            wire:loading.class="disabled tw:grayscale tw:pointer-events-none"
                            wire:target="filter"
                        >
                            تیکت های شما
                            <input type="radio" name="filter" value="mine" class="tw:hidden" wire:model.live="filter">
                        </label>
                    </div>
                </div>
                <div class="card-body p-0">
                    <div class="list-group list-group-flush" wire:poll.5s>
                        @forelse($tickets as $ticket)
                            <div
                                class="list-group-item list-group-item-action d-flex justify-content-between align-items-center tw:transition-all tw:transition-200"
                            >
                                <div class="d-flex">
                                    <div class="position-relative me-3">
                                        <img
                                            src="{{ $ticket->user->image() }}"
                                            alt="{{ $ticket->user->name() }}"
                                            class="user-avatar tw:!w-10 tw:!h-10">
                                    </div>
                                    <div>
                                        <h6 class="mb-0">{{ $ticket->user->name() }}</h6>
                                        <small class="text-muted">{{ truncate_text($ticket->messages[count($ticket->messages) - 1]->content, 30) }}</small>
                                        <div class="mt-1 tw:flex tw:justify-start tw:items-center tw:gap-2">
                                            @if($ticket->trashed())
                                                <span class="status-badge status-closed">بسته</span>
                                            @elseif($ticket->admin_id)
                                                <span class="status-badge status-open">باز</span>
                                            @else
                                                <span class="status-badge status-pending">در انتظار</span>
                                            @endif
                                            <span class="tw:flex tw:justify-start tw:items-center tw:gap-1">
                                                @if($ticket->topic === 'مشکل در خرید')
                                                    <i class="fas fa-exclamation-circle text-danger ms-1"></i>
                                                    <small class="text-muted">خرید</small>
                                                @elseif($ticket->topic === 'درباره محصول')
                                                    <i class="fas fa-exclamation-triangle text-warning ms-1"></i>
                                                    <small class="text-muted">محصول</small>
                                                @elseif($ticket->topic === 'پیشنهاد یا انتقاد')
                                                    <i class="fas fa-info-circle text-info ms-1"></i>
                                                    <small class="text-muted">پیشنهاد</small>
                                                @elseif($ticket->topic === 'مشکل فنی')
                                                    <i class="fas fa-exclamation-triangle text-warning ms-1"></i>
                                                    <small class="text-muted">فنی</small>
                                                @elseif($ticket->topic === 'سایر')
                                                    <i class="fas fa-info-circle text-muted ms-1"></i>
                                                    <small class="text-muted">سایر</small>
                                                @else
                                                    <i class="fas fa-question-circle text-danger ms-1"></i>
                                                    <small class="text-muted">نامشخص</small>
                                                @endif
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    class="tw:flex tw:flex-col tw:justify-between tw:items-end tw:h-full"
                                    style="height: -moz-available; height: -webkit-fill-available;"
                                >
                                    <small class="text-muted d-block">{{ $ticket->created_at_jalali->format("Y/m/d - H:i") }}</small>
                                    <div class="tw:flex tw:justify-end tw:items-end tw:gap-2">
                                        <button
                                            type="button"
                                            class="btn btn-outline-primary btn-sm tw:rounded-full"
                                            data-bs-toggle="modal"
                                            data-bs-target="#chatModal"
                                            wire:click="openChat({{ $ticket->id }})"
                                            wire:loading.attr="disabled"
                                            wire:target="openChat({{ $ticket->id }})"
                                        >
                                            <i class="fas fa-comment"></i>
                                        </button>
                                        @if($ticket->admin_id && !$ticket->trashed())
                                            <button
                                                type="button"
                                                class="btn btn-outline-danger btn-sm tw:rounded-full"
                                                wire:click="closeTicket({{ $ticket->id }})"
                                                wire:loading.attr="disabled"
                                                wire:target="closeTicket({{ $ticket->id }})"
                                                wire:confirm="آیا از بستن تیکت مطمئن هستید؟\nبعد از بستن تیکت دیگر امکان ارسال پیام در آن وجود ندارد."
                                                onmousedown="event.stopPropagation()"
                                            >
                                                <i class="fas fa-hand"></i>
                                            </button>
                                        @endif
                                    </div>
                                </div>
                            </div>
                        @empty
                            <p class="tw:my-4 tw:text-center tw:text-sm tw:text-red-600">هیچ تیکتی برای نمایش پیدا نشد.</p>
                        @endforelse
                    </div>
                </div>
            </div>
        </div>

        <div class="col-xl-8">
            <div class="p-3">
                <div class="row g-2 tw:mb-2">
                    <div class="col-md-6">
                        <label for="ticketId" class="form-label">شماره تیکت</label>
                        <input type="text" id="ticketId" placeholder="جستوجوی تیکت با شماره تیکت" class="tw:w-full tw:p-2 tw:rounded-sm tw:border tw:border-slate-600/25 tw:hover:border-slate-600 tw:focus:border-slate-600 tw:outline-none tw:transition-all tw:transition-200" wire:model.live="ticketId">
                    </div>
                </div>
                <div class="row g-2 tw:mb-2">
                    <div class="col-md-6">
                        <label for="userName" class="form-label">نام کاربر</label>
                        <input type="text" id="userName" placeholder="جستوجوی تیکت با نام کاربر" class="tw:w-full tw:p-2 tw:rounded-sm tw:border tw:border-slate-600/25 tw:hover:border-slate-600 tw:focus:border-slate-600 tw:outline-none tw:transition-all tw:transition-200" wire:model.live="name">
                    </div>
                    <div class="col-md-6">
                        <label for="userPhone" class="form-label">شماره کاربر</label>
                        <input type="text" id="userPhone" placeholder="جستوجوی تیکت با شماره کاربر" class="tw:w-full tw:p-2 tw:rounded-sm tw:border tw:border-slate-600/25 tw:hover:border-slate-600 tw:focus:border-slate-600 tw:outline-none tw:transition-all tw:transition-200" wire:model.live="phone">
                    </div>
                </div>
                <div class="tw:flex tw:flex-col tw:xl:flex-row tw:gap-2">
                    <div class="tw:w-full tw:xl:w-3/5 filter-section">
                        <div class="filter-title">فیلتر بر اساس موضوع</div>
                        <div class="filter-buttons">
                            <label
                                class="filter-btn tw:hover:bg-lime-700 tw:has-checked:bg-lime-700 tw:hover:text-white tw:has-checked:text-white tw:cursor-pointer">
                                همه
                                <input type="radio" name="searchTopic" value="" class="tw:hidden" wire:model.live="searchTopic" checked>
                            </label>
                            <label
                                class="filter-btn tw:hover:bg-lime-700 tw:has-checked:bg-lime-700 tw:hover:text-white tw:has-checked:text-white tw:cursor-pointer">
                                درباره محصول
                                <input type="radio" name="searchTopic" value="درباره محصول" class="tw:hidden" wire:model.live="searchTopic">
                            </label>
                            <label
                                class="filter-btn tw:hover:bg-lime-700 tw:has-checked:bg-lime-700 tw:hover:text-white tw:has-checked:text-white tw:cursor-pointer">
                                مشکل در خرید
                                <input type="radio" name="searchTopic" value="مشکل در خرید" class="tw:hidden" wire:model.live="searchTopic">
                            </label>
                            <label
                                class="filter-btn tw:hover:bg-lime-700 tw:has-checked:bg-lime-700 tw:hover:text-white tw:has-checked:text-white tw:cursor-pointer">
                                پیشنهاد یا انتقاد
                                <input type="radio" name="searchTopic" value="پیشنهاد یا انتقاد" class="tw:hidden" wire:model.live="searchTopic">
                            </label>
                            <label
                                class="filter-btn tw:hover:bg-lime-700 tw:has-checked:bg-lime-700 tw:hover:text-white tw:has-checked:text-white tw:cursor-pointer">
                                مشکل فنی
                                <input type="radio" name="searchTopic" value="مشکل فنی" class="tw:hidden" wire:model.live="searchTopic">
                            </label>
                            <label
                                class="filter-btn tw:hover:bg-lime-700 tw:has-checked:bg-lime-700 tw:hover:text-white tw:has-checked:text-white tw:cursor-pointer">
                                سایر
                                <input type="radio" name="searchTopic" value="سایر" class="tw:hidden" wire:model.live="searchTopic">
                            </label>
                        </div>
                    </div>
                    <div class="tw:w-full tw:xl:w-2/5 filter-section">
                        <div class="filter-title">فیلتر بر اساس وضعیت</div>
                        <div class="filter-buttons">
                            <label
                                class="filter-btn tw:bg-green-600/20 tw:text-green-600 tw:hover:text-white tw:hover:bg-green-600 tw:has-checked:text-white tw:has-checked:bg-green-600 tw:cursor-pointer tw:transition-all tw:transition-200">
                                همه
                                <input type="radio" name="status" value="" class="tw:hidden" wire:model.live="status" checked>
                            </label>
                            <label
                                class="filter-btn tw:bg-amber-600/20 tw:text-amber-600 tw:hover:text-white tw:hover:bg-amber-600 tw:has-checked:text-white tw:has-checked:bg-amber-600 tw:cursor-pointer tw:transition-all tw:transition-200">
                                در انتظار
                                <input type="radio" name="status" value="pending" class="tw:hidden" wire:model.live="status">
                            </label>
                            <label
                                class="filter-btn tw:bg-sky-600/20 tw:text-sky-600 tw:hover:text-white tw:hover:bg-sky-600 tw:has-checked:text-white tw:has-checked:bg-sky-600 tw:cursor-pointer tw:transition-all tw:transition-200">
                                باز
                                <input type="radio" name="status" value="open" class="tw:hidden" wire:model.live="status">
                            </label>
                            <label
                                class="filter-btn tw:bg-gray-600/20 tw:text-gray-600 tw:hover:text-white tw:hover:bg-gray-600 tw:has-checked:text-white tw:has-checked:bg-gray-600 tw:cursor-pointer tw:transition-all tw:transition-200">
                                بسته
                                <input type="radio" name="status" value="closed" class="tw:hidden" wire:model.live="status">
                            </label>
                        </div>
                    </div>
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
                        @forelse($allTickets as $ticket)
                            <tr>
                                <td>TKT-100{{ $ticket->id }}</td>
                                <td>{{ $ticket->title }}</td>
                                <td>{{ $ticket->created_at_jalali->format('Y/m/d - H:i') }}</td>
                                <td wire:poll.5s>
                                    @if($ticket->trashed())
                                        <span class="status-badge status-closed">بسته شده</span>
                                    @elseif($ticket->admin_id)
                                        <span class="status-badge status-open">باز</span>
                                    @else
                                        <span class="status-badge status-pending">در انتظار</span>
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
                                    @if(!$ticket->trashed() && $ticket->admin_id === auth()->user()->id)
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

                <!-- Pagination -->
                <div class="tw:mx-3 tw:my-4">
                    {{ $allTickets->links(data: ['scrollTo' => false]) }}
                </div>
            </div>
        </div>
    </div>
</section>
