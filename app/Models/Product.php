<?php

namespace App\Models;

use App\Traits\HasJalaliDates;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Product extends Model
{
    use HasFactory, HasJalaliDates;

    public function image()
    {
        $disk = Storage::disk('product_images');
        $images = $this->images ? json_decode($this->images, true) : null;
        return $images ? $disk->url("product_".$this->id . "/" . $images[0]['path']) : null;
    }

    public function images()
    {
        return json_decode($this->images, true);
    }

    public function folderUrl()
    {
        return Storage::disk('product_images')->url("product_{$this->id}/");
    }

    public function details()
    {
        return json_decode($this->details, true);
    }
}
