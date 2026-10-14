// مدیریت محصولات
const ProductsManager = {
  productsData: null,

  // مقداردهی اولیه
  init() {
    this.loadProductsData();
    this.renderProducts();
    this.renderPopularProducts();
    this.setupEventListeners();
    this.setupSidebar();
  },

  // بارگذاری داده‌های محصولات
  loadProductsData() {
    const savedData = localStorage.getItem("userProductsData");

    if (savedData) {
      try {
        this.productsData = JSON.parse(savedData);
      } catch (error) {
        console.error("Error parsing products data:", error);
        this.productsData = this.getDefaultProductsData();
      }
    } else {
      this.productsData = this.getDefaultProductsData();
    }

    this.saveProductsData();
  },

  // داده‌های پیش‌فرض محصولات
  getDefaultProductsData() {
    return {
      products: [
        {
          id: 101,
          name: "بذر گوجه فرنگی مرغوب",
          orderDate: "1402/09/15",
          price: 50000,
          status: "delivered",
          category: "بذر",
          description:
            "بذر گوجه فرنگی مرغوب با قوه نامیه بالا، مناسب برای کشت در گلخانه و فضای باز",
          image:
            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjNENBRjUwIi8+PC9zdmc+",
          deliveryDate: "1402/09/20",
          quantity: 2,
          rating: 4.5,
        },
        {
          id: 102,
          name: "کود آلی کمپوست",
          orderDate: "1402/09/10",
          price: 35000,
          status: "shipping",
          category: "کود",
          description:
            "کود آلی کمپوست با کیفیت بالا، غنی از مواد مغذی مورد نیاز گیاهان",
          image:
            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjNkQ0QzQxIi8+PC9zdmc+",
          estimatedDelivery: "1402/09/18",
          quantity: 1,
          rating: 4.2,
        },
        {
          id: 103,
          name: "سم حشره کش ارگانیک",
          orderDate: "1402/09/05",
          price: 45000,
          status: "preparing",
          category: "سموم",
          description:
            "سم حشره کش ارگانیک و بی‌ضرر برای محیط زیست، مناسب برای مبارزه با آفات",
          image:
            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjRkY1NzIyIi8+PC9zdmc+",
          estimatedDelivery: "1402/09/12",
          quantity: 1,
          rating: 4.7,
        },
        {
          id: 104,
          name: "ابزار باغبانی پیشرفته",
          orderDate: "1402/08/28",
          price: 120000,
          status: "delivered",
          category: "ابزار",
          description:
            "ست کامل ابزار باغبانی با کیفیت بالا، مناسب برای کارهای حرفه‌ای",
          image:
            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjMjE5NkYzIi8+PC9zdmc+",
          deliveryDate: "1402/09/02",
          quantity: 1,
          rating: 4.8,
        },
      ],
    };
  },

  // ذخیره داده‌های محصولات
  saveProductsData() {
    try {
      localStorage.setItem(
        "userProductsData",
        JSON.stringify(this.productsData)
      );
      return true;
    } catch (error) {
      console.error("Error saving products data:", error);
      this.showNotification("خطا در ذخیره اطلاعات محصولات", "error");
      return false;
    }
  },

  // رندر محصولات
  renderProducts(filter = "all") {
    const tbody = document.getElementById("productsTable");
    if (!tbody) return;

    // فیلتر کردن محصولات
    let filteredProducts = this.productsData.products;
    if (filter !== "all") {
      filteredProducts = this.productsData.products.filter(
        (product) => product.status === filter
      );
    }

    // اگر محصولی وجود ندارد
    if (filteredProducts.length === 0) {
      tbody.innerHTML = this.getEmptyProductsHTML(filter);
      return;
    }

    const fragment = document.createDocumentFragment();

    filteredProducts.forEach((product) => {
      const row = document.createElement("tr");
      row.className = "fade-in";
      row.innerHTML = this.getProductRowHTML(product);
      fragment.appendChild(row);
    });

    tbody.innerHTML = "";
    tbody.appendChild(fragment);
  },

  // HTML برای زمانی که محصولی وجود ندارد
  getEmptyProductsHTML(filter) {
    const filterTexts = {
      all: "هنوز محصولی خریداری نکرده‌اید",
      preparing: "هیچ محصولی در حال آماده‌سازی ندارید",
      shipping: "هیچ محصولی در حال ارسال ندارید",
      delivered: "هیچ محصولی تحویل داده نشده است",
    };

    return `
                    <tr>
                        <td colspan="6" class="text-center py-5">
                            <i class="fas fa-box fa-3x text-muted mb-3"></i>
                            <h5 class="text-muted">${
                              filterTexts[filter] || "محصولی یافت نشد"
                            }</h5>
                            <p class="text-muted">می‌توانید از فروشگاه محصولات مورد نیاز خود را انتخاب کنید</p>
                            <button class="btn btn-primary" onclick="ProductsManager.goToShop()">
                                <i class="fas fa-store me-1"></i>
                                مشاهده فروشگاه
                            </button>
                        </td>
                    </tr>
                `;
  },

  // HTML برای هر ردیف محصول
  getProductRowHTML(product) {
    const statusClasses = {
      delivered: "status-completed",
      shipping: "status-processing",
      preparing: "status-pending",
    };

    const statusTexts = {
      delivered: "تحویل شده",
      shipping: "در حال ارسال",
      preparing: "در حال آماده‌سازی",
    };

    const statusIcons = {
      delivered: "fa-check-circle",
      shipping: "fa-shipping-fast",
      preparing: "fa-cog",
    };

    return `
                    <td>
                        <img src="${product.image}" alt="${
      product.name
    }" width="50" height="50" class="rounded" loading="lazy">
                    </td>
                    <td>
                        <strong>${product.name}</strong>
                        <br>
                        <small class="text-muted">${product.category}</small>
                    </td>
                    <td>${product.orderDate}</td>
                    <td>${product.price.toLocaleString("fa-IR")}</td>
                    <td>
                        <span class="status-badge ${
                          statusClasses[product.status]
                        }">
                            <i class="fas ${
                              statusIcons[product.status]
                            } me-1"></i>
                            ${statusTexts[product.status]}
                        </span>
                        ${
                          product.deliveryDate
                            ? `<br><small class="text-muted">تحویل: ${product.deliveryDate}</small>`
                            : ""
                        }
                        ${
                          product.estimatedDelivery
                            ? `<br><small class="text-muted">تخمینی: ${product.estimatedDelivery}</small>`
                            : ""
                        }
                    </td>
                    <td>
                        <button class="btn btn-sm btn-outline-primary" onclick="ProductsManager.viewProductDetails(${
                          product.id
                        })" title="جزئیات">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn btn-sm btn-outline-success mt-1" onclick="ProductsManager.trackProduct(${
                          product.id
                        })" title="پیگیری">
                            <i class="fas fa-map-marker-alt"></i>
                        </button>
                        ${
                          product.status === "delivered"
                            ? `
                            <button class="btn btn-sm btn-outline-warning mt-1" onclick="ProductsManager.rateProduct(${product.id})" title="امتیازدهی">
                                <i class="fas fa-star"></i>
                            </button>
                        `
                            : ""
                        }
                    </td>
                `;
  },

  // رندر محصولات پرطرفدار
  renderPopularProducts() {
    const container = document.getElementById("popularProducts");
    if (!container) return;

    const popularProducts = [
      {
        id: 201,
        name: "بذر خیار گلخانه‌ای",
        price: 30000,
        category: "بذر",
        rating: 4.6,
        image:
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjE1MCIgaGVpZ2h0PSIxNTAiIGZpbGw9IiM0Q0FGNTAiLz48L3N2Zz4=",
        description:
          "بذر خیار گلخانه‌ای با عملکرد بالا و مقاوم در برابر بیماری‌ها",
      },
      {
        id: 202,
        name: "کود کامل NPK",
        price: 45000,
        category: "کود",
        rating: 4.3,
        image:
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0BveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjE1MCIgaGVpZ2h0PSIxNTAiIGZpbGw9IiM2RDRDNDEiLz48L3N2Zz4=",
        description: "کود کامل NPK با فرمولاسیون پیشرفته برای رشد بهینه گیاهان",
      },
      {
        id: 203,
        name: "سموم ارگانیک",
        price: 55000,
        category: "سموم",
        rating: 4.7,
        image:
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjE1MCIgaGVpZ2h0PSIxNTAiIGZpbGw9IiNGRjU3MjIiLz48L3N2Zz4=",
        description: "سموم ارگانیک سازگار با محیط زیست برای مبارزه با آفات",
      },
      {
        id: 204,
        name: "سیستم آبیاری قطره‌ای",
        price: 250000,
        category: "تجهیزات",
        rating: 4.8,
        image:
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjE1MCIgaGVpZ2h0PSIxNTAiIGZpbGw9IiMyMTk2RjMiLz48L3N2Zz4=",
        description: "سیستم آبیاری قطره‌ای هوشمند با قابلیت برنامه‌ریزی",
      },
    ];

    const fragment = document.createDocumentFragment();

    popularProducts.forEach((product) => {
      const col = document.createElement("div");
      col.className = "col-md-6 col-lg-3 mb-4";
      col.innerHTML = this.getPopularProductHTML(product);
      fragment.appendChild(col);
    });

    container.innerHTML = "";
    container.appendChild(fragment);
  },

  // HTML برای محصولات پرطرفدار
  getPopularProductHTML(product) {
    return `
                    <div class="product-card">
                        <img src="${product.image}" alt="${
      product.name
    }" class="card-img-top">
                        <div class="card-body">
                            <h6 class="card-title">${product.name}</h6>
                            <small class="text-muted">${
                              product.category
                            }</small>
                            <div class="my-2">
                                ${this.renderRatingStars(product.rating)}
                                <small class="text-muted">(${
                                  product.rating
                                })</small>
                            </div>
                            <p class="card-text small text-muted">${
                              product.description
                            }</p>
                            <div class="mt-auto d-flex justify-content-between align-items-center">
                                <strong class="text-success">${product.price.toLocaleString(
                                  "fa-IR"
                                )} تومان</strong>
                                <button class="btn btn-sm btn-outline-primary" onclick="ProductsManager.addToCart(${
                                  product.id
                                })">
                                    افزودن به سبد
                                </button>
                            </div>
                        </div>
                    </div>
                `;
  },

  // رندر ستاره‌های امتیاز
  renderRatingStars(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    let stars = "";

    for (let i = 0; i < fullStars; i++) {
      stars += '<i class="fas fa-star text-warning"></i>';
    }

    if (halfStar) {
      stars += '<i class="fas fa-star-half-alt text-warning"></i>';
    }

    for (let i = 0; i < emptyStars; i++) {
      stars += '<i class="far fa-star text-warning"></i>';
    }

    return stars;
  },

  // مشاهده جزئیات محصول
  viewProductDetails(productId) {
    const product = this.productsData.products.find((p) => p.id === productId);
    if (!product) return;

    const statusTexts = {
      delivered: "تحویل شده",
      shipping: "در حال ارسال",
      preparing: "در حال آماده‌سازی",
    };

    const modalTitle = document.getElementById("productDetailsTitle");
    const modalContent = document.getElementById("productDetailsContent");

    if (modalTitle && modalContent) {
      modalTitle.textContent = product.name;

      modalContent.innerHTML = `
                        <div class="row">
                            <div class="col-md-4">
                                <img src="${product.image}" alt="${
        product.name
      }" class="img-fluid rounded">
                            </div>
                            <div class="col-md-8">
                                <h6>جزئیات محصول</h6>
                                <table class="table table-bordered">
                                    <tr>
                                        <td><strong>نام محصول:</strong></td>
                                        <td>${product.name}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>دسته‌بندی:</strong></td>
                                        <td>${product.category}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>قیمت:</strong></td>
                                        <td>${product.price.toLocaleString(
                                          "fa-IR"
                                        )} تومان</td>
                                    </tr>
                                    <tr>
                                        <td><strong>تاریخ خرید:</strong></td>
                                        <td>${product.orderDate}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>وضعیت:</strong></td>
                                        <td>
                                            <span class="status-badge ${
                                              product.status === "delivered"
                                                ? "status-completed"
                                                : product.status === "shipping"
                                                ? "status-processing"
                                                : "status-pending"
                                            }">
                                                ${statusTexts[product.status]}
                                            </span>
                                        </td>
                                    </tr>
                                    ${
                                      product.deliveryDate
                                        ? `
                                    <tr>
                                        <td><strong>تاریخ تحویل:</strong></td>
                                        <td>${product.deliveryDate}</td>
                                    </tr>
                                    `
                                        : ""
                                    }
                                    ${
                                      product.estimatedDelivery
                                        ? `
                                    <tr>
                                        <td><strong>تخمین تحویل:</strong></td>
                                        <td>${product.estimatedDelivery}</td>
                                    </tr>
                                    `
                                        : ""
                                    }
                                    <tr>
                                        <td><strong>تعداد:</strong></td>
                                        <td>${product.quantity}</td>
                                    </tr>
                                </table>
                                <h6 class="mt-3">توضیحات</h6>
                                <p>${product.description}</p>
                            </div>
                        </div>
                    `;

      const modal = new bootstrap.Modal(
        document.getElementById("productDetailsModal")
      );
      modal.show();
    }
  },

  // پیگیری محصول
  trackProduct(productId) {
    const product = this.productsData.products.find((p) => p.id === productId);
    if (!product) return;

    const statusMessages = {
      preparing: "محصول شما در حال آماده‌سازی در انبار است.",
      shipping: "محصول شما در راه است و به زودی تحویل داده می‌شود.",
      delivered: "محصول شما با موفقیت تحویل داده شده است.",
    };

    this.showNotification(
      `پیگیری محصول: ${product.name} - ${statusMessages[product.status]}`,
      "info"
    );
  },

  // امتیازدهی به محصول
  rateProduct(productId) {
    const product = this.productsData.products.find((p) => p.id === productId);
    if (!product) return;

    const rating = prompt(
      `لطفاً به محصول "${product.name}" امتیاز دهید (1 تا 5):`,
      product.rating || 5
    );

    if (rating && !isNaN(rating) && rating >= 1 && rating <= 5) {
      product.rating = parseFloat(rating);
      this.saveProductsData();
      this.showNotification(
        `امتیاز ${rating} به محصول "${product.name}" داده شد`,
        "success"
      );
    }
  },

  // افزودن محصول پیشنهادی به سبد خرید
  addToCart(productId) {
    const popularProducts = [
      {
        id: 201,
        name: "بذر خیار گلخانه‌ای",
        price: 30000,
        category: "بذر",
      },
      {
        id: 202,
        name: "کود کامل NPK",
        price: 45000,
        category: "کود",
      },
      {
        id: 203,
        name: "سموم ارگانیک",
        price: 55000,
        category: "سموم",
      },
      {
        id: 204,
        name: "سیستم آبیاری قطره‌ای",
        price: 250000,
        category: "تجهیزات",
      },
    ];

    const product = popularProducts.find((p) => p.id === productId);
    if (product) {
      this.showNotification(
        `محصول "${product.name}" به سبد خرید اضافه شد`,
        "success"
      );
      // در حالت واقعی اینجا محصول به سبد خرید اضافه می‌شود
    }
  },

  // رفتن به صفحه فروشگاه
  goToShop() {
    alert("در حال هدایت به فروشگاه...");
    // در حالت واقعی: window.location.href = 'shop.html';
  },

  // فیلتر کردن محصولات
  filterProducts(filter) {
    // بروزرسانی وضعیت دکمه‌های فیلتر
    document.querySelectorAll(".btn-group .btn").forEach((btn) => {
      btn.classList.remove("active");
    });
    event.target.classList.add("active");

    this.renderProducts(filter);
  },

  // نمایش اعلان
  showNotification(message, type = "info") {
    // ایجاد اعلان ساده
    const alertClass =
      type === "success" ? "success" : type === "error" ? "danger" : "info";

    const notification = document.createElement("div");
    notification.className = `alert alert-${alertClass} alert-dismissible fade show position-fixed`;
    notification.style.cssText =
      "top: 20px; left: 20px; z-index: 9999; min-width: 300px;";
    notification.innerHTML = `
                    <i class="fas fa-${
                      type === "success"
                        ? "check-circle"
                        : type === "error"
                        ? "exclamation-circle"
                        : "info-circle"
                    } ms-2"></i>
                    ${message}
                    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                `;

    document.body.appendChild(notification);

    // حذف خودکار پس از 3 ثانیه
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 3000);
  },

  // تنظیم event listeners
  setupEventListeners() {
    // دکمه‌های فیلتر
    document.querySelectorAll(".btn-group .btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const filter = e.target.getAttribute("data-filter");
        this.filterProducts(filter);
      });
    });

    // دکمه خروج
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const modal = new bootstrap.Modal(
          document.getElementById("logoutModal")
        );
        modal.show();
      });
    }

    // تایید خروج
    const confirmLogout = document.getElementById("confirmLogout");
    if (confirmLogout) {
      confirmLogout.addEventListener("click", () => {
        this.showNotification("با موفقیت خارج شدید!", "success");
        const modal = bootstrap.Modal.getInstance(
          document.getElementById("logoutModal")
        );
        if (modal) modal.hide();

        // در حالت واقعی: window.location.href = 'login.html';
        setTimeout(() => {
          alert("در حال هدایت به صفحه ورود...");
        }, 1000);
      });
    }
  },

  // تنظیم سایدبار
  setupSidebar() {
    const toggleBtn = document.getElementById("toggleSidebar");
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("sidebarOverlay");

    if (toggleBtn && sidebar && overlay) {
      toggleBtn.addEventListener("click", () => {
        sidebar.classList.add("show");
        overlay.classList.add("show");
      });

      overlay.addEventListener("click", () => {
        sidebar.classList.remove("show");
        overlay.classList.remove("show");
      });
    }

    // بستن سایدبار با کلید Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        sidebar.classList.remove("show");
        overlay.classList.remove("show");
      }
    });
  },
};

// مقداردهی اولیه هنگام لود صفحه
document.addEventListener("DOMContentLoaded", function () {
  ProductsManager.init();
});
