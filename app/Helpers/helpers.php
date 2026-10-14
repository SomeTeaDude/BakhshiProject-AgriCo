<?php

function truncate_text($text, $limit = 50)
{
    // If already short enough, return as-is
    if (mb_strlen($text, 'UTF-8') <= $limit) {
        return $text;
    }

    // Cut the string to the limit
    $truncated = mb_substr($text, 0, $limit, 'UTF-8');

    // Avoid breaking words — cut back to last space
    $lastSpace = mb_strrpos($truncated, ' ', 0, 'UTF-8');
    if ($lastSpace !== false) {
        $truncated = mb_substr($truncated, 0, $lastSpace, 'UTF-8');
    }

    return $truncated . '...';
}

