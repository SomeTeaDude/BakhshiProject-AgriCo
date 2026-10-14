const AdminPanelState = {
  orders: [],

  init() {
    this.loadFromStorage();
    if (this.orders.length === 0) {
      this.orders = [...this.getMockData().orders];
    }
    this.saveToStorage();
  },

  loadFromStorage() {
    const savedData = localStorage.getItem("adminOrdersData");
    if (savedData) {
      const data = JSON.parse(savedData);
      this.orders = data.orders || [];
    }
  },

  saveToStorage() {
    const data = {
      orders: this.orders,
    };
    localStorage.setItem("adminOrdersData", JSON.stringify(data));
  },

  getMockData() {
    return {
      orders: [
        {
          id: "1001",
          userId: 1,
          userName: "علی احمدی",
          userPhone: "09123456789",
          userAddress: "تهران، خیابان ولیعصر، پلاک ۱۲۳",
          date: "1402/10/15 - 14:25",
          total: 125000,
          status: "completed",
          paymentMethod: "آنلاین",
          paymentStatus: "موفق",
          items: [
            {
              productName: "بذر گوجه فرنگی",
              quantity: 2,
              price: 25000,
              total: 50000,
            },
            {
              productName: "کود آلی کمپوست",
              quantity: 2,
              price: 35000,
              total: 70000,
            },
            {
              productName: "ابزار باغبانی",
              quantity: 1,
              price: 5000,
              total: 5000,
            },
          ],
          timeline: [
            { step: "ثبت سفارش", date: "1402/10/15 - 14:25", completed: true },
            {
              step: "تأیید پرداخت",
              date: "1402/10/15 - 14:30",
              completed: true,
            },
            { step: "آماده‌سازی", date: "1402/10/15 - 15:00", completed: true },
            { step: "ارسال", date: "1402/10/16 - 09:00", completed: true },
            { step: "تحویل", date: "1402/10/16 - 14:00", completed: true },
          ],
        },
        {
          id: "1002",
          userId: 2,
          userName: "سارا محمدی",
          userPhone: "09129876543",
          userAddress: "اصفهان، خیابان چهارباغ، کوچه ۴۵",
          date: "1402/10/14 - 09:15",
          total: 85000,
          status: "processing",
          paymentMethod: "کارت به کارت",
          paymentStatus: "در انتظار",
          items: [
            {
              productName: "بذر خیار",
              quantity: 3,
              price: 15000,
              total: 45000,
            },
            {
              productName: "سموم ارگانیک",
              quantity: 1,
              price: 40000,
              total: 40000,
            },
          ],
          timeline: [
            { step: "ثبت سفارش", date: "1402/10/14 - 09:15", completed: true },
            {
              step: "تأیید پرداخت",
              date: "1402/10/14 - 09:20",
              completed: true,
            },
            { step: "آماده‌سازی", date: "1402/10/14 - 10:00", completed: true },
            { step: "ارسال", date: "", completed: false },
            { step: "تحویل", date: "", completed: false },
          ],
        },
        {
          id: "1003",
          userId: 3,
          userName: "رضا کریمی",
          userPhone: "09151112233",
          userAddress: "مشهد، بلوار وکیل آباد، پلاک ۶۷",
          date: "1402/10/13 - 16:45",
          total: 210000,
          status: "shipped",
          paymentMethod: "آنلاین",
          paymentStatus: "موفق",
          items: [
            {
              productName: "بذر گوجه فرنگی",
              quantity: 5,
              price: 25000,
              total: 125000,
            },
            {
              productName: "کود آلی کمپوست",
              quantity: 3,
              price: 35000,
              total: 105000,
            },
          ],
          timeline: [
            { step: "ثبت سفارش", date: "1402/10/13 - 16:45", completed: true },
            {
              step: "تأیید پرداخت",
              date: "1402/10/13 - 16:50",
              completed: true,
            },
            { step: "آماده‌سازی", date: "1402/10/14 - 08:00", completed: true },
            { step: "ارسال", date: "1402/10/14 - 14:30", completed: true },
            { step: "تحویل", date: "", completed: false },
          ],
        },
        {
          id: "1004",
          userId: 4,
          userName: "فاطمه حسینی",
          userPhone: "09167778899",
          userAddress: "شیراز، بلوار زرگری، ساختمان ۸۹",
          date: "1402/10/15 - 11:20",
          total: 75000,
          status: "pending",
          paymentMethod: "آنلاین",
          paymentStatus: "ناموفق",
          items: [
            {
              productName: "قیچی باغبانی",
              quantity: 1,
              price: 45000,
              total: 45000,
            },
            {
              productName: "دستکش باغبانی",
              quantity: 2,
              price: 15000,
              total: 30000,
            },
          ],
          timeline: [
            { step: "ثبت سفارش", date: "1402/10/15 - 11:20", completed: true },
            { step: "تأیید پرداخت", date: "", completed: false },
            { step: "آماده‌سازی", date: "", completed: false },
            { step: "ارسال", date: "", completed: false },
            { step: "تحویل", date: "", completed: false },
          ],
        },
        {
          id: "1005",
          userId: 1,
          userName: "علی احمدی",
          userPhone: "09123456789",
          userAddress: "تهران، خیابان ولیعصر، پلاک ۱۲۳",
          date: "1402/10/12 - 10:30",
          total: 150000,
          status: "cancelled",
          paymentMethod: "آنلاین",
          paymentStatus: "لغو شده",
          items: [
            {
              productName: "سمپاش دستی",
              quantity: 1,
              price: 80000,
              total: 80000,
            },
            {
              productName: "بذر فلفل",
              quantity: 4,
              price: 17500,
              total: 70000,
            },
          ],
          timeline: [
            { step: "ثبت سفارش", date: "1402/10/12 - 10:30", completed: true },
            {
              step: "تأیید پرداخت",
              date: "1402/10/12 - 10:35",
              completed: true,
            },
            { step: "آماده‌سازی", date: "", completed: false },
            { step: "ارسال", date: "", completed: false },
            { step: "تحویل", date: "", completed: false },
          ],
          cancelReason: "درخواست کاربر",
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

// مدیریت سفارشات
const OrdersManager = {
  currentOrderId: null,

  loadOrders(filter = "all") {
    const tbody = document.getElementById("ordersTable");
    tbody.innerHTML = "";

    let filteredOrders = AdminPanelState.orders;
    if (filter !== "all") {
      filteredOrders = AdminPanelState.orders.filter(
        (order) => order.status === filter
      );
    }

    filteredOrders.forEach((order) => {
      const statusText = {
        pending: "در انتظار",
        processing: "در حال پردازش",
        shipped: "ارسال شده",
        completed: "تکمیل شده",
        cancelled: "لغو شده",
      };

      const statusClass = {
        pending: "warning",
        processing: "info",
        shipped: "primary",
        completed: "success",
        cancelled: "danger",
      };

      const row = document.createElement("tr");
      row.innerHTML = `
                        <td><strong>#${order.id}</strong></td>
                        <td>${order.userName}</td>
                        <td>${order.date}</td>
                        <td>${order.total.toLocaleString("fa-IR")} تومان</td>
                        <td>
                            <span class="badge bg-${statusClass[order.status]}">
                                ${statusText[order.status]}
                            </span>
                        </td>
                        <td>${order.paymentMethod}</td>
                        <td>
                            <button class="btn btn-sm btn-info me-1" onclick="OrdersManager.viewOrder('${
                              order.id
                            }')">
                                <i class="fas fa-eye"></i>
                                مشاهده
                            </button>
                            ${
                              order.status !== "cancelled" &&
                              order.status !== "completed"
                                ? `
                                <button class="btn btn-sm btn-warning" onclick="OrdersManager.cancelOrder('${order.id}')">
                                    <i class="fas fa-times"></i>
                                    لغو
                                </button>
                            `
                                : ""
                            }
                        </td>
                    `;
      tbody.appendChild(row);
    });
  },

  filterOrders(status) {
    document
      .querySelectorAll(".btn-group .btn")
      .forEach((btn) => btn.classList.remove("active"));
    event.target.classList.add("active");
    this.loadOrders(status);
  },

  viewOrder(orderId) {
    this.currentOrderId = orderId;
    const order = AdminPanelState.orders.find((o) => o.id === orderId);
    if (!order) return;

    const orderDetails = document.getElementById("orderDetails");
    orderDetails.innerHTML = `
                    <div class="row">
                        <div class="col-md-6">
                            <div class="order-details-section">
                                <h6>اطلاعات سفارش</h6>
                                <div class="row">
                                    <div class="col-6">
                                        <strong>شماره سفارش:</strong><br>#${
                                          order.id
                                        }
                                    </div>
                                    <div class="col-6">
                                        <strong>تاریخ سفارش:</strong><br>${
                                          order.date
                                        }
                                    </div>
                                    <div class="col-6 mt-2">
                                        <strong>مبلغ کل:</strong><br>${order.total.toLocaleString(
                                          "fa-IR"
                                        )} تومان
                                    </div>
                                    <div class="col-6 mt-2">
                                        <strong>روش پرداخت:</strong><br>${
                                          order.paymentMethod
                                        }
                                    </div>
                                    <div class="col-6 mt-2">
                                        <strong>وضعیت پرداخت:</strong><br>
                                        <span class="badge bg-${
                                          order.paymentStatus === "موفق"
                                            ? "success"
                                            : order.paymentStatus ===
                                              "در انتظار"
                                            ? "warning"
                                            : "danger"
                                        }">
                                            ${order.paymentStatus}
                                        </span>
                                    </div>
                                    <div class="col-6 mt-2">
                                        <strong>وضعیت سفارش:</strong><br>
                                        <select class="form-select" id="orderStatus">
                                            <option value="pending" ${
                                              order.status === "pending"
                                                ? "selected"
                                                : ""
                                            }>در انتظار</option>
                                            <option value="processing" ${
                                              order.status === "processing"
                                                ? "selected"
                                                : ""
                                            }>در حال پردازش</option>
                                            <option value="shipped" ${
                                              order.status === "shipped"
                                                ? "selected"
                                                : ""
                                            }>ارسال شده</option>
                                            <option value="completed" ${
                                              order.status === "completed"
                                                ? "selected"
                                                : ""
                                            }>تکمیل شده</option>
                                            <option value="cancelled" ${
                                              order.status === "cancelled"
                                                ? "selected"
                                                : ""
                                            }>لغو شده</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div class="order-details-section">
                                <h6>اطلاعات مشتری</h6>
                                <div class="row">
                                    <div class="col-6">
                                        <strong>نام مشتری:</strong><br>${
                                          order.userName
                                        }
                                    </div>
                                    <div class="col-6">
                                        <strong>تلفن:</strong><br>${
                                          order.userPhone
                                        }
                                    </div>
                                    <div class="col-12 mt-2">
                                        <strong>آدرس:</strong><br>${
                                          order.userAddress
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="order-details-section">
                                <h6>آیتم‌های سفارش</h6>
                                ${order.items
                                  .map(
                                    (item) => `
                                    <div class="order-item">
                                        <div>
                                            <strong>${item.productName}</strong>
                                            <br><small class="text-muted">تعداد: ${
                                              item.quantity
                                            }</small>
                                        </div>
                                        <div class="text-end">
                                            <div>${item.price.toLocaleString(
                                              "fa-IR"
                                            )} تومان</div>
                                            <small class="text-muted">مجموع: ${item.total.toLocaleString(
                                              "fa-IR"
                                            )} تومان</small>
                                        </div>
                                    </div>
                                `
                                  )
                                  .join("")}
                                <div class="order-item" style="border-top: 2px solid #ddd; font-weight: bold;">
                                    <div>جمع کل:</div>
                                    <div>${order.total.toLocaleString(
                                      "fa-IR"
                                    )} تومان</div>
                                </div>
                            </div>

                            <div class="order-details-section">
                                <h6>روند سفارش</h6>
                                <div class="order-timeline">
                                    ${order.timeline
                                      .map(
                                        (step, index) => `
                                        <div class="timeline-step ${
                                          step.completed
                                            ? "completed"
                                            : order.timeline[index - 1]
                                                ?.completed
                                            ? "current"
                                            : ""
                                        }">
                                            <div class="timeline-icon">
                                                <i class="fas ${
                                                  step.completed
                                                    ? "fa-check"
                                                    : order.timeline[index - 1]
                                                        ?.completed
                                                    ? "fa-spinner fa-spin"
                                                    : "fa-clock"
                                                }"></i>
                                            </div>
                                            <div class="timeline-content">
                                                <div>${step.step}</div>
                                                <small>${
                                                  step.date || "در انتظار"
                                                }</small>
                                            </div>
                                        </div>
                                    `
                                      )
                                      .join("")}
                                </div>
                            </div>

                            ${
                              order.cancelReason
                                ? `
                                <div class="order-details-section">
                                    <h6 class="text-danger">دلیل لغو سفارش</h6>
                                    <p>${order.cancelReason}</p>
                                </div>
                            `
                                : ""
                            }
                        </div>
                    </div>
                `;

    const modal = new bootstrap.Modal(document.getElementById("orderModal"));
    modal.show();
  },

  updateOrderStatus() {
    const orderId = this.currentOrderId;
    const newStatus = document.getElementById("orderStatus").value;

    const order = AdminPanelState.orders.find((o) => o.id === orderId);
    if (order) {
      order.status = newStatus;

      // به روزرسانی تایم‌لاین
      this.updateOrderTimeline(order, newStatus);

      AdminPanelState.saveToStorage();
      this.loadOrders();

      const modal = bootstrap.Modal.getInstance(
        document.getElementById("orderModal")
      );
      modal.hide();

      NotificationManager.show("وضعیت سفارش بروزرسانی شد", "success");
    }
  },

  updateOrderTimeline(order, newStatus) {
    const now = new Date();
    const dateString = `${now.getFullYear()}/${(now.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${now.getDate().toString().padStart(2, "0")} - ${now
      .getHours()
      .toString()
      .padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;

    switch (newStatus) {
      case "processing":
        order.timeline[2].completed = true;
        order.timeline[2].date = dateString;
        break;
      case "shipped":
        order.timeline[3].completed = true;
        order.timeline[3].date = dateString;
        break;
      case "completed":
        order.timeline[4].completed = true;
        order.timeline[4].date = dateString;
        break;
      case "cancelled":
        order.timeline.forEach((step) => (step.completed = false));
        order.timeline[0].completed = true;
        break;
    }
  },

  cancelOrder(orderId) {
    const reason = prompt("دلیل لغو سفارش را وارد کنید:", "درخواست کاربر");
    if (reason !== null) {
      const order = AdminPanelState.orders.find((o) => o.id === orderId);
      if (order) {
        order.status = "cancelled";
        order.cancelReason = reason || "دلیل مشخص نشده";
        order.paymentStatus = "لغو شده";

        // به روزرسانی تایم‌لاین
        order.timeline.forEach((step) => (step.completed = false));
        order.timeline[0].completed = true;

        AdminPanelState.saveToStorage();
        this.loadOrders();
        NotificationManager.show("سفارش با موفقیت لغو شد", "warning");
      }
    }
  },

  printInvoice() {
    window.print();
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

    // Navigation
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
  OrdersManager.loadOrders();

  // افزودن افکت fade-in به بخش سفارشات
  document.getElementById("ordersSection").classList.add("fade-in");
});
