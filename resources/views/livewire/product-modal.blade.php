<div
    class="modal fade"
    id="productDetailsModal"
    aria-labelledby="productDetailsModalLabel"
    wire:ignore.self
>
    <div class="modal-dialog modal-lg"
         wire:mousedown.outside="closeModal">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="productDetailsModalLabel">
                    جزئیات محصول
                </h5>
                <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    wire:click="closeModal"
                ></button>
            </div>
            <div class="modal-body">
                <div class="modal-body" id="productDetailsContent">
                    <div class="product-details-content">
                        <div class="tw:flex tw:flex-col tw:justify-center tw:items-center tw:gap-2">
                            <div class="gallery product-image tw:!bg-slate-600/20 tw:h-auto tw:max-h-58 tw:w-1/2 tw:overflow-hidden">
                                @if($product && $product->image())
                                    @foreach($product->images() as $image)
                                        <a
                                            href="{{ $product->folderUrl() . $image['path'] }}"
                                            data-pswp-width="{{ $image['width'] }}"
                                            data-pswp-height="{{ $image['height'] }}"
                                            @if($loop->index > 0) class="tw:hidden" @endif
                                            target="_blank"
                                        >
                                            <img
                                                src="{{ $product->folderUrl() . $image['path'] }}"
                                                class="tw:w-full tw:h-full tw:object-cover @if($loop->index === 0) tw:hover:scale-[1.15] tw:transition-all tw:transition-300 @endif"
                                            >
                                        </a>
                                    @endforeach
                                @else
                                    <i class="fas fa-seedling tw:flex tw:justify-center tw:items-center tw:w-full tw:h-full tw:text-green-600"></i>
                                @endif
                            </div>
                            @if($product && $product->image())
                                <p class="tw:text-xs tw:text-center">(برای مشاهده عکس ها روی تصویر بالا کلیک کنید)</p>
                            @endif
                        </div>
                        <div class="detail-section">
                            <h6>اطلاعات کلی</h6>
                            @if($product)
                                <div class="detail-item">
                                    <span class="detail-label">نام محصول:</span>
                                    <span class="detail-value">{{ $product->name }}</span>
                                </div>
                                <div class="detail-item">
                                    <span class="detail-label">قیمت:</span>
                                    <span class="detail-value">{{ number_format($product->price) }} تومان</span>
                                </div>
                                <div class="detail-item">
                                    <span class="detail-label">تعداد در انبار:</span>
                                    <span class="detail-value @if($product->quantity <= 3) text-danger @endif">{{ $product->quantity }} عدد</span>
                                </div>
                                <div class="detail-item">
                                    <span class="detail-label">دسته بندی:</span>
                                    <span class="detail-value">{{ $product->category }}</span>
                                </div>
                                <div class="detail-item">
                                    <span class="detail-label">توضیحات:</span>
                                    <span class="detail-value">{{ $product->description }}</span>
                                </div>
                            @else
                                <span class="tw:flex tw:justify-center tw:items-center">
                                    <div class="spinner-border spinner-border-sm text-success" role="status">
                                      <span class="visually-hidden">Loading...</span>
                                    </div>
                                </span>
                            @endif
                        </div>

                        @if($product)
                            <div class="detail-section">
                                <h6>مشخصات فنی</h6>
                                @forelse(json_decode($product->details, true) as $name => $value)
                                    <div class="detail-item">
                                        <span class="detail-label">{{ $name }}:</span>
                                        <span class="detail-value">{{ $value }}</span>
                                    </div>
                                @empty
                                    <p class="text-center text-danger">مشخصاتی برای این کالا ثیت نشده است.</p>
                                @endforelse
                            </div>
                        @endif
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                @if($product && $product->quantity <= 0)
                    <button
                        type="button"
                        class="btn btn-secondary-custom"
                        disabled
                    >
                        افزودن به سبد خرید <i class="fas fa-ban"></i>
                    </button>
                @elseif ($product)
                    <button
                        type="button"
                        class="btn btn-primary"
                        Wire:click="addToCart"
                        wire:loading.attr="disabled"
                    >
                        افزودن به سبد خرید
                    </button>
                @else
                    <button
                        type="button"
                        class="btn btn-primary"
                    >
                        افزودن به سبد خرید
                    </button>
                @endif
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
