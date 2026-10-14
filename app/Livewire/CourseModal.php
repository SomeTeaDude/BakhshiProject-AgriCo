<?php

namespace App\Livewire;

use App\Models\Course;
use Livewire\Component;
use Usernotnull\Toast\Concerns\WireToast;

class CourseModal extends Component
{
    use WireToast;

    public Course|null $course = null;

    protected $listeners = [
        'showCourse' => 'loadCourse'
    ];

    public function loadCourse($id)
    {
        $course = Course::withoutTrashed()->find($id);

        if (!$course) {
            toast()->danger('متاسفانه دوره مورد نظر پیدا نشد.', 'خطا!')->push();
            return;
        }

        $this->course = $course;
    }

    public function closeModal()
    {
        $this->course = null;
    }

    public function render()
    {
        return view('livewire.course-modal');
    }
}
