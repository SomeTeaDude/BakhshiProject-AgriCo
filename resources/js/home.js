// ✅ Enhanced Cart Management System با قابلیت جزئیات محصولات
class CartManager {
    constructor() {
        this.isCartOpen = false;
        this.initializeElements();
        this.bindEvents();
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
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
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
                    elementPosition + window.scrollY - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth",
                });
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

// ✅ مقداردهی اولیه همه عملکردها
document.addEventListener("DOMContentLoaded", function () {
    // مقداردهی سیستم سبد خرید
    window.cartManager = new CartManager();

    // مقداردهی سایر عملکردها
    initializeSliders();
    initializeSmoothScrolling();
    initializePerformanceOptimizations();
    initializeClickOutsideHandler();
});
