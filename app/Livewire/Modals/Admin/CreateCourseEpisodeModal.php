<?php

namespace App\Livewire\Modals\Admin;

use App\Models\CourseEpisode;
use App\Models\CourseSeason;
use Livewire\Component;
use Livewire\WithFileUploads;
use Mockery\Exception;
use Usernotnull\Toast\Concerns\WireToast;

class CreateCourseEpisodeModal extends Component
{
    use WireToast, WithFileUploads;

    public CourseSeason|null $season = null;
    public string $title = '';
    public string $type = '';
    public $file = null;
    public int|null $duration = null;

    protected $listeners = [
        'addEpisode' => 'loadEpisode',
        'videoDurationDetected' => 'setDuration'
    ];

    public function loadEpisode($id)
    {
        $season = CourseSeason::find($id);

        if (!$season) {
            toast()->danger('متاسفانه فصل مورد نظر پیدا نشد.', 'خطا!')->push();
            return;
        }

        $this->season = $season;
    }

    public function closeModal()
    {
        $this->season = null;
        $this->reset();
    }

    public function clearForm()
    {
        $this->title = '';
        $this->type = '';
        $this->file = null;
        $this->duration = null;
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

    public function saveEpisode()
    {
        $this->validate([
            'title' => 'required|string|max:50',
            'type' => 'required|string'
        ]);

        if ($this->type === 'video') {
            $this->validate([
                'file' => 'required|file|mimes:mp4,avi,mov,mkv,webm|max:256000'
            ], [
                'file.max' => 'حجم فایل نباید بیشتر از 250 مگابایت باشد.',
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

        $episode = new CourseEpisode();
        $episode->title = trim($this->title);
        $episode->type = $this->type;
        $episode->duration = $episode->type === 'video' ? $this->duration : null;
        $episode->course_season_id = $this->season->id;

        try {
            $filename = basename($this->file->store(options: 'course_files', path: "course_".$this->season->course->id));
            $episode->file_path = $filename;
        } catch (\Exception $e) {
            toast()->danger('هنگام ذخیره فایل مشکلی پیش آمد. لطفا دوباره تلاش کنید.', 'خطا!')->push();
            return;
        }

        $episode->save();
        $this->clearForm();
        toast()->success('قسمت جدید با موفقیت ساخته شد.', 'موفق!')->duration(750)->push();
        $this->dispatch('courseUpdated');
    }

    public function render()
    {
        return view('livewire.modals.admin.create-course-episode-modal');
    }
}
