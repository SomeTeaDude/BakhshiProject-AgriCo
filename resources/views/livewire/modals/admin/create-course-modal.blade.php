<div
    id="createCourseModal"
    class="modal fade"
    tabindex="-1"
    wire:ignore.self>
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">افزودن دوره</h5>
                <button
                    type="button"
                    class="btn-close btn-close-black"
                    data-bs-dismiss="modal"
                ></button>
            </div>
            <div class="modal-body">
                <div class="tw:flex tw:flex-col tw:justify-center tw:items-center tw:gap-2">
                    <div class="gallery product-image @if(!$image) tw:hidden @endif tw:!bg-slate-600/20 tw:h-auto tw:max-h-58 tw:w-1/2 tw:rounded-md tw:overflow-hidden">
                        @if($image)
                            <a
                                href="{{ $image->temporaryUrl() }}"
                                data-pswp-width="{{ getimagesize($image->getRealPath())[0] }}"
                                data-pswp-height="{{ getimagesize($image->getRealPath())[1] }}"
                                target="_blank"
                            >
                                <img
                                    src="{{ $image->temporaryUrl() }}"
                                    class="tw:w-full tw:h-full tw:object-cover tw:hover:scale-[1.15] tw:transition-all tw:transition-300"
                                >
                            </a>
                        @endif
                    </div>
                    @if($image)
                        <p class="tw:text-xs tw:text-center">(برای مشاهده عکس روی تصویر بالا کلیک کنید)</p>
                    @endif
                </div>
                <div class="tw:flex tw:flex-col tw:justify-start tw:items-start tw:gap-4 tw:w-full">
                    <div class="tw:flex tw:flex-col tw:bssm:flex-row tw:items-center tw:gap-4 tw:w-full">
                        <div class="tw:w-full tw:bssm:w-1/2">
                            <div class="tw:flex tw:justify-between tw:items-center tw:gap-1 tw:w-full">
                                <label for="productNameCreate" class="form-label tw:text-nowrap">نام محصول <span class="tw:text-red-600">*</span></label>
                                @error('name')
                                    <p class="tw:mb-0 tw:text-xs tw:text-red-600">{{ $message }}</p>
                                @enderror
                            </div>
                            <input type="text" id="productNameCreate" class="tw:w-full tw:p-2 tw:rounded-sm tw:border @error('name') tw:border-red-600 @else tw:border-gray-600/25 tw:hover:border-gray-600 tw:focus:border-gray-600 @enderror tw:outline-none tw:transition-all tw:transition-200" wire:model.live="name">
                        </div>
                        <div class="tw:w-full tw:bssm:w-1/2">
                            <div class="tw:flex tw:justify-between tw:items-center tw:gap-1 tw:w-full">
                                <label for="productCategoryCreate" class="form-label tw:text-nowrap">دسته بندی <span class="tw:text-red-600">*</span></label>
                                @error('category')
                                    <p class="tw:mb-0 tw:text-xs tw:text-red-600">{{ $message }}</p>
                                @enderror
                            </div>
                            <x-dropdown-list
                                id="productCategoryEdit"
                                name="category"
                                label="لیست دسته بندی ها:"
                                :subject="$category"
                                :items="$categories"
                                property="category"
                                set="setCategory"
                                reset="resetCategory"
                                emptyMessage='دسته بندی جدید "{{ trim($category) }}" به صورت خودکار ساخته خواهد شد.'
                                msgColor="tw:text-green-600"
                                fullEmptyMessage="متاسفانه دسته بنده ای پیدا نشد."
                            />
                        </div>
                    </div>
                    <div class="tw:flex tw:flex-col tw:bssm:flex-row tw:items-center tw:gap-4 tw:w-full">
                        <div class="tw:w-full tw:bssm:w-1/2">
                            <div class="tw:flex tw:justify-between tw:items-center tw:gap-1 tw:w-full">
                                <label for="productPriceCreate" class="form-label">قیمت(تومان) <span class="tw:text-red-600">*</span></label>
                                @error('price')
                                <p class="tw:mb-0 tw:text-xs tw:text-red-600">{{ $message }}</p>
                                @else
                                    <p class="tw:mb-0 tw:text-xs tw:text-slate-700/70">{{ $price ? filter_var($price, FILTER_VALIDATE_FLOAT) ? number_format($price) : 'عدد اشتباه' : 'عددی وارد کنید' }}</p>
                                @enderror
                            </div>
                            <input type="number" min="1000" step="1000" id="productPriceCreate" class="tw:w-full tw:p-2 tw:rounded-sm tw:border @error('price') tw:border-red-600 @else tw:border-gray-600/25 tw:hover:border-gray-600 tw:focus:border-gray-600 @enderror tw:outline-none tw:transition-all tw:transition-200" wire:model.live="price">
                        </div>
                        <div class="tw:w-full tw:bssm:w-1/2"
                             x-data="{ uploading: false, progress: 0, color: 'blue' }"
                             x-on:livewire-upload-start="uploading = true; progress=0;"
                             x-on:livewire-upload-finish="uploading = false; color='green';"
                             x-on:livewire-upload-cancel="uploading = false; progress=0;"
                             x-on:livewire-upload-error="uploading = false; color='red';"
                             x-on:livewire-upload-progress="progress = $event.detail.progress">
                            <div class="tw:flex tw:justify-between tw:items-start tw:gap-1">
                                <div class="tw:flex tw:flex-col tw:justify-between tw:gap-1 tw:w-[calc(100%-80px)]" style="height: -moz-available; height: -webkit-fill-available;">
                                    <div class="tw:flex tw:flex-col tw:justify-between tw:items-start tw:gap-1 tw:w-full">
                                        <input type="file" accept="image/*" id="productImageCreate" class="tw:hidden" wire:model="image">
                                        @if($image)
                                            <div class="tw:flex tw:justify-start tw:items-center tw:gap-1">
                                                <button type="button" class="btn btn-outline-danger btn-sm tw:text-nowrap" wire:click="removeImage"
                                                        wire:loading.attr="disabled"
                                                        wire:target="removeImage"
                                                        x-bind:class="uploading ? 'tw:opacity-50 tw:pointer-events-none' : ''">برداشتن عکس</button>
                                                <span class="tw:text-xs">(پیشنمایش بالا <i class="fas fa-arrow-up fa-xs"></i>)</span>
                                            </div>
                                        @else
                                            <div class="tw:flex tw:justify-start tw:items-center tw:gap-1">
                                                <label for="productImageCreate" class="btn btn-outline-primary btn-sm tw:text-nowrap"
                                                       x-bind:class="uploading ? 'tw:opacity-50 tw:pointer-events-none' : ''">تصویر دوره</label>
                                            </div>
                                        @endif
                                        @error('image')
                                            <p class="tw:mb-0 tw:text-xs tw:text-red-600">{{ $message }}</p>
                                        @enderror
                                    </div>
                                    <div x-show="uploading">
                                        <div class="tw:flex tw:items-center tw:gap-1 tw:mb-1 tw:me-1">
                                            <div class="progress tw:w-full" role="progressbar" aria-label="Upload progress bar" x-bind:aria-valuenow="progress" aria-valuemin="0" aria-valuemax="100">
                                                <div class="progress-bar progress-bar-striped progress-bar-animated" x-bind:class="progress === 100 ? 'text-bg-success' : ''" x-bind:style="`width: ${progress}%`" x-text="`${progress}%`"></div>
                                            </div>
                                            <button type="button" wire:loading.attr="disabled" wire:click="$cancelUpload('image')" class="tw:flex tw:justify-center tw:items-center tw:p-1 tw:border tw:border-red-600 tw:rounded-full tw:text-red-600 tw:hover:bg-red-600 tw:hover:text-white tw:transition-all tw:transition-300">
                                                <i class="fas fa-xmark tw:w-3 tw:h-3"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="tw:relative tw:flex tw:justify-center tw:items-center tw:w-[80px] tw:h-[80px] tw:bg-slate-600/20 tw:rounded-md tw:overflow-hidden">
                                    @if($image)
                                        @if(in_array($image->getMimeType(), ['image/jpg', 'image/jpeg', 'image/png', 'image/webp']))
                                            <img
                                                src="{{ $image->temporaryUrl() }}"
                                                alt="{{ $name }}" class="tw:w-[80px] tw:h-[80px]"
                                            >
                                        @else
                                            <i class="fas fa-seedling tw:text-green-600"></i>
                                        @endif
                                    @else
                                        <i class="fas fa-seedling tw:text-green-600"></i>
                                    @endif
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tw:w-full">
                        <div class="tw:flex tw:justify-between tw:items-center tw:gap-1 tw:w-full">
                            <label for="productDescriptionCreate" class="form-label">توضیحات <span class="tw:text-red-600">*</span></label>
                            @error('description')
                                <p class="tw:mb-0 tw:text-xs tw:text-red-600">{{ $message }}</p>
                            @enderror
                        </div>
                        <textarea id="productDescriptionCreate" rows="4" class="tw:w-full tw:p-2 tw:rounded-sm tw:border @error('description') tw:border-red-600 @else tw:border-gray-600/25 tw:hover:border-gray-600 tw:focus:border-gray-600 @enderror tw:outline-none tw:transition-[border] tw:transition-200" wire:model="description"></textarea>
                    </div>
                    <div class="tw:sticky tw:top-0 tw:left-0 tw:flex tw:justify-between tw:items-center tw:gap-1 tw:w-full tw:mt-4 tw:pt-4 tw:pb-2 tw:bg-white tw:border-t tw:border-slate-700/30">
                        <h5 class="tw:text-lg tw:font-base tw:m-0">جزئیات محصول</h5>
                        <button type="button" class="btn btn-outline-success btn-sm" wire:loading.attr="disabled" wire:click="addDetails">افزودن جزئیات +</button>
                    </div>
                    @if(count($details) > 0)
                        @foreach($details as $detail)
                            <div class="tw:flex tw:flex-col tw:bssm:flex-row tw:items-center tw:gap-4 tw:w-full">
                                <div class="tw:w-full tw:bssm:w-[45%]">
                                    <div class="tw:flex tw:justify-between tw:items-center tw:gap-1 tw:w-full">
                                        <label for="details-{{ $loop->index }}-key" class="form-label">مشخصات</label>
                                        @error("details.{$loop->index}.key")
                                        <p class="tw:mb-0 tw:text-xs tw:text-red-600">{{ $message }}</p>
                                        @enderror
                                    </div>
                                    <input type="text" id="details-{{ $loop->index }}-key" class="tw:w-full tw:p-2 tw:rounded-sm tw:border @error("details.{$loop->index}.key") tw:border-red-600 @else tw:border-gray-600/25 tw:hover:border-gray-600 tw:focus:border-gray-600 @enderror tw:outline-none tw:transition-all tw:transition-200" wire:model.live="details.{{$loop->index}}.key">
                                </div>
                                <div class="tw:w-full tw:bssm:w-[45%]">
                                    <div class="tw:flex tw:justify-between tw:items-center tw:gap-1 tw:w-full">
                                        <label for="details-{{ $loop->index }}-value" class="form-label">مقدار</label>
                                        @error("details.{$loop->index}.value")
                                        <p class="tw:mb-0 tw:text-xs tw:text-red-600">{{ $message }}</p>
                                        @enderror
                                    </div>
                                    <input type="text" id="details-{{ $loop->index }}-value" class="tw:w-full tw:p-2 tw:rounded-sm tw:border @error("details.{$loop->index}.value") tw:border-red-600 @else tw:border-gray-600/25 tw:hover:border-gray-600 tw:focus:border-gray-600 @enderror tw:outline-none tw:transition-all tw:transition-200" wire:model="details.{{$loop->index}}.value">
                                </div>
                                <button type="button" wire:loading.attr="disabled" wire:click="removeDetails({{$loop->index}})" wire:target="removeDetails({{$loop->index}})" class="tw:flex tw:justify-center tw:items-center tw:w-6 tw:h-6 tw:mt-7 tw:p-1 tw:border tw:border-red-600 tw:rounded-full tw:text-red-600 tw:hover:bg-red-600 tw:hover:text-white tw:transition-all tw:transition-300">
                                    <i class="fas fa-xmark"></i>
                                </button>
                            </div>
                        @endforeach
                    @else
                        <p class="tw:w-full tw:text-sky-600 tw:text-sm tw:text-center">میتوانید جزئیاتی به غیر از کادر های بالا را برای دوره اضافه کنید.</p>
                    @endif
                </div>
            </div>
            <div class="modal-footer">
                <button
                    type="button"
                    class="btn btn-success"
                    wire:click="saveCourse"
                    wire:loading.attr="disabled"
                >افزودن دوره جدید +</button>
                <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                >
                    بستن
                </button>
            </div>
        </div>
    </div>
</div>
