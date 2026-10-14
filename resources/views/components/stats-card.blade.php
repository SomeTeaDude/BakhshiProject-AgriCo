<div class="stats-card">
    <div class="tw:flex tw:flex-col-reverse tw:sm:flex-row tw:justify-between tw:items-center tw:gap-4 tw:w-full">
        <div>
            <h3 class="mb-1 tw:text-nowrap">{{ $count }}</h3>
            <p class="text-muted mb-0 tw:text-nowrap">{{ $label }}</p>
        </div>
        <div
            class="stats-icon bg-{{ $bg }} tw:m-0 tw:mb-2 tw:md:mb-0 tw:p-8 tw:md:p-0"
        >
            <i class="fas fa-{{ $icon }} tw:text-2xl tw:md:text-lg"></i>
        </div>
    </div>
</div>
