<?php

namespace App\Traits;

use App\Models\Product;
use App\Models\ProductCategory;

trait WithCategoryCheck {
    public function changeCategory(string $newCategory): bool
    {
        if (!$this->categoryClass::where('category', $newCategory)->exists()) {
            $this->categoryClass::create([
                'category' => $newCategory
            ]);
            return true;
        }
        return false;
    }
    public function cleanCategory(string $prevCategory, int $parentId): void
    {
        if (!$this->categoryParentClass::where('category', $prevCategory)->whereNot('id', $parentId)->exists()) {
            $this->categoryClass::where('category', $prevCategory)->delete();
        }
    }
}
