<div
    id="editCourseEpisodeModal"
    class="modal fade"
    data-bs-backdrop="static" data-bs-keyboard="false"
    tabindex="-1"
    wire:ignore.self
    onmousedown="event.stopPropagation()">
    <div class="modal-dialog modal-md">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">ویرایش قسمت</h5>
                <button
                    type="button"
                    class="btn-close btn-close-black"
                    data-bs-toggle="modal"
                    data-bs-target="#manageCourseModal"
                    wire:click="closeModal"
                ></button>
            </div>
            <div class="modal-body">
                @if($episode)
                    <p class="tw:text-sm">این قسمت متعلق به فصل <strong>"{{ $episode->season->title }}"</strong> میباشد.</p>
                    <div class="tw:flex tw:flex-col tw:justify-start tw:items-start tw:gap-4 tw:w-full">
                        <div class="tw:flex tw:flex-col tw:items-center tw:gap-4 tw:w-full">
                            <div class="tw:w-full">
                                <div class="tw:flex tw:justify-between tw:items-center tw:gap-1 tw:w-full">
                                    <label for="episodeTitleCreate" class="form-label tw:text-nowrap">عنوان قسمت <span
                                            class="tw:text-red-600">*</span></label>
                                    @error('title')
                                    <p class="tw:mb-0 tw:text-xs tw:text-red-600">{{ $message }}</p>
                                    @enderror
                                </div>
                                <input type="text" id="episodeTitleCreate"
                                       class="tw:w-full tw:p-2 tw:rounded-sm tw:border @error('name') tw:border-red-600 @else tw:border-gray-600/25 tw:hover:border-gray-600 tw:focus:border-gray-600 @enderror tw:outline-none tw:transition-all tw:transition-200"
                                       wire:model.live="title">
                            </div>
                            <div class="tw:w-full">
                                <div class="tw:flex tw:justify-between tw:items-center tw:gap-1 tw:w-full">
                                    <label for="episodeTypeCreate" class="form-label tw:text-nowrap">نوع محتوا <span
                                            class="tw:text-red-600">*</span></label>
                                    @error('category')
                                    <p class="tw:mb-0 tw:text-xs tw:text-red-600">{{ $message }}</p>
                                    @enderror
                                </div>
                                <select id="episodeTypeCreate"
                                        class="tw:w-full tw:p-2 tw:rounded-sm tw:border @error('type') tw:border-red-600 @else tw:border-gray-600/25 tw:hover:border-gray-600 tw:focus:border-gray-600 @enderror tw:outline-none tw:transition-all tw:transition-200"
                                        wire:model.live="type">
                                    <option value="">نوع محتوای قسمت را انتخاب کنید</option>
                                    <option value="video">ویدیویی <i class="fas fa-video"></i></option>
                                    <option value="pdf">PDF <i class="fas fa-file-pdf"></i></option>
                                </select>
                            </div>
                        </div>
                        <div class="tw:mt-2">
                            <p class="tw:text-sm">نکته قبل از آپلود فایل:</p>
                            <ul class="tw:list-disc">
                                <li>ابتدا باید <strong>نوع فایل</strong> را انتخاب کنید.</li>
                                <li>در صورت تغییر نوع محتوا، باید فایل جدید آپلود کنید.</li>
                                <li>حجم فایل ویدیویی باید کمتر از <strong>250 مگابایت</strong> باشد.</li>
                                <li>حجم فایل pdf باید کمتر از <strong>15 مگابایت</strong> باشد.</li>
                                <li>فایل های ویدیویی مجاز برای آپلود: <strong>mp4, avi, mov, mkv, webm</strong></li>
                            </ul>
                        </div>
                        <div class="tw:flex tw:flex-col tw:items-center tw:gap-4 tw:w-full tw:mb-4">
                            <div class="tw:w-full"
                                 x-data="{ uploading: false, progress: 0, color: 'blue' }"
                                 x-on:livewire-upload-start="uploading = true; progress=0;"
                                 x-on:livewire-upload-finish="uploading = false; color='green';"
                                 x-on:livewire-upload-cancel="uploading = false; progress=0;"
                                 x-on:livewire-upload-error="uploading = false; color='red';"
                                 x-on:livewire-upload-progress="progress = $event.detail.progress">
                                <div class="tw:flex tw:justify-between tw:items-start tw:gap-1">
                                    <div class="tw:flex tw:flex-col tw:justify-between tw:gap-1 tw:w-full"
                                         style="height: -moz-available; height: -webkit-fill-available;">
                                        <div
                                            class="tw:flex tw:flex-col tw:justify-between tw:items-start tw:gap-1 tw:w-full">
                                            <input type="file"
                                                   accept="@if($type === 'video') video/mp4,video/quicktime,video/x-matroska,video/webm @elseif($type === 'pdf') application/pdf @else * @endif"
                                                   id="episodeFileCreate" class="tw:hidden"
                                                   x-on:change="$wire.dispatch('fileChangedEdit', $event)"
                                                   wire:model="file">
                                            @if($file)
                                                <div class="tw:flex tw:justify-between tw:items-center tw:gap-1 tw:w-full">
                                                    <button type="button"
                                                            class="btn btn-outline-danger btn-sm tw:text-nowrap"
                                                            wire:click="removeFile"
                                                            wire:loading.attr="disabled"
                                                            wire:target="removeFile"
                                                            x-bind:class="uploading ? 'tw:opacity-50 tw:pointer-events-none' : ''">
                                                        تعویض فایل
                                                    </button>
                                                    @if($type === 'video' && $duration)
                                                        <span class="tw:text-xs tw:text-nowrap">زمان ویدیو: {{ gmdate('H:i:s', $duration) }}</span>
                                                    @endif
                                                </div>
                                            @else
                                                <div class="tw:flex tw:justify-between tw:items-center tw:gap-1 tw:w-full">
                                                    @if($type !== 'video' && $type !== 'pdf')
                                                        <button
                                                            type="button"
                                                            class="btn btn-outline-primary btn-sm tw:text-nowrap tw:opacity-50 tw:pointer-events-none"
                                                        >
                                                            انتخاب فایل
                                                        </button>
                                                    @else
                                                        <label for="episodeFileCreate"
                                                               class="btn btn-outline-primary btn-sm tw:text-nowrap"
                                                               x-bind:class="uploading ? 'tw:opacity-50 tw:pointer-events-none' : ''">انتخاب
                                                            فایل</label>
                                                    @endif
                                                    @if($type === 'video' && $duration)
                                                        <span class="tw:text-xs tw:text-nowrap">زمان ویدیو فعلی: {{ gmdate('H:i:s', $duration) }}</span>
                                                    @endif
                                                </div>
                                            @endif
                                            @error('file')
                                            <p class="tw:mb-0 tw:text-xs tw:text-red-600">{{ $message }}</p>
                                            @enderror
                                        </div>
                                        <div x-show="uploading">
                                            <div class="tw:flex tw:items-center tw:gap-1 tw:mb-1 tw:me-1">
                                                <div class="progress tw:w-full" role="progressbar"
                                                     aria-label="Upload progress bar" x-bind:aria-valuenow="progress"
                                                     aria-valuemin="0" aria-valuemax="100">
                                                    <div class="progress-bar progress-bar-striped progress-bar-animated"
                                                         x-bind:class="progress === 100 ? 'text-bg-success' : ''"
                                                         x-bind:style="`width: ${progress}%`"
                                                         x-text="`${progress}%`"></div>
                                                </div>
                                                <button type="button" wire:loading.attr="disabled"
                                                        wire:click="$cancelUpload('file')"
                                                        class="tw:flex tw:justify-center tw:items-center tw:p-1 tw:border tw:border-red-600 tw:rounded-full tw:text-red-600 tw:hover:bg-red-600 tw:hover:text-white tw:transition-all tw:transition-300">
                                                    <i class="fas fa-xmark tw:w-3 tw:h-3"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                @else
                    <x-spinner/>
                @endif
            </div>
            <div class="modal-footer">
                @if($episode && ($type !== $episode->type || trim($title) !== $episode->title || $file))
                    @if($type !== $episode->type && !$file)
                        <button
                            class="btn btn-secondary"
                            disabled
                        >
                            بروزرسانی
                        </button>
                    @else
                        <button
                            type="button"
                            class="btn btn-success"
                            wire:click="updateEpisode"
                            wire:loading.attr="disabled"
                            wire:target="updateEpisode"
                        >
                            بروزرسانی
                        </button>
                    @endif
                @else
                    <button
                        class="btn btn-secondary"
                        disabled
                    >
                        بروزرسانی
                    </button>
                @endif
                <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-toggle="modal"
                    data-bs-target="#manageCourseModal"
                    wire:click="closeModal"
                >
                    بازگشت
                </button>
            </div>
        </div>
    </div>
    @script
    <script>
        $wire.on('fileChangedEdit', (e) => {
            const file = e.target.files[0];

            if (!file) return;

            const video = document.createElement('video');
            video.preload = 'metadata';

            video.onloadedmetadata = function () {
                URL.revokeObjectURL(video.src);

                const duration = video.duration;

                // Send data to Livewire
                $wire.dispatchSelf('videoDurationDetected', {
                    duration: duration
                });
                video.remove();
            };

            video.src = URL.createObjectURL(file);
        })
    </script>
    @endscript
</div>
