<div
    class="modal fade"
    id="courseDetailsModal"
    aria-labelledby="courseDetailsModalLabel"
    wire:ignore.self
>
    <div class="modal-dialog modal-lg"
         wire:mousedown.outside="closeModal">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="courseDetailsModalLabel">
                    جزئیات دوره
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
                <div class="modal-body" id="courseDetailsContent">
                    <div class="course-details-content">
                        <div class="tw:flex tw:flex-col tw:justify-center tw:items-center tw:gap-2">
                            <div class="gallery product-image tw:!bg-slate-600/20 tw:h-auto tw:max-h-58 tw:w-1/2 tw:overflow-hidden">
                                @if($course && $course->image())
                                    <a
                                        href="{{ $course->image() }}"
                                        data-pswp-width="{{ $course->imageDimentions()[0] }}"
                                        data-pswp-height="{{ $course->imageDimentions()[1] }}"
                                        target="_blank"
                                    >
                                        <img
                                            src="{{ $course->image() }}"
                                            class="tw:w-full tw:h-full tw:object-cover tw:hover:scale-[1.15] tw:transition-all tw:transition-300"
                                        >
                                    </a>
                                @else
                                    <i class="fas fa-seedling tw:flex tw:justify-center tw:items-center tw:w-full tw:h-full tw:text-green-600"></i>
                                @endif
                            </div>
                            @if($course && $course->image())
                                <p class="tw:text-xs tw:text-center">(برای مشاهده عکس روی تصویر بالا کلیک کنید)</p>
                            @endif
                        </div>
                        <div class="detail-section">
                            <h6>اطلاعات کلی</h6>
                            @if($course)
                                <div class="detail-item">
                                    <span class="detail-label">نام محصول:</span>
                                    <span class="detail-value">{{ $course->name }}</span>
                                </div>
                                <div class="detail-item">
                                    <span class="detail-label">قیمت:</span>
                                    <span class="detail-value">{{ number_format($course->price) }} تومان</span>
                                </div>
                                <div class="detail-item">
                                    <span class="detail-label">دسته بندی:</span>
                                    <span class="detail-value">{{ $course->category }}</span>
                                </div>
                                <div class="detail-item">
                                    <span class="detail-label">توضیحات:</span>
                                    <span class="detail-value">{{ $course->description }}</span>
                                </div>
                            @else
                                <span class="tw:flex tw:justify-center tw:items-center">
                                    <div class="spinner-border spinner-border-sm text-success" role="status">
                                      <span class="visually-hidden">Loading...</span>
                                    </div>
                                </span>
                            @endif
                        </div>
                        @if($course)
                            <div class="detail-section">
                                <h6>مشخصات دوره</h6>
                                <div class="course-stats">
                                    <div class="stat-card">
                                        <span class="number">{{ $course->duration() }}</span>
                                        <span class="label">مدت زمان</span>
                                    </div>
                                    <div class="stat-card">
                                        <span class="number">{{ count($course->seasons) }} فصل</span>
                                        <span class="label">تعداد فصل</span>
                                    </div>
                                    <div class="stat-card">
                                        <span class="number">{{ count($course->episodes) }} جلسه</span>
                                        <span class="label">تعداد جلسات</span>
                                    </div>
                                    <div class="stat-card">
                                        <span class="number">{{ count($course->registries) }} نفر</span>
                                        <span class="label">تعداد ثبت نامی ها</span>
                                    </div>
                                </div>
                            </div>
                        @endif
                        @if($course)
                            <div class="detail-section">
                                <h6>مشخصات آموزشی</h6>
                                @forelse(json_decode($course->details, true) as $name => $value)
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
            <div class="modal-footer tw:flex-col tw:justify-center">
                @auth
                    @if($course)
                        @if($course->isBought())
                            <a
                                href="{{ route('dashboard.courses') }}"
                                class="btn btn-outline-success tw:w-full tw:bssm:w-4/5"
                            >
                                مشاهده دوره
                            </a>
                        @else
                            <form
                                action="{{ route('payment.request.course', ['course' => $course->id]) }}"
                                method="post"
                                class="tw:flex tw:justify-center tw:items-center tw:w-full"
                            >
                                @csrf
                                <button
                                    class="btn btn-primary tw:w-full tw:bssm:w-4/5"
                                >
                                    خرید دوره
                                </button>
                            </form>
                        @endif
                    @else
                        <button
                            type="button"
                            class="btn btn-outline-secondary tw:pointer-events-none tw:grayscale tw:w-full tw:bssm:w-4/5"
                        >
                            خرید دوره
                        </button>
                    @endif
                @endauth
                @auth
                    @if($course)
                        @if($course->isBought())
                            <p class="tw:text-center tw:text-xs tw:text-green-600">شما قبلا این دوره را خریداری کردید <i class="fas fa-exclamation-circle"></i></p>
                        @else
                            <p class="tw:text-center tw:text-xs tw:text-sky-600">پس از کلیک به درگاه خرید منتقل میشوید <i class="fas fa-exclamation-circle"></i></p>
                        @endif
                    @endif
                @else
                    <p class="tw:text-center tw:text-xs tw:text-slate-700">برای خرید دوره ابتدا وارد سایت شوید <i class="fas fa-exclamation-circle"></i></p>
                @endauth
            </div>
        </div>
    </div>
</div>
