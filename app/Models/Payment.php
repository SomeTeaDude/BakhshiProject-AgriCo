<?php

namespace App\Models;

use App\Traits\HasJalaliDates;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Morilog\Jalali\Jalalian;

class Payment extends Model
{
    use HasJalaliDates;

    protected $fillable = [
        'user_id',
        'transaction_id',
        'reference_id',
        'price',
        'type',
        'status',
        'items',
        'description'
    ];

    public function items(): array
    {
        return json_decode($this->items, true);
    }

    public function itemsCount(): int
    {
        return array_reduce($this->items(), fn($acc, $item) => $acc + $item['quantity'], 0);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class)->withTrashed();
    }

    public function order(): HasOne
    {
        return $this->hasOne(Order::class);
    }
}
