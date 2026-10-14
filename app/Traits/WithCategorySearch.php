<?php

namespace App\Traits;

trait WithCategorySearch {
    public string|null $category = '';

    public function setCategory(string $category): void
    {
        $this->category = $category;
    }

    public function resetCategory()
    {
        $this->category = '';
    }
}
