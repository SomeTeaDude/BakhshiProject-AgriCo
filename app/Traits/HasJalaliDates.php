<?php

namespace App\Traits;

use Morilog\Jalali\Jalalian;

trait HasJalaliDates {
    public function getCreatedAtJalaliAttribute()
    {
        return Jalalian::fromCarbon($this->created_at);
    }
}
