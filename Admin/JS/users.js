const AdminPanelState = {
  users: [],
  transactions: [],

  init() {
    this.loadFromStorage();
    if (this.users.length === 0) {
      this.users = [...this.getMockData().users];
    }
    if (this.transactions.length === 0) {
      this.transactions = [...this.getMockData().transactions];
    }
    this.saveToStorage();
  },

  loadFromStorage() {
    const savedData = localStorage.getItem("adminUsersData");
    if (savedData) {
      const data = JSON.parse(savedData);
      this.users = data.users || [];
      this.transactions = data.transactions || [];
    }
  },

  saveToStorage() {
    const data = {
      users: this.users,
      transactions: this.transactions,
    };
    localStorage.setItem("adminUsersData", JSON.stringify(data));
  },

  getMockData() {
    return {
      users: [
        {
          id: 1,
          username: "ali123",
          email: "ali@example.com",
          fullName: "علی احمدی",
          joinDate: "1402/05/10",
          status: "active",
          phone: "09123456789",
          address: "تهران، خیابان ولیعصر",
          lastLogin: "1402/10/15 - 14:30",
          avatar:
            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjNENBRjUwIi8+Cjx0ZXh0IHg9IjUwIiB5PSI1NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0id2hpdGUiIGZvbnQtc2l6ZT0iMjQiPtio2LA8L3RleHQ+Cjwvc3ZnPg==",
        },
        {
          id: 2,
          username: "sara456",
          email: "sara@example.com",
          fullName: "سارا محمدی",
          joinDate: "1402/06/15",
          status: "active",
          phone: "09129876543",
          address: "اصفهان، خیابان چهارباغ",
          lastLogin: "1402/10/14 - 09:15",
          avatar:
            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjNkQ0QzQxIi8+Cjx0ZXh0IHg9IjUwIiB5PSI1NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0id2hpdGUiIGZvbnQtc2l6ZT0iMjQiPtin2LA8L3RleHQ+Cjwvc3ZnPg==",
        },
        {
          id: 3,
          username: "reza789",
          email: "reza@example.com",
          fullName: "رضا کریمی",
          joinDate: "1402/07/20",
          status: "blocked",
          phone: "09151112233",
          address: "مشهد، بلوار وکیل آباد",
          lastLogin: "1402/09/25 - 16:45",
          avatar:
            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjOTQ3RkJCIi8+Cjx0ZXh0IHg9IjUwIiB5PSI1NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0id2hpdGUiIGZvbnQtc2l6ZT0iMjQiPtin2YQ8L3RleHQ+Cjwvc3ZnPg==",
          blockReason: "تخلف در سیستم",
        },
        {
          id: 4,
          username: "fatemeh001",
          email: "fatemeh@example.com",
          fullName: "فاطمه حسینی",
          joinDate: "1402/08/05",
          status: "active",
          phone: "09167778899",
          address: "شیراز، بلوار زرگری",
          lastLogin: "1402/10/15 - 11:20",
          avatar:
            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRkY1NzIyIi8+Cjx0ZXh0IHg9IjUwIiB5PSI1NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0id2hpdGUiIGZvbnQtc2l6ZT0iMjQiPtin2YTYsTwvdGV4dD4KPC9zdmc+",
        },
      ],
      transactions: [
        {
          id: 1,
          userId: 1,
          type: "purchase",
          amount: 125000,
          date: "1402/10/15 - 14:25",
          description: "خرید بذر و کود",
          status: "completed",
        },
        {
          id: 2,
          userId: 1,
          type: "purchase",
          amount: 85000,
          date: "1402/10/10 - 10:30",
          description: "خرید ابزار باغبانی",
          status: "completed",
        },
        {
          id: 3,
          userId: 2,
          type: "purchase",
          amount: 45000,
          date: "1402/10/14 - 09:10",
          description: "خرید سموم ارگانیک",
          status: "completed",
        },
        {
          id: 4,
          userId: 2,
          type: "refund",
          amount: -25000,
          date: "1402/10/12 - 16:45",
          description: "مرجوعی محصول",
          status: "completed",
        },
        {
          id: 5,
          userId: 3,
          type: "purchase",
          amount: 210000,
          date: "1402/09/25 - 16:40",
          description: "خرید عمده بذر",
          status: "completed",
        },
        {
          id: 6,
          userId: 4,
          type: "purchase",
          amount: 75000,
          date: "1402/10/15 - 11:15",
          description: "خرید کود و ابزار",
          status: "pending",
        },
      ],
    };
  },

  logout() {
    if (confirm("آیا می‌خواهید از پنل خارج شوید؟")) {
      localStorage.removeItem("isLoggedIn");
      alert("با موفقیت خارج شدید!");
    }
  },
};

// مدیریت نوتیفیکیشن
const NotificationManager = {
  show(message, type = "info") {
    const notification = document.createElement("div");
    notification.className = `alert alert-${
      type === "success" ? "success" : type === "error" ? "danger" : "info"
    } alert-dismissible fade show position-fixed`;
    notification.style.cssText =
      "top: 20px; left: 20px; z-index: 9999; min-width: 300px;";
    notification.innerHTML = `
                    ${message}
                    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                `;

    document.body.appendChild(notification);

    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 3000);
  },
};

// مدیریت کاربران
const UsersManager = {
  currentUserId: null,

  loadUsers(filter = "all") {
    const tbody = document.getElementById("usersTable");
    tbody.innerHTML = "";

    let filteredUsers = AdminPanelState.users;
    if (filter !== "all") {
      filteredUsers = AdminPanelState.users.filter(
        (user) => user.status === filter
      );
    }

    filteredUsers.forEach((user) => {
      const statusText = {
        active: "فعال",
        inactive: "غیرفعال",
        blocked: "مسدود شده",
      };

      const statusClass = {
        active: "status-active",
        inactive: "status-inactive",
        blocked: "status-blocked",
      };

      const row = document.createElement("tr");
      row.innerHTML = `
                        <td>
                            <img src="${user.avatar}" alt="${
        user.fullName
      }" class="user-avatar">
                        </td>
                        <td>${user.username}</td>
                        <td>${user.email}</td>
                        <td>${user.fullName}</td>
                        <td>${user.joinDate}</td>
                        <td>
                            <span class="status-badge ${
                              statusClass[user.status]
                            }">
                                ${statusText[user.status]}
                            </span>
                        </td>
                        <td>
                            <button class="btn btn-sm btn-info me-1" onclick="UsersManager.viewUserDetails(${
                              user.id
                            })">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button class="btn btn-sm ${
                              user.status === "blocked"
                                ? "btn-success"
                                : "btn-warning"
                            }" 
                                    onclick="UsersManager.toggleUserStatus(${
                                      user.id
                                    })">
                                <i class="fas ${
                                  user.status === "blocked"
                                    ? "fa-check"
                                    : "fa-ban"
                                }"></i>
                                ${
                                  user.status === "blocked"
                                    ? "آزاد کردن"
                                    : "مسدود کردن"
                                }
                            </button>
                        </td>
                    `;
      tbody.appendChild(row);
    });
  },

  filterUsers(status) {
    document
      .querySelectorAll(".btn-group .btn")
      .forEach((btn) => btn.classList.remove("active"));
    event.target.classList.add("active");
    this.loadUsers(status);
  },

  viewUserDetails(userId) {
    this.currentUserId = userId;
    const user = AdminPanelState.users.find((u) => u.id === userId);
    if (!user) return;

    const userTransactions = AdminPanelState.transactions.filter(
      (t) => t.userId === userId
    );

    document.getElementById(
      "userDetailsModalTitle"
    ).textContent = `جزئیات کاربر: ${user.fullName}`;

    const detailsContent = document.getElementById("userDetailsContent");
    detailsContent.innerHTML = `
                    <div class="row">
                        <div class="col-md-4 text-center">
                            <img src="${user.avatar}" alt="${
      user.fullName
    }" class="user-avatar mb-3" style="width: 100px; height: 100px;">
                            <h5>${user.fullName}</h5>
                            <p class="text-muted">@${user.username}</p>
                            <span class="status-badge ${
                              user.status === "active"
                                ? "status-active"
                                : user.status === "blocked"
                                ? "status-blocked"
                                : "status-inactive"
                            }">
                                ${
                                  user.status === "active"
                                    ? "فعال"
                                    : user.status === "blocked"
                                    ? "مسدود شده"
                                    : "غیرفعال"
                                }
                            </span>
                        </div>
                        <div class="col-md-8">
                            <div class="user-detail-card">
                                <h6>اطلاعات شخصی</h6>
                                <div class="row">
                                    <div class="col-6">
                                        <strong>ایمیل:</strong><br>${user.email}
                                    </div>
                                    <div class="col-6">
                                        <strong>تلفن:</strong><br>${user.phone}
                                    </div>
                                    <div class="col-12 mt-2">
                                        <strong>آدرس:</strong><br>${
                                          user.address
                                        }
                                    </div>
                                    <div class="col-6 mt-2">
                                        <strong>تاریخ عضویت:</strong><br>${
                                          user.joinDate
                                        }
                                    </div>
                                    <div class="col-6 mt-2">
                                        <strong>آخرین ورود:</strong><br>${
                                          user.lastLogin
                                        }
                                    </div>
                                </div>
                            </div>

                            <div class="user-detail-card">
                                <h6>تراکنش‌های اخیر</h6>
                                ${
                                  userTransactions.length > 0
                                    ? userTransactions
                                        .map(
                                          (transaction) => `
                                        <div class="transaction-item ${
                                          transaction.type === "refund"
                                            ? "refund"
                                            : transaction.status === "pending"
                                            ? "pending"
                                            : ""
                                        }">
                                            <div class="d-flex justify-content-between">
                                                <div>
                                                    <strong>${
                                                      transaction.description
                                                    }</strong>
                                                    <br><small class="text-muted">${
                                                      transaction.date
                                                    }</small>
                                                </div>
                                                <div class="text-${
                                                  transaction.type === "refund"
                                                    ? "danger"
                                                    : "success"
                                                }">
                                                    ${
                                                      transaction.amount > 0
                                                        ? "+"
                                                        : ""
                                                    }${transaction.amount.toLocaleString(
                                            "fa-IR"
                                          )} تومان
                                                </div>
                                            </div>
                                            <small class="badge bg-${
                                              transaction.status === "completed"
                                                ? "success"
                                                : "warning"
                                            }">${
                                            transaction.status === "completed"
                                              ? "تکمیل شده"
                                              : "در انتظار"
                                          }</small>
                                        </div>
                                    `
                                        )
                                        .join("")
                                    : '<p class="text-muted">هیچ تراکنشی یافت نشد.</p>'
                                }
                            </div>

                            ${
                              user.status === "blocked"
                                ? `
                                <div class="user-detail-card">
                                    <h6>دلیل مسدودیت</h6>
                                    <p class="text-warning">${
                                      user.blockReason || "دلیل مشخص نشده"
                                    }</p>
                                </div>
                            `
                                : ""
                            }
                        </div>
                    </div>
                `;

    // به روزرسانی دکمه مسدود کردن/آزاد کردن
    const blockBtn = document.getElementById("blockUserBtn");
    if (user.status === "blocked") {
      blockBtn.textContent = "آزاد کردن کاربر";
      blockBtn.className = "btn btn-success";
    } else {
      blockBtn.textContent = "مسدود کردن کاربر";
      blockBtn.className = "btn btn-warning";
    }

    const modal = new bootstrap.Modal(
      document.getElementById("userDetailsModal")
    );
    modal.show();
  },

  toggleUserStatus(userId) {
    const user = AdminPanelState.users.find((u) => u.id === userId);
    if (!user) return;

    if (user.status === "blocked") {
      // آزاد کردن کاربر
      user.status = "active";
      delete user.blockReason;
      NotificationManager.show("کاربر با موفقیت آزاد شد", "success");
    } else {
      // مسدود کردن کاربر
      const reason = prompt(
        "دلیل مسدود کردن کاربر را وارد کنید:",
        "تخلف در سیستم"
      );
      if (reason !== null) {
        user.status = "blocked";
        user.blockReason = reason || "دلیل مشخص نشده";
        NotificationManager.show("کاربر با موفقیت مسدود شد", "warning");
      }
    }

    AdminPanelState.saveToStorage();
    this.loadUsers();
  },

  toggleUserBlock() {
    if (this.currentUserId) {
      this.toggleUserStatus(this.currentUserId);
      const modal = bootstrap.Modal.getInstance(
        document.getElementById("userDetailsModal")
      );
      modal.hide();
    }
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

    // Navigation - فقط برای نمایش پیام
    document.querySelectorAll(".sidebar .nav-link").forEach((link) => {
      link.addEventListener("click", function (e) {
        const href = this.getAttribute("href");

        // اگر لینک به # اشاره می‌کند (صفحه‌ای ندارد)
        if (href === "#") {
          e.preventDefault();
          const section = this.dataset.section;
          if (section && section !== "products") {
            alert(`بخش ${section} در این نسخه مستقل در دسترس نیست.`);
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
  UsersManager.loadUsers();

  // افزودن افکت fade-in به بخش کاربران
  document.getElementById("usersSection").classList.add("fade-in");
});
