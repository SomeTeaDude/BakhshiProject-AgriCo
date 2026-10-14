<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Traits\HasJalaliDates;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Storage;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasJalaliDates, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'f_name',
        'l_name',
        'phone',
        'email',
        'password',
        'image',
        'province',
        'address'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    static function provinces(): array
    {
        return json_decode(file_get_contents(resource_path('data/provinces.json')), true);
    }

    public function cartItems(): HasMany
    {
        return $this->hasMany(CartItem::class);
    }

    public function orders(): HasManyThrough
    {
        return $this->hasManyThrough(
            Order::class,
            Payment::class,
            'user_id',      // Foreign key on payments table
            'payment_id',   // Foreign key on orders table
            'id',           // Local key on users table
            'id'            // Local key on payments table
        );
    }

    public function payments(): HasMany
    {
        return $this->hasMany(Payment::class);
    }

    public function courses(): HasManyThrough
    {
        return $this->hasManyThrough(
            Course::class,
            CourseRegistration::class,
            'user_id',
            'id',
            'id',
            'course_id'
        )->withTrashed();
    }

    public function tickets(): HasMany
    {
        return $this->hasMany(Ticket::class)->withTrashed();
    }

    public function name()
    {
        return $this->f_name . ' ' . $this->l_name;
    }

    public function image()
    {
        return $this->image ? Storage::disk('user_images')->url('user_'.$this->id.'/'.$this->image) : 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iNjAiIGN5PSI2MCIgcj0iNjAiIGZpbGw9IiM0Q0FGNTAiLz48cGF0aCBkPSJNNjAgMzBDNjkuOTQxNiAzMCA3OCA0MC4xNTg0IDc4IDUyLjVINDJDNDIgNDAuMTU4NCA1MC4wNTg0IDMwIDYwIDMwWiIgZmlsbD0id2hpdGUiLz48Y2lyY2xlIGN4PSI2MCIgY3k9IjYwIiByPSIyMCIgZmlsbD0id2hpdGUiLz48L3N2Zz4=';
    }

    public function address()
    {
        return $this->province || $this->address ? $this->province . ' - ' . $this->address : null;
    }

    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    public function isUser(): bool
    {
        return $this->role === 'user';
    }

    public function boughtCourse($courseId)
    {
        return CourseRegistration::where('user_id', $this->id)->where('course_id', $courseId)->exists();
    }
}
