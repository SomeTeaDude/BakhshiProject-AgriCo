// mycourses.js
class CoursesManager {
  static userData = null;
  static coursesData = null;
  static currentView = "grid";
  static currentCourse = null;

  // مقداردهی اولیه
  static init() {
    console.log("🚀 Initializing Courses Manager...");

    this.loadUserData();
    this.setupEventListeners();
    this.loadCoursesData();
    this.renderCourses();
    this.updateUserGreeting();

    console.log("✅ Courses Manager initialized successfully");
  }

  // بارگذاری داده‌های کاربر
  static loadUserData() {
    try {
      const savedData = localStorage.getItem("userCoursesData");
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
    };
  }

  // بارگذاری داده‌های دوره‌ها
  static loadCoursesData() {
    try {
      const savedData = localStorage.getItem("coursesData");
      if (savedData) {
        this.coursesData = JSON.parse(savedData);
      } else {
        this.coursesData = this.generateSampleData();
        this.saveCoursesData();
      }
      console.log("📚 Courses data loaded:", this.coursesData);
    } catch (error) {
      console.error("❌ Error loading courses data:", error);
      this.coursesData = this.generateSampleData();
    }
  }

  // تولید داده‌های نمونه
  static generateSampleData() {
    const courses = [
      {
        id: 1,
        title: "آموزش کامل کشت گوجه فرنگی",
        instructor: "دکتر محمدی",
        description:
          "یک دوره کامل برای یادگیری اصول کشاورزی مدرن و کشت گوجه فرنگی با جدیدترین روش‌ها",
        image:
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiM0Q0FGNTAiLz48dGV4dCB4PSIxNTAiIHk9IjEwMCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+64yA7J2866GcPC90ZXh0Pjwvc3ZnPg==",
        level: "intermediate",
        duration: "12 ساعت",
        progress: 65,
        lastAccessed: "1402/09/18",
        price: 150000,
        status: "in-progress",
        chapters: [
          {
            id: 1,
            title: "مقدمه و آشنایی",
            duration: "45 دقیقه",
            lessons: [
              {
                id: 1,
                title: "معرفی دوره و اهداف",
                type: "video",
                duration: "15:30",
                watched: true,
              },
              {
                id: 2,
                title: "جزوه فصل اول",
                type: "pdf",
                duration: "30:00",
                watched: true,
              },
            ],
          },
          {
            id: 2,
            title: "آماده‌سازی زمین و خاک",
            duration: "1 ساعت و 30 دقیقه",
            lessons: [
              {
                id: 3,
                title: "انتخاب زمین مناسب",
                type: "video",
                duration: "22:15",
                watched: true,
              },
              {
                id: 4,
                title: "آماده‌سازی خاک",
                type: "video",
                duration: "18:45",
                watched: false,
              },
              {
                id: 5,
                title: "کتابچه راهنمای خاک‌شناسی",
                type: "pdf",
                duration: "45:00",
                watched: false,
              },
            ],
          },
        ],
      },
      {
        id: 2,
        title: "اصول کشاورزی ارگانیک",
        instructor: "مهندس رضایی",
        description:
          "آموزش روش‌های کشاورزی ارگانیک و طبیعی برای تولید محصولات سالم",
        image:
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiM2RDRDNDEiLz48dGV4dCB4PSIxNTAiIHk9IjEwMCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+64yA7J2866GcPC90ZXh0Pjwvc3ZnPg==",
        level: "beginner",
        duration: "8 ساعت",
        progress: 30,
        lastAccessed: "1402/09/10",
        price: 120000,
        status: "in-progress",
        chapters: [
          {
            id: 1,
            title: "مفاهیم پایه ارگانیک",
            duration: "1 ساعت",
            lessons: [
              {
                id: 1,
                title: "تعریف کشاورزی ارگانیک",
                type: "video",
                duration: "12:20",
                watched: true,
              },
            ],
          },
        ],
      },
      {
        id: 3,
        title: "پرورش قارچ خوراکی",
        instructor: "دکتر حسینی",
        description: "آموزش تخصصی پرورش قارچ در محیط خانگی و صنعتی",
        image:
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNGRjU3MjIiLz48dGV4dCB4PSIxNTAiIHk9IjEwMCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+64yA7J2866GcPC90ZXh0Pjwvc3ZnPg==",
        level: "advanced",
        duration: "15 ساعت",
        progress: 100,
        lastAccessed: "1402/08/25",
        price: 200000,
        status: "completed",
        chapters: [],
      },
      {
        id: 4,
        title: "کشت هیدروپونیک",
        instructor: "مهندس کریمی",
        description: "آموزش کشت بدون خاک و روش‌های مدرن آبیاری",
        image:
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiMyMTk2RjMiLz48dGV4dCB4PSIxNTAiIHk9IjEwMCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+64yA7J2866GcPC90ZXh0Pjwvc3ZnPg==",
        level: "intermediate",
        duration: "10 ساعت",
        progress: 0,
        lastAccessed: "1402/09/01",
        price: 180000,
        status: "not-started",
        chapters: [],
      },
      {
        id: 5,
        title: "مدیریت آفات و بیماری‌ها",
        instructor: "دکتر احمدی",
        description: "شناسایی و کنترل آفات و بیماری‌های گیاهی",
        image:
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiM3OTRhOGYiLz48dGV4dCB4PSIxNTAiIHk9IjEwMCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+64yA7J2866GcPC90ZXh0Pjwvc3ZnPg==",
        level: "intermediate",
        duration: "14 ساعت",
        progress: 45,
        lastAccessed: "1402/09/15",
        price: 220000,
        status: "in-progress",
        chapters: [],
      },
    ];

    const suggestedCourses = [
      {
        id: 101,
        title: "کشت زعفران",
        instructor: "دکتر امینی",
        price: 250000,
        image:
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDIwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIxNTAiIGZpbGw9IiNGRjU3MjIiLz48L3N2Zz4=",
      },
      {
        id: 102,
        title: "پرورش ماهی",
        instructor: "مهندس محمدی",
        price: 190000,
        image:
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDIwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIxNTAiIGZpbGw9IiMyMTk2RjMiLz48L3N2Zz4=",
      },
      {
        id: 103,
        title: "کشت گلخانه‌ای",
        instructor: "دکتر رضایی",
        price: 210000,
        image:
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDIwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIxNTAiIGZpbGw9IiM0Q0FGNTAiLz48L3N2Zz4=",
      },
      {
        id: 104,
        title: "آبیاری هوشمند",
        instructor: "مهندس کریمی",
        price: 170000,
        image:
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgdmlld0BveD0iMCAwIDIwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIxNTAiIGZpbGw9IiM2RDRDNDEiLz48L3N2Zz4=",
      },
    ];

    return {
      courses: courses,
      suggestedCourses: suggestedCourses,
      stats: this.calculateStats(courses),
    };
  }

  // محاسبه آمار
  static calculateStats(courses) {
    const total = courses.length;
    const completed = courses.filter((c) => c.progress === 100).length;
    const inProgress = courses.filter(
      (c) => c.progress > 0 && c.progress < 100
    ).length;
    const averageProgress =
      courses.length > 0
        ? Math.round(
            courses.reduce((sum, c) => sum + c.progress, 0) / courses.length
          )
        : 0;

    return {
      total,
      completed,
      inProgress,
      averageProgress,
    };
  }

  // ذخیره داده‌ها
  static saveUserData() {
    try {
      localStorage.setItem("userCoursesData", JSON.stringify(this.userData));
      return true;
    } catch (error) {
      console.error("❌ Error saving user data:", error);
      return false;
    }
  }

  static saveCoursesData() {
    try {
      localStorage.setItem("coursesData", JSON.stringify(this.coursesData));
      return true;
    } catch (error) {
      console.error("❌ Error saving courses data:", error);
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
          this.searchCourses();
        }
      });
    }

    console.log("🎯 Event listeners setup completed");
  }

  // رندر دوره‌ها
  static renderCourses() {
    this.updateStats();
    this.renderCoursesList();
    this.renderSuggestedCourses();
    this.toggleEmptyState();
  }

  // بروزرسانی آمار
  static updateStats() {
    if (!this.coursesData?.stats) return;

    const stats = this.coursesData.stats;

    document.getElementById("totalCourses").textContent =
      stats.total.toLocaleString("fa-IR");
    document.getElementById("completedCourses").textContent =
      stats.completed.toLocaleString("fa-IR");
    document.getElementById("inProgressCourses").textContent =
      stats.inProgress.toLocaleString("fa-IR");
    document.getElementById("averageProgress").textContent =
      stats.averageProgress + "%";
  }

  // رندر لیست دوره‌ها
  static renderCoursesList() {
    const container = document.getElementById("coursesContainer");
    if (!container) return;

    const filteredCourses = this.getFilteredCourses();

    if (filteredCourses.length === 0) {
      container.innerHTML = "";
      return;
    }

    if (this.currentView === "grid") {
      container.innerHTML = this.renderGridView(filteredCourses);
    } else {
      container.innerHTML = this.renderListView(filteredCourses);
    }
  }

  // رندر نمای کارتی
  static renderGridView(courses) {
    return `
            <div class="courses-grid">
                ${courses
                  .map(
                    (course) => `
                    <div class="course-card fade-in-up" onclick="CoursesManager.openCoursePlayer(${
                      course.id
                    })">
                        <img src="${course.image}" alt="${
                      course.title
                    }" class="course-image">
                        <div class="course-content">
                            <div class="course-header">
                                <div>
                                    <h3 class="course-title text-ellipsis">${
                                      course.title
                                    }</h3>
                                    <p class="course-instructor">مدرس: ${
                                      course.instructor
                                    }</p>
                                </div>
                                <span class="course-level level-${
                                  course.level
                                }">
                                    ${this.getLevelLabel(course.level)}
                                </span>
                            </div>
                            
                            <div class="course-meta">
                                <span><i class="fas fa-clock me-1"></i>${
                                  course.duration
                                }</span>
                                <span><i class="fas fa-calendar me-1"></i>${
                                  course.lastAccessed
                                }</span>
                            </div>
                            
                            <div class="course-progress">
                                <div class="progress-info">
                                    <span>پیشرفت:</span>
                                    <span>${course.progress}%</span>
                                </div>
                                <div class="progress-bar">
                                    <div class="progress-fill" style="width: ${
                                      course.progress
                                    }%"></div>
                                </div>
                            </div>
                            
                            <div class="course-actions">
                                <button class="btn btn-primary btn-course" onclick="event.stopPropagation(); CoursesManager.continueCourse(${
                                  course.id
                                })">
                                    <i class="fas fa-play me-1"></i>
                                    ادامه
                                </button>
                                <button class="btn btn-outline-secondary btn-course" onclick="event.stopPropagation(); CoursesManager.viewCourseDetails(${
                                  course.id
                                })">
                                    <i class="fas fa-info-circle me-1"></i>
                                    جزئیات
                                </button>
                            </div>
                        </div>
                    </div>
                `
                  )
                  .join("")}
            </div>
        `;
  }

  // رندر نمای لیستی
  static renderListView(courses) {
    return `
            <div class="courses-list">
                ${courses
                  .map(
                    (course) => `
                    <div class="course-list-item fade-in-up" onclick="CoursesManager.openCoursePlayer(${
                      course.id
                    })">
                        <img src="${course.image}" alt="${
                      course.title
                    }" class="course-list-image">
                        <div class="course-list-content">
                            <div class="course-list-header">
                                <div>
                                    <h3 class="course-list-title">${
                                      course.title
                                    }</h3>
                                    <p class="course-instructor">مدرس: ${
                                      course.instructor
                                    }</p>
                                </div>
                                <span class="course-level level-${
                                  course.level
                                }">
                                    ${this.getLevelLabel(course.level)}
                                </span>
                            </div>
                            
                            <div class="course-list-meta">
                                <span><i class="fas fa-clock me-1"></i>${
                                  course.duration
                                }</span>
                                <span><i class="fas fa-calendar me-1"></i>${
                                  course.lastAccessed
                                }</span>
                                <span><i class="fas fa-chart-line me-1"></i>${
                                  course.progress
                                }% پیشرفت</span>
                            </div>
                        </div>
                        
                        <div class="course-list-progress">
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${
                                  course.progress
                                }%"></div>
                            </div>
                        </div>
                        
                        <div class="course-list-actions">
                            <button class="btn btn-primary btn-sm" onclick="event.stopPropagation(); CoursesManager.continueCourse(${
                              course.id
                            })">
                                <i class="fas fa-play me-1"></i>
                                ادامه
                            </button>
                            <button class="btn btn-outline-secondary btn-sm" onclick="event.stopPropagation(); CoursesManager.viewCourseDetails(${
                              course.id
                            })">
                                <i class="fas fa-info-circle"></i>
                            </button>
                        </div>
                    </div>
                `
                  )
                  .join("")}
            </div>
        `;
  }

  // رندر دوره‌های پیشنهادی
  static renderSuggestedCourses() {
    const container = document.getElementById("suggestedCourses");
    if (!container || !this.coursesData?.suggestedCourses) return;

    container.innerHTML = this.coursesData.suggestedCourses
      .map(
        (course) => `
            <div class="col-lg-3 col-md-6 mb-4">
                <div class="suggested-course-card">
                    <img src="${course.image}" alt="${
          course.title
        }" class="suggested-course-image">
                    <h4 class="suggested-course-title">${course.title}</h4>
                    <p class="text-muted small">مدرس: ${course.instructor}</p>
                    <div class="suggested-course-price">${course.price.toLocaleString(
                      "fa-IR"
                    )} تومان</div>
                    <button class="btn btn-outline-primary btn-sm" onclick="CoursesManager.viewSuggestedCourse(${
                      course.id
                    })">
                        مشاهده جزئیات
                    </button>
                </div>
            </div>
        `
      )
      .join("");
  }

  // نمایش/مخفی کردن حالت خالی
  static toggleEmptyState() {
    const coursesContainer = document.getElementById("coursesContainer");
    const emptyState = document.getElementById("noCoursesMessage");
    const filteredCourses = this.getFilteredCourses();

    if (
      filteredCourses.length === 0 &&
      this.coursesData?.courses.length === 0
    ) {
      coursesContainer.style.display = "none";
      emptyState.style.display = "block";
    } else {
      coursesContainer.style.display = "block";
      emptyState.style.display = "none";
    }
  }

  // دریافت دوره‌های فیلتر شده
  static getFilteredCourses() {
    if (!this.coursesData?.courses) return [];

    let filtered = [...this.coursesData.courses];

    // فیلتر وضعیت
    const statusFilter = document.getElementById("statusFilter")?.value;
    if (statusFilter && statusFilter !== "all") {
      filtered = filtered.filter((course) => {
        if (statusFilter === "in-progress")
          return course.progress > 0 && course.progress < 100;
        if (statusFilter === "completed") return course.progress === 100;
        if (statusFilter === "not-started") return course.progress === 0;
        return true;
      });
    }

    // جستجو
    const searchTerm = document
      .getElementById("searchInput")
      ?.value.toLowerCase();
    if (searchTerm) {
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(searchTerm) ||
          course.instructor.toLowerCase().includes(searchTerm) ||
          course.description.toLowerCase().includes(searchTerm)
      );
    }

    // مرتب‌سازی
    const sortFilter = document.getElementById("sortFilter")?.value;
    filtered.sort((a, b) => {
      switch (sortFilter) {
        case "progress-asc":
          return a.progress - b.progress;
        case "recent":
          return new Date(b.lastAccessed) - new Date(a.lastAccessed);
        case "title":
          return a.title.localeCompare(b.title);
        case "duration":
          return (
            this.parseDuration(b.duration) - this.parseDuration(a.duration)
          );
        case "progress":
        default:
          return b.progress - a.progress;
      }
    });

    return filtered;
  }

  // تجزیه مدت زمان
  static parseDuration(duration) {
    const match = duration.match(/(\d+)\s*ساعت/);
    return match ? parseInt(match[1]) : 0;
  }

  // دریافت لیبل سطح
  static getLevelLabel(level) {
    const labels = {
      beginner: "مقدماتی",
      intermediate: "متوسط",
      advanced: "پیشرفته",
    };
    return labels[level] || level;
  }

  // تغییر نمای دوره‌ها
  static toggleView(view) {
    this.currentView = view;

    // بروزرسانی دکمه‌های فعال
    document
      .getElementById("gridViewBtn")
      .classList.toggle("active", view === "grid");
    document
      .getElementById("listViewBtn")
      .classList.toggle("active", view === "list");

    this.renderCoursesList();
  }

  // فیلتر دوره‌ها
  static filterCourses() {
    this.renderCourses();
  }

  // مرتب‌سازی دوره‌ها
  static sortCourses() {
    this.renderCoursesList();
  }

  // جستجوی دوره‌ها
  static searchCourses() {
    this.renderCourses();
  }

  // باز کردن پخش‌کننده دوره
  static openCoursePlayer(courseId) {
    const course = this.coursesData.courses.find((c) => c.id === courseId);
    if (!course) return;

    this.currentCourse = course;
    this.renderCoursePlayer(course);

    const modal = new bootstrap.Modal(
      document.getElementById("coursePlayerModal")
    );
    modal.show();
  }

  // رندر پخش‌کننده دوره
  static renderCoursePlayer(course) {
    const container = document.getElementById("coursePlayerContent");
    if (!container) return;

    container.innerHTML = `
            <div class="course-player">
                <div class="player-header">
                    <h4 class="mb-0">${course.title}</h4>
                    <button class="btn btn-sm btn-outline-light" onclick="CoursesManager.closeCoursePlayer()">
                        <i class="fas fa-times me-1"></i>
                        بستن
                    </button>
                </div>
                <div class="player-content">
                    <div class="player-video">
                        <div class="text-center">
                            <i class="fas fa-play-circle fa-4x mb-3"></i>
                            <h5>پخش‌کننده دوره</h5>
                            <p>برای پخش محتوا از سمت چپ یک درس را انتخاب کنید</p>
                        </div>
                    </div>
                    <div class="player-sidebar">
                        <div class="chapter-list">
                            <h6>فهرست دروس</h6>
                            ${course.chapters
                              .map(
                                (chapter) => `
                                <div class="chapter-item">
                                    <div class="chapter-header">
                                        <strong>${chapter.title}</strong>
                                        <span class="badge bg-secondary">${
                                          chapter.duration
                                        }</span>
                                    </div>
                                    <div class="lesson-list">
                                        ${chapter.lessons
                                          .map(
                                            (lesson) => `
                                            <div class="lesson-item ${
                                              lesson.watched ? "watched" : ""
                                            }" 
                                                 onclick="CoursesManager.playLesson(${
                                                   course.id
                                                 }, ${chapter.id}, ${
                                              lesson.id
                                            })">
                                                <div class="lesson-icon">
                                                    <i class="fas fa-${
                                                      lesson.type === "video"
                                                        ? "video"
                                                        : "file-pdf"
                                                    }"></i>
                                                </div>
                                                <div class="flex-grow-1">
                                                    <div class="lesson-title">${
                                                      lesson.title
                                                    }</div>
                                                    <small class="text-muted">${
                                                      lesson.duration
                                                    }</small>
                                                </div>
                                                ${
                                                  lesson.watched
                                                    ? '<i class="fas fa-check text-success"></i>'
                                                    : ""
                                                }
                                            </div>
                                        `
                                          )
                                          .join("")}
                                    </div>
                                </div>
                            `
                              )
                              .join("")}
                        </div>
                    </div>
                </div>
            </div>
        `;
  }

  // ادامه دوره از آخرین نقطه
  static continueCourse(courseId) {
    const course = this.coursesData.courses.find((c) => c.id === courseId);
    if (!course) return;

    // پیدا کردن اولین درس تماشا نشده
    let lessonToPlay = null;
    let chapterToPlay = null;

    for (const chapter of course.chapters) {
      for (const lesson of chapter.lessons) {
        if (!lesson.watched) {
          lessonToPlay = lesson;
          chapterToPlay = chapter;
          break;
        }
      }
      if (lessonToPlay) break;
    }

    // اگر همه تماشا شده‌اند، از اول شروع کن
    if (!lessonToPlay && course.chapters.length > 0) {
      chapterToPlay = course.chapters[0];
      lessonToPlay = chapterToPlay.lessons[0];
    }

    this.openCoursePlayer(courseId);

    if (lessonToPlay && chapterToPlay) {
      setTimeout(() => {
        this.playLesson(courseId, chapterToPlay.id, lessonToPlay.id);
      }, 500);
    }
  }

  // پخش درس
  static playLesson(courseId, chapterId, lessonId) {
    const course = this.coursesData.courses.find((c) => c.id === courseId);
    if (!course) return;

    const chapter = course.chapters.find((c) => c.id === chapterId);
    if (!chapter) return;

    const lesson = chapter.lessons.find((l) => l.id === lessonId);
    if (!lesson) return;

    // علامت‌گذاری به عنوان تماشا شده
    lesson.watched = true;

    // بروزرسانی پیشرفت دوره
    this.updateCourseProgress(course);

    // نمایش درس در پخش‌کننده
    const videoPlayer = document.querySelector(".player-video");
    if (videoPlayer) {
      videoPlayer.innerHTML = `
                <div class="w-100 h-100 d-flex align-items-center justify-content-center">
                    <div class="text-center text-white">
                        <i class="fas fa-play-circle fa-3x mb-3"></i>
                        <h5>${lesson.title}</h5>
                        <p>در حال پخش: ${lesson.duration}</p>
                        <small>این یک شبیه‌ساز پخش ویدئو است</small>
                    </div>
                </div>
            `;
    }

    // هایلایت کردن درس فعال
    document.querySelectorAll(".lesson-item").forEach((item) => {
      item.classList.remove("active");
    });

    const activeLesson = document.querySelector(
      `[onclick="CoursesManager.playLesson(${courseId}, ${chapterId}, ${lessonId})"]`
    );
    if (activeLesson) {
      activeLesson.classList.add("active");
    }

    this.showNotification(`در حال پخش: ${lesson.title}`, "info");
  }

  // بروزرسانی پیشرفت دوره
  static updateCourseProgress(course) {
    const totalLessons = course.chapters.reduce(
      (sum, chapter) => sum + chapter.lessons.length,
      0
    );
    const watchedLessons = course.chapters.reduce(
      (sum, chapter) =>
        sum + chapter.lessons.filter((lesson) => lesson.watched).length,
      0
    );

    course.progress = Math.round((watchedLessons / totalLessons) * 100);
    course.lastAccessed = new Date().toLocaleDateString("fa-IR");

    this.saveCoursesData();
    this.renderCourses();
  }

  // مشاهده جزئیات دوره
  static viewCourseDetails(courseId) {
    const course = this.coursesData.courses.find((c) => c.id === courseId);
    if (!course) return;

    const modalContent = document.getElementById("courseDetailsContent");
    if (modalContent) {
      modalContent.innerHTML = `
                <div class="row">
                    <div class="col-md-6">
                        <img src="${course.image}" alt="${
        course.title
      }" class="img-fluid rounded mb-3">
                    </div>
                    <div class="col-md-6">
                        <h4>${course.title}</h4>
                        <p class="text-muted">مدرس: ${course.instructor}</p>
                        
                        <div class="course-info">
                            <div class="info-item">
                                <i class="fas fa-chart-line me-2"></i>
                                <strong>سطح:</strong> ${this.getLevelLabel(
                                  course.level
                                )}
                            </div>
                            <div class="info-item">
                                <i class="fas fa-clock me-2"></i>
                                <strong>مدت زمان:</strong> ${course.duration}
                            </div>
                            <div class="info-item">
                                <i class="fas fa-percentage me-2"></i>
                                <strong>پیشرفت:</strong> ${course.progress}%
                            </div>
                            <div class="info-item">
                                <i class="fas fa-calendar me-2"></i>
                                <strong>آخرین بازدید:</strong> ${
                                  course.lastAccessed
                                }
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="row mt-3">
                    <div class="col-12">
                        <h5>توضیحات دوره</h5>
                        <p>${course.description}</p>
                    </div>
                </div>
                
                <div class="row mt-3">
                    <div class="col-12">
                        <h5>سرفصل‌ها</h5>
                        <div class="chapters-list">
                            ${course.chapters
                              .map(
                                (chapter, index) => `
                                <div class="chapter-summary">
                                    <h6>فصل ${index + 1}: ${chapter.title}</h6>
                                    <p class="text-muted small">${
                                      chapter.duration
                                    } - ${chapter.lessons.length} درس</p>
                                </div>
                            `
                              )
                              .join("")}
                        </div>
                    </div>
                </div>
            `;
    }

    const modal = new bootstrap.Modal(
      document.getElementById("courseDetailsModal")
    );
    modal.show();
  }

  // مشاهده دوره پیشنهادی
  static viewSuggestedCourse(courseId) {
    this.showNotification(`در حال بارگذاری اطلاعات دوره...`, "info");
    // منطق مشاهده دوره پیشنهادی
  }

  // سایر متدها
  static browseNewCourses() {
    this.showNotification("در حال انتقال به صفحه دوره‌های جدید...", "info");
    // window.location.href = 'new-courses.html';
  }

  static downloadCertificates() {
    this.showNotification("در حال آماده‌سازی گواهینامه‌ها...", "info");
  }

  static viewProgressReport() {
    this.showNotification("در حال بارگذاری گزارش پیشرفت...", "info");
  }

  static startCourse() {
    if (this.currentCourse) {
      this.continueCourse(this.currentCourse.id);
      const modal = bootstrap.Modal.getInstance(
        document.getElementById("courseDetailsModal")
      );
      modal.hide();
    }
  }

  static closeCoursePlayer() {
    const modal = bootstrap.Modal.getInstance(
      document.getElementById("coursePlayerModal")
    );
    modal.hide();
  }

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
  CoursesManager.init();
});
