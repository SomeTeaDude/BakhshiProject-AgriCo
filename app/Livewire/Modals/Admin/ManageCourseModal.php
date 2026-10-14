<?php

namespace App\Livewire\Modals\Admin;

use App\Models\Course;
use App\Models\CourseEpisode;
use App\Models\CourseSeason;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Livewire\Component;
use Usernotnull\Toast\Concerns\WireToast;

class ManageCourseModal extends Component
{
    use WireToast;

    public Course|null $course = null;
    public string $title = '';

    protected $listeners = [
        'manageCourse' => 'loadCourse',
        'courseUpdated' => '$refresh'
    ];

    public function loadCourse($id)
    {
        $course = Course::withTrashed()->find($id);

        if (!$course) {
            toast()->danger('متاسفانه دوره مورد نظر پیدا نشد.', 'خطا!')->push();
            return;
        }

        $this->course = $course;
    }

    public function closeModal()
    {
        $this->course = null;
        $this->reset();
    }

    public function createCourseSeason()
    {
        if (!$this->course) return;
        $this->validate([
            'title' => 'required|string|max:50'
        ], [
            'title.required' => 'لطفا نام فصل جدید را وارد کنید.'
        ]);

        $courseSeason = new CourseSeason();
        $courseSeason->title = $this->title;
        $courseSeason->course_id = $this->course->id;
        $courseSeason->save();

        $this->title = '';
        toast()->success('فصل جدید با موفقیت ساخته شد.', 'موفق!')->duration(750)->push();
        $this->dispatch('courseUpdated');
    }

    public function editCourseSeason($id, $title)
    {
        $season = CourseSeason::find($id);

        if (!$season) {
            toast()->danger('متاسفانه فصل مورد نظر پیدا نشد.', 'خطا!')->push();
            return;
        }

        $validator = Validator::make(compact('title'), [
            'title' => 'required|string|max:50'
        ], [
            'title.required' => 'لطفا کادر را خالی نگذارید.',
            'title.max' => 'حداکثر تعداد کاراکتر مجاز 50 میباشد.',
        ]);

        $validated = null;
        try {
            $validated = $validator->validate();
        } catch (ValidationException $e) {
            toast()->danger($e->getMessage(), 'خطا!')->push();
            return;
        }

        $season->title = $validated['title'];
        $season->update();
        toast()->success('نام فصل با موفقیت بروزرسانی شد.', 'موفق!')->duration(750)->push();
        $this->dispatch('courseUpdated');
    }

    public function deleteCourseSeason($id)
    {
        $season = CourseSeason::find($id);

        if (!$season) {
            toast()->danger('متاسفانه فصل مورد نظر پیدا نشد.', 'خطا!')->push();
            return;
        }

        foreach ($season->episodes as $episode) {
            Storage::disk('course_images')->delete($this->course->folderUrl() . $episode->file_path);
            $episode->delete();
        }

        $season->delete();
        toast()->success('فصل به همراه تمام قسمت ها و فایل های آنها از سایت حذف شدند.', 'موفق!')->push();
        $this->dispatch('courseUpdated');
    }

    public function addEpisode($id)
    {
        $this->dispatch('addEpisode', $id);
    }

    public function editEpisode($id)
    {
        $this->dispatch('editEpisode', $id);
    }

    public function deleteEpisode($id)
    {
        $episode = CourseEpisode::find($id);

        if (!$episode) {
            toast()->danger('متاسفانه قسمت مورد نظر پیدا نشد.', 'خطا!')->push();
            return;
        }

        Storage::disk('course_files')->delete("course_{$this->course->id}/{$episode->file_path}");

        $episode->delete();
        toast()->success('قسمت به همراه اطلاعات و محتوایش حذف شد.', 'موفق!')->push();
        $this->dispatch('courseUpdated');
    }

    public function render()
    {
        $seasons = $this->course ? $this->course->seasons : [];

        return view('livewire.modals.admin.manage-course-modal', compact('seasons'));
    }
}
