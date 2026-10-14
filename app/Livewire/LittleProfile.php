<?php

namespace App\Livewire;

use Livewire\Component;

class LittleProfile extends Component
{
    protected $listeners = [
        'profileUpdated' => '$refresh'
    ];

    public function render()
    {
        return view('livewire.little-profile');
    }
}
