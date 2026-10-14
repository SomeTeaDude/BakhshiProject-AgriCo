<?php

namespace App\Http\Controllers;

use App\Models\CourseEpisode;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CourseController extends Controller
{
    public function video(CourseEpisode $courseEpisode)
    {
        abort_unless(auth()->user()->role === 'admin' || $courseEpisode->course->isBought(), 403);
        $path = "course_{$courseEpisode->course->id}/{$courseEpisode->file_path}";
        $disk = Storage::disk('course_files');

        if (!$disk->exists($path)) {
            abort(404);
        }

        $fullPath   = $disk->path($path);
        $fileSize   = filesize($fullPath);
        $mimeType   = $disk->mimeType($path);
        $start      = 0;
        $length     = $fileSize;
        $end        = $fileSize - 1;

        // Handle range headers (allows seeking)
        if (isset($_SERVER['HTTP_RANGE'])) {
            $range = $_SERVER['HTTP_RANGE'];
            list(, $range) = explode('=', $range, 2);

            if (strpos($range, ',') !== false) {
                return response()->json(['error' => 'Invalid range'], 416);
            }

            if ($range == '-') {
                $start = $fileSize - substr($range, 1);
            } else {
                $range = explode('-', $range);
                $start = $range[0];

                if (isset($range[1]) && is_numeric($range[1])) {
                    $end = intval($range[1]);
                }
            }

            $end    = ($end > $fileSize - 1) ? $fileSize - 1 : $end;
            $length = ($end - $start) + 1;
        }

        $headers = [
            'Content-Type'        => $mimeType,
            'Content-Length'      => $length,
            'Accept-Ranges'       => 'bytes',
            'Content-Range'       => "bytes {$start}-{$end}/{$fileSize}",
            'Content-Disposition' => 'inline; filename="' . $courseEpisode->file_path . '"',
        ];

        return response()->stream(function () use ($fullPath, $start, $length) {
            $stream = fopen($fullPath, 'rb');
            fseek($stream, $start);

            $buffer = 1024 * 8;

            while (!feof($stream) && ($length > 0)) {
                $read = ($length > $buffer) ? $buffer : $length;
                $length -= $read;

                echo fread($stream, $read);
                @ob_flush();
                flush();
            }

            fclose($stream);
        }, 206, $headers);
    }

    public function pdf(CourseEpisode $courseEpisode)
    {
        abort_unless(auth()->user()->role === 'admin' || $courseEpisode->course->isBought(), 403);
        $path = "course_{$courseEpisode->course->id}/{$courseEpisode->file_path}";
        $disk = Storage::disk('course_files');

        if (!$disk->exists($path)) {
            abort(404);
        }

        return response()->file($disk->path($path), [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => 'inline; filename="'.$courseEpisode->file_path.'"',
        ]);
    }
}
