// ✅ Enhanced Cart Management System با قابلیت جزئیات محصولات
class CartManager {
  constructor() {
    this.cart = this.loadCart();
    this.isCartOpen = false;
    this.currentProduct = null;
    this.currentProductType = null;
    this.initializeElements();
    this.bindEvents();
    this.updateDisplay();
    this.productsData = this.initializeProductsData();
  }

  // داده‌های محصولات
  initializeProductsData() {
    return {
      // محصولات کشاورزی
      product: {
        1: {
          name: "بذر گوجه فرنگی ارگانیک",
          price: 25000,
          description: "بذر با کیفیت برای تولید گوجه فرنگی تازه و ارگانیک",
          icon: "fas fa-seedling",
          details: {
            "نوع محصول": "بذر ارگانیک",
            "مدت زمان رشد": "۶۰-۸۰ روز",
            "مناسب برای": "کشت خانگی و مزرعه",
            "نوع بسته‌بندی": "قوطی ۵۰ گرمی",
            "قابلیت کشت": "تمام فصول در گلخانه",
            "کشور سازنده": "ایران",
            "تضمین کیفیت": "دارد",
          },
        },
        2: {
          name: "کود ارگانیک گیاهی",
          price: 35000,
          description: "کود طبیعی برای تقویت خاک و رشد بهتر گیاهان",
          icon: "fas fa-leaf",
          details: {
            "نوع محصول": "کود ارگانیک",
            حجم: "۲ کیلوگرم",
            "مواد تشکیل‌دهنده": "کمپوست طبیعی، ورمی‌کمپوست",
            کاربرد: "تقویت خاک و رشد گیاهان",
            "میزان مصرف": "۱۰۰ گرم در متر مربع",
            "دوره مصرف": "هر ۱۵ روز یکبار",
            "تضمین کیفیت": "دارد",
          },
        },
        3: {
          name: "نهال سیب پاکوتاه",
          price: 45000,
          description: "نهال با کیفیت برای باغچه و فضای محدود",
          icon: "fas fa-apple-alt",
          details: {
            "نوع محصول": "نهال میوه",
            "قد نهال": "۴۰-۶۰ سانتی‌متر",
            "زمان باردهی": "۲ سال پس از کشت",
            "مناسب برای": "باغچه و فضای محدود",
            "نیاز آبی": "متوسط",
            "فصل کشت": "بهار و پاییز",
            گارانتی: "۶ ماه",
          },
        },
        4: {
          name: "سموم ارگانیک",
          price: 28000,
          description: "سموم طبیعی برای دفع آفات بدون آسیب به محیط",
          icon: "fas fa-spray-can",
          details: {
            "نوع محصول": "سم ارگانیک",
            حجم: "۱ لیتر",
            کاربرد: "دفع آفات و حشرات",
            "میزان مصرف": "۱۰ سی‌سی در ۱ لیتر آب",
            "دوره کارنس": "۳ روز",
            "موثر بر": "شته، مگس سفید، کنه",
            "بی‌خطر برای": "حشرات مفید",
          },
        },
      },
      // ادوات کشاورزی
      tool: {
        5: {
          name: "تراکتور کوچک",
          price: 15000000,
          description: "تراکتور مناسب برای زمین‌های کوچک و متوسط",
          icon: "fas fa-tractor",
          details: {
            "نوع محصول": "ادوات کشاورزی",
            "قدرت موتور": "۲۵ اسب بخار",
            سوخت: "دیزل",
            ابعاد: "۲.۵ × ۱.۵ متر",
            گارانتی: "۲ سال",
            "خدمات پس از فروش": "دارد",
            "کشور سازنده": "ترکیه",
          },
        },
        6: {
          name: "کولتیواتور",
          price: 3500000,
          description: "دستگاه برای شخم زدن و آماده‌سازی خاک",
          icon: "fas fa-tools",
          details: {
            "نوع محصول": "ادوات کشاورزی",
            "قدرت موتور": "۷ اسب بخار",
            سوخت: "بنزین",
            "عرض کار": "۸۰ سانتی‌متر",
            گارانتی: "۱ سال",
            وزن: "۸۵ کیلوگرم",
            "کشور سازنده": "چین",
          },
        },
        7: {
          name: "تیلر باغی",
          price: 2800000,
          description: "تیلر مناسب برای باغ‌های کوچک و فضای محدود",
          icon: "fas fa-wind",
          details: {
            "نوع محصول": "ادوات کشاورزی",
            "قدرت موتور": "۵ اسب بخار",
            سوخت: "بنزین",
            "عرض کار": "۶۰ سانتی‌متر",
            گارانتی: "۱ سال",
            "عمق کار": "۲۰-۳۰ سانتی‌متر",
            "کشور سازنده": "ایران",
          },
        },
        8: {
          name: "علف تراش",
          price: 1200000,
          description: "دستگاه برای هرس کردن علف‌های هرز",
          icon: "fas fa-cut",
          details: {
            "نوع محصول": "ادوات کشاورزی",
            "قدرت موتور": "۲ اسب بخار",
            سوخت: "بنزین",
            "نوع تیغه": "۳ پره فولادی",
            گارانتی: "۶ ماه",
            "سیم برش": "۲ متر",
            "کشور سازنده": "تایوان",
          },
        },
      },
      // دوره‌های آموزشی
      course: {
        9: {
          name: "دوره آبیاری درختان سیاه ریشه",
          price: 150000,
          description: "آموزش تخصصی روش‌های آبیاری درختان خاص",
          icon: "fas fa-tint",
          details: {
            "مدت زمان دوره": "۸ ساعت",
            "تعداد فصل‌ها": "۴ فصل",
            "تعداد جلسات": "۱۲ جلسه",
            مدرس: "دکتر محمد حسینی",
            "سطح دوره": "متوسط",
            پشتیبانی: "۳ ماهه",
            گواهینامه: "دارد",
          },
        },
        10: {
          name: "دوره کشاورزی هوشمند با IoT",
          price: 220000,
          description: "استفاده از تکنولوژی برای کشاورزی مدرن",
          icon: "fas fa-microchip",
          details: {
            "مدت زمان دوره": "۱۲ ساعت",
            "تعداد فصل‌ها": "۵ فصل",
            "تعداد جلسات": "۱۵ جلسه",
            مدرس: "مهندس علی بخشی",
            "سطح دوره": "پیشرفته",
            پشتیبانی: "۶ ماهه",
            گواهینامه: "دارد",
          },
        },
        11: {
          name: "دوره سیستم آبیاری نوین",
          price: 180000,
          description: "آموزش روش‌های پیشرفته آبیاری و صرفه‌جویی",
          icon: "fas fa-water",
          details: {
            "مدت زمان دوره": "۱۰ ساعت",
            "تعداد فصل‌ها": "۴ فصل",
            "تعداد جلسات": "۱۴ جلسه",
            مدرس: "دکتر فاطمه محمدی",
            "سطح دوره": "مقدماتی تا متوسط",
            پشتیبانی: "۴ ماهه",
            گواهینامه: "دارد",
          },
        },
        12: {
          name: "دوره کشت هیدروپونیک",
          price: 250000,
          description: "آموزش کشت بدون خاک برای محصولات سالم",
          icon: "fas fa-seedling",
          details: {
            "مدت زمان دوره": "۱۵ ساعت",
            "تعداد فصل‌ها": "۶ فصل",
            "تعداد جلسات": "۲۰ جلسه",
            مدرس: "مهندس سارا کریمی",
            "سطح دوره": "پیشرفته",
            پشتیبانی: "۶ ماهه",
            گواهینامه: "دارد",
          },
        },
      },
    };
  }

  // بارگذاری سبد خرید از حافظه
  loadCart() {
    try {
      const savedCart = JSON.parse(window.localStorage.getItem("cart")) || [];
      return savedCart;
    } catch (error) {
      console.error("خطا در بارگذاری سبد خرید:", error);
      return [];
    }
  }

  // ذخیره سبد خرید
  saveCart() {
    try {
      window.localStorage.setItem("cart", JSON.stringify(this.cart));
    } catch (error) {
      console.error("خطا در ذخیره سبد خرید:", error);
    }
  }

  // مقداردهی اولیه عناصر DOM
  initializeElements() {
    this.elements = {
      cartModal: document.getElementById("cartModal"),
      cartButton: document.getElementById("cartButton"),
      closeCart: document.getElementById("closeCart"),
      cartItems: document.getElementById("cartItems"),
      cartTotal: document.getElementById("cartTotal"),
      cartCount: document.getElementById("cartCount"),
      cartBadge: document.getElementById("cartBadge"),
      checkoutBtn: document.getElementById("checkoutBtn"),
      loginPrompt: document.getElementById("loginPrompt"),
      notification: document.getElementById("notification"),
      detailsModal: document.getElementById("productDetailsModal")
        ? new bootstrap.Modal(document.getElementById("productDetailsModal"))
        : null,
      detailsContent: document.getElementById("productDetailsContent"),
      addToCartFromDetails: document.getElementById("addToCartFromDetails"),
    };
  }

  // اتصال event handlerها
  bindEvents() {
    // باز کردن سبد خرید
    this.elements.cartButton?.addEventListener("click", (e) => {
      if (this.isCartOpen) {
        this.closeCart();
      } else {
        this.openCart();
      }
    });

    // بستن سبد خرید
    this.elements.closeCart?.addEventListener("click", () => this.closeCart());

    // بستن با کلیک خارج از محتوا
    document.addEventListener("click", (e) => {
      if (
        this.isCartOpen &&
        this.elements.cartModal &&
        e.target === this.elements.cartModal
      ) {
        this.closeCart();
      }
    });

    // مدیریت کلیدهای کیبورد
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isCartOpen) {
        this.closeCart();
      }
    });

    // تسویه حساب
    this.elements.checkoutBtn?.addEventListener("click", () => this.checkout());

    // افزودن به سبد خرید
    document.addEventListener("click", (e) => {
      if (e.target.closest(".add-to-cart-btn")) {
        this.handleAddToCart(e.target.closest(".add-to-cart-btn"));
      }
    });

    // نمایش جزئیات محصول
    document.addEventListener("click", (e) => {
      if (e.target.closest(".details-btn")) {
        this.handleShowDetails(e.target.closest(".details-btn"));
      }
    });

    // افزودن به سبد خرید از طریق مودال جزئیات
    this.elements.addToCartFromDetails?.addEventListener("click", () => {
      this.handleAddFromDetails();
    });

    // مدیریت کنترل‌های داخل سبد خرید
    this.elements.cartItems?.addEventListener("click", (e) => {
      if (e.target.closest(".quantity-btn")) {
        this.handleQuantityChange(e.target.closest(".quantity-btn"));
      }
      if (e.target.closest(".remove-btn")) {
        this.handleRemoveItem(e.target.closest(".remove-btn"));
      }
    });
  }

  // افزودن محصول به سبد خرید
  handleAddToCart(button) {
    const productName = button.getAttribute("data-product");
    const productPrice = parseInt(button.getAttribute("data-price"));
    const productIcon =
      button.getAttribute("data-icon") || "fas fa-shopping-bag";

    if (!productName || !productPrice) return;

    // بررسی وجود محصول در سبد
    const existingItem = this.cart.find((item) => item.name === productName);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cart.push({
        id: Date.now() + Math.random(),
        name: productName,
        price: productPrice,
        quantity: 1,
        icon: productIcon,
      });
    }

    this.saveCart();
    this.updateDisplay();
    this.showAddToCartAnimation(button);
    this.showNotification("محصول با موفقیت به سبد خرید اضافه شد!", "success");
  }

  // انیمیشن افزودن به سبد خرید
  showAddToCartAnimation(button) {
    const originalContent = button.innerHTML;

    // اضافه کردن کلاس انیمیشن
    button.classList.add("added");
    button.innerHTML = '<i class="fas fa-check me-2"></i>اضافه شد!';
    button.style.background = "linear-gradient(45deg, #4CAF50, #66BB6A)";
    button.disabled = true;

    // انیمیشن دکمه سبد خرید
    this.animateCartButton();

    setTimeout(() => {
      button.classList.remove("added");
      button.innerHTML = originalContent;
      button.style.background =
        "linear-gradient(45deg, var(--primary-green), var(--light-green))";
      button.disabled = false;
    }, 1000);
  }

  // انیمیشن دکمه سبد خرید
  animateCartButton() {
    if (this.elements.cartButton) {
      this.elements.cartButton.classList.add("pulse");
      setTimeout(() => {
        this.elements.cartButton.classList.remove("pulse");
      }, 500);
    }

    // انیمیشن badge
    if (this.elements.cartBadge) {
      this.elements.cartBadge.classList.add("bounce");
      setTimeout(() => {
        this.elements.cartBadge.classList.remove("bounce");
      }, 600);
    }
  }

  // نمایش جزئیات محصول
  handleShowDetails(button) {
    const productType = button.getAttribute("data-product-type");
    const productId = button.getAttribute("data-product-id");

    const product = this.productsData[productType]?.[productId];
    if (!product) {
      this.showNotification("محصول یافت نشد!", "error");
      return;
    }

    this.showProductDetails(product, productType);
  }

  // نمایش جزئیات در مودال
  showProductDetails(product, productType) {
    let detailsHTML = `
            <div class="product-details-content">
                <div class="detail-section">
                    <h6>اطلاعات کلی</h6>
                    <div class="detail-item">
                        <span class="detail-label">نام محصول:</span>
                        <span class="detail-value">${this.escapeHtml(
                          product.name
                        )}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">قیمت:</span>
                        <span class="detail-value">${product.price.toLocaleString()} تومان</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">توضیحات:</span>
                        <span class="detail-value">${this.escapeHtml(
                          product.description
                        )}</span>
                    </div>
                </div>
        `;

    // بخش مخصوص دوره‌های آموزشی
    if (productType === "course") {
      detailsHTML += `
                <div class="detail-section">
                    <h6>مشخصات دوره</h6>
                    <div class="course-stats">
                        <div class="stat-card">
                            <span class="number">${product.details["مدت زمان دوره"]}</span>
                            <span class="label">مدت زمان</span>
                        </div>
                        <div class="stat-card">
                            <span class="number">${product.details["تعداد فصل‌ها"]}</span>
                            <span class="label">تعداد فصل</span>
                        </div>
                        <div class="stat-card">
                            <span class="number">${product.details["تعداد جلسات"]}</span>
                            <span class="label">تعداد جلسات</span>
                        </div>
                        <div class="stat-card">
                            <span class="number">${product.details["پشتیبانی"]}</span>
                            <span class="label">پشتیبانی</span>
                        </div>
                    </div>
                </div>
            `;
    }

    detailsHTML += `
                <div class="detail-section">
                    <h6>${
                      productType === "course" ? "مشخصات آموزشی" : "مشخصات فنی"
                    }</h6>
        `;

    // نمایش جزئیات
    for (const [key, value] of Object.entries(product.details)) {
      if (
        productType === "course" &&
        ["مدت زمان دوره", "تعداد فصل‌ها", "تعداد جلسات", "پشتیبانی"].includes(
          key
        )
      ) {
        continue; // این موارد در بخش آمار نمایش داده شدند
      }
      detailsHTML += `
                <div class="detail-item">
                    <span class="detail-label">${key}:</span>
                    <span class="detail-value">${this.escapeHtml(value)}</span>
                </div>
            `;
    }

    detailsHTML += `
                </div>
            </div>
        `;

    if (this.elements.detailsContent) {
      this.elements.detailsContent.innerHTML = detailsHTML;
    }

    // ذخیره اطلاعات محصول برای افزودن به سبد خرید
    this.currentProduct = product;
    this.currentProductType = productType;

    if (this.elements.detailsModal) {
      this.elements.detailsModal.show();
    }
  }

  // افزودن به سبد خرید از طریق مودال جزئیات
  handleAddFromDetails() {
    if (!this.currentProduct) return;

    const productName = this.currentProduct.name;
    const productPrice = this.currentProduct.price;
    const productIcon = this.currentProduct.icon;

    // بررسی وجود محصول در سبد
    const existingItem = this.cart.find((item) => item.name === productName);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cart.push({
        id: Date.now() + Math.random(),
        name: productName,
        price: productPrice,
        quantity: 1,
        icon: productIcon,
      });
    }

    this.saveCart();
    this.updateDisplay();

    if (this.elements.detailsModal) {
      this.elements.detailsModal.hide();
    }

    this.showNotification("محصول با موفقیت به سبد خرید اضافه شد!", "success");
  }

  // مدیریت تغییر تعداد محصول
  handleQuantityChange(button) {
    const itemId = button.getAttribute("data-id");
    const action = button.getAttribute("data-action");
    const item = this.cart.find((cartItem) => cartItem.id == itemId);

    if (!item) return;

    // انیمیشن دکمه
    button.style.transform = "scale(0.9)";
    setTimeout(() => {
      button.style.transform = "scale(1)";
    }, 150);

    if (action === "increase") {
      item.quantity += 1;
    } else if (action === "decrease") {
      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        this.handleRemoveItem(button);
        return;
      }
    }

    this.saveCart();
    this.updateDisplay();
  }

  // حذف محصول از سبد خرید
  handleRemoveItem(button) {
    const itemId = button.getAttribute("data-id");
    const itemElement = button.closest(".cart-item");

    if (itemElement) {
      // اضافه کردن انیمیشن حذف
      itemElement.classList.add("removing");

      // حذف از DOM پس از انیمیشن
      setTimeout(() => {
        this.removeItem(itemId);
      }, 300);
    } else {
      this.removeItem(itemId);
    }
  }

  removeItem(itemId) {
    this.cart = this.cart.filter((item) => item.id != itemId);
    this.saveCart();
    this.updateDisplay();
    this.showNotification("محصول از سبد خرید حذف شد", "success");
  }

  // به‌روزرسانی نمایش سبد خرید
  updateDisplay() {
    this.updateCartCount();
    this.updateCartItems();
    this.updateCartTotal();
    this.updateCheckoutButton();
  }

  // به‌روزرسانی شمارنده سبد خرید
  updateCartCount() {
    const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);

    if (this.elements.cartCount) {
      this.elements.cartCount.textContent =
        totalItems > 0 ? `سبد خرید (${totalItems})` : "سبد خرید";
    }

    if (this.elements.cartBadge) {
      if (totalItems > 0) {
        this.elements.cartBadge.textContent =
          totalItems > 99 ? "99+" : totalItems;
        this.elements.cartBadge.classList.add("show");
      } else {
        this.elements.cartBadge.classList.remove("show");
      }
    }
  }

  // به‌روزرسانی آیتم‌های سبد خرید
  updateCartItems() {
    if (!this.elements.cartItems) return;

    if (this.cart.length === 0) {
      this.elements.cartItems.innerHTML = `
                <div class="cart-empty">
                    <i class="fas fa-shopping-cart"></i>
                    <h5>سبد خرید شما خالی است</h5>
                    <p>برای شروع خرید، محصولاتی را به سبد اضافه کنید</p>
                </div>
            `;
      return;
    }

    // پاک کردن محتوا با انیمیشن
    this.elements.cartItems.style.opacity = "0";

    setTimeout(() => {
      this.elements.cartItems.innerHTML = this.cart
        .map(
          (item, index) => `
                    <div class="cart-item" style="animation-delay: ${
                      index * 0.05
                    }s">
                        <div class="cart-item-image">
                            <i class="${item.icon}"></i>
                        </div>
                        <div class="cart-item-details">
                            <div class="cart-item-title">${this.escapeHtml(
                              item.name
                            )}</div>
                            <div class="cart-item-price">${item.price.toLocaleString()} تومان</div>
                            <div class="quantity-controls">
                                <button class="quantity-btn" data-id="${
                                  item.id
                                }" data-action="decrease" type="button" aria-label="کاهش تعداد">
                                    <i class="fas fa-minus"></i>
                                </button>
                                <span class="quantity-display">${
                                  item.quantity
                                }</span>
                                <button class="quantity-btn" data-id="${
                                  item.id
                                }" data-action="increase" type="button" aria-label="افزایش تعداد">
                                    <i class="fas fa-plus"></i>
                                </button>
                                <button class="remove-btn" data-id="${
                                  item.id
                                }" type="button" aria-label="حذف محصول">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                `
        )
        .join("");

      // fade in آیتم‌های جدید
      this.elements.cartItems.style.opacity = "1";
    }, 150);
  }

  // تابع helper برای escape HTML
  escapeHtml(unsafe) {
    if (!unsafe) return "";
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // به‌روزرسانی مجموع قیمت
  updateCartTotal() {
    const total = this.cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    if (this.elements.cartTotal) {
      this.elements.cartTotal.textContent = `مجموع: ${total.toLocaleString()} تومان`;
    }
  }

  // به‌روزرسانی دکمه تسویه حساب
  updateCheckoutButton() {
    if (!this.elements.checkoutBtn) return;

    const hasItems = this.cart.length > 0;
    this.elements.checkoutBtn.disabled = !hasItems;

    if (hasItems) {
      this.elements.checkoutBtn.innerHTML =
        '<i class="fas fa-credit-card me-2"></i>تسویه حساب';
    } else {
      this.elements.checkoutBtn.innerHTML =
        '<i class="fas fa-shopping-cart me-2"></i>سبد خرید خالی است';
    }
  }

  // بهبود باز کردن سبد خرید از سمت چپ
  openCart() {
    if (!this.elements.cartModal || this.isCartOpen) return;

    this.isCartOpen = true;
    this.elements.cartModal.style.display = "flex";
    document.body.style.overflow = "hidden";

    // فعال کردن transition
    requestAnimationFrame(() => {
      this.elements.cartModal.classList.add("show");

      // به‌روزرسانی ARIA attributes
      this.elements.cartModal.setAttribute("aria-hidden", "false");
      this.elements.cartButton.setAttribute("aria-expanded", "true");
    });

    // Focus management برای accessibility
    setTimeout(() => {
      this.elements.closeCart?.focus();
    }, 400);
  }

  // بهبود بستن سبد خرید به سمت چپ
  closeCart() {
    if (!this.elements.cartModal || !this.isCartOpen) return;

    this.isCartOpen = false;
    this.elements.cartModal.classList.remove("show");

    // به‌روزرسانی ARIA attributes
    this.elements.cartModal.setAttribute("aria-hidden", "true");
    this.elements.cartButton.setAttribute("aria-expanded", "false");

    // تأخیر برای انیمیشن
    setTimeout(() => {
      this.elements.cartModal.style.display = "none";
      document.body.style.overflow = "";

      // بازگرداندن focus به دکمه سبد خرید
      this.elements.cartButton?.focus();
    }, 400);
  }

  // تسویه حساب
  checkout() {
    if (this.cart.length === 0) {
      this.showNotification("سبد خرید شما خالی است!", "error");
      return;
    }

    // انیمیشن دکمه checkout
    const originalContent = this.elements.checkoutBtn.innerHTML;
    this.elements.checkoutBtn.style.transform = "scale(0.95)";

    setTimeout(() => {
      this.elements.checkoutBtn.style.transform = "scale(1)";
    }, 150);

    // نمایش پیام ورود با انیمیشن
    if (this.elements.loginPrompt) {
      this.elements.loginPrompt.style.display = "block";
      this.elements.loginPrompt.style.opacity = "0";
      this.elements.loginPrompt.style.transform = "translateY(-10px)";

      setTimeout(() => {
        this.elements.loginPrompt.style.opacity = "1";
        this.elements.loginPrompt.style.transform = "translateY(0)";
      }, 50);

      setTimeout(() => {
        this.elements.loginPrompt.style.opacity = "0";
        this.elements.loginPrompt.style.transform = "translateY(-10px)";
        setTimeout(() => {
          this.elements.loginPrompt.style.display = "none";
        }, 300);
      }, 5000);
    }

    // شبیه‌سازی فرآیند تسویه حساب
    this.elements.checkoutBtn.innerHTML =
      '<i class="fas fa-spinner fa-spin me-2"></i>در حال پردازش...';
    this.elements.checkoutBtn.disabled = true;

    setTimeout(() => {
      this.showNotification(
        "برای تکمیل خرید وارد حساب کاربری خود شوید",
        "info"
      );
      this.elements.checkoutBtn.innerHTML = originalContent;
      this.elements.checkoutBtn.disabled = false;
    }, 2000);
  }

  // نمایش اعلان
  showNotification(message, type = "success") {
    if (!this.elements.notification) return;

    this.elements.notification.textContent = message;
    this.elements.notification.className = `notification ${type}`;
    this.elements.notification.classList.add("show");

    setTimeout(() => {
      this.elements.notification.classList.remove("show");
    }, 4000);
  }

  // پاک کردن کامل سبد خرید
  clearCart() {
    this.cart = [];
    this.saveCart();
    this.updateDisplay();
    this.showNotification("سبد خرید پاک شد", "success");
  }

  // دریافت تعداد کل محصولات
  getTotalItems() {
    return this.cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  // دریافت مجموع قیمت
  getTotalPrice() {
    return this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }
}

// ✅ Initialize Swiper sliders
function initializeSliders() {
  const swiperConfig = {
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      640: { slidesPerView: 2 },
      768: { slidesPerView: 3 },
      1024: { slidesPerView: 4 },
    },
    loop: false,
    grabCursor: true,
    keyboard: {
      enabled: true,
    },
    a11y: {
      enabled: true,
      prevSlideMessage: "اسلاید قبلی",
      nextSlideMessage: "اسلاید بعدی",
    },
  };

  // اسلایدر محصولات
  if (document.querySelector(".productsSwiper")) {
    new Swiper(".productsSwiper", {
      ...swiperConfig,
      navigation: {
        nextEl: ".productsSwiper .swiper-button-next",
        prevEl: ".productsSwiper .swiper-button-prev",
      },
    });
  }

  // اسلایدر ادوات
  if (document.querySelector(".toolsSwiper")) {
    new Swiper(".toolsSwiper", {
      ...swiperConfig,
      navigation: {
        nextEl: ".toolsSwiper .swiper-button-next",
        prevEl: ".toolsSwiper .swiper-button-prev",
      },
    });
  }

  // اسلایدر دوره‌ها
  if (document.querySelector(".coursesSwiper")) {
    new Swiper(".coursesSwiper", {
      ...swiperConfig,
      navigation: {
        nextEl: ".coursesSwiper .swiper-button-next",
        prevEl: ".coursesSwiper .swiper-button-prev",
      },
    });
  }
}

// ✅ Smooth scrolling برای لینک‌های داخلی
function initializeSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

// ✅ تغییر پس‌زمینه navbar هنگام اسکرول
function initializeNavbarEffects() {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;

  function updateNavbar() {
    if (window.scrollY > 50) {
      navbar.style.background =
        "linear-gradient(135deg, rgba(76, 175, 80, 0.95) 0%, rgba(56, 142, 60, 0.95) 100%)";
      navbar.style.backdropFilter = "blur(10px)";
    } else {
      navbar.style.background =
        "linear-gradient(135deg, var(--primary-green) 0%, var(--dark-green) 100%)";
      navbar.style.backdropFilter = "none";
    }
  }

  // Debounce برای بهینه‌سازی عملکرد
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  window.addEventListener("scroll", debounce(updateNavbar, 10));
  updateNavbar(); // فراخوانی اولیه
}

// ✅ مدیریت فرم تماس
function initializeContactForm() {
  const contactForm = document.querySelector(".contact-form");
  if (!contactForm) return;

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const submitBtn = this.querySelector(".submit-btn");
    const originalText = submitBtn.innerHTML;

    // اعتبارسنجی فرم
    const formData = new FormData(this);
    const errors = validateContactForm(formData);

    if (errors.length > 0) {
      if (window.cartManager) {
        window.cartManager.showNotification(errors[0], "error");
      }
      return;
    }

    // انیمیشن ارسال
    submitBtn.innerHTML =
      '<i class="fas fa-spinner fa-spin me-2"></i>در حال ارسال...';
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.innerHTML = '<i class="fas fa-check me-2"></i>ارسال شد!';
      submitBtn.style.background = "linear-gradient(45deg, #4CAF50, #66BB6A)";

      // ریست کردن فرم
      this.reset();

      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.style.background =
          "linear-gradient(45deg, var(--primary-green), var(--light-green))";
        submitBtn.disabled = false;
      }, 3000);
    }, 2000);
  });

  // اعتبارسنجی فرم تماس
  function validateContactForm(formData) {
    const errors = [];
    const name =
      document.querySelector('.contact-form input[type="text"]')?.value || "";
    const email =
      document.querySelector('.contact-form input[type="email"]')?.value || "";
    const message =
      document.querySelector(".contact-form textarea")?.value || "";

    if (name.length < 2) {
      errors.push("نام باید حداقل ۲ کاراکتر باشد");
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.push("ایمیل معتبر نیست");
    }

    if (message.length < 10) {
      errors.push("پیام باید حداقل ۱۰ کاراکتر باشد");
    }

    return errors;
  }
}

// ✅ مدیریت دکمه‌های احراز هویت
function initializeAuthButtons() {
  document.querySelectorAll(".auth-btn").forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const isLogin = this.textContent.includes("ورود");
      const message = isLogin
        ? "برای ورود به سیستم، لطفاً از طریق پنل مدیریت اقدام کنید."
        : "برای ثبت نام در سیستم، لطفاً از طریق پنل مدیریت اقدام کنید.";

      if (window.cartManager) {
        window.cartManager.showNotification(message, "info");
      }
    });
  });
}

// ✅ بهینه‌سازی عملکرد با Intersection Observer
function initializePerformanceOptimizations() {
  // تنها بارگذاری انیمیشن‌ها وقتی که در viewport قرار می‌گیرند
  const observerOptions = {
    root: null,
    rootMargin: "50px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // مشاهده انیمیشن‌ها
  document.querySelectorAll(".product-card, .stat-item").forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });
}

// ✅ بهبود مدیریت کلیک خارج از سبد خرید
function initializeClickOutsideHandler() {
  document.addEventListener("click", (e) => {
    if (window.cartManager && window.cartManager.isCartOpen) {
      const cartModal = document.getElementById("cartModal");
      const cartButton = document.getElementById("cartButton");

      if (
        cartModal &&
        !cartModal.contains(e.target) &&
        !cartButton.contains(e.target)
      ) {
        window.cartManager.closeCart();
      }
    }
  });
}

// ✅ مدیریت رویدادهای Bootstrap Modal
function initializeBootstrapModals() {
  const detailsModal = document.getElementById("productDetailsModal");
  if (detailsModal) {
    detailsModal.addEventListener("hidden.bs.modal", function () {
      // پاک کردن محصول فعلی هنگام بستن مودال
      if (window.cartManager) {
        window.cartManager.currentProduct = null;
        window.cartManager.currentProductType = null;
      }
    });
  }
}

// ✅ مقداردهی اولیه همه عملکردها
document.addEventListener("DOMContentLoaded", function () {
  // مقداردهی سیستم سبد خرید
  window.cartManager = new CartManager();

  // مقداردهی سایر عملکردها
  initializeSliders();
  initializeSmoothScrolling();
  initializeNavbarEffects();
  initializeContactForm();
  initializeAuthButtons();
  initializePerformanceOptimizations();
  initializeClickOutsideHandler();
  initializeBootstrapModals();

  console.log("✅ فروشگاه مهندس بخشی با موفقیت بارگذاری شد!");
});

// ✅ مدیریت خطاها
window.addEventListener("error", function (e) {
  console.error("خطای JavaScript:", e.error);
});

// ✅ مدیریت تغییر اندازه صفحه
window.addEventListener("resize", function () {
  // به‌روزرسانی layout در صورت نیاز
  if (window.cartManager) {
    window.cartManager.updateDisplay();
  }
});

// ✅ API برای دسترسی خارجی به سبد خرید
window.Cart = {
  add: (product, price, icon) => {
    if (window.cartManager) {
      const button = document.createElement("button");
      button.setAttribute("data-product", product);
      button.setAttribute("data-price", price.toString());
      button.setAttribute("data-icon", icon || "fas fa-shopping-bag");
      window.cartManager.handleAddToCart(button);
    }
  },
  clear: () => window.cartManager?.clearCart(),
  getItems: () => window.cartManager?.cart || [],
  getTotalItems: () => window.cartManager?.getTotalItems() || 0,
  getTotalPrice: () => window.cartManager?.getTotalPrice() || 0,
  open: () => window.cartManager?.openCart(),
  close: () => window.cartManager?.closeCart(),
  showDetails: (productType, productId) => {
    if (window.cartManager) {
      const product = window.cartManager.productsData[productType]?.[productId];
      if (product) {
        window.cartManager.showProductDetails(product, productType);
      }
    }
  },
};

// ✅ Service Worker Registration برای Offline Support (اختیاری)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/sw.js")
      .then(function (registration) {
        console.log("ServiceWorker registration successful");
      })
      .catch(function (error) {
        console.log("ServiceWorker registration failed: ", error);
      });
  });
}
