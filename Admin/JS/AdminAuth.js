// اطلاعات ورود ادمین
const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "Admin1234",
  fullName: "مدیر سیستم",
};

// نمایش/مخفی کردن رمز عبور
function togglePassword() {
  const passwordInput = document.getElementById("password");
  const toggleIcon = document.querySelector(".password-toggle i");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    toggleIcon.className = "fas fa-eye-slash";
  } else {
    passwordInput.type = "password";
    toggleIcon.className = "fas fa-eye";
  }
}

// نمایش پیام خطا
function showAlert(message, type = "danger") {
  const alert = document.getElementById("loginAlert");
  const alertMessage = document.getElementById("alertMessage");

  alert.className = `alert alert-${type}`;
  alertMessage.textContent = message;
  alert.classList.remove("d-none");

  // مخفی کردن خودکار پیام خطا بعد از 5 ثانیه
  setTimeout(() => {
    alert.classList.add("d-none");
  }, 5000);
}

// اعتبارسنجی فرم
function validateForm(username, password) {
  if (!username.trim()) {
    showAlert("لطفاً نام کاربری را وارد کنید");
    return false;
  }

  if (!password.trim()) {
    showAlert("لطفاً رمز عبور را وارد کنید");
    return false;
  }

  if (password.length < 6) {
    showAlert("رمز عبور باید حداقل 6 کاراکتر باشد");
    return false;
  }

  return true;
}

// پردازش ورود
function handleLogin(event) {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const rememberMe = document.getElementById("rememberMe").checked;
  const loginBtn = document.getElementById("loginBtn");
  const loginSpinner = document.getElementById("loginSpinner");

  // اعتبارسنجی
  if (!validateForm(username, password)) {
    return;
  }

  // نمایش اسپینر
  loginBtn.disabled = true;
  loginSpinner.style.display = "inline-block";
  loginBtn.querySelector("span").textContent = "در حال ورود...";

  // شبیه‌سازی تاخیر برای ورود
  setTimeout(() => {
    // بررسی اطلاعات ورود
    if (
      username === ADMIN_CREDENTIALS.username &&
      password === ADMIN_CREDENTIALS.password
    ) {
      // ذخیره اطلاعات ورود
      const loginData = {
        isLoggedIn: true,
        username: username,
        fullName: ADMIN_CREDENTIALS.fullName,
        loginTime: new Date().toISOString(),
        rememberMe: rememberMe,
      };

      localStorage.setItem("adminAuth", JSON.stringify(loginData));

      showAlert("ورود با موفقیت انجام شد! در حال انتقال...", "success");

      // انتقال به پنل ادمین
      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 1500);
    } else {
      showAlert("نام کاربری یا رمز عبور اشتباه است");

      // بازنشانی دکمه
      loginBtn.disabled = false;
      loginSpinner.style.display = "none";
      loginBtn.querySelector("span").textContent = "ورود به پنل مدیریت";
    }
  }, 1500);
}

// بررسی اگر کاربر قبلاً وارد شده
function checkExistingLogin() {
  const authData = localStorage.getItem("adminAuth");
  if (authData) {
    const { isLoggedIn, rememberMe } = JSON.parse(authData);
    if (isLoggedIn && rememberMe) {
      // اگر کاربر انتخاب کرده که به خاطر سپرده شود، مستقیماً به پنل منتقل شود
      window.location.href = "dashboard.html";
    }
  }
}

// نمایش اطلاعات پشتیبانی
function showSupport() {
  showAlert("برای پشتیبانی فنی با شماره ۰۲۱-۱۲۳۴۵۶۷۸ تماس بگیرید", "info");
}

// نمایش اطلاعات سیستم
function showAbout() {
  showAlert("پنل مدیریت فروشگاه کشاورزی - نسخه ۱.۰.۰", "info");
}

// رویدادهای صفحه
document.addEventListener("DOMContentLoaded", function () {
  // بررسی وضعیت ورود
  checkExistingLogin();

  // رویداد فرم ورود
  document
    .getElementById("adminLoginForm")
    .addEventListener("submit", handleLogin);

  // پاک کردن پیام خطا هنگام تایپ
  document.getElementById("username").addEventListener("input", function () {
    document.getElementById("loginAlert").classList.add("d-none");
  });

  document.getElementById("password").addEventListener("input", function () {
    document.getElementById("loginAlert").classList.add("d-none");
  });

  // فوکوس خودکار روی فیلد نام کاربری
  document.getElementById("username").focus();
});

// مدیریت کلید Enter
document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    document
      .getElementById("adminLoginForm")
      .dispatchEvent(new Event("submit"));
  }
});
