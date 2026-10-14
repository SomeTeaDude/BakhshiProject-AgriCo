<div
    class="tw:overflow-hidden tw:z-50 tw:p-5 tw:bg-white tw:rounded-md tw:shadow-lg tw:cursor-pointer tw:pointer-events-auto tw:select-none tw:ltr:border-l-8 tw:rtl:border-r-8 tw:hover:bg-gray-50 dark:tw:hover:bg-gray-900 dark:tw:bg-black"
    x-bind:class="{
                    'tw:border-blue-700': toast.type === 'info',
                    'tw:border-green-700': toast.type === 'success',
                    'tw:border-yellow-700': toast.type === 'warning',
                    'tw:border-red-700': toast.type === 'danger'
                  }"
>
    <div class="tw:flex tw:justify-between tw:items-center tw:space-x-5 tw:rtl:space-x-reverse">
        <div class="tw:flex-1 tw:ltr:mr-2 tw:rtl:ml-2">
            <div
                class="tw:mb-1 tw:text-lg tw:font-black tw:tracking-widest tw:text-gray-900 tw:uppercase tw:font-large dark:tw:text-gray-100"
                x-html="toast.title"
                x-show="toast.title !== undefined"
            ></div>

            <div
                class="tw:text-gray-900 dark:tw:text-gray-200"
                x-show="toast.message !== undefined"
                x-html="toast.message"
            ></div>
        </div>

        @include('tall-toasts::includes.icon')
    </div>

