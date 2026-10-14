<?php

namespace App\Livewire\Admin;

use App\Models\User;
use Illuminate\Support\Facades\DB;
use Livewire\Component;
use Livewire\WithoutUrlPagination;
use Livewire\WithPagination;

class Users extends Component
{
    use WithPagination, WithoutUrlPagination;

    public string|null $name = null;
    public string|null $phone = null;
    public string|null $email = null;

    public string $status = '';

    protected $listeners = [
        'userUpdated' => '$refresh'
    ];

    public function banUser($id)
    {
        $user = User::find($id);

        if (!$user) return;

        $user->delete();
        toast()->success('حساب کاربری با موفقیت از سایت مسدود شد.', 'موفق!')->push();
        $this->dispatch('userUpdated');
    }

    public function deleteUser($id)
    {
        $user = User::withTrashed()->find($id);

        if (!$user) return;

        $user->forceDelete();
        toast()->success('کاربر و تمام اطلاعات آن از سایت حذف شدند.', 'موفق!')->push();
        $this->dispatch('userUpdated');
    }

    public function restoreUser($id)
    {
        $user = User::withTrashed()->find($id);

        if (!$user) return;

        $user->restore();
        toast()->success('کاربر با موفیقت از لیست مسدود ها حذف شد.', 'موفق!')->push();
        $this->dispatch('userUpdated');
    }

    public function updated($property)
    {
        if (in_array($property, ['name', 'phone', 'email', 'status'])) {
            if ($property === 'phone') {
                $this->name = '';
                $this->email = '';
                $this->status = '';
            }
            $this->resetPage();
        }
    }

    public function render()
    {
        $provinces = User::provinces();

        $users = User::whereNot('role', 'admin')
            ->when($this->name, function ($q, $n) {
                $driverName = DB::getDriverName();

                $concat = match ($driverName) {
                    "sqlite" => "f_name || ' ' || l_name",
                    default => "'f_name' . ' ' . 'l_name'"
                };

                $q->whereLike(DB::raw($concat), "%$n%");
            })->when($this->phone, function ($q, $p) {
                $q->whereLike('phone', "%$p%");
            })->when($this->email, function ($q, $e) {
                $q->whereLike('email', "%$e%");
            })->when($this->status === 'banned', function ($q, $s) {
                $q->onlyTrashed();
            })->when($this->status === 'support', function ($q, $s) {
                $q->withTrashed()->where('role', 'support');
            })->when(!$this->status, function ($q, $s) {
                $q->withTrashed();
            })->orderByDesc('created_at')->paginate(10);

        $all_users_count = User::withTrashed()->whereNot('role', 'admin')->count();
        $users_count = User::whereNot('role', 'admin')->count();
        $banned_users_count = User::onlyTrashed()->whereNot('role', 'admin')->count();

        return view('livewire.admin.users', compact('provinces', 'users', 'all_users_count', 'users_count', 'banned_users_count'));
    }
}
