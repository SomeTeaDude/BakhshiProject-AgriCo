<div
    class="tw:relative"
    x-data="{ open: false }"
    @click.outside="open = false"
>
    <input type="text" id="{{ $id ?? '' }}" class="tw:w-full tw:p-2 tw:rounded-sm tw:border @error($name) tw:border-red-600 @else tw:border-gray-600/25 tw:hover:border-gray-600 tw:focus:border-gray-600 @enderror tw:outline-none tw:transition-all tw:transition-200" autocomplete="off" @focus="open = true" wire:model.live="{{ $name }}">
    <div
        x-show="open"
        x-transition
        class="tw:absolute tw:-bottom-2 tw:left-0 tw:w-full tw:min-h-20 tw:max-h-96 tw:p-2 tw:translate-y-full tw:bg-white tw:shadow-md tw:border tw:border-slate-700/20 tw:overflow-y-auto tw:transition-all tw:transition-200 tw:z-10">
        <div class="tw:flex tw:justify-between tw:items-center tw:gap-1 tw:w-full tw:mb-3">
            <p class="tw:mb-0 tw:text-sm tw:font-bold">{{ $label }}</p>
            @if(trim($subject))
                <button
                    class="tw:text-red-600 tw:no-underline tw:hover:underline tw:mt-1 tw:me-1"
                    wire:click="{{ $reset }}"
                    wire:loading.attr="disabled"
                >حذف</button>
            @endif
        </div>
        @if(count($items) > 0)
            @foreach($items as $item)
                <button
                    class="tw:relative tw:flex tw:justify-between tw:items-center tw:gap-2 tw:w-full tw:not-last:mb-2 tw:p-2 tw:border tw:border-slate-700/10 tw:hover:border-slate-700/25 tw:hover:bg-slate-700/10 tw:rounded-md tw:cursor-pointer tw:transition-all tw:transition-200"
                    wire:click="{{ $set }}('{{ $item->{$property} }}')"
                    wire:loading.attr="disabled"
                    wire:target="{{ $set }}('{{ $item->{$property} }}')"
                    @if($item->{$property} === trim($subject)) disabled @endif
                >
                    <span>{{ $item->{$property} }}</span>
                    @if($item->{$property} === trim($subject))
                        <span><i class="fas fa-check"></i></span>
                    @else
                        <span
                            wire:loading.inline
                            wire:target="setCategory('{{ $item->{$property} }}')"
                        ><i class="fas fa-loader fa-spin"></i></span>
                    @endif
                </button>
            @endforeach
        @else
            @if($subject)
                <p class="{{ $msgColor ?? 'tw:text-red-600' }} tw:text-xs tw:text-center">{{ $emptyMessage }}</p>
            @else
                <p class="{{ $fullMsgColor ?? 'tw:text-red-600' }} tw:text-xs tw:text-center">{{ $fullEmptyMessage ?? $emptyMessage }}</p>
            @endif
        @endif
    </div>
</div>
