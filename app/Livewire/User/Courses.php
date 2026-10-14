<?php

namespace App\Livewire\User;

use Illuminate\Support\Facades\Auth;
use Livewire\Component;

class Courses extends Component
{
    public function watchCourse($id)
    {
        $this->dispatch('watchCourse', $id);
    }

    public function render()
    {
        $courses = Auth::user()->courses;

        return view('livewire.user.courses', compact('courses'));
    }
}
