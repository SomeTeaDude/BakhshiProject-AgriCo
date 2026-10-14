// مدیریت سبد خرید
const CartManager = {
  cartData: null,

  // مقداردهی اولیه
  init() {
    this.loadCartData();
    this.renderCart();
    this.setupEventListeners();
    this.setupSidebar();
  },

  // بارگذاری داده‌های سبد خرید
  loadCartData() {
    const savedData = localStorage.getItem("userCartData");

    if (savedData) {
      try {
        this.cartData = JSON.parse(savedData);
      } catch (error) {
        console.error("Error parsing cart data:", error);
        this.cartData = this.getDefaultCartData();
      }
    } else {
      this.cartData = this.getDefaultCartData();
    }

    this.saveCartData();
  },

  // داده‌های پیش‌فرض سبد خرید
  getDefaultCartData() {
    return {
      items: [
        {
          id: 1,
          name: "بذر گوجه فرنگی مرغوب",
          category: "بذر",
          price: 25000,
          quantity: 2,
          image:
            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjNENBRjUwIi8+PC9zdmc+",
        },
        {
          id: 2,
          name: "کود آلی کمپوست",
          category: "کود",
          price: 35000,
          quantity: 1,
          image:
            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjNkQ0QzQxIi8+PC9zdmc+",
        },
      ],
      total: 85000,
      itemCount: 3,
    };
  },

  // ذخیره داده‌های سبد خرید
  saveCartData() {
    try {
      localStorage.setItem("userCartData", JSON.stringify(this.cartData));
      return true;
    } catch (error) {
      console.error("Error saving cart data:", error);
      this.showNotification("خطا در ذخیره سبد خرید", "error");
      return false;
    }
  },

  // رندر سبد خرید
  renderCart() {
    this.renderCartItems();
    this.renderSuggestedProducts();
    this.updateCartTotal();
  },

  // رندر آیتم‌های سبد خرید
  renderCartItems() {
    const container = document.getElementById("cartItemsContainer");
    if (!container) return;

    // اگر سبد خرید خالی است
    if (this.cartData.items.length === 0) {
      container.innerHTML = this.getEmptyCartHTML();
      return;
    }

    const fragment = document.createDocumentFragment();

    this.cartData.items.forEach((item) => {
      const cartItem = document.createElement("div");
      cartItem.className = "cart-item fade-in";
      cartItem.innerHTML = this.getCartItemHTML(item);
      fragment.appendChild(cartItem);
    });

    // اضافه کردن دکمه پاک کردن کل سبد خرید
    const clearButton = document.createElement("div");
    clearButton.className = "text-center mt-3";
    clearButton.innerHTML = `
                    <button class="btn btn-outline-danger" onclick="CartManager.clearCart()">
                        <i class="fas fa-trash me-1"></i>
                        پاک کردن کل سبد خرید
                    </button>
                `;
    fragment.appendChild(clearButton);

    container.innerHTML = "";
    container.appendChild(fragment);
  },

  // HTML برای سبد خرید خالی
  getEmptyCartHTML() {
    return `
                    <div class="empty-cart">
                        <i class="fas fa-shopping-cart"></i>
                        <h5 class="text-muted">سبد خرید شما خالی است</h5>
                        <p class="text-muted">می‌توانید از فروشگاه محصولات مورد نظر خود را انتخاب کنید</p>
                        <button class="btn btn-primary" onclick="CartManager.goToShop()">
                            <i class="fas fa-store me-1"></i>
                            مشاهده فروشگاه
                        </button>
                    </div>
                `;
  },

  // HTML برای هر آیتم سبد خرید
  getCartItemHTML(item) {
    const itemTotal = item.price * item.quantity;

    return `
                    <div class="d-flex align-items-center">
                        <img src="${item.image}" alt="${
      item.name
    }" class="rounded me-3" width="60" height="60" loading="lazy">
                        <div class="flex-grow-1">
                            <h6 class="mb-1">${item.name}</h6>
                            <small class="text-muted">${item.category}</small>
                            <div class="mt-2">
                                <span class="text-success fw-bold">${item.price.toLocaleString(
                                  "fa-IR"
                                )} تومان</span>
                            </div>
                        </div>
                        <div class="d-flex align-items-center">
                            <div class="quantity-controls me-3">
                                <button class="quantity-btn" onclick="CartManager.updateQuantity(${
                                  item.id
                                }, -1)">-</button>
                                <input type="text" class="quantity-input" value="${
                                  item.quantity
                                }" readonly>
                                <button class="quantity-btn" onclick="CartManager.updateQuantity(${
                                  item.id
                                }, 1)">+</button>
                            </div>
                            <span class="text-nowrap me-3 fw-bold">${itemTotal.toLocaleString(
                              "fa-IR"
                            )} تومان</span>
                            <button class="btn btn-sm btn-outline-danger" onclick="CartManager.removeItem(${
                              item.id
                            })" title="حذف">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                `;
  },

  // رندر محصولات پیشنهادی
  renderSuggestedProducts() {
    const container = document.getElementById("suggestedProducts");
    if (!container) return;

    const suggestedProducts = [
      {
        id: 201,
        name: "بذر خیار گلخانه‌ای",
        price: 30000,
        category: "بذر",
        image:
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjE1MCIgaGVpZ2h0PSIxNTAiIGZpbGw9IiM0Q0FGNTAiLz48L3N2Zz4=",
      },
      {
        id: 202,
        name: "کود کامل NPK",
        price: 45000,
        category: "کود",
        image:
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjE1MCIgaGVpZ2h0PSIxNTAiIGZpbGw9IiM2RDRDNDEiLz48L3N2Zz4=",
      },
      {
        id: 203,
        name: "سموم ارگانیک",
        price: 55000,
        category: "سموم",
        image:
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjE1MCIgaGVpZ2h0PSIxNTAiIGZpbGw9IiNGRjU3MjIiLz48L3N2Zz4=",
      },
    ];

    const fragment = document.createDocumentFragment();

    suggestedProducts.forEach((product) => {
      const col = document.createElement("div");
      col.className = "col-md-6 col-lg-4 mb-4";
      col.innerHTML = this.getSuggestedProductHTML(product);
      fragment.appendChild(col);
    });

    container.innerHTML = "";
    container.appendChild(fragment);
  },

  // HTML برای محصولات پیشنهادی
  getSuggestedProductHTML(product) {
    return `
                    <div class="suggested-product-card">
                        <img src="${product.image}" alt="${
      product.name
    }" class="card-img-top">
                        <div class="card-body">
                            <h6 class="card-title">${product.name}</h6>
                            <small class="text-muted">${
                              product.category
                            }</small>
                            <div class="mt-auto d-flex justify-content-between align-items-center mt-3">
                                <strong class="text-success">${product.price.toLocaleString(
                                  "fa-IR"
                                )} تومان</strong>
                                <button class="btn btn-sm btn-outline-primary" onclick="CartManager.addSuggestedProduct(${
                                  product.id
                                })">
                                    افزودن به سبد
                                </button>
                            </div>
                        </div>
                    </div>
                `;
  },

  // بروزرسانی جمع کل سبد خرید
  updateCartTotal() {
    const totalElement = document.getElementById("cartTotal");
    if (totalElement) {
      this.cartData.total = this.calculateTotal();
      totalElement.textContent = this.cartData.total.toLocaleString("fa-IR");
    }
  },

  // محاسبه جمع کل
  calculateTotal() {
    return this.cartData.items.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  },

  // بروزرسانی تعداد آیتم
  updateQuantity(itemId, change) {
    const item = this.cartData.items.find((i) => i.id === itemId);
    if (item) {
      item.quantity = Math.max(1, item.quantity + change);
      this.cartData.itemCount = this.cartData.items.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      this.saveCartData();
      this.renderCart();
      this.showNotification("سبد خرید بروزرسانی شد", "success");
    }
  },

  // حذف آیتم از سبد خرید
  removeItem(itemId) {
    if (confirm("آیا از حذف این محصول اطمینان دارید؟")) {
      this.cartData.items = this.cartData.items.filter(
        (item) => item.id !== itemId
      );
      this.cartData.itemCount = this.cartData.items.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      this.saveCartData();
      this.renderCart();
      this.showNotification("محصول از سبد خرید حذف شد", "success");
    }
  },

  // پاک کردن کل سبد خرید
  clearCart() {
    if (confirm("آیا از پاک کردن کل سبد خرید اطمینان دارید؟")) {
      this.cartData.items = [];
      this.cartData.itemCount = 0;
      this.cartData.total = 0;
      this.saveCartData();
      this.renderCart();
      this.showNotification("سبد خرید پاک شد", "success");
    }
  },

  // افزودن محصول پیشنهادی به سبد خرید
  addSuggestedProduct(productId) {
    const suggestedProducts = [
      {
        id: 201,
        name: "بذر خیار گلخانه‌ای",
        price: 30000,
        category: "بذر",
        image:
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjNENBRjUwIi8+PC9zdmc+",
      },
      {
        id: 202,
        name: "کود کامل NPK",
        price: 45000,
        category: "کود",
        image:
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjNkQ0QzQxIi8+PC9zdmc+",
      },
      {
        id: 203,
        name: "سموم ارگانیک",
        price: 55000,
        category: "سموم",
        image:
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjRkY1NzIyIi8+PC9zdmc+",
      },
    ];

    const product = suggestedProducts.find((p) => p.id === productId);
    if (product) {
      // بررسی آیا محصول قبلاً در سبد خرید وجود دارد
      const existingItem = this.cartData.items.find(
        (item) => item.id === productId
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        this.cartData.items.push({
          ...product,
          quantity: 1,
        });
      }

      this.cartData.itemCount = this.cartData.items.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      this.saveCartData();
      this.renderCart();
      this.showNotification("محصول به سبد خرید اضافه شد", "success");
    }
  },

  // رفتن به صفحه فروشگاه
  goToShop() {
    alert("در حال هدایت به فروشگاه...");
    // در حالت واقعی: window.location.href = 'shop.html';
  },

  // پرداخت
  checkout() {
    if (this.cartData.items.length === 0) {
      this.showNotification("سبد خرید شما خالی است", "error");
      return;
    }

    // شبیه‌سازی پرداخت
    this.showNotification("در حال انتقال به درگاه پرداخت...", "info");

    // در حالت واقعی اینجا پردازش پرداخت انجام می‌شود
    setTimeout(() => {
      this.showNotification("پرداخت با موفقیت انجام شد", "success");

      // پاک کردن سبد خرید پس از پرداخت موفق
      this.cartData.items = [];
      this.cartData.itemCount = 0;
      this.cartData.total = 0;
      this.saveCartData();
      this.renderCart();
    }, 2000);
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
    // دکمه پرداخت
    const checkoutBtn = document.getElementById("checkoutBtn");
    if (checkoutBtn) {
      checkoutBtn.addEventListener("click", () => this.checkout());
    }

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
  CartManager.init();
});
