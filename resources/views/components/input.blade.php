<div class="form-group">
    <div class="d-flex justify-content-between align-items-center">
        <label class="form-label">{{ $label ?? $name }}@if(isset($required))<span class="text-danger">*</span>@endif</label>
        @error($name)
           <span class="error text-danger">{{ $message }}</span>
        @enderror
    </div>
    <div class="position-relative">
        <input
            name="{{ $name }}"
            type="{{ isset($type) ? $type : 'text' }}"
            class="form-control has-icon @error($name) error @enderror"
            @if(isset($placeholder))placeholder="{{ $placeholder }}"@endif
            value="{{ $value ?? old($name) ?? '' }}"
        />
        @if(isset($icon))
            <i class="input-icon fas fa-{{ $icon }}"></i>
        @endif
    </div>
</div>
