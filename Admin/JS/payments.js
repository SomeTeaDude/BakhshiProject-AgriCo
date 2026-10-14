const AdminPanelState = {
  payments: [],
  products: [],
  users: [],

  init() {
    this.loadFromStorage();
    if (this.payments.length === 0) {
      this.payments = [...this.getMockPayments()];
    }
    this.saveToStorage();
    this.updatePaymentStats();
  },

  loadFromStorage() {
    const savedData = localStorage.getItem("adminData");
    if (savedData) {
      const data = JSON.parse(savedData);
      this.payments = data.payments || [];
      this.products = data.products || [];
      this.users = data.users || [];
    }
  },

  saveToStorage() {
    const data = {
      payments: this.payments,
      products: this.products,
      users: this.users,
    };
    localStorage.setItem("adminData", JSON.stringify(data));
  },

  getMockPayments() {
    return [
      {
        id: "PAY001",
        userId: 1,
        userName: "علی احمدی",
        userEmail: "ali@example.com",
        userPhone: "09123456789",
        productId: 1,
        productName: "بذر گوجه فرنگی",
        productCategory: "seeds",
        date: "1402/09/20",
        time: "14:30",
        amount: 125000,
        status: "successful",
        paymentMethod: "کارت به کارت",
        transactionId: "TRX123456789",
        refundable: true,
        refunded: false,
      },
      {
        id: "PAY002",
        userId: 2,
        userName: "سارا محمدی",
        userEmail: "sara@example.com",
        userPhone: "09129876543",
        productId: 2,
        productName: "کود آلی کمپوست",
        productCategory: "fertilizer",
        date: "1402/09/19",
        time: "10:15",
        amount: 35000,
        status: "successful",
        paymentMethod: "درگاه پرداخت",
        transactionId: "TRX987654321",
        refundable: true,
        refunded: false,
      },
      {
        id: "PAY003",
        userId: 3,
        userName: "محمد رضایی",
        userEmail: "mohammad@example.com",
        userPhone: "09121112233",
        productId: 3,
        productName: "دوره آموزشی کشاورزی مدرن",
        productCategory: "courses",
        date: "1402/09/18",
        time: "16:45",
        amount: 250000,
        status: "successful",
        paymentMethod: "درگاه پرداخت",
        transactionId: "TRX456789123",
        refundable: true,
        refunded: true,
      },
      {
        id: "PAY004",
        userId: 4,
        userName: "فاطمه کریمی",
        userEmail: "fatemeh@example.com",
        userPhone: "09123334455",
        productId: 4,
        productName: "بیل باغبانی",
        productCategory: "tools",
        date: "1402/09/17",
        time: "09:20",
        amount: 85000,
        status: "failed",
        paymentMethod: "درگاه پرداخت",
        transactionId: "TRX789123456",
        refundable: false,
        refunded: false,
      },
      {
        id: "PAY005",
        userId: 5,
        userName: "رضا حسینی",
        userEmail: "reza@example.com",
        userPhone: "09125556677",
        productId: 5,
        productName: "نهال سیب",
        productCategory: "saplings",
        date: "1402/09/16",
        time: "11:30",
        amount: 45000,
        status: "pending",
        paymentMethod: "کارت به کارت",
        transactionId: "TRX321654987",
        refundable: false,
        refunded: false,
      },
    ];
  },

  updatePaymentStats() {
    const totalPayments = this.payments.length;
    const successfulPayments = this.payments.filter(
      (p) => p.status === "successful"
    ).length;
    const failedPayments = this.payments.filter(
      (p) => p.status === "failed"
    ).length;
    const refundedPayments = this.payments.filter((p) => p.refunded).length;

    document.getElementById("totalPayments").textContent = totalPayments;
    document.getElementById("successfulPayments").textContent =
      successfulPayments;
    document.getElementById("failedPayments").textContent = failedPayments;
    document.getElementById("refundedPayments").textContent = refundedPayments;
  },

  logout() {
    if (confirm("آیا می‌خواهید از پنل خارج شوید؟")) {
      localStorage.removeItem("isLoggedIn");
      alert("با موفقیت خارج شدید!");
      // window.location.href = 'shop.html'; // لینک به صفحه فروشگاه اصلی
    }
  },
};

// مدیریت صفحه پرداخت
const PaymentsManager = {
  init() {
    this.renderPayments();
    this.setupEventListeners();
  },

  renderPayments(payments = AdminPanelState.payments) {
    const paymentsList = document.getElementById("paymentsList");
    paymentsList.innerHTML = "";

    if (payments.length === 0) {
      paymentsList.innerHTML = `
              <div class="text-center py-5">
                <i class="fas fa-receipt fa-3x text-muted mb-3"></i>
                <p class="text-muted">هیچ پرداختی یافت نشد.</p>
              </div>
            `;
      return;
    }

    payments.forEach((payment) => {
      const statusClass = this.getStatusClass(payment.status);
      const categoryBadge = this.getCategoryBadge(payment.productCategory);

      const paymentCard = document.createElement("div");
      paymentCard.className = "payment-card";
      paymentCard.innerHTML = `
              <div class="row align-items-center">
                <div class="col-md-2 mb-3 mb-md-0">
                  <div class="d-flex align-items-center">
                    <div class="me-3">
                      <i class="fas fa-receipt fa-2x text-muted"></i>
                    </div>
                    <div>
                      <h6 class="mb-1">${payment.id}</h6>
                      <small class="text-muted">شناسه پرداخت</small>
                    </div>
                  </div>
                </div>
                <div class="col-md-3 mb-3 mb-md-0">
                  <h6 class="mb-1">${payment.userName}</h6>
                  <small class="text-muted">${payment.userEmail}</small>
                </div>
                <div class="col-md-2 mb-3 mb-md-0">
                  <h6 class="mb-1">${payment.productName}</h6>
                  <span class="badge-category ${categoryBadge.class}">${
        categoryBadge.text
      }</span>
                </div>
                <div class="col-md-2 mb-3 mb-md-0">
                  <h6 class="mb-1">${payment.amount.toLocaleString(
                    "fa-IR"
                  )} تومان</h6>
                  <small class="text-muted">${payment.date} - ${
        payment.time
      }</small>
                </div>
                <div class="col-md-2 mb-3 mb-md-0">
                  <span class="payment-status ${statusClass}">${this.getStatusText(
        payment.status
      )}</span>
                  ${
                    payment.refunded
                      ? '<span class="payment-status status-refunded mt-1 d-block">عودت داده شده</span>'
                      : ""
                  }
                </div>
                <div class="col-md-1 text-start">
                  <div class="dropdown">
                    <button class="btn btn-sm btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                      <i class="fas fa-ellipsis-v"></i>
                    </button>
                    <ul class="dropdown-menu">
                      <li><a class="dropdown-item" href="#" onclick="PaymentsManager.showPaymentDetails('${
                        payment.id
                      }')"><i class="fas fa-eye me-2"></i>مشاهده جزئیات</a></li>
                      ${
                        payment.status === "successful" &&
                        payment.refundable &&
                        !payment.refunded
                          ? `<li><a class="dropdown-item text-warning" href="#" onclick="PaymentsManager.refundPayment('${payment.id}')"><i class="fas fa-exchange-alt me-2"></i>عودت وجه</a></li>`
                          : ""
                      }
                      <li><a class="dropdown-item text-danger" href="#" onclick="PaymentsManager.deletePayment('${
                        payment.id
                      }')"><i class="fas fa-trash me-2"></i>حذف</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            `;
      paymentsList.appendChild(paymentCard);
    });
  },

  getStatusClass(status) {
    switch (status) {
      case "successful":
        return "status-success";
      case "failed":
        return "status-failed";
      case "pending":
        return "status-pending";
      case "refunded":
        return "status-refunded";
      default:
        return "";
    }
  },

  getStatusText(status) {
    switch (status) {
      case "successful":
        return "موفق";
      case "failed":
        return "ناموفق";
      case "pending":
        return "در انتظار";
      case "refunded":
        return "عودت داده شده";
      default:
        return status;
    }
  },

  getCategoryBadge(category) {
    switch (category) {
      case "seeds":
        return { class: "badge-seeds", text: "بذر" };
      case "fertilizer":
        return { class: "badge-fertilizer", text: "کود" };
      case "tools":
        return { class: "badge-tools", text: "ادوات" };
      case "courses":
        return { class: "badge-courses", text: "دوره" };
      case "saplings":
        return { class: "badge-saplings", text: "نهال" };
      default:
        return { class: "", text: category };
    }
  },

  showPaymentDetails(paymentId) {
    const payment = AdminPanelState.payments.find((p) => p.id === paymentId);
    if (!payment) return;

    const modalContent = document.getElementById("paymentDetailsContent");
    modalContent.innerHTML = `
            <div class="row">
              <div class="col-md-6">
                <h6>اطلاعات پرداخت</h6>
                <div class="payment-details">
                  <p><strong>شناسه پرداخت:</strong> ${payment.id}</p>
                  <p><strong>مبلغ:</strong> ${payment.amount.toLocaleString(
                    "fa-IR"
                  )} تومان</p>
                  <p><strong>تاریخ و زمان:</strong> ${payment.date} - ${
      payment.time
    }</p>
                  <p><strong>وضعیت:</strong> <span class="payment-status ${this.getStatusClass(
                    payment.status
                  )}">${this.getStatusText(payment.status)}</span></p>
                  <p><strong>روش پرداخت:</strong> ${payment.paymentMethod}</p>
                  <p><strong>شناسه تراکنش:</strong> ${payment.transactionId}</p>
                  <p><strong>قابلیت عودت:</strong> ${
                    payment.refundable ? "دارد" : "ندارد"
                  }</p>
                  <p><strong>عودت داده شده:</strong> ${
                    payment.refunded ? "بله" : "خیر"
                  }</p>
                </div>
              </div>
              <div class="col-md-6">
                <h6>اطلاعات کاربر</h6>
                <div class="payment-details">
                  <p><strong>نام و نام خانوادگی:</strong> ${
                    payment.userName
                  }</p>
                  <p><strong>ایمیل:</strong> ${payment.userEmail}</p>
                  <p><strong>شماره تماس:</strong> ${payment.userPhone}</p>
                </div>
                
                <h6 class="mt-4">اطلاعات محصول</h6>
                <div class="payment-details">
                  <p><strong>نام محصول:</strong> ${payment.productName}</p>
                  <p><strong>دسته‌بندی:</strong> <span class="badge-category ${
                    this.getCategoryBadge(payment.productCategory).class
                  }">${
      this.getCategoryBadge(payment.productCategory).text
    }</span></p>
                </div>
              </div>
            </div>
          `;

    const modal = new bootstrap.Modal(
      document.getElementById("paymentDetailsModal")
    );
    modal.show();
  },

  refundPayment(paymentId) {
    if (confirm("آیا از عودت این پرداخت اطمینان دارید؟")) {
      const paymentIndex = AdminPanelState.payments.findIndex(
        (p) => p.id === paymentId
      );
      if (paymentIndex !== -1) {
        AdminPanelState.payments[paymentIndex].refunded = true;
        AdminPanelState.payments[paymentIndex].status = "refunded";
        AdminPanelState.saveToStorage();
        AdminPanelState.updatePaymentStats();
        this.renderPayments();
        alert("پرداخت با موفقیت عودت داده شد.");
      }
    }
  },

  deletePayment(paymentId) {
    if (confirm("آیا از حذف این پرداخت اطمینان دارید؟")) {
      AdminPanelState.payments = AdminPanelState.payments.filter(
        (p) => p.id !== paymentId
      );
      AdminPanelState.saveToStorage();
      AdminPanelState.updatePaymentStats();
      this.renderPayments();
      alert("پرداخت با موفقیت حذف شد.");
    }
  },

  setupEventListeners() {
    // Apply filters
    document.getElementById("applyFilters").addEventListener("click", () => {
      this.applyFilters();
    });

    // Reset filters
    document.getElementById("resetFilters").addEventListener("click", () => {
      this.resetFilters();
    });

    // Export button
    document.getElementById("exportBtn").addEventListener("click", () => {
      this.exportToExcel();
    });

    // Print details
    document.getElementById("printDetailsBtn").addEventListener("click", () => {
      window.print();
    });
  },

  applyFilters() {
    const statusFilter = document.getElementById("statusFilter").value;
    const categoryFilter = document.getElementById("categoryFilter").value;
    const dateFrom = document.getElementById("dateFrom").value;
    const dateTo = document.getElementById("dateTo").value;

    let filteredPayments = [...AdminPanelState.payments];

    if (statusFilter !== "all") {
      filteredPayments = filteredPayments.filter(
        (p) => p.status === statusFilter
      );
    }

    if (categoryFilter !== "all") {
      filteredPayments = filteredPayments.filter(
        (p) => p.productCategory === categoryFilter
      );
    }

    // Note: Date filtering would require proper date conversion for the Persian calendar
    // This is a simplified version

    this.renderPayments(filteredPayments);
  },

  resetFilters() {
    document.getElementById("statusFilter").value = "all";
    document.getElementById("categoryFilter").value = "all";
    document.getElementById("dateFrom").value = "";
    document.getElementById("dateTo").value = "";
    this.renderPayments();
  },

  exportToExcel() {
    alert("خروجی Excel در حال تولید است...");
    // In a real application, this would generate and download an Excel file
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
        if (this.getAttribute("href") === "#") {
          e.preventDefault();
          const section = this.dataset.section;
          if (section && section !== "payments") {
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
  PaymentsManager.init();

  // افزودن افکت fade-in به بخش پرداخت
  document.getElementById("paymentsSection").classList.add("fade-in");
});
