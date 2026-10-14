<?php

namespace App\Livewire\Modals;

use App\Models\Course;
use App\Models\CourseEpisode;
use Livewire\Component;
use Usernotnull\Toast\Concerns\WireToast;

class CoursePlayerModal extends Component
{
    use WireToast;

    public Course|null $course = null;
    public CourseEpisode|null $episode = null;

    protected $listeners = [
        'watchCourse' => 'loadCourse'
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

    public function loadEpisode($id)
    {
        $episode = CourseEpisode::find($id);

        if (!$episode) {
            toast()->danger('متاسفانه قسمت مورد نظر پیدا نشد.', 'خطا!')->push();
            return;
        }

        $this->episode = $episode;
    }

    public function closeModal()
    {
        $this->course = null;
        $this->episode = null;
        $this->reset();
    }

    public function render()
    {
        return view('livewire.modals.course-player-modal');
    }
}
