const AdminPanelState = {
  products: [],
  users: [],
  orders: [],
  courses: [],
  news: [],
  supportTickets: [],

  init() {
    this.loadFromStorage();
    if (this.products.length === 0) {
      this.products = [...this.getMockData().products];
    }
    if (this.users.length === 0) {
      this.users = [...this.getMockData().users];
    }
    if (this.orders.length === 0) {
      this.orders = [...this.getMockData().orders];
    }
    this.saveToStorage();
  },

  loadFromStorage() {
    const savedData = localStorage.getItem("adminData");
    if (savedData) {
      const data = JSON.parse(savedData);
      this.products = data.products || [];
      this.users = data.users || [];
      this.orders = data.orders || [];
    }
  },

  saveToStorage() {
    const data = {
      products: this.products,
      users: this.users,
      orders: this.orders,
    };
    localStorage.setItem("adminData", JSON.stringify(data));
  },

  getMockData() {
    return {
      products: [
        {
          id: 1,
          name: "بذر گوجه فرنگی",
          category: "بذر",
          price: 25000,
          stock: 50,
          status: "active",
          description: "بذر گوجه فرنگی مرغوب",
          image:
            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjNENBRjUwIi8+CjxjaXJjbGUgY3g9IjQwIiBjeT0iNDAiIHI9IjIwIiBmaWxsPSIjRkY1NzIyIi8+Cjx0ZXh0IHg9IjQwIiB5PSI0NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0id2hpdGUiIGZvbnQtc2l6ZT0iMTIiPtio2LDYsTwvdGV4dD4KPC9zdmc+",
        },
        {
          id: 2,
          name: "کود آلی کمپوست",
          category: "کود",
          price: 35000,
          stock: 30,
          status: "active",
          description: "کود آلی طبیعی",
          image:
            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjNkQ0QzQxIi8+CjxjaXJjbGUgY3g9IjQwIiBjeT0iNDAiIHI9IjIwIiBmaWxsPSIjOEJDMzRBIi8+Cjx0ZXh0IHg9IjQwIiB5PSI0NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0id2hpdGUiIGZvbnQtc2l6ZT0iMTIiPtqp2YjYrzwvdGV4dD4KPC9zdmc+",
        },
      ],
      users: [
        {
          id: 1,
          username: "ali123",
          email: "ali@example.com",
          fullName: "علی احمدی",
          joinDate: "1402/05/10",
          status: "active",
        },
        {
          id: 2,
          username: "sara456",
          email: "sara@example.com",
          fullName: "سارا محمدی",
          joinDate: "1402/06/15",
          status: "active",
        },
      ],
      orders: [
        {
          id: "1001",
          userId: 1,
          userName: "علی احمدی",
          date: "1402/09/20",
          total: 125000,
          status: "completed",
          items: [
            { productName: "بذر گوجه فرنگی", quantity: 2, price: 25000 },
            { productName: "کود آلی کمپوست", quantity: 2, price: 35000 },
          ],
        },
      ],
    };
  },

  logout() {
    if (confirm("آیا می‌خواهید از پنل خارج شوید؟")) {
      localStorage.removeItem("isLoggedIn");
      alert("با موفقیت خارج شدید!");
      // window.location.href = 'shop.html'; // لینک به صفحه فروشگاه اصلی
    }
  },
};

// مدیریت داشبورد
const DashboardManager = {
  updateStats() {
    document.getElementById("totalOrders").textContent =
      AdminPanelState.orders.length;
    document.getElementById("totalUsers").textContent =
      AdminPanelState.users.length;
    document.getElementById("totalProducts").textContent =
      AdminPanelState.products.length;

    const totalSales = AdminPanelState.orders.reduce(
      (sum, order) => sum + order.total,
      0
    );
    document.getElementById("totalSales").textContent =
      totalSales.toLocaleString("fa-IR");
  },

  createSalesChart() {
    const ctx = document.getElementById("salesChart").getContext("2d");

    const data = {
      labels: [
        "شنبه",
        "یکشنبه",
        "دوشنبه",
        "سه‌شنبه",
        "چهارشنبه",
        "پنج‌شنبه",
        "جمعه",
      ],
      datasets: [
        {
          label: "فروش روزانه (تومان)",
          data: [120000, 190000, 300000, 250000, 200000, 300000, 450000],
          backgroundColor: "rgba(76, 175, 80, 0.2)",
          borderColor: "rgba(76, 175, 80, 1)",
          borderWidth: 2,
          fill: true,
          tension: 0.4,
        },
      ],
    };

    const config = {
      type: "line",
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
            labels: {
              font: {
                family: "Vazirmatn",
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function (value) {
                return value.toLocaleString("fa-IR") + " تومان";
              },
            },
          },
        },
      },
    };

    new Chart(ctx, config);
  },

  startAutoUpdate() {
    setInterval(() => {
      this.updateStats();
    }, 30000); // هر 30 ثانیه آمار به‌روز می‌شود
  },
};

// مدیریت ناوبری
const NavigationManager = {
  initializeEventListeners() {
    // Sidebar toggle
    const toggleBtn = document.getElementById("toggleSidebar");
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("sidebarOverlay");

    toggleBtn.addEventListener("click", () => {
      sidebar.classList.add("show");
      overlay.classList.add("show");
    });

    overlay.addEventListener("click", () => {
      sidebar.classList.remove("show");
      overlay.classList.remove("show");
    });

    // Navigation - فقط برای نمایش پیام برای لینک‌هایی که صفحه‌ای ندارند
    document.querySelectorAll(".sidebar .nav-link").forEach((link) => {
      link.addEventListener("click", function (e) {
        const href = this.getAttribute("href");

        if (href === "#") {
          e.preventDefault();
          const section = this.dataset.section;
          if (section) {
            alert(`بخش ${section} درحال انتقال است...`);
          }
        }
      });
    });
  },
};

// مقداردهی اولیه هنگام لود صفحه
document.addEventListener("DOMContentLoaded", function () {
  AdminPanelState.init();
  NavigationManager.initializeEventListeners();
  DashboardManager.updateStats();
  DashboardManager.createSalesChart();
  DashboardManager.startAutoUpdate();

  // افزودن افکت fade-in به بخش داشبورد
  document.getElementById("dashboardSection").classList.add("fade-in");
});
