<?php

namespace App\Livewire\Modals\Admin;

use App\Models\Course;
use App\Models\CourseCategory;
use App\Traits\HasDetails;
use App\Traits\WithCategoryCheck;
use App\Traits\WithCategorySearch;
use Livewire\Component;
use Livewire\WithFileUploads;
use Usernotnull\Toast\Concerns\WireToast;

class EditCourseModal extends Component
{
    use WireToast, WithFileUploads, HasDetails, WithCategoryCheck, WithCategorySearch;

    public Course|null $course = null;
    public string|null $name = null;
    public string|null $price = null;
    public string|null $description = null;
    public $image = null;
    public array $details = [];

    public string $categoryClass = CourseCategory::class;
    public string $categoryParentClass = Course::class;

    protected $listeners = [
        'editCourse' => 'loadCourse'
    ];

    public function loadCourse($id)
    {
        $course = Course::withTrashed()->find($id);

        if (!$course) {
            toast()->danger('متاسفانه دوره مورد نظر پیدا نشد.', 'خطا!')->push();
            return;
        }

        $this->course = $course;
        $this->name = $this->course->name;
        $this->category = $this->course->category;
        $this->price = $this->course->price;
        $this->description = $this->course->description;
        $this->details = $this->course->details ? collect(json_decode($this->course->details, true))->map(fn ($item, $key) => ['key'=>$key, 'value'=>$item])->values()->toArray() : [];
    }

    public function closeModal()
    {
        $this->course = null;
        $this->reset();
    }

    public function removeImage()
    {
        $this->image = null;
    }

    public function updateCourse()
    {
        $this->validate([
            'name' => 'required|string|max:100',
            'category' => 'required|string|max:50',
            'price' => 'required|integer|min:1000|gt:0|multiple_of:1000',
            'description' => 'required|string|min:15|max:255',
            'image' => 'nullable|file|mimes:jpg,jpeg,png,webp|max:10240|dimensions:min_width=100,min_height=100,max_width=3000,max_height=3000',
            'details.*.key' => 'required|max:50',
            'details.*.value' => 'required|max:255'
        ], [
            'image.dimensions' => 'ابعاد عکس باید حداقل 100×100 و حداکثر 3000×3000 پیکسل باشد.',
            'image.max' => 'حجم فایل باید کمتر از 10 مگابایت باشد.'
        ]);

        if (!$this->course) return;

        $this->course->name = trim($this->name);
        $this->course->price = trim($this->price);
        $this->course->description = trim($this->description);
        $prevCategory = $this->course->category;
        $categoryChanged = $this->course->category !== $this->category;
        $this->course->category = trim($this->category);

        $details = [];
        foreach ($this->details as $detail) {
            $details[$detail['key']] = $detail['value'];
        }
        $this->course->details = json_encode($details);

        $this->course->update();
        if ($this->image) {
            try {
                $filename = basename($this->image->store(options: 'course_images', path: "course_".$this->course->id));
                $this->course->image = $filename;
                $this->course->update();
            } catch (\Throwable $e) {
                toast()->danger('مشکلی در هنگام ذخیره تصویر رخ داد. لطفا دوباره تلاش کنید.', 'خطا!')->push();
                return;
            }
        }

        $this->removeImage();
        if ($categoryChanged) {
            $this->changeCategory($this->category);
            $this->cleanCategory($prevCategory, $this->course->id);
        }
        toast()->success('تمام اطلاعات دوره با موفقیت بروزرسانی شدند.', 'موفق!')->push();
        $this->dispatch('courseUpdated');
    }

    public function render()
    {
        $categories = CourseCategory::when(trim($this->category), function ($q, $c) {
            $q->whereLike('category', "%$c%");
        })->orderByDesc('id')->get();

        return view('livewire.modals.admin.edit-course-modal', compact('categories'));
    }
}
