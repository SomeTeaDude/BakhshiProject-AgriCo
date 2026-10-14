// مدیریت پروفایل
const ProfileManager = {
  profileData: null,

  // مقداردهی اولیه
  init() {
    this.loadProfileData();
    this.setupEventListeners();
    this.setupSidebar();
    this.setupPasswordStrength();
  },

  // بارگذاری داده‌های پروفایل
  loadProfileData() {
    const savedData = localStorage.getItem("userProfileData");

    if (savedData) {
      try {
        this.profileData = JSON.parse(savedData);
      } catch (error) {
        console.error("Error parsing profile data:", error);
        this.profileData = this.getDefaultProfileData();
      }
    } else {
      this.profileData = this.getDefaultProfileData();
    }

    this.renderProfile();
  },

  // داده‌های پیش‌فرض پروفایل
  getDefaultProfileData() {
    return {
      profile: {
        firstName: "رضا",
        lastName: "موسوی",
        email: "profesorDied@gmail.com",
        phone: "09379863252",
        province: "mazandaran",
        address: "نکا، بلوار انقلاب، پلاک ۱۲۳",
        bio: "کشاورز و علاقه‌مند به کشاورزی مدرن",
        joinDate: "1404/05/10",
        avatar:
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iNjAiIGN5PSI2MCIgcj0iNjAiIGZpbGw9IiM0Q0FGNTAiLz48cGF0aCBkPSJNNjAgMzBDNjkuOTQxNiAzMCA3OCA0MC4xNTg0IDc4IDUyLjVINDJDNDIgNDAuMTU4NCA1MC4wNTg0IDMwIDYwIDMwWiIgZmlsbD0id2hpdGUiLz48Y2lyY2xlIGN4PSI2MCIgY3k9IjYwIiByPSIyMCIgZmlsbD0id2hpdGUiLz48L3N2Zz4=",
      },
      stats: {
        orders: 5,
        courses: 3,
        totalSpent: 2450000,
        walletBalance: 150000,
        loyaltyPoints: 1250,
      },
      settings: {
        emailNotifications: true,
        smsNotifications: false,
        specialOffers: true,
        newsletter: true,
      },
    };
  },

  // ذخیره داده‌های پروفایل
  saveProfileData() {
    try {
      localStorage.setItem("userProfileData", JSON.stringify(this.profileData));
      return true;
    } catch (error) {
      console.error("Error saving profile data:", error);
      this.showNotification("خطا در ذخیره اطلاعات پروفایل", "error");
      return false;
    }
  },

  // رندر پروفایل
  renderProfile() {
    // اطلاعات کاربر
    document.getElementById(
      "profileName"
    ).textContent = `${this.profileData.profile.firstName} ${this.profileData.profile.lastName}`;
    document.getElementById("profileEmail").textContent =
      this.profileData.profile.email;
    document.getElementById("joinDate").textContent =
      this.profileData.profile.joinDate;
    document.getElementById("profileAvatar").src =
      this.profileData.profile.avatar;

    // آمار
    document.getElementById("ordersCount").textContent =
      this.profileData.stats.orders.toLocaleString("fa-IR");
    document.getElementById("coursesCount").textContent =
      this.profileData.stats.courses.toLocaleString("fa-IR");
    document.getElementById(
      "totalSpent"
    ).textContent = `${this.profileData.stats.totalSpent.toLocaleString(
      "fa-IR"
    )} تومان`;
    document.getElementById(
      "walletBalance"
    ).textContent = `${this.profileData.stats.walletBalance.toLocaleString(
      "fa-IR"
    )} تومان`;
    document.getElementById(
      "loyaltyPoints"
    ).textContent = `${this.profileData.stats.loyaltyPoints.toLocaleString(
      "fa-IR"
    )} امتیاز`;

    // فرم اطلاعات شخصی
    document.getElementById("firstName").value =
      this.profileData.profile.firstName;
    document.getElementById("lastName").value =
      this.profileData.profile.lastName;
    document.getElementById("email").value = this.profileData.profile.email;
    document.getElementById("phone").value = this.profileData.profile.phone;
    document.getElementById("province").value =
      this.profileData.profile.province;
    document.getElementById("address").value = this.profileData.profile.address;
    document.getElementById("bio").value = this.profileData.profile.bio || "";

    // تنظیمات
    document.getElementById("emailNotifications").checked =
      this.profileData.settings.emailNotifications;
    document.getElementById("smsNotifications").checked =
      this.profileData.settings.smsNotifications;
    document.getElementById("specialOffers").checked =
      this.profileData.settings.specialOffers;
    document.getElementById("newsletter").checked =
      this.profileData.settings.newsletter;
  },

  // بروزرسانی پروفایل
  updateProfile(event) {
    event.preventDefault();

    if (!this.validateProfileForm()) {
      return;
    }

    // جمع‌آوری داده‌های فرم
    this.profileData.profile.firstName =
      document.getElementById("firstName").value;
    this.profileData.profile.lastName =
      document.getElementById("lastName").value;
    this.profileData.profile.email = document.getElementById("email").value;
    this.profileData.profile.phone = document.getElementById("phone").value;
    this.profileData.profile.province =
      document.getElementById("province").value;
    this.profileData.profile.address = document.getElementById("address").value;
    this.profileData.profile.bio = document.getElementById("bio").value;

    // بروزرسانی نمایش
    document.getElementById(
      "profileName"
    ).textContent = `${this.profileData.profile.firstName} ${this.profileData.profile.lastName}`;
    document.getElementById("profileEmail").textContent =
      this.profileData.profile.email;

    if (this.saveProfileData()) {
      this.showNotification(
        "اطلاعات پروفایل با موفقیت به‌روزرسانی شد",
        "success"
      );
    }
  },

  // تغییر رمز عبور
  changePassword(event) {
    event.preventDefault();

    if (!this.validatePasswordForm()) {
      return;
    }

    const currentPassword = document.getElementById("currentPassword").value;
    const newPassword = document.getElementById("newPassword").value;

    // در اینجا معمولاً یک درخواست به سرور ارسال می‌شود
    // برای سادگی، فقط یک پیام نمایش می‌دهیم

    this.showNotification("رمز عبور با موفقیت تغییر یافت", "success");
    document.getElementById("passwordForm").reset();
    this.resetPasswordStrength();
  },

  // ذخیره تنظیمات
  saveSettings() {
    this.profileData.settings.emailNotifications =
      document.getElementById("emailNotifications").checked;
    this.profileData.settings.smsNotifications =
      document.getElementById("smsNotifications").checked;
    this.profileData.settings.specialOffers =
      document.getElementById("specialOffers").checked;
    this.profileData.settings.newsletter =
      document.getElementById("newsletter").checked;

    if (this.saveProfileData()) {
      this.showNotification("تنظیمات با موفقیت ذخیره شد", "success");
    }
  },

  // آپلود آواتار
  uploadAvatar(event) {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.match("image.*")) {
      this.showNotification("لطفاً یک فایل تصویری انتخاب کنید", "error");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      // 2MB
      this.showNotification("حجم فایل باید کمتر از ۲ مگابایت باشد", "error");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      this.profileData.profile.avatar = e.target.result;
      document.getElementById("profileAvatar").src = e.target.result;

      if (this.saveProfileData()) {
        this.showNotification("تصویر پروفایل با موفقیت تغییر یافت", "success");
      }
    };
    reader.readAsDataURL(file);
  },

  // اعتبارسنجی فرم پروفایل
  validateProfileForm() {
    let isValid = true;
    const fields = [
      { id: "firstName", message: "لطفاً نام خود را وارد کنید" },
      { id: "lastName", message: "لطفاً نام خانوادگی خود را وارد کنید" },
      { id: "email", message: "لطفاً ایمیل معتبر وارد کنید" },
      { id: "phone", message: "لطفاً شماره تلفن معتبر وارد کنید" },
      { id: "address", message: "لطفاً آدرس خود را وارد کنید" },
    ];

    // پاک کردن وضعیت خطاهای قبلی
    fields.forEach((field) => {
      const element = document.getElementById(field.id);
      element.classList.remove("is-invalid");
    });

    // بررسی فیلدهای اجباری
    fields.forEach((field) => {
      const element = document.getElementById(field.id);
      if (!element.value.trim()) {
        element.classList.add("is-invalid");
        isValid = false;
      }
    });

    // بررسی ایمیل
    const email = document.getElementById("email").value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      document.getElementById("email").classList.add("is-invalid");
      isValid = false;
    }

    // بررسی شماره تلفن
    const phone = document.getElementById("phone").value;
    const phoneRegex = /^09[0-9]{9}$/;
    if (phone && !phoneRegex.test(phone)) {
      document.getElementById("phone").classList.add("is-invalid");
      isValid = false;
    }

    return isValid;
  },

  // اعتبارسنجی فرم رمز عبور
  validatePasswordForm() {
    let isValid = true;
    const fields = [
      { id: "currentPassword", message: "لطفاً رمز عبور فعلی را وارد کنید" },
      { id: "newPassword", message: "لطفاً رمز عبور جدید را وارد کنید" },
      { id: "confirmPassword", message: "لطفاً تکرار رمز عبور را وارد کنید" },
    ];

    // پاک کردن وضعیت خطاهای قبلی
    fields.forEach((field) => {
      const element = document.getElementById(field.id);
      element.classList.remove("is-invalid");
    });

    // بررسی فیلدهای اجباری
    fields.forEach((field) => {
      const element = document.getElementById(field.id);
      if (!element.value.trim()) {
        element.classList.add("is-invalid");
        isValid = false;
      }
    });

    // بررسی تطابق رمز عبور جدید و تکرار آن
    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (newPassword !== confirmPassword) {
      document.getElementById("confirmPassword").classList.add("is-invalid");
      this.showNotification("رمز عبور جدید و تکرار آن مطابقت ندارند", "error");
      isValid = false;
    }

    // بررسی قدرت رمز عبور
    if (newPassword && !this.isPasswordStrong(newPassword)) {
      document.getElementById("newPassword").classList.add("is-invalid");
      this.showNotification("رمز عبور جدید به اندازه کافی قوی نیست", "error");
      isValid = false;
    }

    return isValid;
  },

  // بررسی قدرت رمز عبور
  isPasswordStrong(password) {
    // حداقل ۸ کاراکتر، شامل حروف و اعداد
    const strongRegex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;
    return strongRegex.test(password);
  },

  // تنظیم قدرت رمز عبور
  setupPasswordStrength() {
    const passwordInput = document.getElementById("newPassword");
    const strengthBar = document.getElementById("passwordStrengthBar");
    const requirements = document.getElementById("passwordRequirements");

    passwordInput.addEventListener("input", () => {
      const password = passwordInput.value;
      this.updatePasswordStrength(password, strengthBar, requirements);
    });
  },

  // بروزرسانی نمایش قدرت رمز عبور
  updatePasswordStrength(password, strengthBar, requirements) {
    let strength = 0;
    let lengthReq = document.getElementById("lengthReq");
    let numberReq = document.getElementById("numberReq");
    let letterReq = document.getElementById("letterReq");

    // پاک کردن کلاس‌های قبلی
    strengthBar.className = "password-strength-bar";

    // بررسی طول رمز عبور
    if (password.length >= 8) {
      strength += 25;
      lengthReq.className = "fas fa-circle requirement-met";
    } else {
      lengthReq.className = "fas fa-circle requirement-not-met";
    }

    // بررسی وجود عدد
    if (/\d/.test(password)) {
      strength += 25;
      numberReq.className = "fas fa-circle requirement-met";
    } else {
      numberReq.className = "fas fa-circle requirement-not-met";
    }

    // بررسی وجود حرف
    if (/[a-zA-Z]/.test(password)) {
      strength += 25;
      letterReq.className = "fas fa-circle requirement-met";
    } else {
      letterReq.className = "fas fa-circle requirement-not-met";
    }

    // بررسی کاراکترهای خاص
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      strength += 25;
    }

    // بروزرسانی نوار قدرت
    strengthBar.style.width = `${strength}%`;

    if (strength < 25) {
      strengthBar.classList.add("password-weak");
    } else if (strength < 50) {
      strengthBar.classList.add("password-medium");
    } else if (strength < 75) {
      strengthBar.classList.add("password-strong");
    } else {
      strengthBar.classList.add("password-very-strong");
    }
  },

  // بازنشانی نمایش قدرت رمز عبور
  resetPasswordStrength() {
    const strengthBar = document.getElementById("passwordStrengthBar");
    const lengthReq = document.getElementById("lengthReq");
    const numberReq = document.getElementById("numberReq");
    const letterReq = document.getElementById("letterReq");

    strengthBar.className = "password-strength-bar";
    strengthBar.style.width = "0%";

    lengthReq.className = "fas fa-circle requirement-not-met";
    numberReq.className = "fas fa-circle requirement-not-met";
    letterReq.className = "fas fa-circle requirement-not-met";
  },

  // تنظیم سایدبار
  setupSidebar() {
    const sidebar = document.getElementById("sidebar");
    const sidebarOverlay = document.getElementById("sidebarOverlay");
    const toggleSidebarBtn = document.getElementById("toggleSidebar");

    // نمایش/پنهان کردن سایدبار در موبایل
    toggleSidebarBtn.addEventListener("click", () => {
      sidebar.classList.toggle("show");
      sidebarOverlay.classList.toggle("show");
      document.body.style.overflow = sidebar.classList.contains("show")
        ? "hidden"
        : "";
    });

    // بستن سایدبار با کلیک روی overlay
    sidebarOverlay.addEventListener("click", () => {
      sidebar.classList.remove("show");
      sidebarOverlay.classList.remove("show");
      document.body.style.overflow = "";
    });

    // مدیریت دکمه خروج
    const logoutBtn = document.getElementById("logoutBtn");
    const confirmLogoutBtn = document.getElementById("confirmLogout");
    const logoutModal = new bootstrap.Modal(
      document.getElementById("logoutModal")
    );

    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      logoutModal.show();
    });

    confirmLogoutBtn.addEventListener("click", () => {
      // در اینجا معمولاً عملیات خروج انجام می‌شود
      this.showNotification("با موفقیت خارج شدید", "success");
      logoutModal.hide();

      // ریدایرکت به صفحه اصلی (شبیه‌سازی)
      setTimeout(() => {
        window.location.href = "index.html";
      }, 1500);
    });
  },

  // تنظیم event listeners
  setupEventListeners() {
    // فرم ویرایش پروفایل
    document.getElementById("profileForm").addEventListener("submit", (e) => {
      this.updateProfile(e);
    });

    // فرم تغییر رمز عبور
    document.getElementById("passwordForm").addEventListener("submit", (e) => {
      this.changePassword(e);
    });

    // دکمه انصراف
    document.getElementById("cancelEdit").addEventListener("click", () => {
      this.loadProfileData();
      this.showNotification("تغییرات لغو شد", "info");
    });

    // آپلود آواتار
    document.getElementById("avatarInput").addEventListener("change", (e) => {
      this.uploadAvatar(e);
    });

    // ذخیره تنظیمات با تغییر وضعیت سوئیچ‌ها
    const settingSwitches = [
      "emailNotifications",
      "smsNotifications",
      "specialOffers",
      "newsletter",
    ];

    settingSwitches.forEach((setting) => {
      document.getElementById(setting).addEventListener("change", () => {
        this.saveSettings();
      });
    });
  },

  // نمایش نوتیفیکیشن
  showNotification(message, type = "info") {
    // ایجاد عنصر نوتیفیکیشن
    const notification = document.createElement("div");
    notification.className = `alert alert-${this.getAlertType(
      type
    )} alert-dismissible fade show position-fixed`;
    notification.style.cssText = `
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 1060;
            min-width: 300px;
            text-align: center;
        `;

    notification.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;

    // اضافه کردن به صفحه
    document.body.appendChild(notification);

    // حذف خودکار پس از 5 ثانیه
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 5000);
  },

  // تبدیل نوع نوتیفیکیشن به کلاس Bootstrap
  getAlertType(type) {
    const types = {
      success: "success",
      error: "danger",
      warning: "warning",
      info: "info",
    };
    return types[type] || "info";
  },
};

// مقداردهی اولیه هنگام لود صفحه
document.addEventListener("DOMContentLoaded", () => {
  ProfileManager.init();
});
