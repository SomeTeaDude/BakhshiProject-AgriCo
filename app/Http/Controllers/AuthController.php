<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function registerPage()
    {
        if (auth()->user()->f_name || auth()->user()->l_name) return redirect()->route('dashboard');

        return view('auth.register');
    }

    public function register(Request $request)
    {
        $validated = $request->validate([
            'f_name' => 'required|max:40',
            'l_name' => 'required|max:40',
            'email' => 'email|nullable|max:150'
        ]);

        $user = auth()->user();

        $user->update($validated);

        return redirect()->route('dashboard');
    }

    public function loginPage()
    {
        return view('auth.login');
    }

    public function logout()
    {
        Auth::logout();
        session()->invalidate();

        return redirect()->route('home');
    }
}
