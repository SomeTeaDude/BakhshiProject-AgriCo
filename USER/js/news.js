// مدیریت اخبار
const NewsManager = {
  newsData: null,
  currentPage: 1,
  itemsPerPage: 6,
  currentCategory: "all",
  currentSearch: "",
  bookmarkedNews: [],

  // مقداردهی اولیه
  init() {
    this.loadNewsData();
    this.loadBookmarks();
    this.renderNews();
    this.setupEventListeners();
    this.setupSidebar();
  },

  // بارگذاری داده‌های اخبار
  loadNewsData() {
    const savedData = localStorage.getItem("userNewsData");

    if (savedData) {
      try {
        this.newsData = JSON.parse(savedData);
      } catch (error) {
        console.error("Error parsing news data:", error);
        this.newsData = this.getDefaultNewsData();
      }
    } else {
      this.newsData = this.getDefaultNewsData();
    }
  },

  // بارگذاری نشان‌گذاری‌ها
  loadBookmarks() {
    const savedBookmarks = localStorage.getItem("newsBookmarks");
    if (savedBookmarks) {
      try {
        this.bookmarkedNews = JSON.parse(savedBookmarks);
      } catch (error) {
        console.error("Error parsing bookmarks:", error);
        this.bookmarkedNews = [];
      }
    }
  },

  // ذخیره نشان‌گذاری‌ها
  saveBookmarks() {
    try {
      localStorage.setItem(
        "newsBookmarks",
        JSON.stringify(this.bookmarkedNews)
      );
      return true;
    } catch (error) {
      console.error("Error saving bookmarks:", error);
      return false;
    }
  },

  // داده‌های پیش‌فرض اخبار
  getDefaultNewsData() {
    return {
      news: [
        {
          id: 1,
          title: "تکنیک‌های جدید آبیاری در کشاورزی مدرن",
          date: "1402/09/18",
          category: "technology",
          categoryText: "تکنولوژی",
          excerpt:
            "استفاده از سیستم‌های آبیاری هوشمند می‌تواند تا 40% در مصرف آب صرفه‌جویی کند. این سیستم‌ها با استفاده از سنسورهای رطوبت سنج و هوش مصنوعی، نیاز آبی گیاهان را به دقت محاسبه می‌کنند.",
          image:
            "https://images.unsplash.com/photo-1620646233562-f2a31ad24425?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          tags: ["آبیاری", "هوشمند", "صرفه‌جویی"],
          content:
            "استفاده از سیستم‌های آبیاری هوشمند می‌تواند تا 40% در مصرف آب صرفه‌جویی کند. این سیستم‌ها با استفاده از سنسورهای رطوبت سنج و هوش مصنوعی، نیاز آبی گیاهان را به دقت محاسبه می‌کنند. کشاورزان می‌توانند از طریق اپلیکیشن‌های موبایل، سیستم آبیاری مزارع خود را کنترل کنند.",
          author: "دکتر محمدی",
          readTime: "5 دقیقه",
          featured: true,
        },
        {
          id: 2,
          title: "کشت ارگانیک سبزیجات در خانه",
          date: "1402/09/15",
          category: "gardening",
          categoryText: "باغبانی",
          excerpt:
            "کشت سبزیجات ارگانیک در خانه نه تنها باعث دسترسی به محصولات سالم می‌شود، بلکه به کاهش آلودگی محیط زیست نیز کمک می‌کند.",
          image:
            "https://images.unsplash.com/photo-1598301257982-0cf01499abb2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          tags: ["ارگانیک", "سبزیجات", "کشت خانگی"],
          content:
            "کشت سبزیجات ارگانیک در خانه نه تنها باعث دسترسی به محصولات سالم می‌شود، بلکه به کاهش آلودگی محیط زیست نیز کمک می‌کند. برای شروع، می‌توانید از گلدان‌های کوچک در بالکن یا پشت بام استفاده کنید.",
          author: "مهندس رضایی",
          readTime: "3 دقیقه",
          hot: true,
        },
        {
          id: 3,
          title: "کنفرانس بین‌المللی کشاورزی پایدار 1402",
          date: "1402/09/12",
          category: "events",
          categoryText: "رویدادها",
          excerpt:
            "کنفرانس بین‌المللی کشاورزی پایدار با حضور متخصصان از 20 کشور مختلف در تهران برگزار خواهد شد.",
          image:
            "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          tags: ["کنفرانس", "بین‌المللی", "کشاورزی پایدار"],
          content:
            "کنفرانس بین‌المللی کشاورزی پایدار با حضور متخصصان از 20 کشور مختلف در تهران برگزار خواهد شد. این کنفرانس فرصتی است برای تبادل تجربیات و دانش روز در زمینه کشاورزی مدرن.",
          author: "سازمان کشاورزی",
          readTime: "4 دقیقه",
        },
        {
          id: 4,
          title: "آموزش کوددهی صحیح برای درختان میوه",
          date: "1402/09/10",
          category: "education",
          categoryText: "آموزشی",
          excerpt:
            "کوددهی صحیح یکی از مهمترین عوامل در رشد و باروری درختان میوه است. در این مقاله با روش‌های صحیح کوددهی آشنا می‌شوید.",
          image:
            "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          tags: ["کوددهی", "درختان میوه", "آموزش"],
          content:
            "کوددهی صحیح یکی از مهمترین عوامل در رشد و باروری درختان میوه است. در این مقاله با روش‌های صحیح کوددهی آشنا می‌شوید. زمان‌بندی صحیح و استفاده از کودهای مناسب می‌تواند عملکرد باغ را تا 30% افزایش دهد.",
          author: "دکتر حسینی",
          readTime: "6 دقیقه",
        },
        {
          id: 5,
          title: "تأثیر تغییرات اقلیمی بر کشاورزی ایران",
          date: "1402/09/08",
          category: "agriculture",
          categoryText: "کشاورزی",
          excerpt:
            "تغییرات اقلیمی تأثیر مستقیمی بر الگوی کشت و تولید محصولات کشاورزی در ایران داشته است.",
          image:
            "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          tags: ["تغییرات اقلیمی", "کشاورزی", "ایران"],
          content:
            "تغییرات اقلیمی تأثیر مستقیمی بر الگوی کشت و تولید محصولات کشاورزی در ایران داشته است. کشاورزان باید با استفاده از روش‌های نوین، خود را با این تغییرات تطبیق دهند.",
          author: "پروفسور کریمی",
          readTime: "7 دقیقه",
        },
        {
          id: 6,
          title: "استفاده از پهپاد در سمپاشی مزارع",
          date: "1402/09/05",
          category: "technology",
          categoryText: "تکنولوژی",
          excerpt:
            "پهپادها انقلابی در صنعت سمپاشی مزارع ایجاد کرده‌اند. این تکنولوژی دقت سمپاشی را افزایش داده و مصرف سموم را کاهش می‌دهد.",
          image:
            "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          tags: ["پهپاد", "سمپاشی", "تکنولوژی"],
          content:
            "پهپادها انقلابی در صنعت سمپاشی مزارع ایجاد کرده‌اند. این تکنولوژی دقت سمپاشی را افزایش داده و مصرف سموم را کاهش می‌دهد. همچنین ایمنی کارگران نیز بهبود یافته است.",
          author: "مهندس محمدی",
          readTime: "5 دقیقه",
        },
        {
          id: 7,
          title: "کشت هیدروپونیک؛ آینده کشاورزی شهری",
          date: "1402/09/03",
          category: "technology",
          categoryText: "تکنولوژی",
          excerpt:
            "کشت هیدروپونیک امکان تولید محصولات کشاورزی در فضای محدود شهری را فراهم می‌کند.",
          image:
            "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          tags: ["هیدروپونیک", "کشاورزی شهری", "آینده"],
          content:
            "کشت هیدروپونیک امکان تولید محصولات کشاورزی در فضای محدود شهری را فراهم می‌کند. این روش مصرف آب را تا 90% کاهش داده و نیازی به خاک ندارد.",
          author: "دکتر احمدی",
          readTime: "8 دقیقه",
          featured: true,
        },
        {
          id: 8,
          title: "نحوه مبارزه با آفات گوجه فرنگی",
          date: "1402/09/01",
          category: "gardening",
          categoryText: "باغبانی",
          excerpt:
            "آفات گوجه فرنگی می‌توانند خسارات زیادی به محصول وارد کنند. در این مقاله با روش‌های مبارزه با این آفات آشنا می‌شوید.",
          image:
            "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          tags: ["آفات", "گوجه فرنگی", "مبارزه"],
          content:
            "آفات گوجه فرنگی می‌توانند خسارات زیادی به محصول وارد کنند. در این مقاله با روش‌های مبارزه با این آفات آشنا می‌شوید. استفاده از روش‌های ارگانیک برای مبارزه با آفات توصیه می‌شود.",
          author: "مهندس فلاحی",
          readTime: "4 دقیقه",
        },
      ],
    };
  },

  // رندر اخبار
  renderNews() {
    const container = document.getElementById("newsContainer");
    if (!container) return;

    // فیلتر کردن اخبار
    let filteredNews = this.newsData.news;

    // فیلتر بر اساس دسته‌بندی
    if (this.currentCategory !== "all") {
      filteredNews = filteredNews.filter(
        (news) => news.category === this.currentCategory
      );
    }

    // فیلتر بر اساس جستجو
    if (this.currentSearch) {
      const searchTerm = this.currentSearch.toLowerCase();
      filteredNews = filteredNews.filter(
        (news) =>
          news.title.toLowerCase().includes(searchTerm) ||
          news.excerpt.toLowerCase().includes(searchTerm) ||
          news.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
      );
    }

    // اگر خبری وجود ندارد
    if (filteredNews.length === 0) {
      container.innerHTML = this.getEmptyNewsHTML();
      document.getElementById("loadMoreBtn").style.display = "none";
      return;
    }

    // محاسبه اخبار برای صفحه جاری
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    const newsToShow = filteredNews.slice(0, endIndex);

    const fragment = document.createDocumentFragment();

    newsToShow.forEach((news) => {
      const col = document.createElement("div");
      col.className = "col-md-6 col-lg-4 mb-4";
      col.innerHTML = this.getNewsCardHTML(news);
      fragment.appendChild(col);
    });

    container.innerHTML = "";
    container.appendChild(fragment);

    // نمایش/مخفی کردن دکمه بارگذاری بیشتر
    const loadMoreBtn = document.getElementById("loadMoreBtn");
    if (loadMoreBtn) {
      if (endIndex >= filteredNews.length) {
        loadMoreBtn.style.display = "none";
      } else {
        loadMoreBtn.style.display = "block";
      }
    }
  },

  // HTML برای زمانی که خبری وجود ندارد
  getEmptyNewsHTML() {
    return `
                    <div class="col-12">
                        <div class="empty-news">
                            <i class="fas fa-newspaper"></i>
                            <h5 class="text-muted">هیچ خبری یافت نشد</h5>
                            <p class="text-muted">لطفاً فیلترهای جستجو را تغییر دهید یا دوباره امتحان کنید</p>
                            <button class="btn btn-primary" onclick="NewsManager.resetFilters()">
                                <i class="fas fa-refresh me-1"></i>
                                بازنشانی فیلترها
                            </button>
                        </div>
                    </div>
                `;
  },

  // HTML برای هر کارت خبر
  getNewsCardHTML(news) {
    const isBookmarked = this.bookmarkedNews.includes(news.id);
    let cardClass = "news-card";
    if (news.featured) cardClass += " featured";
    if (news.hot) cardClass += " hot";

    return `
                    <div class="${cardClass} fade-in">
                        <div class="position-relative">
                            <img src="${news.image}" alt="${
      news.title
    }" class="news-image w-100">
                            <span class="news-category">${
                              news.categoryText
                            }</span>
                        </div>
                        <div class="news-meta">
                            <span><i class="fas fa-calendar me-1"></i>${
                              news.date
                            }</span>
                            <span><i class="fas fa-clock me-1"></i>${
                              news.readTime
                            }</span>
                        </div>
                        <h5 class="news-title">${news.title}</h5>
                        <p class="news-excerpt">${news.excerpt}</p>
                        <div class="news-tags">
                            ${news.tags
                              .map(
                                (tag) => `<span class="news-tag">#${tag}</span>`
                              )
                              .join("")}
                        </div>
                        <div class="d-flex justify-content-between align-items-center">
                            <button class="btn btn-primary btn-sm" onclick="NewsManager.readNews(${
                              news.id
                            })">
                                مطالعه بیشتر
                                <i class="fas fa-arrow-left ms-1"></i>
                            </button>
                            <div class="news-actions">
                                <i class="fas fa-bookmark news-bookmark ${
                                  isBookmarked ? "active" : ""
                                }" 
                                   onclick="NewsManager.toggleBookmark(${
                                     news.id
                                   })"
                                   title="${
                                     isBookmarked
                                       ? "حذف از نشان‌گذاری‌ها"
                                       : "افزودن به نشان‌گذاری‌ها"
                                   }"></i>
                                <i class="fas fa-share news-share" onclick="NewsManager.shareNews(${
                                  news.id
                                })" title="اشتراک‌گذاری"></i>
                            </div>
                        </div>
                    </div>
                `;
  },

  // مطالعه خبر
  readNews(newsId) {
    const news = this.newsData.news.find((n) => n.id === newsId);
    if (!news) return;

    const modalTitle = document.getElementById("newsDetailTitle");
    const modalContent = document.getElementById("newsDetailContent");
    const modalBookmark = document.getElementById("modalBookmark");

    if (modalTitle && modalContent && modalBookmark) {
      modalTitle.textContent = news.title;

      const isBookmarked = this.bookmarkedNews.includes(news.id);
      modalBookmark.className = `fas fa-bookmark news-bookmark ${
        isBookmarked ? "active" : ""
      }`;
      modalBookmark.onclick = () => this.toggleBookmark(news.id);

      modalContent.innerHTML = `
                        <div class="row">
                            <div class="col-md-12">
                                <img src="${news.image}" alt="${
        news.title
      }" class="img-fluid rounded mb-3">
                            </div>
                        </div>
                        <div class="news-meta mb-3">
                            <span><i class="fas fa-calendar me-1"></i>${
                              news.date
                            }</span>
                            <span><i class="fas fa-clock me-1"></i>${
                              news.readTime
                            }</span>
                            <span><i class="fas fa-user me-1"></i>${
                              news.author
                            }</span>
                            <span class="badge bg-primary">${
                              news.categoryText
                            }</span>
                        </div>
                        <div class="news-tags mb-3">
                            ${news.tags
                              .map(
                                (tag) => `<span class="news-tag">#${tag}</span>`
                              )
                              .join("")}
                        </div>
                        <div class="news-content">
                            <p>${news.content}</p>
                            <p>این مقاله توسط <strong>${
                              news.author
                            }</strong> نوشته شده و در تاریخ ${
        news.date
      } منتشر شده است.</p>
                        </div>
                    `;

      const modal = new bootstrap.Modal(
        document.getElementById("newsDetailModal")
      );
      modal.show();
    }
  },

  // نشان‌گذاری/حذف نشان‌گذاری خبر
  toggleBookmark(newsId) {
    const index = this.bookmarkedNews.indexOf(newsId);

    if (index === -1) {
      // افزودن به نشان‌گذاری‌ها
      this.bookmarkedNews.push(newsId);
      this.showNotification("خبر به نشان‌گذاری‌ها اضافه شد", "success");
    } else {
      // حذف از نشان‌گذاری‌ها
      this.bookmarkedNews.splice(index, 1);
      this.showNotification("خبر از نشان‌گذاری‌ها حذف شد", "info");
    }

    this.saveBookmarks();
    this.renderNews();

    // بروزرسانی آیکون در مودال اگر باز است
    const modalBookmark = document.getElementById("modalBookmark");
    if (modalBookmark) {
      const isBookmarked = this.bookmarkedNews.includes(newsId);
      modalBookmark.className = `fas fa-bookmark news-bookmark ${
        isBookmarked ? "active" : ""
      }`;
    }
  },

  // اشتراک‌گذاری خبر
  shareNews(newsId = null) {
    let news = null;
    if (newsId) {
      news = this.newsData.news.find((n) => n.id === newsId);
    }

    if (news) {
      const shareText = `خبر: ${news.title}\n\n${news.excerpt}\n\nمطالعه بیشتر در اپلیکیشن فروشگاه کشاورزی`;
      if (navigator.share) {
        navigator.share({
          title: news.title,
          text: shareText,
          url: window.location.href,
        });
      } else {
        // Fallback برای مرورگرهای قدیمی
        prompt("برای اشتراک‌گذاری، متن زیر را کپی کنید:", shareText);
      }
    } else {
      this.showNotification("امکان اشتراک‌گذاری این خبر وجود ندارد", "info");
    }
  },

  // جستجوی اخبار
  searchNews() {
    this.currentSearch = document.getElementById("newsSearch").value;
    this.currentPage = 1;
    this.renderNews();
  },

  // فیلتر بر اساس دسته‌بندی
  filterByCategory() {
    this.currentCategory = document.getElementById("categoryFilter").value;
    this.currentPage = 1;
    this.renderNews();
  },

  // بارگذاری اخبار بیشتر
  loadMoreNews() {
    this.currentPage++;
    this.renderNews();
  },

  // بازنشانی فیلترها
  resetFilters() {
    this.currentCategory = "all";
    this.currentSearch = "";
    this.currentPage = 1;

    document.getElementById("categoryFilter").value = "all";
    document.getElementById("newsSearch").value = "";

    this.renderNews();
    this.showNotification("فیلترها بازنشانی شدند", "info");
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
    // جستجو
    const searchButton = document.getElementById("searchButton");
    const newsSearch = document.getElementById("newsSearch");

    if (searchButton) {
      searchButton.addEventListener("click", () => this.searchNews());
    }

    if (newsSearch) {
      newsSearch.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          this.searchNews();
        }
      });
    }

    // فیلتر دسته‌بندی
    const categoryFilter = document.getElementById("categoryFilter");
    if (categoryFilter) {
      categoryFilter.addEventListener("change", () => this.filterByCategory());
    }

    // بارگذاری بیشتر
    const loadMoreBtn = document.getElementById("loadMoreBtn");
    if (loadMoreBtn) {
      loadMoreBtn.addEventListener("click", () => this.loadMoreNews());
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
  NewsManager.init();
});
