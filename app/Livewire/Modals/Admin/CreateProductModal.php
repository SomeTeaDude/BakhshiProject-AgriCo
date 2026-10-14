<?php

namespace App\Livewire\Modals\Admin;

use App\Models\Product;
use App\Models\ProductCategory;
use App\Traits\{HasDetails, WithCategoryCheck, WithCategorySearch};
use Livewire\Component;
use Livewire\WithFileUploads;
use Usernotnull\Toast\Concerns\WireToast;

class CreateProductModal extends Component
{
    use WireToast, WithFileUploads, HasDetails, WithCategoryCheck, WithCategorySearch;

    public string|null $name = null;
    public string|null $price = null;
    public int|null $quantity = null;
    public string|null $description = null;
    public $images = [];
    public string|null $type = null;

    public string $categoryClass = ProductCategory::class;
    public string $categoryParentClass = Product::class;

    public function removeImage()
    {
        $this->images = [];
    }

    public function saveProduct()
    {
        $this->validate([
            'name' => 'required|string|max:100',
            'category' => 'required|string|max:50',
            'price' => 'required|integer|min:1000|gt:0|multiple_of:1000',
            'quantity' => 'required|integer|gte:0',
            'description' => 'required|string|min:15|max:255',
            'type' => 'required|string|max:255',
            'images' => 'nullable|array',
            'images.*' => 'file|mimes:jpg,jpeg,png,webp|max:10240|dimensions:min_width=100,min_height=100,max_width=3000,max_height=3000',
            'details.*.key' => 'required|max:50',
            'details.*.value' => 'required|max:255'
        ], [
            'images.*.dimensions' => 'ابعاد هر عکس باید حداقل 100×100 و حداکثر 3000×3000 پیکسل باشد.',
            'images.*.max' => 'حجم هر فایل باید کمتر از 10 مگابایت باشد.'
        ]);

        $product = new Product();
        $product->name = trim($this->name);
        $product->price = trim($this->price);
        $product->quantity = trim($this->quantity);
        $product->description = trim($this->description);

        if ($this->type !== 'product' && $this->type !== 'tool') {
            toast()->danger('مقدار نوع محصول اشتباه میباشد.', 'خطا!')->push();
            return;
        }
        $product->type = trim($this->type);

        $product->category = $this->category;

        $details = [];
        foreach ($this->details as $detail) {
            $details[$detail['key']] = $detail['value'];
        }
        $product->details = json_encode($details);

        $product->save();
        if ($this->images) {
            try {
                $imageNames = [];
                foreach ($this->images as $image) {
                    $filename = basename($image->store(options: 'product_images', path: "product_".$product->id));
                    [$width, $height] = getimagesize($image->getRealPath());
                    $imageNames[] = [
                        'path' => $filename,
                        'width' => $width,
                        'height' => $height
                    ];
                }
                $product->images = json_encode($imageNames);
                $product->update();
            } catch (\Throwable $e) {
                toast()->danger('مشکلی در هنگام ذخیره تصویر رخ داد. لطفا دوباره تلاش کنید.', 'خطا!')->push();
                return;
            }
        }
        $this->removeImage();
        $this->changeCategory($this->category);
        toast()->success('محصول جدید با موفقیت به سایت اضافه شد.', 'موفق!')->push();
        $this->reset();
        $this->dispatch('productUpdated');
    }

    public function render()
    {
        $categories = ProductCategory::when(trim($this->category), function ($q, $c) {
            $q->whereLike('category', "%$c%");
        })->orderByDesc('id')->get();

        return view('livewire.modals.admin.create-product-modal', compact('categories'));
    }
}
