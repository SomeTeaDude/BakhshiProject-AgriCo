<section class="container-fluid py-4">
    <div class="row mb-4">
        <div class="col-12">
            <div class="filters-card">
                <div class="row g-3">
                    <div class="tw:w-full tw:bssm:w-1/2 tw:xl:w-1/4">
                        <label for="courseName" class="form-label">نام دوره</label>
                        <input type="text" id="courseName" class="tw:w-full tw:p-2 tw:rounded-sm tw:border tw:border-gray-600/25 tw:hover:border-gray-600 tw:focus:border-gray-600 tw:outline-none tw:transition-all tw:transition-200" wire:model.live="name">
                    </div>
                    <div class="tw:w-full tw:bssm:w-1/2 tw:xl:w-1/4">
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

    <div class="tw:flex tw:flex-col tw:bssm:flex-row tw:justify-between tw:items-center tw:gap-3 mb-4">
        <div class="tw:flex tw:justify-start tw:items-center tw:gap-2">
            <h4 class="tw:text-center tw:lg:text-start tw:text-wrap tw:lg:text-nowrap tw:mb-0">دوره ها</h4>
            <button type="button" class="btn btn-outline-success btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#createCourseModal">دوره جدید +</button>
        </div>
        <div class="tw:flex tw:flex-wrap tw:justify-center lg:tw:justify-end tw:items-center tw:gap-2">
            <label for="status-all" class="status-badge tw:relative tw:bg-gray-600/20 tw:text-gray-600 tw:hover:text-white tw:hover:bg-gray-600 tw:has-checked:text-white tw:has-checked:bg-gray-600 tw:cursor-pointer tw:transition-all tw:transition-200">
                همه
                <input type="radio" name="status" id="status-all" value="" class="tw:hidden" wire:model.live="status" checked>
            </label>
            <label for="status-active" class="status-badge tw:relative tw:bg-green-600/20 tw:text-green-600 tw:hover:text-white tw:hover:bg-green-600 tw:has-checked:text-white tw:has-checked:bg-green-600 tw:cursor-pointer tw:transition-all tw:transition-200">
                <i class="fas fa-check-circle me-1"></i>
                فعال
                <input type="radio" name="status" id="status-active" value="active" class="tw:hidden" wire:model.live="status">
            </label>
            <label for="status-inactive" class="status-badge tw:relative tw:bg-red-600/20 tw:text-red-600 tw:hover:text-white tw:hover:bg-red-600 tw:has-checked:text-white tw:has-checked:bg-red-600 tw:cursor-pointer tw:transition-all tw:transition-200">
                <i class="fas fa-ban me-1"></i>
                غیر فعال
                <input type="radio" name="status" id="status-inactive" value="inactive" class="tw:hidden" wire:model.live="status">
            </label>
        </div>
    </div>

    <div class="table-container">
        <div class="table-responsive">
            @if(count($courses) > 0)
                <table class="table table-hover mb-0">
                    <thead>
                    <tr>
                        <th>تصویر</th>
                        <th>نام دوره</th>
                        <th>دسته بندی</th>
                        <th>قیمت (تومان)</th>
                        <th>مدت زمان</th>
                        <th>وضعیت</th>
                        <th>عملیات</th>
                    </tr>
                    </thead>
                    <tbody id="coursesTable">
                    @foreach($courses as $course)
                        <tr class="fade-in" wire:key="course-{{ $course->id }}">
                            <td>
                                <div class="tw:flex tw:justify-center tw:items-center tw:w-[60px] tw:h-[60px] tw:bg-slate-600/20 tw:rounded-md tw:overflow-hidden">
                                    @if($course->image())
                                        <img src="{{ $course->image() }}" alt="{{ $course->name }}" class="tw:w-[60px] tw:h-[60px]">
                                    @else
                                        <i class="fas fa-seedling tw:text-green-600"></i>
                                    @endif
                                </div>
                            </td>
                            <td>
                                {{ $course->name }}
                            </td>
                            <td>
                                {{ $course->category }}
                            </td>
                            <td>{{ number_format($course->price) }}</td>
                            <td>{{ $course->duration() }}</td>
                            @php
                                $statuses = [
                                  'active' => ['check-circle', 'فعال', 'green'],
                                  'inactive' => ['ban', 'غیر فعال', 'red'],
                                ];
                                $courseStatus = $statuses[$course->trashed() ? 'inactive' : 'active'];
                            @endphp
                            <td>
                                <div class="tw:flex tw:flex-col tw:justify-center tw:items-start tw:gap-1">
                                    <span class="status-badge tw:bg-{{ $courseStatus[2] }}-600/20 tw:text-{{ $courseStatus[2] }}-600">
                                        <i class="fas fa-{{ $courseStatus[0] }} me-1"></i>
                                        {{ $courseStatus[1] }}
                                    </span>
                                </div>
                            </td>
                            <td>
                                <button class="btn btn-sm btn-outline-info"
                                        data-bs-toggle="modal"
                                        data-bs-target="#manageCourseModal"
                                        title="مدیریت دوره"
                                        wire:click="manageCourse({{ $course->id }})"
                                        wire:loading.attr="disabled"
                                        wire:target="manageCourse({{ $course->id }})"
                                >
                                    <i class="fas fa-gears"></i>
                                </button>
                                <button class="btn btn-sm btn-outline-primary"
                                        data-bs-toggle="modal"
                                        data-bs-target="#editCourseModal"
                                        title="ویرایش دوره"
                                        wire:click="editCourse({{ $course->id }})"
                                        wire:loading.attr="disabled"
                                        wire:target="editCourse({{ $course->id }})"
                                >
                                    <i class="fas fa-pen-to-square"></i>
                                </button>
                                @if($course->trashed())
                                    <button class="btn btn-sm btn-outline-danger"
                                            title="حذف دوره"
                                            wire:click="deleteCourse({{ $course->id }})"
                                            wire:loading.attr="disabled"
                                            wire:target="deleteCourse({{ $course->id }})"
                                            wire:confirm="آیا از حذف این دوره مطمئن هستید؟\nتمام اطلاعات و فایل های مربوط به این دوره حذف و غیر قابل بازگردانی خواهند شد."
                                            wire:key="delete-course-{{ $course->id }}"
                                    >
                                        <i class="fas fa-trash"></i>
                                    </button>
                                    <button class="btn btn-sm btn-outline-success"
                                            title="فعال کردن دوره"
                                            wire:click="activateCourse({{ $course->id }})"
                                            wire:loading.attr="disabled"
                                            wire:target="activateCourse({{ $course->id }})"
                                            wire:key="activate-course-{{ $course->id }}"
                                    >
                                        <i class="fas fa-arrows-rotate"></i>
                                    </button>
                                @else
                                    <button class="btn btn-sm btn-outline-danger"
                                            title="غیر فعال کردن دوره"
                                            wire:click="deactivateCourse({{ $course->id }})"
                                            wire:loading.attr="disabled"
                                            wire:target="deactivateCourse({{ $course->id }})"
                                            wire:key="deactivate-course-{{ $course->id }}"
                                    >
                                        <i class="fas fa-ban"></i>
                                    </button>
                                @endif
                            </td>
                        </tr>
                    @endforeach
                    </tbody>
                </table>
            @else
                <p class="tw:text-red-500 tw:text-center tw:my-4">متاسفانه هیچ دوره ای پیدا نشد.</p>
            @endif

            <!-- Pagination -->
            <div class="tw:mx-3 tw:my-4">
                {{ $courses->links(data: ['scrollTo' => false]) }}
            </div>
        </div>
    </div>
</section>
