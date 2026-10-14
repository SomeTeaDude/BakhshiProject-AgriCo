<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>درحال انتقال به درگاه پرداخت...</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <script src="https://cdn.tailwindcss.com?plugins=forms,typography"></script>
    <link rel="icon" href="/logo.svg">
    <style>
        html, body {
            height: 100%;
        }
    </style>
</head>
<body class="bg-gray-50 flex flex-col items-center justify-center h-full text-gray-700">
<div class="flex flex-col items-center space-y-6 text-center">
    <div class="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
    <div>
        <h1 class="text-2xl font-semibold text-green-600">در حال انتقال به درگاه پرداخت...</h1>
        <p class="mt-2 text-sm text-gray-500">
            اگر تا <span id="countdown" class="tw-font-medium text-green-600">10</span> ثانیه دیگر منتقل نشدید،
            روی دکمه زیر کلیک کنید.
        </p>
    </div>

    <form method="{{ $method }}" action="{{ $action }}" class="mt-4">
        @foreach($inputs as $name => $value)
            <input type="hidden" name="{{ $name }}" value="{{ $value }}">
        @endforeach
        <button type="submit"
                class="px-6 py-2 rounded-lg bg-green-500 text-white font-medium hover:bg-green-600 transition">
            انتقال به درگاه
        </button>
    </form>
</div>

<script>
    let seconds = 10;
    const countdownEl = document.getElementById("countdown");

    function submitForm() {
        document.forms[0].submit();
    }

    function countdown() {
        seconds--;
        if (seconds <= 0) {
            submitForm();
        } else {
            countdownEl.textContent = seconds;
            setTimeout(countdown, 1000);
        }
    }

    countdown();
</script>
</body>
</html>
