<div
    id="coursePlayerModal"
    class="modal fade"
    data-bs-backdrop="static" data-bs-keyboard="false"
    tabindex="-1"
    aria-hidden="true"
    wire:ignore.self
    onmousedown="event.stopPropagation()"
>
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-body p-0">
                <div class="course-player tw:!h-auto tw:bsxl:!h-[80dvh]">
                    <div class="player-header tw:sticky tw:top-0 tw:bsxl:static">
                        @if($course)
                            <h4 class="mb-0">{{ $course->name }}</h4>
                        @else
                            <h4 class="mb-0 tw:animate-pulse">درحال بارگذاری دوره...</h4>
                        @endif
                        <button
                            class="btn btn-sm btn-outline-light tw:flex tw:justify-end tw:items-center"
                            data-bs-dismiss="modal"
                            wire:click="closeModal"
                        >
                            <i class="fas fa-times me-1"></i>
                            بستن
                        </button>
                    </div>
                    <div class="player-content tw:flex-col tw:bsxl:flex-row">
                        <div class="player-video tw:h-[60dvh] tw:bsxl:h-auto">
                            <div class="w-100 h-100 d-flex align-items-center justify-content-center">
                                @if($course)
                                    @if($episode)
                                        @if($episode->type === 'pdf')
                                            <div wire:loading.remove.block wire:target="episode" class="text-center text-white tw:w-full tw:h-[60dvh] tw:bsxl:h-full" wire:key="episode-pdf">
                                                <iframe
                                                    src="/pdfjs/web/viewer.html?file={{ urlencode(url()->temporarySignedRoute('courses.pdfs.stream', now()->addHour(), ['courseEpisode' => $episode->id])) }}"
                                                    id="episodePdf"
                                                    class="tw:w-full tw:h-full"
                                                ></iframe>
                                            </div>
                                        @else
                                            <video id="episodeVideo" class="video-js vjs-theme-forest tw:w-full tw:h-[60dvh] tw:bsxl:h-full" wire:key="episode-video">
                                                <source src="{{ $course && $episode && $episode->type === 'video' ? url()->temporarySignedRoute('courses.videos.stream', now()->addSeconds($episode->duration)->addHours(), ['courseEpisode' => $episode->id]) : '#' }}" type="video/mp4">
                                                <source src="{{ $course && $episode && $episode->type === 'video' ? url()->temporarySignedRoute('courses.videos.stream', now()->addSeconds($episode->duration)->addHours(), ['courseEpisode' => $episode->id]) : '#' }}" type="video/x-msvideo">
                                                <source src="{{ $course && $episode && $episode->type === 'video' ? url()->temporarySignedRoute('courses.videos.stream', now()->addSeconds($episode->duration)->addHours(), ['courseEpisode' => $episode->id]) : '#' }}" type="video/x-ms-wmv">
                                                <source src="{{ $course && $episode && $episode->type === 'video' ? url()->temporarySignedRoute('courses.videos.stream', now()->addSeconds($episode->duration)->addHours(), ['courseEpisode' => $episode->id]) : '#' }}" type="video/quicktime">
                                                <source src="{{ $course && $episode && $episode->type === 'video' ? url()->temporarySignedRoute('courses.videos.stream', now()->addSeconds($episode->duration)->addHours(), ['courseEpisode' => $episode->id]) : '#' }}" type="video/webm">
                                            </video>
                                        @endif
                                    @else
                                        <div wire:loading.remove.block wire:target="episode" class="text-center text-white tw:flex tw:flex-col tw:justify-center tw:items-center tw:h-[60dvh]">
                                            <i class="fas fa-play-circle fa-3x mb-3"></i>
                                            <h5>مشاهده دوره "{{ $course->name }}"</h5>
                                            <p class="tw:hidden tw:bsxl:block">برای مشاهده دوره یکی از ویدیو های منوی سمت چپ را انتخاب کنید.</p>
                                            <p class="tw:block tw:bsxl:hidden">برای مشاهده دوره یکی از ویدیو های منوی پایین را انتخاب کنید.</p>
                                        </div>
                                    @endif
                                    <div wire:loading.block wire:target="episode" class="text-center text-white tw:flex tw:flex-col tw:justify-center tw:items-center tw:h-[60dvh]">
                                        <i class="fas fa-loader fa-spin fa-3x mb-3"></i>
                                        <h5>درحال بارگذاری قسمت...</h5>
                                        <small>لطفا شکیبا باشید</small>
                                    </div>
                                @else
                                    <div class="text-center text-white tw:flex tw:flex-col tw:justify-center tw:items-center tw:h-[60dvh]">
                                        <i class="fas fa-loader fa-spin fa-3x mb-3"></i>
                                        <h5>درحال بارگذاری دوره...</h5>
                                        <small>لطفا شکیبا باشید</small>
                                    </div>
                                @endif
                            </div>
                        </div>
                        <div class="player-sidebar tw:!w-full tw:bsxl:!w-[300px]">
                            <div class="chapter-list">
                                <h6>فهرست دروس</h6>

                                @if($course)
                                    @forelse($course->seasons as $season)
                                        <div
                                            class="chapter-item" @if($loop->index === 0) x-data="{open: true}" @else x-data="{open: false}" @endif
                                            wire:key="season-{{ $season->id }}"
                                        >
                                            <div class="chapter-header tw:cursor-pointer tw:select-none" @click="open = !open">
                                                <strong>{{ $season->title }}</strong>
                                                <span class="badge bg-secondary">
                                                    <i class="fas fa-chevron-down tw:transition-all tw:transition-200" x-bind:class="open ? 'tw:rotate-180' : ''"></i>
                                                </span>
                                            </div>
                                            <div class="lesson-list" x-show="open" x-transition>
                                                @forelse($season->episodes as $episodeItem)
                                                    <div
                                                        class="lesson-item {{ $episode && $episode->id === $episodeItem->id ? 'active tw:pointer-events-none' : '' }}"
                                                        @if(!($episode && $episode->id === $episodeItem->id))
                                                            wire:click="loadEpisode({{ $episodeItem->id }})"
                                                            wire:loading.class="loading"
                                                            wire:target="loadEpisode({{ $episodeItem->id }})"
                                                        @endif
                                                        wire:key="episode-{{ $episodeItem->id }}"
                                                    >
                                                        <div class="lesson-icon">
                                                            @if($episodeItem->type === 'video')
                                                                <i class="fas fa-video"></i>
                                                            @else
                                                                <i class="fas fa-file-pdf"></i>
                                                            @endif
                                                        </div>
                                                        <div class="flex-grow-1">
                                                            <div class="lesson-title">{{ $episodeItem->title }}</div>
                                                            <small class="text-muted">{{ $episodeItem->type === 'video' ? $episodeItem->duration() : 'PDF' }}</small>
                                                        </div>
                                                        <i
                                                            class="fas fa-loader fa-spin text-success"
                                                            wire:loading.inline
                                                            wire:target="loadEpisode({{ $episodeItem->id }})"
                                                        ></i>
                                                    </div>
                                                @empty
                                                    <p class="tw:text-xs tw:text-red-600 tw:text-center">متاسفانه محتوایی برای این فصل وجود ندارد.</p>
                                                @endforelse
                                            </div>
                                        </div>
                                    @empty
                                        <p class="tw:text-xs tw:text-red-600 tw:text-center">متاسفانه محتوایی برای این دوره وجود ندارد.</p>
                                    @endforelse
                                @else
                                    <div class="tw:flex tw:justify-center tw:items-center tw:py-3">
                                        <i class="fas fa-loader fa-spin fa-2x tw:text-slate-700"></i>
                                    </div>
                                @endif
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    @script
    <script>
        Livewire.hook('morphed', ({ component, cleanup }) => {
            const video = document.getElementById('episodeVideo');
            if (video) {
                window.player?.dispose();
                window.player = window.videojs(video, {
                    controls: true,
                    preload: 'auto'
                });
            }
        })
    </script>
    @endscript
</div>
