<section class="courses-content container-fluid py-4">
    <!-- Header Actions -->
    <div class="row mb-4">
        <div class="col-12">
            <div class="d-flex justify-content-between align-items-center flex-wrap">
                <div class="section-header">
                    <h4>مدیریت دوره‌های آموزشی</h4>
                    <p class="text-muted mb-0">
                        مشاهده و ادامه دوره‌های خریداری شده
                    </p>
                </div>
            </div>
        </div>
    </div>
    <div class="row" id="coursesContainer" style="display: block;">
        <div class="courses-grid">
            @forelse($courses as $course)
                <div class="course-card fade-in-up">
                    @if($course->image())
                        <img
                            src="{{ $course->image() }}"
                            alt="{{ $course->name }}"
                            class="course-image tw:!m-0"
                        >
                    @else
                        <div class="course-image tw:flex tw:justify-center tw:items-center tw:!m-0 tw:bg-zinc-600/15">
                            <i class="fas fa-seedling fa-2x tw:text-green-600"></i>
                        </div>
                    @endif
                    <div class="course-content tw:flex tw:flex-col tw:justify-between tw:gap-2 tw:h-[calc(100%-180px)]">
                        <div class="tw:flex tw:flex-col tw:justify-start tw:items-start tw:gap-3 tw:!mb-4">
                            <div class="tw:flex tw:justify-between tw:items-center tw:gap-2 tw:w-full">
                                <h3 class="course-title text-ellipsis">{{ $course->name }}</h3>
                                @if(array_key_exists('سطح', $course->details()) || array_key_exists('سطح دوره', $course->details()))
                                    <span class="course-level level-advanced">{{ $course->details()['سطح'] ?? $course->details()['سطح دوره'] ?? 'نامشخص' }}</span>
                                @endif
                            </div>
                            <p class="course-instructor tw:!mb-0"><strong class="tw:text-slate-600">دسته بندی:</strong> {{ $course->category }}</p>
                            @if(array_key_exists('مدرس', $course->details()) || array_key_exists('مدرس دوره', $course->details()))
                                <span class="course-instructor"><strong class="tw:text-slate-600">مدرس:</strong> {{ $course->details()['مدرس'] ?? $course->details()['مدرس دوره'] ?? 'نامشخص' }}</span>
                            @endif
                            @if($course->trashed())
                                <div class="tw:group tw:relative tw:w-full">
                                    <span class="tw:text-red-500 tw:text-xs"><i class="fas fa-exclamation-circle"></i> این دوره غیر فعال شده است</span>
                                    <span class="alert alert-danger tw:block tw:absolute tw:bottom-0 tw:group-hover:-bottom-4 tw:right-0 tw:translate-y-full tw:w-full tw:max-w-[400px] tw:text-xs tw:opacity-0 tw:invisible tw:group-hover:opacity-100 tw:group-hover:visible tw:transition-all tw:transition-300"><i class="fas fa-exclamation-triangle me-1"></i>درحال حاضر این دوره غیر فعال است. شما میتوانید دوره را مشاهده کنید. اما احتمال اینکه این دوره در آینده حذف شود وجود دارد.</span>
                                </div>
                            @endif
                        </div>

                        <div>
                            <div class="course-meta">
                                <span><i class="fas fa-clock me-1"></i>{{ $course->duration() }}</span>
                                <span><i class="fas fa-calendar me-1"></i>{{ $course->created_at_jalali->format("Y/m/d") }}</span>
                            </div>
                            <div class="course-actions">
                                <button
                                    class="btn btn-primary btn-course"
                                    data-bs-toggle="modal"
                                    data-bs-target="#coursePlayerModal"
                                    wire:click="watchCourse({{ $course->id }})"
                                >
                                    <i class="fas fa-play me-1"></i>
                                    مشاهده
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            @empty
                @teleport('#emptyCourses')
                    <p class="alert alert-warning w-100 tw:text-center"><i class="fas fa-exclamation-circle"></i> هنوز هیچ دوره ای خریداری نکردید.</p>
                @endteleport
            @endforelse
        </div>
        <div id="emptyCourses"></div>
    </div>
</section>
