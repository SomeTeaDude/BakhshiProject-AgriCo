<section>
    <div class="container my-5">
        <h1 class="text-center mb-5 text-success">محصولات فروشگاه</h1>
        <div class="row mb-4">
            <div class="col-12">
                <div class="filters-card">
                    <div class="row g-3">
                        <div class="tw:w-full tw:bssm:w-1/2 tw:lg:w-1/4">
                            <label for="productName" class="form-label">نام محصول</label>
                            <input type="text" id="productName" class="tw:w-full tw:p-2 tw:rounded-sm tw:border tw:border-gray-600/25 tw:hover:border-gray-600 tw:focus:border-gray-600 tw:outline-none tw:transition-all tw:transition-200" wire:model.live="name">
                        </div>
                        <div class="tw:w-full tw:bssm:w-1/2 tw:lg:w-1/4">
                            <label for="productCategory" class="form-label">دسته بندی</label>
                            <x-dropdown-list
                                id="productCategory"
                                name="category"
                                label="لیست دسته بندی ها:"
                                :subject="$category"
                                :items="$categories"
                                property="category"
                                set="setCategory"
                                reset="resetCategory"
                                emptyMessage="متاسفانه دسته بندی ای پیدا نشد."
                            />
                        </div>
                        <div class="tw:flex tw:flex-wrap tw:justify-center tw:lg:justify-end tw:items-end tw:gap-2 tw:w-full tw:lg:w-1/2">
                            <label for="type-all" class="status-badge tw:relative tw:bg-gray-600/20 tw:text-gray-600 tw:hover:text-white tw:hover:bg-gray-600 tw:has-checked:text-white tw:has-checked:bg-gray-600 tw:cursor-pointer tw:transition-all tw:transition-200">
                                همه
                                <input type="radio" name="status" id="type-all" value="" class="tw:hidden" wire:model.live="type" checked>
                            </label>
                            <label for="type-product" class="status-badge tw:relative tw:bg-green-600/20 tw:text-green-600 tw:hover:text-white tw:hover:bg-green-600 tw:has-checked:text-white tw:has-checked:bg-green-600 tw:cursor-pointer tw:transition-all tw:transition-200">
                                <i class="fas fa-box me-1"></i>
                                محصولات
                                <input type="radio" name="status" id="type-product" value="product" class="tw:hidden" wire:model.live="type">
                            </label>
                            <label for="type-tool" class="status-badge tw:relative tw:bg-sky-600/20 tw:text-sky-600 tw:hover:text-white tw:hover:bg-sky-600 tw:has-checked:text-white tw:has-checked:bg-sky-600 tw:cursor-pointer tw:transition-all tw:transition-200">
                                <i class="fas fa-shovel me-1"></i>
                                ادوات
                                <input type="radio" name="status" id="type-tool" value="tool" class="tw:hidden" wire:model.live="type">
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row g-4">
            @forelse($products as $product)
                <div class="col-md-4 col-sm-6" wire:key="product-{{ $product->id }}">
                    <div class="product-card tw:relative">
                        <div class="product-image">
                            @if($product->image())
                                @if($product->quantity > 0)
                                    <img src="{{ $product->image() }}" alt="product-image">
                                @else
                                    <img src="{{ $product->image() }}" alt="product-image" class="tw:grayscale">
                                @endif
                            @else
                                @if($product->quantity > 0)
                                    <i class="fas fa-seedling"></i>
                                @else
                                    <i class="fas fa-seedling tw:grayscale"></i>
                                @endif
                            @endif
                        </div>
                        <h4 class="product-title">{{ $product->name }}</h4>
                        <p class="product-description">
                            {{ truncate_text($product->description) }}
                        </p>
                        <div class="product-price">
                            <p class="tw:m-0">{{ number_format($product->price) }} تومان</p>
                            @if($product->quantity <= 3)
                                <p class="tw:text-xs tw:text-red-600 tw:mb-0 tw:mt-2 tw:font-thin">
                                    @if($product->quantity <= 0)
                                        اتمام موجودی
                                    @else
                                        تعداد محدود
                                    @endif
                                    <i class="fas fa-exclamation-circle"></i>
                                </p>
                            @endif
                        </div>
                        <div class="product-actions">
                            @if($product->quantity > 0)
                                <button
                                    class="add-to-cart-btn"
                                    type="button"
                                    Wire:click="addToCart({{ $product->id }})"
                                    wire:loading.attr="disabled"
                                    wire:target="addToCart({{ $product->id }})"
                                >
                                    <i class="fas fa-cart-plus me-2"></i>افزودن به سبد خرید
                                </button>
                            @else
                                <button
                                    class="add-to-cart-btn tw:grayscale tw:pointer-events-none"
                                    type="button"
                                    disabled
                                >
                                    <i class="fas fa-ban me-2"></i>بدون موجودی
                                </button>
                            @endif
                            <button
                                class="details-btn"
                                type="button"
                                wire:click="loadProduct({{ $product->id }})"
                                data-bs-toggle="modal" data-bs-target="#productDetailsModal"
                            >
                                <i class="fas fa-info-circle me-2"></i>جزئیات
                            </button>
                        </div>
                    </div>
                </div>
            @empty
                <p class="w-100 text-center text-danger">محصولی برای نمایش پیدا نشد.</p>
            @endforelse
        </div>
    </div>

    @if(count($products) > 0)
        <div class="tw:flex tw:justify-center tw:py-4">
            <div wire:loading>
                <div class="spinner-border text-success" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
    @endif

    @if($products->perPage() < $products->total())
        <div x-data="{
            init() {
                let observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            Livewire.dispatch('load-more');
                        }
                    });
                });

                observer.observe(this.$refs.bottom);
            }
        }">
            <div x-ref="bottom" class="tw:h-10"></div>
        </div>
    @endif
</section>
