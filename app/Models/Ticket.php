<?php

namespace App\Models;

use App\Traits\HasJalaliDates;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Storage;

class Ticket extends Model
{
    use SoftDeletes, HasJalaliDates;

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function messages(): HasMany
    {
        return $this->hasMany(TicketMessage::class);
    }

    public function folderUrl()
    {
        return Storage::disk('ticket_attachments')->url("ticket_{$this->id}/");
    }

    public function attachment()
    {
        $disk = Storage::disk('ticket_attachments');
        return $this->attachment_path ? $disk->url("ticket_{$this->id}/{$this->attachment_path}") : null;
    }
}
