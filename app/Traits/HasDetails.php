<?php

namespace App\Traits;

trait HasDetails {
    public array $details = [];

    public function addDetails()
    {
        $this->details = [...$this->details, ['key'=>'','value'=>'']];
    }
    public function removeDetails($index)
    {
        unset($this->details[$index]);

        $this->details = array_values($this->details);
    }
}
