// payments.js
class PaymentsManager {
  static userData = null;
  static paymentsData = null;
  static currentPage = 1;
  static itemsPerPage = 10;
  static currentFilter = "all";
  static selectedPayments = new Set();
  static paymentsChart = null;
  static typesChart = null;

  // مقداردهی اولیه
  static init() {
    console.log("🚀 Initializing Payments Manager...");

    this.loadUserData();
    this.setupEventListeners();
    this.loadPaymentsData();
    this.setupCharts();
    this.updateUserGreeting();
    this.renderPaymentsTable();

    console.log("✅ Payments Manager initialized successfully");
  }

  // بارگذاری داده‌های کاربر
  static loadUserData() {
    try {
      const savedData = localStorage.getItem("userPaymentsData");
      if (savedData) {
        this.userData = JSON.parse(savedData);
      } else {
        this.userData = this.getDefaultUserData();
        this.saveUserData();
      }
      console.log("📊 User data loaded:", this.userData);
    } catch (error) {
      console.error("❌ Error loading user data:", error);
      this.userData = this.getDefaultUserData();
    }
  }

  // داده‌های پیش‌فرض کاربر
  static getDefaultUserData() {
    return {
      profile: {
        firstName: "رضا",
        lastName: "موسوی",
        joinDate: "1404/05/10",
      },
      payments: {
        total: 12,
        successful: 10,
        pending: 1,
        failed: 1,
        totalAmount: 3450000,
      },
    };
  }

  // بارگذاری داده‌های پرداخت
  static loadPaymentsData() {
    try {
      const savedData = localStorage.getItem("paymentsData");
      if (savedData) {
        this.paymentsData = JSON.parse(savedData);
      } else {
        this.paymentsData = this.generateSampleData();
        this.savePaymentsData();
      }
      console.log("💳 Payments data loaded:", this.paymentsData);
    } catch (error) {
      console.error("❌ Error loading payments data:", error);
      this.paymentsData = this.generateSampleData();
    }
  }

  // تولید داده‌های نمونه
  static generateSampleData() {
    const types = ["course", "product", "subscription", "wallet"];
    const statuses = ["successful", "pending", "failed", "refunded"];
    const gateways = ["زرین پال", "ملت", "سامان", "پارسیان", "سداد"];

    const payments = [];
    const now = new Date();

    for (let i = 1; i <= 50; i++) {
      const type = types[Math.floor(Math.random() * types.length)];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const amount = Math.floor(Math.random() * 500000) + 50000;
      const daysAgo = Math.floor(Math.random() * 365);
      const date = new Date(now);
      date.setDate(date.getDate() - daysAgo);

      payments.push({
        id: `TXN${1000 + i}`,
        date: date.toLocaleDateString("fa-IR"),
        time: date.toLocaleTimeString("fa-IR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        amount: amount,
        type: type,
        status: status,
        gateway: gateways[Math.floor(Math.random() * gateways.length)],
        description: this.getPaymentDescription(type),
        items: this.generatePaymentItems(type),
        refundable: status === "successful" && Math.random() > 0.7,
      });
    }

    // مرتب‌سازی بر اساس تاریخ (جدیدترین اول)
    payments.sort((a, b) => new Date(b.date) - new Date(a.date));

    return {
      payments: payments,
      stats: this.calculateStats(payments),
      charts: this.generateChartData(payments),
    };
  }

  // تولید توضیحات پرداخت
  static getPaymentDescription(type) {
    const descriptions = {
      course: "خرید دوره آموزشی",
      product: "خرید محصول کشاورزی",
      subscription: "تمدید اشتراک پریمیوم",
      wallet: "شارژ کیف پول",
    };
    return descriptions[type] || "تراکنش مالی";
  }

  // تولید آیتم‌های پرداخت
  static generatePaymentItems(type) {
    const items = {
      course: [
        "دوره آموزش کشاورزی مدرن",
        "دوره پرورش قارچ",
        "آموزش کشت هیدروپونیک",
      ],
      product: ["بذر گوجه فرنگی", "کود ارگانیک", "سموم طبیعی"],
      subscription: ["اشتراک ۱ ماهه", "اشتراک ۳ ماهه", "اشتراک سالانه"],
      wallet: ["شارژ کیف پول"],
    };

    const itemList = items[type] || ["آیتم نامشخص"];
    return [itemList[Math.floor(Math.random() * itemList.length)]];
  }

  // محاسبه آمار
  static calculateStats(payments) {
    const stats = {
      total: payments.length,
      successful: payments.filter((p) => p.status === "successful").length,
      pending: payments.filter((p) => p.status === "pending").length,
      failed: payments.filter((p) => p.status === "failed").length,
      refunded: payments.filter((p) => p.status === "refunded").length,
      totalAmount: payments
        .filter((p) => p.status === "successful")
        .reduce((sum, p) => sum + p.amount, 0),
    };

    return stats;
  }

  // تولید داده‌های نمودار
  static generateChartData(payments) {
    const months = ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور"];
    const types = ["course", "product", "subscription", "wallet"];

    const monthlyData = months.map((month) => ({
      month,
      amount: Math.floor(Math.random() * 1000000) + 500000,
      count: Math.floor(Math.random() * 20) + 5,
    }));

    const typeData = types.map((type) => ({
      type,
      count: payments.filter((p) => p.type === type).length,
      amount: payments
        .filter((p) => p.type === type)
        .reduce((sum, p) => sum + p.amount, 0),
    }));

    return { monthlyData, typeData };
  }

  // ذخیره داده‌ها
  static saveUserData() {
    try {
      localStorage.setItem("userPaymentsData", JSON.stringify(this.userData));
      return true;
    } catch (error) {
      console.error("❌ Error saving user data:", error);
      return false;
    }
  }

  static savePaymentsData() {
    try {
      localStorage.setItem("paymentsData", JSON.stringify(this.paymentsData));
      return true;
    } catch (error) {
      console.error("❌ Error saving payments data:", error);
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

    // جستجو
    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
      searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          this.searchPayments();
        }
      });
    }

    // بازه تاریخ سفارشی
    const dateFilter = document.getElementById("dateFilter");
    if (dateFilter) {
      dateFilter.addEventListener("change", (e) => {
        this.toggleCustomDateRange(e.target.value === "custom");
      });
    }

    console.log("🎯 Event listeners setup completed");
  }

  // رندر جدول پرداخت‌ها
  static renderPaymentsTable() {
    this.updateStats();
    this.renderTableBody();
    this.renderPagination();
    this.updateSelectedActions();
  }

  // بروزرسانی آمار
  static updateStats() {
    if (!this.paymentsData?.stats) return;

    const stats = this.paymentsData.stats;

    document.getElementById("totalPayments").textContent =
      stats.total.toLocaleString("fa-IR");
    document.getElementById("successfulPayments").textContent =
      stats.successful.toLocaleString("fa-IR");
    document.getElementById("pendingPayments").textContent =
      stats.pending.toLocaleString("fa-IR");
    document.getElementById("failedPayments").textContent =
      stats.failed.toLocaleString("fa-IR");
  }

  // رندر بدنه جدول
  static renderTableBody() {
    const tbody = document.getElementById("paymentsTableBody");
    if (!tbody) return;

    const filteredData = this.getFilteredData();
    const paginatedData = this.getPaginatedData(filteredData);

    tbody.innerHTML = paginatedData
      .map(
        (payment) => `
            <tr class="fade-in-up">
                <td>
                    <input type="checkbox" class="form-check-input payment-checkbox" 
                           value="${
                             payment.id
                           }" onchange="PaymentsManager.togglePaymentSelection('${
          payment.id
        }')">
                </td>
                <td>
                    <strong>${payment.id}</strong>
                </td>
                <td>
                    <div>${payment.date}</div>
                    <small class="text-muted">${payment.time}</small>
                </td>
                <td>
                    <strong class="${
                      payment.status === "successful"
                        ? "text-success"
                        : "text-muted"
                    }">
                        ${payment.amount.toLocaleString("fa-IR")}
                    </strong>
                </td>
                <td>
                    <span class="type-badge type-${payment.type}">
                        ${this.getTypeLabel(payment.type)}
                    </span>
                </td>
                <td>
                    <span class="status-badge status-${payment.status}">
                        ${this.getStatusLabel(payment.status)}
                    </span>
                </td>
                <td>${payment.gateway}</td>
                <td>
                    <div class="btn-group btn-group-sm">
                        <button class="btn btn-outline-primary btn-action" 
                                onclick="PaymentsManager.viewPaymentDetails('${
                                  payment.id
                                }')"
                                title="مشاهده جزئیات">
                            <i class="fas fa-eye"></i>
                        </button>
                        ${
                          payment.refundable
                            ? `
                        <button class="btn btn-outline-warning btn-action" 
                                onclick="PaymentsManager.requestRefund('${payment.id}')"
                                title="درخواست عودت">
                            <i class="fas fa-undo"></i>
                        </button>
                        `
                            : ""
                        }
                        <button class="btn btn-outline-info btn-action" 
                                onclick="PaymentsManager.downloadReceipt('${
                                  payment.id
                                }')"
                                title="دانلود فاکتور">
                            <i class="fas fa-receipt"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `
      )
      .join("");

    this.updatePaginationInfo(filteredData.length);
  }

  // دریافت داده‌های فیلتر شده
  static getFilteredData() {
    if (!this.paymentsData?.payments) return [];

    let filtered = [...this.paymentsData.payments];

    // فیلتر وضعیت
    const statusFilter = document.getElementById("statusFilter")?.value;
    if (statusFilter && statusFilter !== "all") {
      filtered = filtered.filter((p) => p.status === statusFilter);
    }

    // فیلتر نوع
    const typeFilter = document.getElementById("typeFilter")?.value;
    if (typeFilter && typeFilter !== "all") {
      filtered = filtered.filter((p) => p.type === typeFilter);
    }

    // فیلتر تاریخ
    const dateFilter = document.getElementById("dateFilter")?.value;
    if (dateFilter && dateFilter !== "all") {
      filtered = this.filterByDate(filtered, dateFilter);
    }

    // جستجو
    const searchTerm = document
      .getElementById("searchInput")
      ?.value.toLowerCase();
    if (searchTerm) {
      filtered = filtered.filter(
        (p) =>
          p.id.toLowerCase().includes(searchTerm) ||
          p.description.toLowerCase().includes(searchTerm) ||
          p.gateway.toLowerCase().includes(searchTerm)
      );
    }

    return filtered;
  }

  // فیلتر بر اساس تاریخ
  static filterByDate(payments, period) {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    switch (period) {
      case "today":
        return payments.filter((p) => {
          const paymentDate = new Date(p.date);
          return paymentDate >= today;
        });
      case "week":
        const weekAgo = new Date(today);
        weekAgo.setDate(weekAgo.getDate() - 7);
        return payments.filter((p) => {
          const paymentDate = new Date(p.date);
          return paymentDate >= weekAgo;
        });
      case "month":
        const monthAgo = new Date(today);
        monthAgo.setMonth(monthAgo.getMonth() - 1);
        return payments.filter((p) => {
          const paymentDate = new Date(p.date);
          return paymentDate >= monthAgo;
        });
      case "year":
        const yearAgo = new Date(today);
        yearAgo.setFullYear(yearAgo.getFullYear() - 1);
        return payments.filter((p) => {
          const paymentDate = new Date(p.date);
          return paymentDate >= yearAgo;
        });
      case "custom":
        const startDate = document.getElementById("startDate")?.value;
        const endDate = document.getElementById("endDate")?.value;
        if (startDate && endDate) {
          return payments.filter((p) => {
            const paymentDate = new Date(p.date);
            return (
              paymentDate >= new Date(startDate) &&
              paymentDate <= new Date(endDate)
            );
          });
        }
        return payments;
      default:
        return payments;
    }
  }

  // دریافت داده‌های صفحه‌بندی شده
  static getPaginatedData(data) {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return data.slice(startIndex, endIndex);
  }

  // رندر صفحه‌بندی
  static renderPagination() {
    const pagination = document.getElementById("pagination");
    if (!pagination) return;

    const filteredData = this.getFilteredData();
    const totalPages = Math.ceil(filteredData.length / this.itemsPerPage);

    if (totalPages <= 1) {
      pagination.innerHTML = "";
      return;
    }

    let paginationHTML = "";

    // دکمه قبلی
    paginationHTML += `
            <li class="page-item ${this.currentPage === 1 ? "disabled" : ""}">
                <a class="page-link" href="#" onclick="PaymentsManager.changePage(${
                  this.currentPage - 1
                })">
                    <i class="fas fa-chevron-right"></i>
                </a>
            </li>
        `;

    // صفحات
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= this.currentPage - 2 && i <= this.currentPage + 2)
      ) {
        paginationHTML += `
                    <li class="page-item ${
                      i === this.currentPage ? "active" : ""
                    }">
                        <a class="page-link" href="#" onclick="PaymentsManager.changePage(${i})">${i}</a>
                    </li>
                `;
      } else if (i === this.currentPage - 3 || i === this.currentPage + 3) {
        paginationHTML += `<li class="page-item disabled"><span class="page-link">...</span></li>`;
      }
    }

    // دکمه بعدی
    paginationHTML += `
            <li class="page-item ${
              this.currentPage === totalPages ? "disabled" : ""
            }">
                <a class="page-link" href="#" onclick="PaymentsManager.changePage(${
                  this.currentPage + 1
                })">
                    <i class="fas fa-chevron-left"></i>
                </a>
            </li>
        `;

    pagination.innerHTML = paginationHTML;
  }

  // تغییر صفحه
  static changePage(page) {
    const filteredData = this.getFilteredData();
    const totalPages = Math.ceil(filteredData.length / this.itemsPerPage);

    if (page < 1 || page > totalPages) return;

    this.currentPage = page;
    this.renderPaymentsTable();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // بروزرسانی اطلاعات صفحه‌بندی
  static updatePaginationInfo(totalItems) {
    const startResult = (this.currentPage - 1) * this.itemsPerPage + 1;
    const endResult = Math.min(
      this.currentPage * this.itemsPerPage,
      totalItems
    );

    document.getElementById("startResult").textContent =
      startResult.toLocaleString("fa-IR");
    document.getElementById("endResult").textContent =
      endResult.toLocaleString("fa-IR");
    document.getElementById("totalResults").textContent =
      totalItems.toLocaleString("fa-IR");
  }

  // مدیریت انتخاب پرداخت‌ها
  static toggleSelectAll(checkbox) {
    const checkboxes = document.querySelectorAll(".payment-checkbox");
    checkboxes.forEach((cb) => {
      cb.checked = checkbox.checked;
      this.togglePaymentSelection(cb.value, cb.checked);
    });
  }

  static togglePaymentSelection(paymentId, isChecked = null) {
    const checkbox = document.querySelector(
      `.payment-checkbox[value="${paymentId}"]`
    );
    const checked = isChecked !== null ? isChecked : checkbox?.checked;

    if (checked) {
      this.selectedPayments.add(paymentId);
    } else {
      this.selectedPayments.delete(paymentId);
    }

    this.updateSelectAllCheckbox();
    this.updateSelectedActions();
  }

  static updateSelectAllCheckbox() {
    const selectAll = document.getElementById("selectAll");
    const checkboxes = document.querySelectorAll(".payment-checkbox");

    if (checkboxes.length === 0) {
      selectAll.checked = false;
      selectAll.indeterminate = false;
      return;
    }

    const checkedCount = document.querySelectorAll(
      ".payment-checkbox:checked"
    ).length;

    if (checkedCount === 0) {
      selectAll.checked = false;
      selectAll.indeterminate = false;
    } else if (checkedCount === checkboxes.length) {
      selectAll.checked = true;
      selectAll.indeterminate = false;
    } else {
      selectAll.checked = false;
      selectAll.indeterminate = true;
    }
  }

  static updateSelectedActions() {
    const actionsCard = document.getElementById("selectedActions");
    const selectedCount = document.getElementById("selectedCount");

    if (this.selectedPayments.size > 0) {
      actionsCard.style.display = "block";
      selectedCount.textContent =
        this.selectedPayments.size.toLocaleString("fa-IR");
    } else {
      actionsCard.style.display = "none";
    }
  }

  // فیلتر پرداخت‌ها
  static filterPayments() {
    this.currentPage = 1;
    this.selectedPayments.clear();
    this.renderPaymentsTable();
  }

  // جستجوی پرداخت‌ها
  static searchPayments() {
    this.currentPage = 1;
    this.renderPaymentsTable();
  }

  // نمایش/مخفی کردن بازه تاریخ سفارشی
  static toggleCustomDateRange(show) {
    const dateRange = document.getElementById("customDateRange");
    if (dateRange) {
      dateRange.style.display = show ? "block" : "none";
    }
  }

  // تنظیم نمودارها
  static setupCharts() {
    this.setupPaymentsChart();
    this.setupTypesChart();
  }

  static setupPaymentsChart() {
    const ctx = document.getElementById("paymentsChart");
    if (!ctx || !this.paymentsData?.charts) return;

    const data = this.paymentsData.charts.monthlyData;

    this.paymentsChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: data.map((d) => d.month),
        datasets: [
          {
            label: "مبلغ پرداخت‌ها (تومان)",
            data: data.map((d) => d.amount),
            backgroundColor: "rgba(46, 125, 50, 0.6)",
            borderColor: "rgba(46, 125, 50, 1)",
            borderWidth: 1,
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
              text: "ماه",
            },
          },
          y: {
            display: true,
            title: {
              display: true,
              text: "مبلغ (تومان)",
            },
            beginAtZero: true,
          },
        },
      },
    });
  }

  static setupTypesChart() {
    const ctx = document.getElementById("paymentTypesChart");
    if (!ctx || !this.paymentsData?.charts) return;

    const data = this.paymentsData.charts.typeData;

    this.typesChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: data.map((d) => this.getTypeLabel(d.type)),
        datasets: [
          {
            data: data.map((d) => d.count),
            backgroundColor: [
              "rgba(33, 150, 243, 0.6)",
              "rgba(76, 175, 80, 0.6)",
              "rgba(255, 152, 0, 0.6)",
              "rgba(156, 39, 176, 0.6)",
            ],
            borderColor: [
              "rgba(33, 150, 243, 1)",
              "rgba(76, 175, 80, 1)",
              "rgba(255, 152, 0, 1)",
              "rgba(156, 39, 176, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: "bottom",
            rtl: true,
          },
        },
      },
    });
  }

  // بروزرسانی نمودار
  static updateChart(type) {
    if (!this.paymentsChart || !this.paymentsData?.charts) return;

    const data = this.paymentsData.charts.monthlyData;

    if (type === "amount") {
      this.paymentsChart.data.datasets[0].data = data.map((d) => d.amount);
      this.paymentsChart.data.datasets[0].label = "مبلغ پرداخت‌ها (تومان)";
    } else {
      this.paymentsChart.data.datasets[0].data = data.map((d) => d.count);
      this.paymentsChart.data.datasets[0].label = "تعداد پرداخت‌ها";
    }

    this.paymentsChart.update();
  }

  // مشاهده جزئیات پرداخت
  static viewPaymentDetails(paymentId) {
    const payment = this.paymentsData.payments.find((p) => p.id === paymentId);
    if (!payment) return;

    const modalContent = document.getElementById("paymentDetailsContent");
    if (modalContent) {
      modalContent.innerHTML = `
                <div class="row">
                    <div class="col-md-6">
                        <h6>اطلاعات پایه</h6>
                        <table class="table table-bordered">
                            <tr>
                                <td>شناسه تراکنش</td>
                                <td><strong>${payment.id}</strong></td>
                            </tr>
                            <tr>
                                <td>تاریخ و زمان</td>
                                <td>${payment.date} - ${payment.time}</td>
                            </tr>
                            <tr>
                                <td>مبلغ</td>
                                <td><strong class="text-success">${payment.amount.toLocaleString(
                                  "fa-IR"
                                )} تومان</strong></td>
                            </tr>
                            <tr>
                                <td>وضعیت</td>
                                <td><span class="status-badge status-${
                                  payment.status
                                }">${this.getStatusLabel(
        payment.status
      )}</span></td>
                            </tr>
                        </table>
                    </div>
                    <div class="col-md-6">
                        <h6>اطلاعات تکمیلی</h6>
                        <table class="table table-bordered">
                            <tr>
                                <td>درگاه پرداخت</td>
                                <td>${payment.gateway}</td>
                            </tr>
                            <tr>
                                <td>نوع تراکنش</td>
                                <td>${this.getTypeLabel(payment.type)}</td>
                            </tr>
                            <tr>
                                <td>توضیحات</td>
                                <td>${payment.description}</td>
                            </tr>
                            <tr>
                                <td>قابلیت عودت</td>
                                <td>${
                                  payment.refundable ? "✅ دارد" : "❌ ندارد"
                                }</td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-12">
                        <h6>آیتم‌های خریداری شده</h6>
                        <ul class="list-group">
                            ${payment.items
                              .map(
                                (item) => `
                                <li class="list-group-item">${item}</li>
                            `
                              )
                              .join("")}
                        </ul>
                    </div>
                </div>
            `;
    }

    const modal = new bootstrap.Modal(
      document.getElementById("paymentDetailsModal")
    );
    modal.show();
  }

  // دریافت لیبل وضعیت
  static getStatusLabel(status) {
    const labels = {
      successful: "موفق",
      pending: "در انتظار",
      failed: "ناموفق",
      refunded: "عودت شده",
    };
    return labels[status] || status;
  }

  // دریافت لیبل نوع
  static getTypeLabel(type) {
    const labels = {
      course: "دوره آموزشی",
      product: "محصول",
      subscription: "اشتراک",
      wallet: "کیف پول",
    };
    return labels[type] || type;
  }

  // سایر متدهای utility
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

  // actions
  static downloadReport() {
    this.showNotification("در حال آماده‌سازی گزارش...", "info");
    // منطق دانلود گزارش
  }

  static printPage() {
    window.print();
  }

  static exportToExcel() {
    this.showNotification("در حال آماده‌سازی فایل Excel...", "info");
    // منطق خروجی Excel
  }

  static refreshData() {
    this.loadPaymentsData();
    this.renderPaymentsTable();
    this.showNotification("داده‌ها بروزرسانی شد", "success");
  }

  static toggleView() {
    this.showNotification("تغییر نمای جدول", "info");
    // منطق تغییر نمای جدول/کارتی
  }

  static deleteSelected() {
    if (this.selectedPayments.size === 0) return;

    if (
      confirm(
        `آیا از حذف ${this.selectedPayments.size} پرداخت انتخاب شده اطمینان دارید؟`
      )
    ) {
      this.paymentsData.payments = this.paymentsData.payments.filter(
        (p) => !this.selectedPayments.has(p.id)
      );
      this.savePaymentsData();
      this.selectedPayments.clear();
      this.renderPaymentsTable();
      this.showNotification("پرداخت‌های انتخاب شده حذف شدند", "success");
    }
  }

  static clearSelection() {
    this.selectedPayments.clear();
    this.renderPaymentsTable();
  }

  static requestRefund(paymentId) {
    if (confirm("آیا از درخواست عودت این پرداخت اطمینان دارید؟")) {
      this.showNotification("درخواست عودت با موفقیت ثبت شد", "success");
      // منطق درخواست عودت
    }
  }

  static downloadReceipt(paymentId) {
    this.showNotification("در حال دانلود فاکتور...", "info");
    // منطق دانلود فاکتور
  }

  static viewAllTransactions() {
    this.showNotification("در حال بارگذاری همه تراکنش‌ها...", "info");
    // منطق مشاهده همه تراکنش‌ها
  }

  static redirectToShop() {
    this.showNotification("در حال انتقال به فروشگاه...", "info");
  }

  static showLogoutModal() {
    const modal = new bootstrap.Modal(document.getElementById("logoutModal"));
    modal.show();
  }

  static confirmLogout() {
    this.showNotification("در حال خروج از حساب کاربری...", "warning");
    setTimeout(() => {
      window.location.href = "login.html";
    }, 1500);
  }

  static showNotification(message, type = "info") {
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
}

// مقداردهی اولیه
document.addEventListener("DOMContentLoaded", function () {
  PaymentsManager.init();
});

// رفرش خودکار هر 5 دقیقه
setInterval(() => {
  PaymentsManager.refreshData();
}, 300000);
