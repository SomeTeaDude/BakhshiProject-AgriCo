<div class="d-flex align-items-center justify-content-end">
    <span class="me-2 d-none d-sm-inline" id="userGreeting">سلام، {{ auth()->user()->f_name }} عزیز</span>
    @if(auth()->user()->image)
        <img src="{{ auth()->user()->image() }}" alt="تصویر {{ auth()->user()->f_name }}" class="user-avatar">
    @else
        <div class="user-avatar bg-success">
            <i class="fas fa-user text-white"></i>
        </div>
    @endif
</div>
