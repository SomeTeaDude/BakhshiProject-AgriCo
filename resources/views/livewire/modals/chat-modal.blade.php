<div
    id="chatModal"
    class="modal fade"
    data-bs-backdrop="static" data-bs-keyboard="false"
    tabindex="-1"
    aria-hidden="true"
    wire:ignore.self
    onmousedown="event.stopPropagation()"
>
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">مشاهده تیکت</h5>
                <button type="button" class="btn-close btn-close-black" data-bs-dismiss="modal" wire:click="closeModal"></button>
            </div>
            <div class="modal-body p-0">
                @if($ticket)
                    <div class="ticket-header p-3 border-bottom">
                        <div class="row">
                            <div class="col-md-6 tw:p-1">
                                <strong>شماره تیکت:</strong>
                                <span>TKT-100{{ $ticket->id }}</span>
                            </div>
                            <div class="col-md-6 tw:p-1">
                                <strong>وضعیت:</strong>
                                @if($ticket->trashed())
                                    <span class="ticket-status-badge status-closed">بسته شده</span>
                                @elseif($ticket->admin_id)
                                    <span class="ticket-status-badge status-open">باز</span>
                                @else
                                    <span class="ticket-status-badge status-pending">در انتظار</span>
                                @endif
                            </div>
                            <div class="col-md-6 tw:p-1">
                                <strong>عنوان:</strong>
                                <span>{{ $ticket->title }}</span>
                            </div>
                            <div class="col-md-6 tw:p-1">
                                <strong>موضوع:</strong>
                                <span>{{ $ticket->topic }}</span>
                            </div>
                            @if(!auth()->user()->isUser())
                                <div class="col-md-6 tw:p-1">
                                    <strong>نام کاربر:</strong>
                                    <span>{{ $ticket->user->name() }}</span>
                                </div>
                                <div class="col-md-6 tw:p-1">
                                    <strong>شماره تماس:</strong>
                                    <span>{{ $ticket->user->phone }}</span>
                                </div>
                            @endif
                        </div>
                    </div>

                    <div class="chat-container" id="chatBox" wire:poll.keep-alive.3s>
                        @if($ticket->attachment())
                            <img src="{{ $ticket->attachment() }}" alt="{{ $ticket->title }}" class="tw:w-auto tw:h-auto tw:max-w-full tw:max-h-58 tw:mb-2 tw:rounded-md">
                        @endif
                        @foreach($ticket->messages as $message)
                            <div
                                class="chat-message tw:relative {{ $message->user->isUser() ? (auth()->user()->isUser() ? 'user' : 'support') : (auth()->user()->isUser() ? 'support' : 'user') }}"
                                x-data
                                x-intersect.once="$el.classList.add('visible')"
                                x-init="
                                    setTimeout(() => {
                                        const box = document.getElementById('chatBox');
                                        box.scrollTo({
                                            top: box.scrollHeight,
                                            behavior: 'smooth'
                                        });
                                    }, 500)
                                "
                            >
                                <div class="message-text">{!! nl2br($message->content) !!} </div>
                                <div class="tw:flex tw:justify-between tw:items-center tw:gap-4 tw:w-full">
                                    <div class="message-time">{{ $message->created_at_jalali->format('d F - H:i') }}</div>
                                    @if(auth()->user()->isUser() && $message->user->isAdmin())
                                        <span class="tw:flex tw:justify-start tw:items-center tw:gap-2">
                                            <i class="fa-duotone fa-medal tw:text-sm tw:text-yellow-600"></i>
                                            <span class="tw:italic tw:text-[0.65rem]">پیام از ادمین سایت</span>
                                        </span>
                                    @endif
                                </div>
                            </div>
                        @endforeach
                    </div>

                    <div class="ticket-reply p-3 border-top">
                        @if($ticket->trashed())
                            <p class="tw:text-center tw:text-sm tw:text-red-600">این تیکت بسته شده میباشد <i class="fas fa-exclamation-circle"></i></p>
                        @else
                            @if(auth()->user()->isUser())
                                @if($ticket->user_id === auth()->id())
                                    <div class="tw:relative">
                                        @error('message')
                                        <p class="tw:text-xs tw:text-start tw:text-red-600 tw:my-1">{{ $message }}</p>
                                        @enderror
                                        <textarea
                                            name="messageChat"
                                            class="tw:w-full tw:p-2 tw:pb-12 tw:max-h-58 tw:rounded-sm tw:border @error('message') tw:border-red-600 @else tw:border-gray-600/25 tw:hover:border-gray-600 tw:focus:border-gray-600 @enderror tw:outline-none tw:transition-all tw:transition-200"
                                            rows="0"
                                            placeholder="پاسخ خود را بنویسید..."
                                            wire:model="message"
                                        ></textarea>
                                        <button
                                            type="button"
                                            class="btn btn-success tw:absolute tw:bottom-4 tw:left-2 tw:flex tw:justify-center tw:items-center tw:rounded-full tw:w-10 tw:h-10"
                                            wire:click="sendMessage"
                                        >
                                            <i wire:loading.remove.inline wire:target="sendMessage" class="fas fa-paper-plane"></i>
                                            <i wire:loading.inline wire:target="sendMessage" class="fas fa-loader fa-spin"></i>
                                        </button>
                                    </div>
                                @else
                                    <p class="tw:text-center tw:text-sm tw:text-red-600">شما اجازه دسترسی به این تیکت را ندارید <i class="fas fa-exclamation-circle"></i></p>
                                @endif
                            @else
                                @if(auth()->user()->isAdmin())
                                    <div class="tw:relative">
                                        @error('message')
                                        <p class="tw:text-xs tw:text-start tw:text-red-600 tw:my-1">{{ $message }}</p>
                                        @enderror
                                        <textarea
                                            name="messageChat"
                                            class="tw:w-full tw:p-2 tw:pb-12 tw:max-h-58 tw:rounded-sm tw:border @error('message') tw:border-red-600 @else tw:border-gray-600/25 tw:hover:border-gray-600 tw:focus:border-gray-600 @enderror tw:outline-none tw:transition-all tw:transition-200"
                                            rows="0"
                                            placeholder="پاسخ خود را بنویسید..."
                                            wire:model="message"
                                        ></textarea>
                                        <button
                                            type="button"
                                            class="btn btn-success tw:absolute tw:bottom-4 tw:left-2 tw:flex tw:justify-center tw:items-center tw:rounded-full tw:w-10 tw:h-10"
                                            wire:click="sendMessage"
                                        >
                                            <i wire:loading.remove.inline wire:target="sendMessage" class="fas fa-paper-plane"></i>
                                            <i wire:loading.inline wire:target="sendMessage" class="fas fa-loader fa-spin"></i>
                                        </button>
                                    </div>
                                @else
                                    @if(!$ticket->admin_id || $ticket->admin_id === auth()->id())
                                        <div class="tw:relative">
                                            @error('message')
                                            <p class="tw:text-xs tw:text-start tw:text-red-600 tw:my-1">{{ $message }}</p>
                                            @enderror
                                            <textarea
                                                name="messageChat"
                                                class="tw:w-full tw:p-2 tw:pb-12 tw:max-h-58 tw:rounded-sm tw:border @error('message') tw:border-red-600 @else tw:border-gray-600/25 tw:hover:border-gray-600 tw:focus:border-gray-600 @enderror tw:outline-none tw:transition-all tw:transition-200"
                                                rows="0"
                                                placeholder="پاسخ خود را بنویسید..."
                                                wire:model="message"
                                            ></textarea>
                                            <button
                                                type="button"
                                                class="btn btn-success tw:absolute tw:bottom-4 tw:left-2 tw:flex tw:justify-center tw:items-center tw:rounded-full tw:w-10 tw:h-10"
                                                wire:click="sendMessage"
                                            >
                                                <i wire:loading.remove.inline wire:target="sendMessage" class="fas fa-paper-plane"></i>
                                                <i wire:loading.inline wire:target="sendMessage" class="fas fa-loader fa-spin"></i>
                                            </button>
                                        </div>
                                    @else
                                        <p class="tw:text-center tw:text-sm tw:text-red-600">این تیکت توسط همکاران دیگر در پشتیبانی پاسخگویی میشود <i class="fas fa-exclamation-circle"></i></p>
                                    @endif
                                @endif
                            @endif
                        @endif
                    </div>
                @else
                    <div class="tw:flex tw:justify-center tw:items-center py-4">
                        <x-spinner />
                    </div>
                @endif
            </div>
        </div>
    </div>
</div>
