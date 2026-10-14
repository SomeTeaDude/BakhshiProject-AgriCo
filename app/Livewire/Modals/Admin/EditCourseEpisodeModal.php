<?php

namespace App\Livewire\Modals\Admin;

use App\Models\CourseEpisode;
use Illuminate\Support\Facades\Storage;
use Livewire\Component;
use Livewire\WithFileUploads;
use Usernotnull\Toast\Concerns\WireToast;

class EditCourseEpisodeModal extends Component
{
    use WireToast, WithFileUploads;

    public CourseEpisode|null $episode = null;
    public string $title = '';
    public string $type = '';
    public $file = null;
    public int|null $duration = null;

    protected $listeners = [
        'editEpisode' => 'loadEpisode',
        'videoDurationDetected' => 'setDuration'
    ];

    public function loadEpisode($id)
    {
        $episode = CourseEpisode::find($id);

        if (!$episode) {
            toast()->danger('متاسفانه قسمت مورد نظر پیدا نشد.', 'خطا!')->push();
            return;
        }

        $this->episode = $episode;
        $this->title = $this->episode->title;
        $this->type = $this->episode->type;
        $this->duration = $this->episode->duration;
    }

    public function closeModal()
    {
        $this->episode = null;
        $this->reset();
    }

    public function removeFile()
    {
        $this->file = null;
        $this->duration = null;
    }

    public function setDuration($duration)
    {
        $this->duration = intval(round(floatval($duration), 0, PHP_ROUND_HALF_DOWN));
    }

    public function updateEpisode()
    {
        $this->validate([
            'title' => 'required|string|max:50',
            'type' => 'required|string'
        ]);

        if ($this->type === 'video') {
            $this->validate([
                'file' => 'required|file|mimes:mp4,avi,mov,mkv,webm|max:256000'
            ], [
                'file.max' => 'حجم فایل نباید کمتر از 250 مگابایت باشد.',
            ]);
            if (!$this->duration) {
                toast()->danger('مدت زمان فایل ویدیویی ثبت نشد. لطفا دوباره تلاش کنید.', 'خطا!')->push();
                return;
            }
        } elseif ($this->type === 'pdf') {
            $this->validate([
                'file' => 'required|file|mimes:pdf|max:15360'
            ], [
                'file.max' => 'حجم فایل نباید بیشتر از 15 مگابایت باشد.'
            ]);
        } else {
            $this->addError('type', 'لطفا نوع محتوا را مشخص کنید.');
            return;
        }

        $this->episode->title = $this->title;
        $this->episode->type = $this->type;
        $this->episode->duration = $this->episode->type === 'video' ? $this->duration : null;

        try {
            Storage::disk('course_files')->delete("course_{$this->episode->course->id}/{$this->episode->file_path}");
            $filename = basename($this->file->store(options: 'course_files', path: "course_".$this->episode->course->id));
            $this->episode->file_path = $filename;
        } catch (\Exception $e) {
            toast()->danger('هنگام ذخیره فایل مشکلی پیش آمد. لطفا دوباره تلاش کنید.', 'خطا!')->push();
            return;
        }

        $this->episode->update();
        toast()->success('اطلاعات این قسمت با موفقیت بروزرسانی شدند.', 'موفق!')->duration(750)->push();
        $this->dispatch('courseUpdated');
    }

    public function render()
    {
        return view('livewire.modals.admin.edit-course-episode-modal');
    }
}
