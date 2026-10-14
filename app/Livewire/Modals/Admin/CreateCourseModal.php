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

class CreateCourseModal extends Component
{
    use WireToast, WithFileUploads, HasDetails, WithCategoryCheck, WithCategorySearch;

    public string|null $name = null;
    public string|null $price = null;
    public string|null $description = null;
    public $image = null;
    public array $details = [];

    public string $categoryClass = CourseCategory::class;
    public string $categoryParentClass = Course::class;

    public function removeImage()
    {
        $this->image = null;
    }

    public function saveCourse()
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

        $course = new Course();
        $course->name = trim($this->name);
        $course->price = trim($this->price);
        $course->description = trim($this->description);
        $course->category = $this->category;

        $details = [];
        foreach ($this->details as $detail) {
            $details[$detail['key']] = $detail['value'];
        }
        $course->details = json_encode($details);

        $course->save();
        if ($this->image) {
            try {
                $filename = basename($this->image->store(options: 'course_images', path: "course_".$course->id));
                $course->image = $filename;
                $course->update();
            } catch (\Throwable $e) {
                toast()->danger('مشکلی در هنگام ذخیره تصویر رخ داد. لطفا دوباره تلاش کنید.', 'خطا!')->push();
                return;
            }
        }

        $this->removeImage();
        $this->changeCategory($this->category);
        toast()->success('دوره جدید با موفقیت به سایت اضافه شد.', 'موفق!')->push();
        $this->reset();
        $this->dispatch('courseUpdated');
    }

    public function render()
    {
        $categories = CourseCategory::when(trim($this->category), function ($q, $c) {
            $q->whereLike('category', "%$c%");
        })->orderByDesc('id')->get();

        return view('livewire.modals.admin.create-course-modal', compact('categories'));
    }
}
