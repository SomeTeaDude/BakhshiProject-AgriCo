<?php

namespace App\Livewire;

use App\Models\Course;
use App\Models\CourseCategory;
use App\Traits\WithCategorySearch;
use Illuminate\Support\Facades\Auth;
use Livewire\Attributes\Url;
use Livewire\Component;
use Livewire\WithPagination;
use Usernotnull\Toast\Concerns\WireToast;

class Courses extends Component
{
    use WireToast, WithPagination, WithCategorySearch;

    public int $perPage = 6;

    #[Url(as: 'n')]
    public string|null $name = '';
    #[Url(as: 'c')]
    public string|null $category = '';

    protected $listeners = [
        'load-more' => 'loadMore'
    ];

    public function loadMore()
    {
        $this->perPage += 6;
    }

    public function loadCourse($id)
    {
        $this->dispatch('showCourse', $id);
    }

    public function updated($property)
    {
        if (in_array($property, ['name', 'category'])) {
            $this->perPage = 6;
        }
    }

    public function render()
    {
        $courses = Course::when($this->name, function ($q, $n) {
            $q->whereLike('name', "%$n%");
        })->when($this->category, function ($q, $c) {
            $q->where('category', "$c");
        })->orderByDesc('created_at')->paginate($this->perPage);

        $categories = CourseCategory::when(trim($this->category), function ($q, $c) {
            $q->whereLike('category', "%$c%");
        })->orderByDesc('id')->get()->filter(function ($category) {
            return Course::where('category', $category->category)->exists();
        });

        return view('livewire.courses', compact('courses', 'categories'));
    }
}
