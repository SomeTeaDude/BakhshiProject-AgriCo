<?php

namespace App\Models;

use App\Traits\HasJalaliDates;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class Course extends Model
{
    use SoftDeletes, HasJalaliDates;

    public function seasons(): HasMany
    {
        return $this->hasMany(CourseSeason::class);
    }

    public function episodes(): HasManyThrough
    {
        return $this->hasManyThrough(CourseEpisode::class, CourseSeason::class, 'course_id', 'course_season_id', 'id', 'id');
    }

    public function registries(): HasManyThrough
    {
        return $this->hasManyThrough(
            User::class,
            CourseRegistration::class,
            'course_id',
            'id',
            'id',
            'user_id'
        );
    }

    public function folderUrl()
    {
        return Storage::disk('course_images')->url("course_{$this->id}/");
    }

    public function details()
    {
        return json_decode($this->details, true);
    }

    public function image()
    {
        $disk = Storage::disk('course_images');
        return $this->image ? $disk->url("course_{$this->id}/{$this->image}") : null;
    }

    public function imageDimentions()
    {
        return getimagesize(Storage::disk('course_images')->path("course_{$this->id}/{$this->image}"));
    }

    public function duration()
    {
        $episodes = $this->episodes;
        $totalSeconds = 0;

        foreach ($episodes as $episode) {
            if ($episode->type !== 'video' || !$episode->duration) continue;

            $totalSeconds += $episode->duration;
        }

        return gmdate("H:i:s", $totalSeconds);;
    }

    public function isBought(): bool
    {
        if (!Auth::check()) return false;

        return CourseRegistration::where('user_id', Auth::id())->where('course_id', $this->id)->exists();
    }
}
