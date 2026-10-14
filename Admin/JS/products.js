const AdminPanelState = {
  products: [],

  init() {
    this.loadFromStorage();
    if (this.products.length === 0) {
      this.products = [...this.getMockData().products];
    }
    this.saveToStorage();
  },

  loadFromStorage() {
    const savedData = localStorage.getItem("adminProductsData");
    if (savedData) {
      const data = JSON.parse(savedData);
      this.products = data.products || [];
    }
  },

  saveToStorage() {
    const data = {
      products: this.products,
    };
    localStorage.setItem("adminProductsData", JSON.stringify(data));
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
        {
          id: 3,
          name: "قیچی باغبانی",
          category: "ابزار",
          price: 85000,
          stock: 15,
          status: "active",
          description: "قیچی باغبانی حرفه‌ای",
          image:
            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjOEJDMzRBIi8+Cjx0ZXh0IHg9IjQwIiB5PSI0NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0id2hpdGUiIGZvbnQtc2l6ZT0iMTIiPtin2YTYr9mI2YYg2KrYtdi32YrYsTwvdGV4dD4KPC9zdmc+",
        },
        {
          id: 4,
          name: "سموم ارگانیک",
          category: "آفت‌کش",
          price: 45000,
          stock: 25,
          status: "inactive",
          description: "سموم ارگانیک برای مبارزه با آفات",
          image:
            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjRkY1NzIyIi8+Cjx0ZXh0IHg9IjQwIiB5PSI0NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0id2hpdGUiIGZvbnQtc2l6ZT0iMTIiPtio2K/Ys9mK2LMg2KfZhNiv2Kkg2KfZhNin2YbYr9mG2YQ8L3RleHQ+Cjwvc3ZnPg==",
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
    // Create notification element
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

    // Auto remove after 3 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 3000);
  },
};

// مدیریت محصولات
const ProductsManager = {
  loadProducts() {
    const tbody = document.getElementById("productsTable");
    tbody.innerHTML = "";

    AdminPanelState.products.forEach((product) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                        <td>
                            <img src="${product.image}" alt="${
        product.name
      }" class="product-image">
                        </td>
                        <td>${product.name}</td>
                        <td>${product.category}</td>
                        <td>${product.price.toLocaleString("fa-IR")} تومان</td>
                        <td>${product.stock}</td>
                        <td>
                            <span class="status-badge ${
                              product.status === "active"
                                ? "status-active"
                                : "status-inactive"
                            }">
                                ${
                                  product.status === "active"
                                    ? "فعال"
                                    : "غیرفعال"
                                }
                            </span>
                        </td>
                        <td>
                            <button class="btn btn-sm btn-warning me-1" onclick="ProductsManager.editProduct(${
                              product.id
                            })">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn btn-sm btn-danger" onclick="ProductsManager.deleteProduct(${
                              product.id
                            })">
                                <i class="fas fa-trash"></i>
                            </button>
                        </td>
                    `;
      tbody.appendChild(row);
    });
  },

  saveProduct() {
    const product = {
      name: document.getElementById("productName").value,
      category: document.getElementById("productCategory").value,
      price: parseInt(document.getElementById("productPrice").value),
      stock: parseInt(document.getElementById("productStock").value),
      description: document.getElementById("productDescription").value,
      status: document.getElementById("productStatus").value,
      image:
        document.getElementById("previewImg").src ||
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjRTBFMEUwIi8+Cjx0ZXh0IHg9IjQwIiB5PSI0NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzk5OTk5OSIgZm9udC1zaXplPSIxMiI+2KjYr9mI2YYg2KrYtdi32YrYsTwvdGV4dD4KPC9zdmc+",
    };

    const productId = document.getElementById("productId").value;

    if (productId) {
      // Edit existing product
      const index = AdminPanelState.products.findIndex(
        (p) => p.id == productId
      );
      if (index !== -1) {
        product.id = parseInt(productId);
        AdminPanelState.products[index] = product;
      }
    } else {
      // Add new product
      product.id =
        AdminPanelState.products.length > 0
          ? Math.max(...AdminPanelState.products.map((p) => p.id)) + 1
          : 1;
      AdminPanelState.products.push(product);
    }

    AdminPanelState.saveToStorage();
    this.loadProducts();

    // Close modal and reset form
    const modal = bootstrap.Modal.getInstance(
      document.getElementById("productModal")
    );
    modal.hide();
    document.getElementById("productForm").reset();
    document.getElementById("imagePreview").style.display = "none";

    NotificationManager.show("محصول با موفقیت ذخیره شد", "success");
  },

  editProduct(id) {
    const product = AdminPanelState.products.find((p) => p.id === id);
    if (!product) return;

    document.getElementById("productId").value = product.id;
    document.getElementById("productName").value = product.name;
    document.getElementById("productCategory").value = product.category;
    document.getElementById("productPrice").value = product.price;
    document.getElementById("productStock").value = product.stock;
    document.getElementById("productDescription").value = product.description;
    document.getElementById("productStatus").value = product.status;

    if (product.image) {
      document.getElementById("previewImg").src = product.image;
      document.getElementById("imagePreview").style.display = "block";
    }

    document.getElementById("productModalTitle").textContent = "ویرایش محصول";

    const modal = new bootstrap.Modal(document.getElementById("productModal"));
    modal.show();
  },

  deleteProduct(id) {
    if (confirm("آیا از حذف این محصول اطمینان دارید؟")) {
      AdminPanelState.products = AdminPanelState.products.filter(
        (p) => p.id !== id
      );
      AdminPanelState.saveToStorage();
      this.loadProducts();
      NotificationManager.show("محصول با موفقیت حذف شد", "success");
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

    // Product image preview
    document
      .getElementById("productImage")
      .addEventListener("change", function (e) {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = function (e) {
            document.getElementById("previewImg").src = e.target.result;
            document.getElementById("imagePreview").style.display = "block";
          };
          reader.readAsDataURL(file);
        }
      });

    // Reset product modal when hidden
    document
      .getElementById("productModal")
      .addEventListener("hidden.bs.modal", function () {
        document.getElementById("productForm").reset();
        document.getElementById("productId").value = "";
        document.getElementById("productModalTitle").textContent =
          "افزودن محصول جدید";
        document.getElementById("imagePreview").style.display = "none";
      });
  },
};

// مقداردهی اولیه هنگام لود صفحه
document.addEventListener("DOMContentLoaded", function () {
  AdminPanelState.init();
  NavigationManager.initializeEventListeners();
  ProductsManager.loadProducts();

  // افزودن افکت fade-in به بخش محصولات
  document.getElementById("productsSection").classList.add("fade-in");
});
