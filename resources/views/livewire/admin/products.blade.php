<section class="container-fluid py-4">
    <div class="row mb-4">
        <div class="col-12">
            <div class="filters-card">
                <div class="row g-3">
                    <div class="tw:w-full tw:bssm:w-1/2 tw:xl:w-1/4">
                        <label for="productName" class="form-label">نام محصول</label>
                        <input type="text" id="productName" class="tw:w-full tw:p-2 tw:rounded-sm tw:border tw:border-gray-600/25 tw:hover:border-gray-600 tw:focus:border-gray-600 tw:outline-none tw:transition-all tw:transition-200" wire:model.live="name">
                    </div>
                    <div class="tw:w-full tw:bssm:w-1/2 tw:xl:w-1/4">
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
                </div>
            </div>
        </div>
    </div>

    <div class="tw:flex tw:flex-col tw:bssm:flex-row tw:justify-between tw:items-center tw:gap-3 mb-4">
        <div class="tw:flex tw:justify-start tw:items-center tw:gap-2">
            <h4 class="tw:text-center tw:lg:text-start tw:text-wrap tw:lg:text-nowrap tw:mb-0">محصولات</h4>
            <button type="button" class="btn btn-outline-success btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#createProductModal">محصول جدید +</button>
        </div>
        <div class="tw:flex tw:flex-wrap tw:justify-center lg:tw:justify-end tw:items-center tw:gap-2">
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

    <div class="table-container">
        <div class="table-responsive">
            @if(count($products) > 0)
                <table class="table table-hover mb-0">
                    <thead>
                    <tr>
                        <th>تصویر</th>
                        <th>نام محصول</th>
                        <th>دسته بندی</th>
                        <th>قیمت (تومان)</th>
                        <th>موجودی</th>
                        <th>نوع محصول</th>
                        <th>عملیات</th>
                    </tr>
                    </thead>
                    <tbody id="productsTable">
                    @foreach($products as $product)
                        <tr class="fade-in">
                            <td>
                                <div class="tw:flex tw:justify-center tw:items-center tw:w-[60px] tw:h-[60px] tw:bg-slate-600/20 tw:rounded-md tw:overflow-hidden">
                                    @if($product->image())
                                        <img src="{{ $product->image() }}" alt="{{ $product->name }}" class="tw:w-[60px] tw:h-[60px]">
                                    @else
                                        <i class="fas fa-seedling tw:text-green-600"></i>
                                    @endif
                                </div>
                            </td>
                            <td>
                                {{ $product->name }}
                            </td>
                            <td>
                                {{ $product->category }}
                            </td>
                            <td>{{ number_format($product->price) }}</td>
                            <td>{{ $product->quantity }}</td>
                            @php
                                $types = [
                                  'product' => ['box', 'محصولات', 'green'],
                                  'tool' => ['shovel', 'ادوات', 'sky'],
                                ];
                            @endphp
                            <td>
                                <div class="tw:flex tw:flex-col tw:justify-center tw:items-start tw:gap-1">
                                    <span class="status-badge tw:bg-{{ $types[$product->type][2] }}-600/20 tw:text-{{ $types[$product->type][2] }}-600">
                                        <i class="fas fa-{{ $types[$product->type][0] }} me-1"></i>
                                        {{ $types[$product->type][1] }}
                                    </span>
                                </div>
                            </td>
                            <td>
                                <button class="btn btn-sm btn-outline-primary"
                                        data-bs-toggle="modal"
                                        data-bs-target="#editProductModal"
                                        title="ویرایش محصول"
                                        wire:click="editProduct({{ $product->id }})"
                                        wire:loading.attr="disabled"
                                        wire:target="editProduct({{ $product->id }})"
                                >
                                    <i class="fas fa-pen-to-square"></i>
                                </button>
                                <button class="btn btn-sm btn-outline-danger"
                                        title="حذف محصول"
                                        wire:click="deleteProduct({{ $product->id }})"
                                        wire:loading.attr="disabled"
                                        wire:target="deleteProduct({{ $product->id }})"
                                        wire:confirm="آیا از حذف این محصول مطمئن هستید؟\nتمام اطلاعات و عکس های مربوط به این محصول حذف و غیر قابل بازگردانی خواهند شد."
                                >
                                    <i class="fas fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    @endforeach
                    </tbody>
                </table>
            @else
                <p class="tw:text-red-500 tw:text-center tw:my-4">متاسفانه هیچ محصولی پیدا نشد.</p>
            @endif

            <!-- Pagination -->
            <div class="tw:mx-3 tw:my-4">
                {{ $products->links(data: ['scrollTo' => false]) }}
            </div>
        </div>
    </div>
</section>
