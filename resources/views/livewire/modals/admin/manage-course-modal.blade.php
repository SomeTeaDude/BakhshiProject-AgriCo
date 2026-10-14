<div
    id="manageCourseModal"
    class="modal fade"
    tabindex="-1"
    wire:ignore.self>
    <div class="modal-dialog modal-lg"
         wire:mousedown.outside="closeModal">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">مدیریت محتوای دوره</h5>
                <button
                    type="button"
                    class="btn-close btn-close-black"
                    data-bs-dismiss="modal"
                    wire:click="closeModal"
                ></button>
            </div>
            <div class="modal-body">
                @if($course)
                    <div class="tw:w-full tw:mb-4">
                        <div class="tw:flex tw:justify-between tw:items-center tw:gap-1 tw:w-full">
                            <label for="courseSeasonTitle" class="form-label tw:text-nowrap">ساخت فصل جدید</label>
                            @error('title')
                                <p class="tw:mb-0 tw:text-xs tw:text-red-600">{{ $message }}</p>
                            @enderror
                        </div>
                        <div class="tw:flex tw:flex-col tw:bssm:flex-row tw:gap-1">
                            <input type="text" id="courseSeasonTitle"
                                   class="tw:w-full tw:py-1 tw:px-2 tw:rounded-sm tw:border @error('title') tw:border-red-600 @else tw:border-gray-600/25 tw:hover:border-gray-600 tw:focus:border-gray-600 @enderror tw:outline-none tw:transition-all tw:transition-200"
                                   wire:model.live="title">
                            <button
                                class="btn btn-sm btn-success tw:text-nowrap"
                                wire:click="createCourseSeason"
                                wire:loading.attr="disabled"
                                wire:target="createCourseSeason"
                            >
                                <i class="fas fa-plus me-1"></i> افزودن فصل جدید
                            </button>
                        </div>
                    </div>
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <h6>فصل‌های دوره</h6>
                    </div>

                    <div id="chaptersContainer">
                        @forelse($seasons as $season)
                            <div class="card mb-3">
                                <div class="card-header tw:flex tw:flex-col tw:bssm:flex-row tw:justify-between tw:items-start tw:bssm:items-center tw:gap-2">
                                    <h6 class="mb-0 tw:text-start tw:text-nowrap">فصل {{ $loop->iteration }}: {{ $season->title }}</h6>
                                    <div class="tw:flex tw:justify-end tw:items-center tw:gap-1 tw:w-full">
                                        <button
                                            class="btn btn-sm btn-primary me-1"
                                            @click="const value = prompt('لطفا نام جدید فصل را وارد کنید:', '{{ $season->title }}'); if (value !== null) $wire.editCourseSeason({{ $season->id }}, value);"
                                            wire:loading.attr="disabled"
                                            wire:target="editCourseSeason({{ $season->id }})"
                                        >
                                            <i class="fas fa-edit"></i>
                                        </button>
                                        <button
                                            class="btn btn-sm btn-danger me-1"
                                            wire:click="deleteCourseSeason({{ $season->id }})"
                                            wire:loading.attr="disabled"
                                            wire:target="deleteCourseSeason({{ $season->id }})"
                                            wire:confirm="آیا از حذف این فصل مطمئن هستید؟\nبعد از حذف فصل تمام قسمت های آن نیز به همراه فایل هایشان حذف و غیر قابل بازگردانی خواهند شد."
                                        >
                                            <i class="fas fa-trash"></i>
                                        </button>
                                        <button
                                            class="btn btn-sm btn-success"
                                            data-bs-toggle="modal"
                                            data-bs-target="#createCourseEpisodeModal"
                                            wire:click="addEpisode({{ $season->id }})"
                                            wire:attr="disabled"
                                            wire:target="addEpisode({{ $season->id }})"
                                        >
                                            <i class="fas fa-plus"></i> افزودن محتوا
                                        </button>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <div class="list-group">
                                        @forelse($season->episodes as $episode)
                                            <div class="list-group-item">
                                                <div class="tw:flex tw:flex-col tw:bssm:flex-row tw:justify-between tw:items-start tw:bssm:items-center tw:gap-2">
                                                    <div class="tw:flex tw:justify-start tw:items-center tw:gap-2">
                                                        <i class="fas fa-{{ $episode->type === 'video' ? 'video' : 'file-pdf' }} me-2 tw:text-lg tw:text-lime-800"></i>
                                                        <div>
                                                            <div>{{ $episode->title }}</div>
                                                            <small class="text-muted">نوع: {{ $episode->type === 'video' ? "ویدئو - مدت: {$episode->duration()}" : 'PDF' }}</small>
                                                        </div>
                                                    </div>
                                                    <div class="tw:flex tw:justify-between tw:items-center tw:w-full tw:bssm:w-auto">
                                                        <span class="badge bg-secondary me-2">قسمت {{ $loop->iteration }}</span>
                                                        <div class="tw:flex tw:justify-end tw:items-center tw:gap-1">
                                                            <a
                                                                @if($episode->type === 'video')
                                                                    href="{{ url()->temporarySignedRoute('courses.videos.stream', now()->addSeconds($episode->duration)->addHours(1), ['courseEpisode' => $episode->id]) }}"
                                                                @else
                                                                    href="{{ url()->temporarySignedRoute('courses.pdfs.stream', now()->addHours(1), ['courseEpisode' => $episode->id]) }}"
                                                                @endif
                                                                class="btn btn-sm btn-outline-primary"
                                                                target="_blank"
                                                            >
                                                                <i class="fas fa-eye"></i>
                                                            </a>
                                                            <button
                                                                class="btn btn-sm btn-outline-warning"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#editCourseEpisodeModal"
                                                                wire:click="editEpisode({{ $episode->id }})"
                                                                wire:loading.attr="disabled"
                                                                wire:target="editEpisode({{ $episode->id }})"
                                                            >
                                                                <i class="fas fa-edit"></i>
                                                            </button>
                                                            <button
                                                                class="btn btn-sm btn-outline-danger"
                                                                wire:click="deleteEpisode({{ $episode->id }})"
                                                                wire:loading.attr="disabled"
                                                                wire:target="deleteEpisode({{ $episode->id }})"
                                                                wire:confirm="آیا از حذف این قسمت مطمئن هستید؟\nدر صورت تایید، این قسمت به همراه اطلاعات و محتوایش حذف و غیر قابل بازگردانی خواهند شد."
                                                            >
                                                                <i class="fas fa-trash"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        @empty
                                            <p class="text-muted">هیچ محتوایی برای این فصل وجود ندارد.</p>
                                        @endforelse
                                    </div>
                                </div>
                            </div>
                        @empty
                            <div class="alert alert-warning">هنوز فصلی برای این دوره ایجاد نشده است.</div>
                        @endforelse
                    </div>
                @else
                    <x-spinner />
                @endif
            </div>
            <div class="modal-footer">
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
