<?php

namespace App\Livewire;

use App\Models\Course;
use Livewire\Component;

class CourseCard extends Component
{
    public Course $course;

    public function loadCourse()
    {
        $this->dispatch('showCourse', $this->course->id);
    }

    public function render()
    {
        return view('livewire.course-card');
    }
}
