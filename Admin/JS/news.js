const AdminPanelState = {
  news: [],

  init() {
    // Use in-memory storage instead of localStorage for Claude.ai compatibility
    if (this.news.length === 0) {
      this.news = [...this.getMockData().news];
    }
  },

  getMockData() {
    return {
      news: [
        {
          id: 1,
          title: "رونمایی از جدیدترین روش‌های کشاورزی هوشمند",
          author: "احمد رضایی",
          date: "1402/10/15",
          category: "کشاورزی",
          summary:
            "در نمایشگاه بین‌المللی کشاورزی، جدیدترین روش‌های کشاورزی هوشمند رونمایی شد که شامل استفاده از IoT و هوش مصنوعی می‌شود.",
          content:
            "متن کامل خبر درباره جدیدترین روش‌های کشاورزی هوشمند که در نمایشگاه بین‌المللی کشاورزی رونمایی شده است. این روش‌ها شامل استفاده از IoT، هوش مصنوعی و داده‌کاوی برای افزایش بهره‌وری در کشاورزی می‌شوند.\n\nکشاورزان می‌توانند با استفاده از این فناوری‌ها، مصرف آب را تا ۳۰ درصد کاهش داده و محصولات با کیفیت‌تری تولید کنند. سیستم‌های مانیتورینگ خاک و آب و هوا به صورت لحظه‌ای اطلاعات دقیقی از شرایط مزرعه ارائه می‌دهند.",
          image:
            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjMkU3RDMyIiByeD0iOCIvPgo8Y2lyY2xlIGN4PSI0MCIgY3k9IjQwIiByPSIyMCIgZmlsbD0iIzRDQUY1MCIvPgo8dGV4dCB4PSI0MCIgeT0iNDYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IndoaXRlIiBmb250LXNpemU9IjEwIiBmb250LXdlaWdodD0iYm9sZCI+2YPYtNin2YjYsdi32YogaG9zaG1hbmQ8L3RleHQ+Cjwvc3ZnPg==",
          status: "published",
          tags: ["هوشمند", "فناوری", "کشاورزی"],
        },
        {
          id: 2,
          title: "توسعه باغ‌های هوشمند در استان البرز",
          author: "فاطمه محمدی",
          date: "1402/10/10",
          category: "باغبانی",
          summary:
            "استان البرز پیشرو در توسعه باغ‌های هوشمند با استفاده از فناوری‌های نوین است",
          content:
            "متن کامل خبر درباره توسعه باغ‌های هوشمند در استان البرز. این پروژه با همکاری دانشگاه‌های معتبر و بخش خصوصی در حال اجراست و انتظار می‌رود افزایش ۳۰ درصدی تولید محصولات باغی را به همراه داشته باشد.\n\nسیستم آبیاری هوشمند و مانیتورینگ دائمی شرایط خاک از ویژگی‌های این پروژه است که به کاهش مصرف آب و افزایش کیفیت محصولات کمک می‌کند.",
          image:
            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjNkQ0QzQxIiByeD0iOCIvPgo8Y2lyY2xlIGN4PSI0MCIgY3k9IjQwIiByPSIyMCIgZmlsbD0iIzhCQzM0QSIvPgo8dGV4dCB4PSI0MCIgeT0iNDYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IndoaXRlIiBmb250LXNpemU9IjEwIiBmb250LXdlaWdodD0iYm9sZCI+2KjYp9ioINmh2YjYtNmF2YbYrzwvdGV4dD4KPC9zdmc+",
          status: "published",
          tags: ["باغبانی", "البرز", "هوشمند"],
        },
        {
          id: 3,
          title: "راهکارهای نوین برای مبارزه با آفات کشاورزی",
          author: "دکتر کریمی",
          date: "1402/10/12",
          category: "تحقیقات",
          summary:
            "محققان ایرانی به روش‌های جدیدی برای کنترل آفات دست یافته‌اند",
          content:
            "تیم تحقیقاتی دانشگاه تهران پس از ۳ سال مطالعه، موفق به توسعه روش‌های نوینی برای کنترل آفات کشاورزی شده‌اند. این روش‌ها که مبتنی بر کنترل بیولوژیک هستند، می‌توانند جایگزین مناسبی برای سموم شیمیایی باشند و اثرات مخرب زیست‌محیطی را کاهش دهند.\n\nاین پژوهش نشان می‌دهد که استفاده از دشمنان طبیعی آفات می‌تواند تا ۷۰ درصد خسارات آفات را کاهش دهد.",
          image:
            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjMjE5NkYzIiByeD0iOCIvPgo8Y2lyY2xlIGN4PSI0MCIgY3k9IjQwIiByPSIyMCIgZmlsbD0iIzQyQTVGNSIvPgo8dGV4dCB4PSI0MCIgeT0iNDYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IndoaXRlIiBmb250LXNpemU9IjEwIiBmb250LXdlaWdodD0iYm9sZCI+2KrYrdmC2YrZgtinINii2YHYp9iqPC90ZXh0Pgo8L3N2Zz4=",
          status: "draft",
          tags: ["آفات", "تحقیقات", "کنترل بیولوژیک"],
        },
        {
          id: 4,
          title: "تولید محصولات ارگانیک؛ فرصتی برای صادرات",
          author: "مهندس حسینی",
          date: "1402/10/08",
          category: "صنایع غذایی",
          summary: "رشد ۴۰ درصدی تقاضا برای محصولات ارگانیک در بازارهای جهانی",
          content:
            "با افزایش آگاهی مصرف‌کنندگان درباره اهمیت سلامت غذایی، تقاضا برای محصولات ارگانیک در بازارهای جهانی با رشد ۴۰ درصدی مواجه شده است.\n\nاین فرصت مناسبی برای تولیدکنندگان ایرانی است تا با رعایت استانداردهای بین‌المللی، سهم خود را از این بازار افزایش دهند. صدور گواهینامه‌های بین‌المللی و ایجاد زنجیره تأمین پایدار از اولویت‌های مهم این بخش محسوب می‌شود.",
          image:
            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjOUMzN0I2IiByeD0iOCIvPgo8Y2lyY2xlIGN4PSI0MCIgY3k9IjQwIiByPSIyMCIgZmlsbD0iI0FCNDdCQyIvPgo8dGV4dCB4PSI0MCIgeT0iNDYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IndoaXRlIiBmb250LXNpemU9IjEwIiBmb250LXdlaWdodD0iYm9sZCI+2KfYsdqv2KfZhtmK2qkg2KfYsdqv2KfZhtmM2qkg2KfYsdqv2KfZhtmI2qkg2YXYrdiz2YjZhNin2Kog2KfYsdqv2KfZhtmM2qo8L3RleHQ+Cjwvc3ZnPg==",
          status: "published",
          tags: ["ارگانیک", "صادرات", "صنایع غذایی"],
        },
      ],
    };
  },

  logout() {
    if (confirm("آیا می‌خواهید از پنل خارج شوید؟")) {
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
      "top: 20px; left: 20px; z-index: 9999; min-width: 300px; max-width: 500px;";
    notification.innerHTML = `
                    ${message}
                    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                `;

    document.body.appendChild(notification);

    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 4000);
  },
};

// مدیریت اخبار
const NewsManager = {
  loadNews(filter = "all") {
    const tbody = document.getElementById("newsTable");
    tbody.innerHTML = "";

    let filteredNews = AdminPanelState.news;
    if (filter !== "all") {
      filteredNews = AdminPanelState.news.filter(
        (news) => news.status === filter
      );
    }

    if (filteredNews.length === 0) {
      tbody.innerHTML = `
              <tr>
                <td colspan="8" class="text-center py-4 text-muted">
                  <i class="fas fa-newspaper fa-3x mb-3 d-block"></i>
                  هیچ خبری یافت نشد
                </td>
              </tr>
            `;
      this.updateStats();
      return;
    }

    filteredNews.forEach((news) => {
      const categoryClass = {
        کشاورزی: "category-agriculture",
        باغبانی: "category-gardening",
        دامپروری: "category-livestock",
        "صنایع غذایی": "category-food",
        تحقیقات: "category-research",
      };

      const row = document.createElement("tr");
      row.innerHTML = `
                        <td>
                            <img src="${news.image}" alt="${
        news.title
      }" class="news-image">
                        </td>
                        <td>
                            <div><strong>${news.title}</strong></div>
                            <div class="news-tags mt-1">
                                ${news.tags
                                  .map(
                                    (tag) =>
                                      `<span class="badge bg-light text-dark me-1" style="font-size: 9px;">#${tag}</span>`
                                  )
                                  .join("")}
                            </div>
                        </td>
                        <td class="d-none d-md-table-cell">
                            <div class="news-preview-content">${
                              news.summary
                            }</div>
                        </td>
                        <td class="d-none d-sm-table-cell">${news.author}</td>
                        <td><small>${news.date}</small></td>
                        <td>
                            <span class="category-badge ${
                              categoryClass[news.category]
                            }">${news.category}</span>
                        </td>
                        <td>
                            <span class="status-badge ${
                              news.status === "published"
                                ? "status-published"
                                : "status-draft"
                            }">
                                ${
                                  news.status === "published"
                                    ? "منتشر"
                                    : "پیش‌نویس"
                                }
                            </span>
                        </td>
                        <td>
                            <div class="btn-group-vertical btn-group-sm" role="group">
                                <button class="btn btn-sm btn-info" onclick="NewsManager.previewNews(${
                                  news.id
                                })" title="پیش‌نمایش">
                                    <i class="fas fa-eye"></i>
                                </button>
                                <button class="btn btn-sm btn-warning" onclick="NewsManager.editNews(${
                                  news.id
                                })" title="ویرایش">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button class="btn btn-sm btn-danger" onclick="NewsManager.deleteNews(${
                                  news.id
                                })" title="حذف">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </td>
                    `;
      tbody.appendChild(row);
    });

    this.updateStats();
  },

  updateStats() {
    const totalNews = AdminPanelState.news.length;
    const publishedNews = AdminPanelState.news.filter(
      (n) => n.status === "published"
    ).length;
    const draftNews = AdminPanelState.news.filter(
      (n) => n.status === "draft"
    ).length;

    // شبیه‌سازی اخبار امروز
    const today = new Date().toLocaleDateString("fa-IR");
    const todayNews = AdminPanelState.news.filter(
      (n) => n.date === today
    ).length;

    document.getElementById("totalNews").textContent = totalNews;
    document.getElementById("publishedNews").textContent = publishedNews;
    document.getElementById("draftNews").textContent = draftNews;
    document.getElementById("todayNews").textContent = todayNews;
  },

  filterNews(status) {
    document
      .querySelectorAll(".btn-group .btn")
      .forEach((btn) => btn.classList.remove("active"));
    event.target.classList.add("active");
    this.loadNews(status);
  },

  saveNews() {
    const form = document.getElementById("newsForm");
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const news = {
      title: document.getElementById("newsTitle").value.trim(),
      author: document.getElementById("newsAuthor").value.trim(),
      date: document.getElementById("newsDate").value,
      category: document.getElementById("newsCategory").value,
      summary: document.getElementById("newsSummary").value.trim(),
      content: document.getElementById("newsContent").value.trim(),
      status: document.getElementById("newsStatus").value,
      image:
        document.getElementById("previewNewsImg").src ||
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjRTBFMEUwIiByeD0iOCIvPgo8dGV4dCB4PSI0MCIgeT0iNDYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM5OTk5OTkiIGZvbnQtc2l6ZT0iMTAiPtio2K/ZiNmGINiq2LXZiNuM2LE8L3RleHQ+Cjwvc3ZnPg==",
      tags: [],
    };

    // استخراج تگ‌ها از عنوان و خلاصه خبر
    const tags = this.extractTags(news.title + " " + news.summary);
    news.tags = tags;

    const newsId = document.getElementById("newsId").value;

    if (newsId) {
      // ویرایش خبر موجود
      const index = AdminPanelState.news.findIndex((n) => n.id == newsId);
      if (index !== -1) {
        news.id = parseInt(newsId);
        AdminPanelState.news[index] = news;
      }
    } else {
      // افزودن خبر جدید
      news.id =
        AdminPanelState.news.length > 0
          ? Math.max(...AdminPanelState.news.map((n) => n.id)) + 1
          : 1;
      AdminPanelState.news.push(news);
    }

    this.loadNews();

    // بستن مودال و بازنشانی فرم
    const modal = bootstrap.Modal.getInstance(
      document.getElementById("newsModal")
    );
    modal.hide();

    NotificationManager.show("خبر با موفقیت ذخیره شد", "success");
  },

  extractTags(text) {
    // کلمات کلیدی رایج در حوزه کشاورزی
    const keywords = [
      "کشاورزی",
      "باغبانی",
      "دامپروری",
      "صنایع غذایی",
      "تحقیقات",
      "هوشمند",
      "فناوری",
      "ارگانیک",
      "پایدار",
      "آبیاری",
      "آفات",
      "سموم",
      "کود",
      "بذر",
      "محصولات",
      "صادرات",
      "بازار",
      "تولید",
      "کیفیت",
      "سلامت",
      "بیولوژیک",
      "زیست محیطی",
    ];

    const foundTags = [];

    keywords.forEach((keyword) => {
      if (text.includes(keyword) && !foundTags.includes(keyword)) {
        foundTags.push(keyword);
      }
    });

    // محدود کردن تعداد تگ‌ها به ۳ عدد
    return foundTags.slice(0, 3);
  },

  editNews(id) {
    const news = AdminPanelState.news.find((n) => n.id === id);
    if (!news) return;

    document.getElementById("newsId").value = news.id;
    document.getElementById("newsTitle").value = news.title;
    document.getElementById("newsAuthor").value = news.author;
    document.getElementById("newsDate").value = news.date;
    document.getElementById("newsCategory").value = news.category;
    document.getElementById("newsSummary").value = news.summary;
    document.getElementById("newsContent").value = news.content;
    document.getElementById("newsStatus").value = news.status;

    if (news.image) {
      document.getElementById("previewNewsImg").src = news.image;
      document.getElementById("newsImagePreview").style.display = "block";
    }

    document.getElementById("newsModalTitle").textContent = "ویرایش خبر";

    const modal = new bootstrap.Modal(document.getElementById("newsModal"));
    modal.show();
  },

  deleteNews(id) {
    if (confirm("آیا از حذف این خبر اطمینان دارید؟")) {
      AdminPanelState.news = AdminPanelState.news.filter((n) => n.id !== id);
      this.loadNews();
      NotificationManager.show("خبر با موفقیت حذف شد", "success");
    }
  },

  previewNews(newsId = null) {
    let news;

    if (newsId) {
      // پیش‌نمایش خبر موجود
      news = AdminPanelState.news.find((n) => n.id === newsId);
    } else {
      // پیش‌نمایش خبر جدید از فرم
      const form = document.getElementById("newsForm");
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      news = {
        title: document.getElementById("newsTitle").value || "عنوان نمونه",
        author: document.getElementById("newsAuthor").value || "نویسنده نمونه",
        date: document.getElementById("newsDate").value || "1402/10/15",
        category: document.getElementById("newsCategory").value || "کشاورزی",
        summary: document.getElementById("newsSummary").value || "خلاصه نمونه",
        content:
          document.getElementById("newsContent").value || "متن کامل خبر نمونه",
        image:
          document.getElementById("previewNewsImg").src ||
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjRTBFMEUwIiByeD0iOCIvPgo8dGV4dCB4PSI0MCIgeT0iNDYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM5OTk5OTkiIGZvbnQtc2l6ZT0iMTAiPtio2K/ZiNmGINiq2LXZiNuM2LE8L3RleHQ+Cjwvc3ZnPg==",
        tags: [],
      };

      // استخراج تگ‌ها برای پیش‌نمایش
      news.tags = this.extractTags(news.title + " " + news.summary);
    }

    if (!news) return;

    const previewContent = document.getElementById("newsPreviewContent");
    previewContent.innerHTML = `
                    <div class="news-preview-container">
                        <div class="text-center mb-4">
                            <img src="${news.image}" alt="${
      news.title
    }" class="img-fluid rounded shadow-sm" style="max-height: 300px;">
                        </div>
                        
                        <h2 class="mb-3 text-primary">${news.title}</h2>
                        
                        <div class="row mb-4 text-muted small">
                            <div class="col-md-4">
                                <i class="fas fa-user me-1"></i>
                                <strong>نویسنده:</strong> ${news.author}
                            </div>
                            <div class="col-md-4">
                                <i class="fas fa-calendar me-1"></i>
                                <strong>تاریخ:</strong> ${news.date}
                            </div>
                            <div class="col-md-4">
                                <i class="fas fa-tag me-1"></i>
                                <strong>دسته:</strong> ${news.category}
                            </div>
                        </div>

                        <div class="alert alert-info mb-4">
                            <strong><i class="fas fa-info-circle me-2"></i>خلاصه خبر:</strong>
                            <p class="mb-0 mt-2">${news.summary}</p>
                        </div>

                        <div class="news-content mb-4">
                            ${news.content
                              .split("\n")
                              .map((paragraph) =>
                                paragraph.trim()
                                  ? `<p class="mb-3">${paragraph}</p>`
                                  : ""
                              )
                              .join("")}
                        </div>

                        ${
                          news.tags && news.tags.length > 0
                            ? `
                            <div class="tags-section p-3 bg-light rounded">
                                <strong><i class="fas fa-tags me-2"></i>برچسب‌ها:</strong>
                                <div class="mt-2">
                                    ${news.tags
                                      .map(
                                        (tag) =>
                                          `<span class="badge bg-primary me-1">#${tag}</span>`
                                      )
                                      .join("")}
                                </div>
                            </div>
                        `
                            : ""
                        }
                    </div>
                `;

    const modal = new bootstrap.Modal(
      document.getElementById("newsPreviewModal")
    );
    modal.show();
  },
};

// مدیریت ناوبری
const NavigationManager = {
  initializeEventListeners() {
    // Sidebar toggle
    const toggleBtn = document.getElementById("toggleSidebar");
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("sidebarOverlay");

    toggleBtn?.addEventListener("click", () => {
      sidebar.classList.add("show");
      overlay.classList.add("show");
    });

    overlay?.addEventListener("click", () => {
      sidebar.classList.remove("show");
      overlay.classList.remove("show");
    });

    // Close sidebar on escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && sidebar.classList.contains("show")) {
        sidebar.classList.remove("show");
        overlay.classList.remove("show");
      }
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

    // News image preview
    const newsImageInput = document.getElementById("newsImage");
    newsImageInput?.addEventListener("change", function (e) {
      const file = e.target.files[0];
      if (file) {
        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          NotificationManager.show(
            "حجم فایل نباید از ۵ مگابایت بیشتر باشد",
            "error"
          );
          this.value = "";
          return;
        }

        // Validate file type
        if (!file.type.startsWith("image/")) {
          NotificationManager.show(
            "لطفاً فقط فایل تصویری انتخاب کنید",
            "error"
          );
          this.value = "";
          return;
        }

        const reader = new FileReader();
        reader.onload = function (e) {
          document.getElementById("previewNewsImg").src = e.target.result;
          document.getElementById("newsImagePreview").style.display = "block";
        };
        reader.readAsDataURL(file);
      }
    });

    // Character counter for summary
    const summaryTextarea = document.getElementById("newsSummary");
    summaryTextarea?.addEventListener("input", function () {
      const maxLength = 200;
      const currentLength = this.value.length;

      if (currentLength > maxLength) {
        this.value = this.value.substring(0, maxLength);
      }

      // Update character counter if exists
      const counter = this.parentNode.querySelector(".char-counter");
      if (counter) {
        counter.textContent = `${Math.min(
          currentLength,
          maxLength
        )}/${maxLength}`;
      } else {
        const formText = this.parentNode.querySelector(".form-text");
        if (formText) {
          formText.innerHTML = `حداکثر 200 کاراکتر <span class="char-counter">(${Math.min(
            currentLength,
            maxLength
          )}/200)</span>`;
        }
      }
    });

    // Auto-resize textarea
    const textareas = document.querySelectorAll("textarea");
    textareas.forEach((textarea) => {
      textarea.addEventListener("input", function () {
        this.style.height = "auto";
        this.style.height = this.scrollHeight + "px";
      });
    });

    // Form validation
    const newsForm = document.getElementById("newsForm");
    newsForm?.addEventListener("submit", function (e) {
      e.preventDefault();
      NewsManager.saveNews();
    });

    // Reset news modal when hidden
    document
      .getElementById("newsModal")
      ?.addEventListener("hidden.bs.modal", function () {
        const form = document.getElementById("newsForm");
        form.reset();
        form.classList.remove("was-validated");
        document.getElementById("newsId").value = "";
        document.getElementById("newsModalTitle").textContent =
          "افزودن خبر جدید";
        document.getElementById("newsImagePreview").style.display = "none";

        // Reset character counter
        const formText = document
          .querySelector("#newsSummary")
          .parentNode.querySelector(".form-text");
        if (formText) {
          formText.innerHTML = "حداکثر 200 کاراکتر";
        }
      });

    // Handle window resize
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 992) {
        sidebar.classList.remove("show");
        overlay.classList.remove("show");
      }
    });
  },
};

// Utility functions
const Utils = {
  // Format Persian date
  formatPersianDate(dateString) {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("fa-IR");
  },

  // Debounce function for search/filter
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Truncate text
  truncateText(text, maxLength = 100) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + "...";
  },

  // Validate form data
  validateNewsData(data) {
    const errors = [];

    if (!data.title || data.title.trim().length < 5) {
      errors.push("عنوان خبر باید حداقل ۵ کاراکتر باشد");
    }

    if (!data.author || data.author.trim().length < 2) {
      errors.push("نام نویسنده باید حداقل ۲ کاراکتر باشد");
    }

    if (!data.summary || data.summary.trim().length < 20) {
      errors.push("خلاصه خبر باید حداقل ۲۰ کاراکتر باشد");
    }

    if (!data.content || data.content.trim().length < 50) {
      errors.push("متن خبر باید حداقل ۵۰ کاراکتر باشد");
    }

    return errors;
  },
};

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  try {
    AdminPanelState.init();
    NavigationManager.initializeEventListeners();
    NewsManager.loadNews();

    // Add fade-in animation to news section
    const newsSection = document.getElementById("newsSection");
    if (newsSection) {
      newsSection.classList.add("fade-in");
    }

    // Set today's date as default for new news
    const today = new Date().toISOString().split("T")[0];
    const dateInput = document.getElementById("newsDate");
    if (dateInput) {
      dateInput.value = today;
    }

    console.log("News management system initialized successfully");
  } catch (error) {
    console.error("Error initializing news management system:", error);
    NotificationManager.show("خطا در بارگذاری سیستم", "error");
  }
});

// Handle offline/online status
window.addEventListener("online", () => {
  NotificationManager.show("اتصال اینترنت برقرار شد", "success");
});

window.addEventListener("offline", () => {
  NotificationManager.show("اتصال اینترنت قطع شد", "error");
});
