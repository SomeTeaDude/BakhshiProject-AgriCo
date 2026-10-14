// dashboard.js
class DashboardManager {
  static userData = null;
  static progressChart = null;

  // مقداردهی اولیه داشبورد
  static init() {
    console.log("🚀 Initializing Dashboard...");

    this.loadUserData();
    this.setupEventListeners();
    this.loadDashboardData();
    this.setupCharts();
    this.updateUserGreeting();

    console.log("✅ Dashboard initialized successfully");
  }

  // بارگذاری داده‌های کاربر
  static loadUserData() {
    try {
      const savedData = localStorage.getItem("userDashboardData");
      if (savedData) {
        this.userData = JSON.parse(savedData);
      } else {
        this.userData = this.getDefaultData();
        this.saveUserData();
      }
      console.log("📊 User data loaded:", this.userData);
    } catch (error) {
      console.error("❌ Error loading user data:", error);
      this.userData = this.getDefaultData();
    }
  }

  // داده‌های پیش‌فرض
  static getDefaultData() {
    return {
      profile: {
        firstName: "رضا",
        lastName: "موسوی",
        joinDate: "1404/05/10",
      },
      stats: {
        totalOrders: 5,
        totalCourses: 3,
        totalSpent: 2450000,
        cartItems: 2,
      },
      activities: [
        {
          id: 1,
          type: "success",
          title: "خرید دوره آموزش گوجه فرنگی",
          time: "2 روز پیش",
          icon: "fa-check",
        },
        {
          id: 2,
          type: "info",
          title: "پرداخت سفارش #1234",
          time: "5 روز پیش",
          icon: "fa-credit-card",
        },
        {
          id: 3,
          type: "warning",
          title: "ارسال محصول بذر گوجه",
          time: "1 هفته پیش",
          icon: "fa-box",
        },
        {
          id: 4,
          type: "success",
          title: "تکمیل فصل اول دوره کشاورزی",
          time: "3 روز پیش",
          icon: "fa-graduation-cap",
        },
      ],
      suggestedCourses: [
        {
          id: 101,
          name: "کشت ارگانیک سبزیجات",
          instructor: "دکتر حسینی",
          price: 150000,
          duration: "10 ساعت",
          image:
            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiByeD0iOCIgZmlsbD0iIzRjYWY1MCIvPgo8dGV4dCB4PSIzMCIgeT0iMzUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPu2VjOydtOuhnDwvdGV4dD4KPC9zdmc+",
        },
        {
          id: 102,
          name: "مدیریت آفات و بیماری‌ها",
          instructor: "مهندس کریمی",
          price: 180000,
          duration: "12 ساعت",
          image:
            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiByeD0iOCIgZmlsbD0iIzZlNGM0MSIvPgo8dGV4dCB4PSIzMCIgeT0iMzUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPu2VjOydtOuhnDwvdGV4dD4KPC9zdmc+",
        },
      ],
      notifications: [
        {
          id: 1,
          type: "info",
          message: "دوره جدید 'کشاورزی هوشمند' اضافه شد",
          time: "2 ساعت پیش",
          read: false,
        },
        {
          id: 2,
          type: "warning",
          message: "سبد خرید شما حاوی 2 آیتم است",
          time: "1 روز پیش",
          read: false,
        },
        {
          id: 3,
          type: "success",
          message: "پرداخت شما با موفقیت انجام شد",
          time: "3 روز پیش",
          read: true,
        },
      ],
      popularProducts: [
        {
          id: 201,
          name: "بذر خیار گلخانه‌ای",
          category: "بذر",
          price: 30000,
          image:
            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjE1MCIgaGVpZ2h0PSIxNTAiIGZpbGw9IiM0Q0FGNTAiLz48L3N2Zz4=",
        },
        {
          id: 202,
          name: "کود کامل NPK",
          category: "کود",
          price: 45000,
          image:
            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjE1MCIgaGVpZ2h0PSIxNTAiIGZpbGw9IiM2RDRDNDEiLz48L3N2Zz4=",
        },
        {
          id: 203,
          name: "سموم ارگانیک",
          category: "سموم",
          price: 55000,
          image:
            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjE1MCIgaGVpZ2h0PSIxNTAiIGZpbGw9IiNGRjU3MjIiLz48L3N2Zz4=",
        },
        {
          id: 204,
          name: "ابزار باغبانی پیشرفته",
          category: "ابزار",
          price: 120000,
          image:
            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjE1MCIgaGVpZ2h0PSIxNTAiIGZpbGw9IiMyMTk2RjMiLz48L3N2Zz4=",
        },
      ],
      progressData: {
        week: [30, 45, 60, 75, 65, 80, 90],
        month: [
          20, 35, 50, 65, 70, 75, 80, 75, 82, 85, 88, 90, 85, 88, 90, 92, 95,
          90, 92, 95, 97, 95, 92, 95, 97, 98, 95, 97, 99, 100,
        ],
        year: [10, 25, 40, 55, 60, 65, 70, 68, 72, 75, 78, 80],
      },
    };
  }

  // ذخیره داده‌های کاربر
  static saveUserData() {
    try {
      localStorage.setItem("userDashboardData", JSON.stringify(this.userData));
      return true;
    } catch (error) {
      console.error("❌ Error saving user data:", error);
      return false;
    }
  }

  // تنظیم event listeners
  static setupEventListeners() {
    // سایدبار موبایل
    const toggleBtn = document.getElementById("toggleSidebar");
    const sidebar = document.getElementById("sidebar");

    if (toggleBtn && sidebar) {
      toggleBtn.addEventListener("click", () => {
        sidebar.classList.toggle("show");
      });
    }

    // ناوبری منو
    document
      .querySelectorAll(".sidebar .nav-link[data-section]")
      .forEach((link) => {
        link.addEventListener("click", (e) => {
          e.preventDefault();
          const section = link.getAttribute("data-section");
          this.navigateTo(section);
        });
      });

    // کلیدهای میانبر
    document.addEventListener("keydown", (e) => {
      if (e.ctrlKey) {
        switch (e.key) {
          case "1":
            e.preventDefault();
            this.navigateTo("dashboard");
            break;
          case "2":
            e.preventDefault();
            this.navigateTo("payments");
            break;
          case "3":
            e.preventDefault();
            this.navigateTo("cart");
            break;
          case "4":
            e.preventDefault();
            this.navigateTo("mycourses");
            break;
        }
      }
    });

    console.log("🎯 Event listeners setup completed");
  }

  // بارگذاری داده‌های داشبورد
  static loadDashboardData() {
    this.updateStats();
    this.loadRecentActivities();
    this.loadSuggestedCourses();
    this.loadNotifications();
    this.loadPopularProducts();

    console.log("📈 Dashboard data loaded");
  }

  // بروزرسانی آمار
  static updateStats() {
    if (!this.userData?.stats) return;

    const stats = this.userData.stats;

    document.getElementById("totalOrders").textContent =
      stats.totalOrders.toLocaleString("fa-IR");
    document.getElementById("totalCourses").textContent =
      stats.totalCourses.toLocaleString("fa-IR");
    document.getElementById("totalSpent").textContent =
      stats.totalSpent.toLocaleString("fa-IR");
    document.getElementById("cartItems").textContent =
      stats.cartItems.toLocaleString("fa-IR");
  }

  // بارگذاری فعالیت‌های اخیر
  static loadRecentActivities() {
    const container = document.getElementById("recentActivities");
    if (!container || !this.userData?.activities) return;

    const activities = this.userData.activities.slice(0, 5);
    container.innerHTML = activities
      .map(
        (activity) => `
            <div class="activity-item fade-in-up">
                <div class="activity-icon ${activity.type}">
                    <i class="fas ${activity.icon}"></i>
                </div>
                <div class="activity-content">
                    <div class="activity-title">${activity.title}</div>
                    <div class="activity-time">${activity.time}</div>
                </div>
            </div>
        `
      )
      .join("");
  }

  // بارگذاری دوره‌های پیشنهادی
  static loadSuggestedCourses() {
    const container = document.getElementById("suggestedCourses");
    if (!container || !this.userData?.suggestedCourses) return;

    container.innerHTML = this.userData.suggestedCourses
      .map(
        (course) => `
            <div class="course-item" onclick="DashboardManager.viewCourse(${
              course.id
            })">
                <img src="${course.image}" alt="${
          course.name
        }" class="course-image">
                <div class="course-info">
                    <div class="course-name">${course.name}</div>
                    <div class="course-meta">${course.instructor} • ${
          course.duration
        }</div>
                </div>
                <div class="course-price">${course.price.toLocaleString(
                  "fa-IR"
                )} تومان</div>
            </div>
        `
      )
      .join("");
  }

  // بارگذاری اعلان‌ها
  static loadNotifications() {
    const container = document.getElementById("notificationsList");
    const countElement = document.getElementById("notificationCount");

    if (!container || !this.userData?.notifications) return;

    const unreadCount = this.userData.notifications.filter(
      (n) => !n.read
    ).length;
    if (countElement) {
      countElement.textContent = unreadCount;
    }

    const notifications = this.userData.notifications.slice(0, 3);
    container.innerHTML = notifications
      .map(
        (notification) => `
            <div class="notification-item ${notification.read ? "" : "unread"}" 
                 onclick="DashboardManager.viewNotification(${
                   notification.id
                 })">
                <div class="notification-icon ${notification.type}">
                    <i class="fas fa-bell"></i>
                </div>
                <div class="notification-content">
                    <div class="notification-text">${notification.message}</div>
                    <div class="notification-time">${notification.time}</div>
                </div>
            </div>
        `
      )
      .join("");
  }

  // بارگذاری محصولات پرطرفدار
  static loadPopularProducts() {
    const container = document.getElementById("popularProducts");
    if (!container || !this.userData?.popularProducts) return;

    container.innerHTML = this.userData.popularProducts
      .map(
        (product) => `
            <div class="product-card" onclick="DashboardManager.viewProduct(${
              product.id
            })">
                <img src="${product.image}" alt="${
          product.name
        }" class="product-image">
                <div class="product-info">
                    <div class="product-name">${product.name}</div>
                    <div class="product-category">${product.category}</div>
                    <div class="product-price">${product.price.toLocaleString(
                      "fa-IR"
                    )} تومان</div>
                </div>
            </div>
        `
      )
      .join("");
  }

  // تنظیم نمودارها
  static setupCharts() {
    this.setupProgressChart();
  }

  // نمودار پیشرفت
  static setupProgressChart() {
    const ctx = document.getElementById("progressChart");
    if (!ctx) return;

    if (this.progressChart) {
      this.progressChart.destroy();
    }

    const data = this.userData?.progressData?.month || [];

    this.progressChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: data.map((_, index) => (index + 1).toString()),
        datasets: [
          {
            label: "پیشرفت یادگیری (%)",
            data: data,
            borderColor: "#2e7d32",
            backgroundColor: "rgba(46, 125, 50, 0.1)",
            borderWidth: 2,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: "#2e7d32",
            pointBorderColor: "#ffffff",
            pointBorderWidth: 2,
            pointRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: "top",
            rtl: true,
          },
        },
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: "روز",
            },
            grid: {
              display: false,
            },
          },
          y: {
            display: true,
            title: {
              display: true,
              text: "درصد پیشرفت",
            },
            min: 0,
            max: 100,
            grid: {
              color: "rgba(0, 0, 0, 0.1)",
            },
          },
        },
      },
    });
  }

  // فیلتر نمودار پیشرفت
  static filterProgressChart(period) {
    if (!this.userData?.progressData) return;

    const data = this.userData.progressData[period] || [];
    if (this.progressChart && data.length > 0) {
      this.progressChart.data.labels = data.map((_, index) =>
        (index + 1).toString()
      );
      this.progressChart.data.datasets[0].data = data;
      this.progressChart.update();
    }
  }

  // بروزرسانی سلام کاربر
  static updateUserGreeting() {
    const greetingElement = document.getElementById("userGreeting");
    if (greetingElement && this.userData?.profile) {
      const profile = this.userData.profile;
      const hour = new Date().getHours();
      let timeGreeting = "سلام";

      if (hour < 12) timeGreeting = "صبح بخیر";
      else if (hour < 18) timeGreeting = "ظهر بخیر";
      else timeGreeting = "عصر بخیر";

      greetingElement.textContent = `${timeGreeting}، ${profile.firstName} عزیز`;
    }
  }

  // ناوبری به بخش‌های مختلف
  static navigateTo(section) {
    console.log(`➡️ Navigating to: ${section}`);

    // منطق ناوبری به بخش‌های مختلف
    switch (section) {
      case "dashboard":
        window.location.href = "Dashboard.html";
        break;
      case "payments":
        window.location.href = "payment.html";
        break;
      case "cart":
        window.location.href = "cart.html";
        break;
      case "mycourses":
        window.location.href = "mycourses.html";
        break;
      case "myproducts":
        window.location.href = "myProducts.html";
        break;
      case "news":
        window.location.href = "news.html";
        break;
      case "profile":
        window.location.href = "profile.html";
        break;
      case "support":
        window.location.href = "support.html";
        break;
      default:
        this.showNotification(`در حال انتقال به بخش ${section}...`, "info");
    }
  }

  // مشاهده دوره
  static viewCourse(courseId) {
    this.showNotification(
      `در حال باز کردن دوره با شناسه ${courseId}...`,
      "info"
    );
    // منطق مشاهده دوره
  }

  // مشاهده محصول
  static viewProduct(productId) {
    this.showNotification(
      `در حال باز کردن محصول با شناسه ${productId}...`,
      "info"
    );
    // منطق مشاهده محصول
  }

  // مشاهده اعلان
  static viewNotification(notificationId) {
    const notification = this.userData.notifications.find(
      (n) => n.id === notificationId
    );
    if (notification) {
      notification.read = true;
      this.saveUserData();
      this.loadNotifications();
      this.showNotification(notification.message, "info");
    }
  }

  // مشاهده همه فعالیت‌ها
  static viewAllActivities() {
    this.showNotification("در حال بارگذاری همه فعالیت‌ها...", "info");
    // منطق مشاهده همه فعالیت‌ها
  }

  // مشاهده همه دوره‌ها
  static viewAllCourses() {
    this.navigateTo("mycourses");
  }

  // مشاهده همه محصولات
  static viewAllProducts() {
    this.showNotification("در حال بارگذاری همه محصولات...", "info");
    // منطق مشاهده همه محصولات
  }

  // هدایت به فروشگاه
  static redirectToShop() {
    this.showNotification("در حال انتقال به فروشگاه...", "info");
    // window.location.href = 'shop.html';
  }

  // نمایش مودال خروج
  static showLogoutModal() {
    const modal = new bootstrap.Modal(document.getElementById("logoutModal"));
    modal.show();
  }

  // تایید خروج
  static confirmLogout() {
    this.showNotification("در حال خروج از حساب کاربری...", "warning");

    setTimeout(() => {
      localStorage.removeItem("userDashboardData");
      window.location.href = "login.html";
    }, 1500);
  }

  // نمایش نوتیفیکیشن
  static showNotification(message, type = "info") {
    // ایجاد نوتیفیکیشن سفارشی
    const notification = document.createElement("div");
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    notification.style.cssText =
      "top: 20px; left: 20px; z-index: 9999; min-width: 300px;";
    notification.innerHTML = `
            <i class="fas fa-${
              type === "success"
                ? "check"
                : type === "error"
                ? "exclamation"
                : "info"
            }-circle ms-2"></i>
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;

    document.body.appendChild(notification);

    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 3000);
  }

  // رفرش داده‌های داشبورد
  static refreshDashboard() {
    console.log("🔄 Refreshing dashboard...");
    this.loadDashboardData();
    this.showNotification("داده‌های داشبورد بروزرسانی شد", "success");
  }
}

// مقداردهی اولیه هنگام لود صفحه
document.addEventListener("DOMContentLoaded", function () {
  DashboardManager.init();
});

// رفرش خودکار هر 5 دقیقه
setInterval(() => {
  DashboardManager.refreshDashboard();
}, 300000);

// مدیریت خطاهای جهانی
window.addEventListener("error", function (event) {
  console.error("Global error:", event.error);
  DashboardManager.showNotification("خطایی در سیستم رخ داده است", "error");
});
