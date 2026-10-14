// حالت فعلی سیستم
let currentState = {
  loginType: "email", // email یا phone
  userData: null,
  otpCode: null,
  countdown: null,
};

// انتخاب نوع ورود
function selectLoginType(type) {
  currentState.loginType = type;

  // به روزرسانی گزینه‌های فعال
  document.querySelectorAll(".login-option").forEach((option) => {
    option.classList.remove("active");
  });
  document
    .querySelector(`.login-option[data-type="${type}"]`)
    .classList.add("active");

  // به روزرسانی برچسب و placeholder
  const loginLabel = document.getElementById("loginLabel");
  const loginInput = document.getElementById("loginInput");
  const inputIcon = document.querySelector(".input-icon");

  if (type === "email") {
    loginLabel.textContent = "ایمیل";
    loginInput.placeholder = "example@example.com";
    inputIcon.className = "input-icon fas fa-envelope";
    document.getElementById("passwordField").style.display = "block";
  } else {
    loginLabel.textContent = "شماره تماس";
    loginInput.placeholder = "09xxxxxxxxx";
    inputIcon.className = "input-icon fas fa-phone";
    document.getElementById("passwordField").style.display = "none";
  }
}

// ادامه به مرحله بعدی ورود
function proceedToLogin() {
  const loginInput = document.getElementById("loginInput").value.trim();

  if (!loginInput) {
    alert("لطفاً ایمیل یا شماره تماس خود را وارد کنید");
    return;
  }

  if (currentState.loginType === "email") {
    const password = document.getElementById("passwordInput").value;
    if (!password) {
      alert("لطفاً رمز عبور خود را وارد کنید");
      return;
    }
    // مستقیماً ورود با ایمیل و رمز عبور
    loginWithEmail(loginInput, password);
  } else {
    // ارسال کد تایید برای شماره تماس
    simulatePhoneLogin(loginInput);
  }
}

// ورود مستقیم با ایمیل و رمز عبور
function loginWithEmail(email, password) {
  // در محیط واقعی، اینجا اعتبارسنجی انجام می‌شود
  console.log(`ورود با ایمیل: ${email} و رمز عبور: ${password}`);

  // شبیه‌سازی ورود موفق
  alert("ورود موفقیت‌آمیز! در حال انتقال به پنل کاربری...");

  // در محیط واقعی:
  // window.location.href = 'user-panel.html';
}

// نمایش صفحه ثبت نام
function showRegisterPage() {
  document.getElementById("loginTypePage").style.display = "none";
  document.getElementById("registerPage").style.display = "block";
}

// نمایش صفحه ورود
function showLoginPage() {
  document.getElementById("registerPage").style.display = "none";
  document.getElementById("otpPage").style.display = "none";
  document.getElementById("loginTypePage").style.display = "block";
}

// ثبت نام کاربر
function registerUser() {
  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const phoneNumber = document.getElementById("phoneNumber").value.trim();
  const email = document.getElementById("email").value.trim();

  if (!firstName || !lastName || !phoneNumber) {
    alert("لطفاً اطلاعات ضروری (نام، نام خانوادگی و شماره تماس) را وارد کنید");
    return;
  }

  if (phoneNumber.length !== 11 || !phoneNumber.startsWith("09")) {
    alert("لطفاً شماره تماس معتبر وارد کنید");
    return;
  }

  // ذخیره اطلاعات کاربر
  currentState.userData = {
    firstName,
    lastName,
    phoneNumber,
    email: email || null,
  };

  // شبیه‌سازی ارسال کد تایید
  simulateOtpSend(phoneNumber);
}

// شبیه‌سازی ارسال کد تایید
function simulateOtpSend(phoneNumber) {
  // تولید کد تصادفی ۴ رقمی
  currentState.otpCode = Math.floor(1000 + Math.random() * 9000).toString();

  // نمایش صفحه کد تایید
  document.getElementById("registerPage").style.display = "none";
  document.getElementById("otpPage").style.display = "block";
  document.getElementById("otpPhoneNumber").textContent = phoneNumber;

  // شروع تایمر برای ارسال مجدد
  startCountdown();

  // در محیط واقعی، اینجا کد به شماره کاربر ارسال می‌شود
  console.log(`کد تایید برای شماره ${phoneNumber}: ${currentState.otpCode}`);
}

// شبیه‌سازی ورود با شماره تماس
function simulatePhoneLogin(phoneNumber) {
  // تولید کد تصادفی ۴ رقمی
  currentState.otpCode = Math.floor(1000 + Math.random() * 9000).toString();

  // نمایش صفحه کد تایید
  document.getElementById("loginTypePage").style.display = "none";
  document.getElementById("otpPage").style.display = "block";
  document.getElementById("otpPhoneNumber").textContent = phoneNumber;

  // شروع تایمر برای ارسال مجدد
  startCountdown();

  // در محیط واقعی، اینجا کد به شماره کاربر ارسال می‌شود
  console.log(`کد تایید برای شماره ${phoneNumber}: ${currentState.otpCode}`);
}

// شروع تایمر برای ارسال مجدد کد
function startCountdown() {
  let timeLeft = 120; // 2 دقیقه

  // پاک کردن تایمر قبلی
  if (currentState.countdown) {
    clearInterval(currentState.countdown);
  }

  // نمایش تایمر
  const countdownElement = document.getElementById("countdown");
  const resendLink = document.getElementById("resendLink");

  countdownElement.style.display = "inline";
  resendLink.style.pointerEvents = "none";
  resendLink.style.opacity = "0.5";

  currentState.countdown = setInterval(() => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    countdownElement.textContent = ` (${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")})`;

    if (timeLeft <= 0) {
      clearInterval(currentState.countdown);
      countdownElement.style.display = "none";
      resendLink.style.pointerEvents = "auto";
      resendLink.style.opacity = "1";
    }

    timeLeft--;
  }, 1000);
}

// حرکت به فیلد بعدی در ورود کد تایید
function moveToNext(input, nextIndex) {
  if (input.value.length === 1) {
    const nextInput = document.querySelectorAll(".otp-input")[nextIndex];
    if (nextInput) {
      nextInput.focus();
    }
  }
}

// تایید کد OTP
function verifyOtp() {
  const otpInputs = document.querySelectorAll(".otp-input");
  let enteredCode = "";

  otpInputs.forEach((input) => {
    enteredCode += input.value;
  });

  if (enteredCode.length !== 4) {
    alert("لطفاً کد چهار رقمی را کامل وارد کنید");
    return;
  }

  if (enteredCode === currentState.otpCode) {
    // در محیط واقعی، اینجا کاربر به پنل کاربری هدایت می‌شود
    alert("کد تایید صحیح است! در حال انتقال به پنل کاربری...");
    // window.location.href = 'user-panel.html';
  } else {
    alert("کد تایید نادرست است. لطفاً مجدداً تلاش کنید");
  }
}

// ارسال مجدد کد تایید
function resendOtp() {
  const phoneNumber = document.getElementById("otpPhoneNumber").textContent;
  simulateOtpSend(phoneNumber);
  alert("کد تایید جدید ارسال شد");
}

// تغییر وضعیت نمایش رمز عبور
function togglePassword() {
  const passwordInput = document.getElementById("passwordInput");
  const toggleIcon = document.querySelector(".password-toggle i");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    toggleIcon.className = "fas fa-eye-slash";
  } else {
    passwordInput.type = "password";
    toggleIcon.className = "fas fa-eye";
  }
}

// بازگشت به صفحه قبل
function goBack() {
  // در این حالت، بازگشت به صفحه اصلی سایت
  window.location.href = "index.html";
}

function goBackFromOtp() {
  document.getElementById("otpPage").style.display = "none";
  document.getElementById("loginTypePage").style.display = "block";
}

// مقداردهی اولیه
document.addEventListener("DOMContentLoaded", function () {
  // تمرکز روی اولین فیلد ورودی
  document.getElementById("loginInput").focus();
});
