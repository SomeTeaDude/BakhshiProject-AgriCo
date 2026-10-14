<?php

namespace App\Livewire;

use App\Models\Product;
use App\Models\ProductCategory;
use App\Traits\WithCategorySearch;
use Illuminate\Support\Facades\Auth;
use Livewire\Attributes\Url;
use Livewire\Component;
use Livewire\WithPagination;
use Usernotnull\Toast\Concerns\WireToast;

class Products extends Component
{
    use WireToast, WithPagination, WithCategorySearch;

    public int $perPage = 6;

    #[Url(as: 't')]
    public string|null $type = '';
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

    public function loadProduct($id)
    {
        $this->dispatch('showProduct', $id);
    }

    public function addToCart($id)
    {
        if (Auth::check() && !Auth::user()->isUser()) {
            toast()->danger('فقط کاربران معمولی اجازه ی خرید از سایت دارند.', 'خطا!')->push();
            return;
        }
        $this->dispatch('addToCart', $id, true);
    }

    public function updated($property)
    {
        if (in_array($property, ['type', 'name', 'category'])) {
            $this->perPage = 6;
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
        })->orderByDesc('created_at')->paginate($this->perPage);

        $categories = ProductCategory::when(trim($this->category), function ($q, $c) {
            $q->whereLike('category', "%$c%");
        })->orderByDesc('id')->get();

        return view('livewire.products', compact('products', 'categories'));
    }
}
