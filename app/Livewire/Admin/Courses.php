<?php

namespace App\Livewire\Admin;

use App\Models\Course;
use App\Models\CourseCategory;
use App\Traits\WithCategoryCheck;
use App\Traits\WithCategorySearch;
use Illuminate\Support\Facades\Storage;
use Livewire\Component;
use Livewire\WithoutUrlPagination;
use Livewire\WithPagination;
use Usernotnull\Toast\Concerns\WireToast;

class Courses extends Component
{
    use WireToast, WithPagination, WithoutUrlPagination, WithCategoryCheck, WithCategorySearch;

    public string|null $status = '';
    public string|null $name = '';

    protected $listeners = [
        'courseUpdated' => '$refresh'
    ];

    public string $categoryClass = CourseCategory::class;
    public string $categoryParentClass = Course::class;

    public function editCourse($id)
    {
        $this->dispatch('editCourse', $id);
    }

    public function manageCourse($id)
    {
        $this->dispatch('manageCourse', $id);
    }

    public function deactivateCourse($id)
    {
        $course = Course::withTrashed()->find($id);

        if (!$course) {
            toast()->danger('شناسه دوره اشتباه است. لطفا دوباره تلاش کنید.', 'خطا!')->push();
            return;
        }

        $course->delete();
        toast()->success('وضعیت دوره با موفقیت به "غیر فعال" عوض شد.', 'موفق!')->push();
        $this->dispatch('courseUpdated');
    }

    public function activateCourse($id)
    {
        $course = Course::withTrashed()->find($id);

        if (!$course) {
            toast()->danger('شناسه دوره اشتباه است. لطفا دوباره تلاش کنید.', 'خطا!')->push();
            return;
        }

        $course->restore();
        toast()->success('وضعیت دوره با موفقیت به "فعال" عوض شد.', 'موفق!')->push();
        $this->dispatch('courseUpdated');
    }

    public function deleteCourse($id)
    {
        $course = Course::withTrashed()->find($id);

        if (!$course) {
            toast()->danger('شناسه دوره اشتباه است. لطفا دوباره تلاش کنید.', 'خطا!')->push();
            return;
        }

        if ($course->image()) {
            Storage::disk('course_images')->deleteDirectory("course_{$course->id}");
        }

        $this->cleanCategory($course->category, $course->id);
        $course->forceDelete();
        toast()->success('دوره به همراه تمام اطلاعات و فایل هایش از سایت حذف شد.', 'موفق!')->push();
        $this->dispatch('courseUpdated');
    }

    public function updated($property)
    {
        if (in_array($property, ['name', 'status', 'category'])) {
            $this->resetPage();
        }
    }

    public function render()
    {
        $courses = Course::withTrashed()->when($this->status === 'active', function ($q, $s) {
            $q->withoutTrashed();
        })->when($this->status === 'inactive', function ($q, $s) {
            $q->onlyTrashed();
        })->when($this->name, function ($q, $n) {
            $q->whereLike('name', "%$n%");
        })->when($this->category, function ($q, $c) {
            $q->where('category', "$c");
        })->orderByDesc('created_at')->paginate(6);

        $categories = CourseCategory::when(trim($this->category), function ($q, $c) {
            $q->whereLike('category', "%$c%");
        })->orderByDesc('id')->get();

        return view('livewire.admin.courses', compact('courses', 'categories'));
    }
}
