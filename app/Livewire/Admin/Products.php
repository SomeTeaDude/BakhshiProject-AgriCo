<?php

namespace App\Livewire\Admin;

use App\Models\Product;
use App\Models\ProductCategory;
use App\Traits\WithCategoryCheck;
use App\Traits\WithCategorySearch;
use Illuminate\Support\Facades\Storage;
use Livewire\Component;
use Livewire\WithoutUrlPagination;
use Livewire\WithPagination;
use Usernotnull\Toast\Concerns\WireToast;

class Products extends Component
{
    use WireToast, WithPagination, WithoutUrlPagination, WithCategoryCheck, WithCategorySearch;

    public string|null $type = '';
    public string|null $name = '';

    public string $categoryClass = ProductCategory::class;
    public string $categoryParentClass = Product::class;

    protected $listeners = [
        'productUpdated' => '$refresh'
    ];

    public function editProduct($id)
    {
        $this->dispatch('editProduct', $id);
    }

    public function deleteProduct($id)
    {
        $product = Product::find($id);

        if (!$product) {
            toast()->danger('شناسه محصول اشتباه است. لطفا دوباره تلاش کنید.', 'خطا!')->push();
            return;
        }

        if ($product->image()) {
            Storage::disk('product_images')->deleteDirectory("product_{$product->id}");
        }

        $this->cleanCategory($product->category, $product->id);
        $product->delete();
        $this->dispatch('productUpdated');
    }

    public function updated($property)
    {
        if (in_array($property, ['name', 'type', 'category'])) {
            $this->resetPage();
        }
    }

    public function render()
    {
        $products = Product::when($this->type, function ($q, $t) {
            $q->where('type', $t);
        })->when($this->name, function ($q, $n) {
            $q->whereLike('name', "%$n%");
        })->when($this->category, function ($q, $c) {
            $q->where('category', "$c");
        })->orderByDesc('created_at')->paginate(6);

        $categories = ProductCategory::when(trim($this->category), function ($q, $c) {
            $q->whereLike('category', "%$c%");
        })->orderByDesc('id')->get();

        return view('livewire.admin.products', compact('products', 'categories'));
    }
}
