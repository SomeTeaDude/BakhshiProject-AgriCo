<section>
    <div class="container my-5">
        <h1 class="text-center mb-5 text-success">دوره های فروشگاه</h1>
        <div class="row mb-4">
            <div class="col-12">
                <div class="filters-card">
                    <div class="row g-3">
                        <div class="tw:w-full tw:bssm:w-1/2 tw:lg:w-1/4">
                            <label for="courseName" class="form-label">نام دوره</label>
                            <input type="text" id="courseName" class="tw:w-full tw:p-2 tw:rounded-sm tw:border tw:border-gray-600/25 tw:hover:border-gray-600 tw:focus:border-gray-600 tw:outline-none tw:transition-all tw:transition-200" wire:model.live="name">
                        </div>
                        <div class="tw:w-full tw:bssm:w-1/2 tw:lg:w-1/4">
                            <label for="courseCategory" class="form-label">دسته بندی</label>
                            <x-dropdown-list
                                id="courseCategory"
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
        <div class="row g-4">
            @forelse($courses as $course)
                <div class="col-xl-3 col-lg-4 col-md-6" wire:key="course-{{ $course->id }}">
                    <div class="product-card tw:relative">
                        <div class="product-image">
                            @if($course->image())
                                <img src="{{ $course->image() }}" alt="دوره {{ $course->name }}">
                            @else
                                <i class="fas fa-seedling"></i>
                            @endif
                        </div>
                        <h4 class="product-title">{{ $course->name }}</h4>
                        <p class="product-description">{{ truncate_text($course->description, 50) }}</p>
                        <div class="product-price">
                            <p class="tw:m-0">{{ number_format($course->price) }} تومان</p>
                            @if($course->isBought())
                                <p class="tw:text-xs tw:text-green-600 tw:mb-0 tw:mt-2">خریداری شده <i class="fas fa-exclamation-circle"></i></p>
                            @endif
                        </div>
                        <div class="product-actions">
                            <button
                                class="details-btn"
                                type="button"
                                wire:click="loadCourse({{ $course->id }})"
                                data-bs-toggle="modal" data-bs-target="#courseDetailsModal"
                            >
                                <i class="fas fa-info-circle me-2"></i>جزئیات
                            </button>
                        </div>
                    </div>
                </div>
            @empty
                <p class="w-100 text-center text-danger">دوره ای برای نمایش پیدا نشد.</p>
            @endforelse
        </div>
    </div>

    @if(count($courses) > 0)
        <div class="tw:flex tw:justify-center tw:py-4">
            <div wire:loading>
                <div class="spinner-border text-success" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
    @endif

    @if($courses->perPage() < $courses->total())
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
