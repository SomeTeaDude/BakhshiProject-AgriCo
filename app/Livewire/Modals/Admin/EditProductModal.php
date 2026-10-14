<?php

namespace App\Livewire\Modals\Admin;

use App\Models\Product;
use App\Models\ProductCategory;
use App\Traits\{WithCategoryCheck, WithCategorySearch};
use Illuminate\Support\Facades\Storage;
use Livewire\Component;
use Livewire\WithFileUploads;
use Nette\Utils\Image;
use Usernotnull\Toast\Concerns\WireToast;

class EditProductModal extends Component
{
    use WireToast, WithFileUploads, WithCategoryCheck, WithCategorySearch;

    public Product|null $product = null;
    public string|null $name = null;
    public string|null $price = null;
    public int|null $quantity = null;
    public string|null $description = null;
    public $images = [];
    public string|null $type = null;
    public array $details = [];

    public string $categoryClass = ProductCategory::class;
    public string $categoryParentClass = Product::class;

    protected $listeners = [
        'editProduct' => 'loadProduct'
    ];

    public function loadProduct($id)
    {
        $product = Product::find($id);

        if (!$product) {
            toast()->danger('متاسفانه محصول مورد نظر پیدا نشد.', 'خطا!')->push();
            return;
        }

        $this->product = $product;
        $this->name = $this->product->name;
        $this->category = $this->product->category;
        $this->price = $this->product->price;
        $this->quantity = $this->product->quantity;
        $this->description = $this->product->description;
        $this->type = $this->product->type;
        $this->details = $this->product->details ? collect(json_decode($this->product->details, true))->map(fn ($item, $key) => ['key'=>$key, 'value'=>$item])->values()->toArray() : [];
    }

    public function closeModal()
    {
        $this->product = null;
        $this->reset();
    }

    public function removeImage()
    {
        $this->images = [];
    }

    public function addDetails()
    {
        $this->details = [...$this->details, ['key'=>'','value'=>'']];
    }
    public function removeDetails($index)
    {
        unset($this->details[$index]);

        $this->details = array_values($this->details);
    }

    public function updateProduct()
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

        if (!$this->product) return;

        $this->product->name = trim($this->name);
        $this->product->price = trim($this->price);
        $this->product->quantity = trim($this->quantity);
        $this->product->description = trim($this->description);

        if ($this->type !== 'product' && $this->type !== 'tool') {
            toast()->danger('مقدار نوع محصول اشتباه میباشد.', 'خطا!')->push();
            return;
        }
        $this->product->type = trim($this->type);

        $prevCategory = $this->product->category;
        $categoryChanged = $this->product->category !== $this->category;
        $this->product->category = trim($this->category);

        $details = [];
        foreach ($this->details as $detail) {
            $details[$detail['key']] = $detail['value'];
        }
        $this->product->details = json_encode($details);

        if ($this->images) {
            try {
                Storage::disk('product_images')->deleteDirectory("product_".$this->product->id);
                $imageNames = [];
                foreach ($this->images as $image) {
                    $filename = basename($image->store(options: 'product_images', path: "product_".$this->product->id));
                    [$width, $height] = getimagesize($image->getRealPath());
                    $imageNames[] = [
                        'path' => $filename,
                        'width' => $width,
                        'height' => $height
                    ];
                }
                $this->product->images = json_encode($imageNames);
            } catch (\Throwable $e) {
                toast()->danger('مشکلی در هنگام ذخیره تصویر رخ داد. لطفا دوباره تلاش کنید.', 'خطا!')->push();
                return;
            }
        }

        $this->product->update();
        if ($categoryChanged) {
            $this->changeCategory($this->category);
            $this->cleanCategory($prevCategory, $this->product->id);
        }
        $this->removeImage();
        toast()->success('تمام اطلاعات محصول با موفقیت بروزرسانی شدند.', 'موفق!')->push();
        $this->dispatch('productUpdated');
    }

    public function render()
    {
        $categories = ProductCategory::when(trim($this->category), function ($q, $c) {
            $q->whereLike('category', "%$c%");
        })->orderByDesc('id')->get();

        return view('livewire.modals.admin.edit-product-modal', compact('categories'));
    }
}
