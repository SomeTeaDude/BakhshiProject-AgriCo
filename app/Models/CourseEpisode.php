<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOneThrough;

class CourseEpisode extends Model
{
    public function course(): HasOneThrough
    {
        return $this->hasOneThrough(
            Course::class,
            CourseSeason::class,
            'id',
            'id',
            'course_season_id',
            'course_id'
        )->withTrashed();
    }

    public function season(): BelongsTo
    {
        return $this->belongsTo(CourseSeason::class, 'course_season_id', 'id');
    }

    public function duration()
    {
        return gmdate('H:i:s', $this->duration);
    }
}
