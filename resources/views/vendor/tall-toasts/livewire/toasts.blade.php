<div
    onmousedown="event.stopPropagation()"
    x-data='ToastComponent($wire)'
    @mouseleave="scheduleRemovalWithOlder()"
    class="tw:fixed tw:bottom-0 tw:p-4 tw:space-y-3 tw:w-full tw:max-w-sm tw:pointer-events-none tw:left-0 tw:toasts-container tw:sm:tw:p-6"
    style="z-index:9999;"
>
    <template
        x-for="toast in toasts.filter((a)=>a)"
        :key="toast.index"
    >
        <div
            @mouseenter="cancelRemovalWithNewer(toast.index)"
            @mouseleave="scheduleRemovalWithOlder(toast.index)"
            @click="remove(toast.index)"
            x-show="toast.show===1"
            x-transition:enter="tw:ease-out tw:duration-500 tw:transition"
            x-transition:enter-start="tw:translate-y-2 tw:opacity-0 tw:sm:translate-y-0 tw:ltr:sm:translate-x-10 tw:rtl:sm:-translate-x-10"
            x-transition:enter-end="tw:translate-y-0 tw:opacity-100 tw:ltr:sm:translate-x-0"
            x-transition:leave="tw:transition tw:ease-in tw:duration-500"
            x-transition:leave-start="tw:opacity-100"
            x-transition:leave-end="tw:opacity-0"
            x-init="$nextTick(()=>{toast.show=1})"
        >
            @include('tall-toasts::includes.content')
        </div>
    </template>
</div>
