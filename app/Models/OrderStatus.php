<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderStatus extends Model
{
    protected $fillable = [
        'status',
        'changed_at',
        'order_id'
    ];
    protected $casts = [
        'changed_at' => 'datetime',
    ];
    public $timestamps = false;
}
