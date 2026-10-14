<?php

namespace App\Models;

use App\Traits\HasJalaliDates;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOneThrough;
use Morilog\Jalali\Jalalian;

class Order extends Model
{
    use HasJalaliDates;

    protected $fillable = [
        'user_id',
        'payment_id'
    ];

    protected $casts = [
        'finished_at' => 'datetime'
    ];

    public function getFinishedAtJalaliAttribute()
    {
        return $this->finished_at ? Jalalian::fromCarbon($this->finished_at) : null;
    }

    public function payment(): BelongsTo
    {
        return $this->belongsTo(Payment::class);
    }

    public function user(): HasOneThrough
    {
        return $this->hasOneThrough(User::class, Payment::class, 'id', 'id', 'payment_id', 'user_id')->withTrashed();
    }
}
