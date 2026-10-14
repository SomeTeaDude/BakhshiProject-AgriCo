const AdminPanelState = {
  courses: [],
  enrollments: [],

  init() {
    this.loadFromStorage();
    if (this.courses.length === 0) {
      this.courses = [...this.getMockData().courses];
    }
    if (this.enrollments.length === 0) {
      this.enrollments = [...this.getMockData().enrollments];
    }
    this.saveToStorage();
  },

  loadFromStorage() {
    const savedData = localStorage.getItem("adminCoursesData");
    if (savedData) {
      const data = JSON.parse(savedData);
      this.courses = data.courses || [];
      this.enrollments = data.enrollments || [];
    }
  },

  saveToStorage() {
    const data = {
      courses: this.courses,
      enrollments: this.enrollments,
    };
    localStorage.setItem("adminCoursesData", JSON.stringify(data));
  },

  getMockData() {
    return {
      courses: [
        {
          id: 1,
          name: "آموزش کامل کشاورزی مدرن",
          duration: 12.5,
          level: "متوسط",
          price: 250000,
          instructor: "دکتر محمدی",
          type: "paid",
          description: "یک دوره کامل برای یادگیری اصول کشاورزی مدرن",
          thumbnail:
            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjMkU3RDMyIi8+CjxjaXJjbGUgY3g9IjQwIiBjeT0iNDAiIHI9IjIwIiBmaWxsPSIjNENBRjUwIi8+Cjx0ZXh0IHg9IjQwIiB5PSI0NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0id2hpdGUiIGZvbnQtc2l6ZT0iMTIiPtio2YQg2KfZhNi52LHYs9iMINmH2YjYp9iv2Kkg2KfZhNin2YbYr9mG2YQ8L3RleHQ+Cjwvc3ZnPg==",
          status: "active",
          enrollments: 45,
          completionRate: 78,
          chapters: [
            {
              id: 1,
              title: "مقدمه و آشنایی",
              order: 1,
              contents: [
                {
                  id: 1,
                  title: "معرفی دوره",
                  type: "video",
                  duration: "00:15:30",
                  file: "intro.mp4",
                  order: 1,
                },
                {
                  id: 2,
                  title: "جزوه فصل اول",
                  type: "pdf",
                  file: "chapter1.pdf",
                  order: 2,
                },
              ],
            },
            {
              id: 2,
              title: "اصول کشاورزی پایدار",
              order: 2,
              contents: [
                {
                  id: 3,
                  title: "مفاهیم پایه",
                  type: "video",
                  duration: "00:22:15",
                  file: "sustainable.mp4",
                  order: 1,
                },
              ],
            },
          ],
        },
        {
          id: 2,
          name: "باغبانی خانگی برای مبتدیان",
          duration: 8,
          level: "مقدماتی",
          price: 0,
          instructor: "مهندس رضایی",
          type: "free",
          description: "آموزش باغبانی در فضای کوچک آپارتمان",
          thumbnail:
            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjNkQ0QzQxIi8+CjxjaXJjbGUgY3g9IjQwIiBjeT0iNDAiIHI9IjIwIiBmaWxsPSIjOEJDMzRBIi8+Cjx0ZXh0IHg9IjQwIiB5PSI0NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0id2hpdGUiIGZvbnQtc2l6ZT0iMTIiPtio2YTYs9mI2Kcg2KfZhNin2YbYr9mG2YQg2KfZhNin2LHZitiv2Kkg2YfZiNin2YbYr9iz2KfZhiDYs9mH2LHZhtivPC90ZXh0Pgo8L3N2Zz4=",
          status: "active",
          enrollments: 120,
          completionRate: 65,
          chapters: [
            {
              id: 1,
              title: "آماده سازی فضای باغبانی",
              order: 1,
              contents: [
                {
                  id: 1,
                  title: "انتخاب گلدان مناسب",
                  type: "video",
                  duration: "00:18:45",
                  file: "pots.mp4",
                  order: 1,
                },
              ],
            },
          ],
        },
        {
          id: 3,
          name: "کشاورزی هوشمند با IoT",
          duration: 20,
          level: "پیشرفته",
          price: 450000,
          instructor: "دکتر حسینی",
          type: "paid",
          description: "استفاده از فناوری‌های نوین در کشاورزی",
          thumbnail:
            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjOUZFN0FFIi8+CjxjaXJjbGUgY3g9IjQwIiBjeT0iNDAiIHI9IjIwIiBmaWxsPSIjNjM0Q0EzIi8+Cjx0ZXh0IHg9IjQwIiB5PSI0NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0id2hpdGUiIGZvbnQtc2l6ZT0iMTIiPtio2YTYs9mI2Kcg2KfZhNin2YbYr9mG2YQg2KfZhNin2LHZitiv2Kkg2YfZiNin2YbYr9iz2KfZhiDYs9mH2LHZhtivPC90ZXh0Pgo8L3N2Zz4=",
          status: "inactive",
          enrollments: 28,
          completionRate: 92,
          chapters: [],
        },
      ],
      enrollments: [
        {
          courseId: 1,
          userId: 1,
          date: "1402/10/01",
          progress: 100,
          status: "completed",
        },
        {
          courseId: 1,
          userId: 2,
          date: "1402/10/05",
          progress: 78,
          status: "in-progress",
        },
        {
          courseId: 2,
          userId: 3,
          date: "1402/10/10",
          progress: 65,
          status: "in-progress",
        },
        {
          courseId: 2,
          userId: 4,
          date: "1402/10/12",
          progress: 100,
          status: "completed",
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

    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 3000);
  },
};

// مدیریت دوره‌ها
const CoursesManager = {
  currentCourseId: null,

  loadCourses() {
    const tbody = document.getElementById("coursesTable");
    tbody.innerHTML = "";

    AdminPanelState.courses.forEach((course) => {
      const levelClass = {
        مقدماتی: "level-beginner",
        متوسط: "level-intermediate",
        پیشرفته: "level-advanced",
      };

      const row = document.createElement("tr");
      row.innerHTML = `
                        <td>
                            <img src="${course.thumbnail}" alt="${
        course.name
      }" class="course-image">
                        </td>
                        <td>
                            <div><strong>${course.name}</strong></div>
                            <small class="text-muted">${course.description.substring(
                              0,
                              50
                            )}...</small>
                        </td>
                        <td>${course.duration} ساعت</td>
                        <td>
                            <span class="level-badge ${
                              levelClass[course.level]
                            }">${course.level}</span>
                        </td>
                        <td>${course.instructor}</td>
                        <td>${
                          course.type === "free"
                            ? "رایگان"
                            : course.price.toLocaleString("fa-IR")
                        }</td>
                        <td>
                            <div>${course.enrollments} نفر</div>
                            <small class="text-muted">${
                              course.completionRate
                            }% تکمیل</small>
                        </td>
                        <td>
                            <span class="status-badge ${
                              course.status === "active"
                                ? "status-active"
                                : "status-inactive"
                            }">
                                ${
                                  course.status === "active"
                                    ? "فعال"
                                    : "غیرفعال"
                                }
                            </span>
                        </td>
                        <td>
                            <button class="btn btn-sm btn-info me-1" onclick="CoursesManager.manageContent(${
                              course.id
                            })">
                                <i class="fas fa-cogs"></i>
                            </button>
                            <button class="btn btn-sm btn-warning me-1" onclick="CoursesManager.editCourse(${
                              course.id
                            })">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn btn-sm btn-danger" onclick="CoursesManager.deleteCourse(${
                              course.id
                            })">
                                <i class="fas fa-trash"></i>
                            </button>
                        </td>
                    `;
      tbody.appendChild(row);
    });

    this.updateStats();
  },

  updateStats() {
    const totalCourses = AdminPanelState.courses.length;
    const activeCourses = AdminPanelState.courses.filter(
      (c) => c.status === "active"
    ).length;
    const totalEnrollments = AdminPanelState.courses.reduce(
      (sum, course) => sum + course.enrollments,
      0
    );
    const avgCompletion =
      AdminPanelState.courses.length > 0
        ? Math.round(
            AdminPanelState.courses.reduce(
              (sum, course) => sum + course.completionRate,
              0
            ) / AdminPanelState.courses.length
          )
        : 0;

    document.getElementById("totalCourses").textContent = totalCourses;
    document.getElementById("activeCourses").textContent = activeCourses;
    document.getElementById("totalEnrollments").textContent = totalEnrollments;
    document.getElementById("completionRate").textContent = avgCompletion + "%";
  },

  saveCourse() {
    const course = {
      name: document.getElementById("courseName").value,
      duration: parseFloat(document.getElementById("courseDuration").value),
      level: document.getElementById("courseLevel").value,
      price: parseInt(document.getElementById("coursePrice").value),
      instructor: document.getElementById("courseInstructor").value,
      type: document.getElementById("courseType").value,
      description: document.getElementById("courseDescription").value,
      status: document.getElementById("courseStatus").value,
      thumbnail:
        document.getElementById("previewCourseImg").src ||
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjRTBFMEUwIi8+Cjx0ZXh0IHg9IjQwIiB5PSI0NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzk5OTk5OSIgZm9udC1zaXplPSIxMiI+2KjYr9mI2YYg2KrYtdi32YrYsTwvdGV4dD4KPC9zdmc+",
      enrollments: 0,
      completionRate: 0,
      chapters: [],
    };

    const courseId = document.getElementById("courseId").value;

    if (courseId) {
      const index = AdminPanelState.courses.findIndex((c) => c.id == courseId);
      if (index !== -1) {
        course.id = parseInt(courseId);
        course.enrollments = AdminPanelState.courses[index].enrollments;
        course.completionRate = AdminPanelState.courses[index].completionRate;
        course.chapters = AdminPanelState.courses[index].chapters;
        AdminPanelState.courses[index] = course;
      }
    } else {
      course.id =
        AdminPanelState.courses.length > 0
          ? Math.max(...AdminPanelState.courses.map((c) => c.id)) + 1
          : 1;
      AdminPanelState.courses.push(course);
    }

    AdminPanelState.saveToStorage();
    this.loadCourses();

    const modal = bootstrap.Modal.getInstance(
      document.getElementById("courseModal")
    );
    modal.hide();
    document.getElementById("courseForm").reset();
    document.getElementById("courseThumbnailPreview").style.display = "none";

    NotificationManager.show("دوره با موفقیت ذخیره شد", "success");
  },

  editCourse(id) {
    const course = AdminPanelState.courses.find((c) => c.id === id);
    if (!course) return;

    document.getElementById("courseId").value = course.id;
    document.getElementById("courseName").value = course.name;
    document.getElementById("courseDuration").value = course.duration;
    document.getElementById("courseLevel").value = course.level;
    document.getElementById("coursePrice").value = course.price;
    document.getElementById("courseInstructor").value = course.instructor;
    document.getElementById("courseType").value = course.type;
    document.getElementById("courseDescription").value = course.description;
    document.getElementById("courseStatus").value = course.status;

    if (course.thumbnail) {
      document.getElementById("previewCourseImg").src = course.thumbnail;
      document.getElementById("courseThumbnailPreview").style.display = "block";
    }

    document.getElementById("courseModalTitle").textContent = "ویرایش دوره";

    const modal = new bootstrap.Modal(document.getElementById("courseModal"));
    modal.show();
  },

  deleteCourse(id) {
    if (confirm("آیا از حذف این دوره اطمینان دارید؟")) {
      AdminPanelState.courses = AdminPanelState.courses.filter(
        (c) => c.id !== id
      );
      AdminPanelState.saveToStorage();
      this.loadCourses();
      NotificationManager.show("دوره با موفقیت حذف شد", "success");
    }
  },

  manageContent(courseId) {
    this.currentCourseId = courseId;
    const course = AdminPanelState.courses.find((c) => c.id === courseId);
    if (!course) return;

    document.getElementById("currentCourseName").textContent = course.name;
    this.loadChapters(course);

    const modal = new bootstrap.Modal(
      document.getElementById("courseContentModal")
    );
    modal.show();
  },

  loadChapters(course) {
    const container = document.getElementById("chaptersContainer");
    container.innerHTML = "";

    const chapterSelect = document.getElementById("contentChapterSelect");
    chapterSelect.innerHTML = '<option value="">انتخاب فصل</option>';

    if (course.chapters && course.chapters.length > 0) {
      course.chapters
        .sort((a, b) => a.order - b.order)
        .forEach((chapter) => {
          const chapterElement = document.createElement("div");
          chapterElement.className = "card mb-3";
          chapterElement.innerHTML = `
                            <div class="card-header d-flex justify-content-between align-items-center">
                                <h6 class="mb-0">فصل ${chapter.order}: ${
            chapter.title
          }</h6>
                                <div>
                                    <button class="btn btn-sm btn-warning me-1" onclick="CoursesManager.editChapter(${
                                      chapter.id
                                    })">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button class="btn btn-sm btn-danger me-1" onclick="CoursesManager.deleteChapter(${
                                      chapter.id
                                    })">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                    <button class="btn btn-sm btn-success" onclick="CoursesManager.addContentToChapter(${
                                      chapter.id
                                    })">
                                        <i class="fas fa-plus"></i> افزودن محتوا
                                    </button>
                                </div>
                            </div>
                            <div class="card-body">
                                ${this.renderChapterContents(chapter)}
                            </div>
                        `;
          container.appendChild(chapterElement);

          const option = document.createElement("option");
          option.value = chapter.id;
          option.textContent = `فصل ${chapter.order}: ${chapter.title}`;
          chapterSelect.appendChild(option);
        });
    } else {
      container.innerHTML =
        '<div class="alert alert-info">هنوز فصلی برای این دوره ایجاد نشده است.</div>';
    }
  },

  renderChapterContents(chapter) {
    if (!chapter.contents || chapter.contents.length === 0) {
      return '<p class="text-muted">هیچ محتوایی برای این فصل وجود ندارد.</p>';
    }

    let html = '<div class="list-group">';
    chapter.contents
      .sort((a, b) => a.order - b.order)
      .forEach((content) => {
        const icon =
          content.type === "video"
            ? "fa-video"
            : content.type === "pdf"
            ? "fa-file-pdf"
            : content.type === "quiz"
            ? "fa-question-circle"
            : "fa-file-alt";

        const typeText =
          content.type === "video"
            ? "ویدئو"
            : content.type === "pdf"
            ? "PDF"
            : content.type === "quiz"
            ? "آزمون"
            : "متنی";

        html += `
                        <div class="list-group-item">
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="content-item-info">
                                    <i class="fas ${icon} me-2"></i>
                                    <div>
                                        <div>${content.title}</div>
                                        <small class="text-muted">نوع: ${typeText} ${
          content.duration ? " - مدت: " + content.duration : ""
        }</small>
                                    </div>
                                </div>
                                <div class="content-item-actions">
                                    <span class="badge bg-secondary me-2">قسمت ${
                                      content.order
                                    }</span>
                                    <button class="btn btn-sm btn-outline-primary me-1">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button class="btn btn-sm btn-outline-danger" onclick="CoursesManager.deleteContent(${
                                      chapter.id
                                    }, ${content.id})">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    `;
      });
    html += "</div>";
    return html;
  },

  addNewChapter() {
    const course = AdminPanelState.courses.find(
      (c) => c.id === this.currentCourseId
    );
    if (!course) return;

    const chapterTitle = prompt("عنوان فصل جدید را وارد کنید:");
    if (!chapterTitle) return;

    if (!course.chapters) course.chapters = [];

    const newChapter = {
      id:
        course.chapters.length > 0
          ? Math.max(...course.chapters.map((ch) => ch.id)) + 1
          : 1,
      title: chapterTitle,
      order: course.chapters.length + 1,
      contents: [],
    };

    course.chapters.push(newChapter);
    AdminPanelState.saveToStorage();
    this.loadChapters(course);
    NotificationManager.show("فصل جدید با موفقیت اضافه شد", "success");
  },

  editChapter(chapterId) {
    const course = AdminPanelState.courses.find(
      (c) => c.id === this.currentCourseId
    );
    if (!course) return;

    const chapter = course.chapters.find((ch) => ch.id === chapterId);
    if (!chapter) return;

    const newTitle = prompt("عنوان جدید فصل را وارد کنید:", chapter.title);
    if (newTitle && newTitle !== chapter.title) {
      chapter.title = newTitle;
      AdminPanelState.saveToStorage();
      this.loadChapters(course);
      NotificationManager.show("عنوان فصل با موفقیت ویرایش شد", "success");
    }
  },

  deleteChapter(chapterId) {
    if (!confirm("آیا از حذف این فصل و تمام محتوای آن اطمینان دارید؟")) return;

    const course = AdminPanelState.courses.find(
      (c) => c.id === this.currentCourseId
    );
    if (!course) return;

    course.chapters = course.chapters.filter((ch) => ch.id !== chapterId);
    course.chapters.forEach((ch, index) => {
      ch.order = index + 1;
    });

    AdminPanelState.saveToStorage();
    this.loadChapters(course);
    NotificationManager.show("فصل با موفقیت حذف شد", "success");
  },

  addContentToChapter(chapterId) {
    document.getElementById("contentChapterSelect").value = chapterId;
    document.getElementById("contentTitle").focus();
  },

  uploadContent() {
    const chapterSelect = document.getElementById("contentChapterSelect");
    const contentTitle = document.getElementById("contentTitle").value;
    const contentType = document.getElementById("contentType").value;
    const contentFile = document.getElementById("contentFile").files[0];

    if (!chapterSelect.value || !contentTitle || !contentFile) {
      NotificationManager.show("لطفا تمام فیلدهای لازم را پر کنید", "error");
      return;
    }

    const course = AdminPanelState.courses.find(
      (c) => c.id === this.currentCourseId
    );
    if (!course) return;

    const chapter = course.chapters.find((ch) => ch.id == chapterSelect.value);
    if (!chapter) return;

    if (!chapter.contents) chapter.contents = [];

    const newContentId =
      chapter.contents.length > 0
        ? Math.max(...chapter.contents.map((c) => c.id)) + 1
        : 1;

    const newContent = {
      id: newContentId,
      title: contentTitle,
      type: contentType,
      file: contentFile.name,
      duration: contentType === "video" ? "00:00:00" : null,
      order: chapter.contents.length + 1,
    };

    chapter.contents.push(newContent);
    AdminPanelState.saveToStorage();

    document.getElementById("contentTitle").value = "";
    document.getElementById("contentFile").value = "";

    this.loadChapters(course);
    NotificationManager.show("محتوای جدید با موفقیت اضافه شد", "success");
  },

  deleteContent(chapterId, contentId) {
    if (!confirm("آیا از حذف این محتوا اطمینان دارید؟")) return;

    const course = AdminPanelState.courses.find(
      (c) => c.id === this.currentCourseId
    );
    if (!course) return;

    const chapter = course.chapters.find((ch) => ch.id === chapterId);
    if (!chapter) return;

    chapter.contents = chapter.contents.filter((c) => c.id !== contentId);
    chapter.contents.forEach((c, index) => {
      c.order = index + 1;
    });

    AdminPanelState.saveToStorage();
    this.loadChapters(course);
    NotificationManager.show("محتوا با موفقیت حذف شد", "success");
  },

  saveCourseContent() {
    NotificationManager.show("تغییرات با موفقیت ذخیره شد", "success");
    const modal = bootstrap.Modal.getInstance(
      document.getElementById("courseContentModal")
    );
    modal.hide();
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

    // Course thumbnail preview
    document
      .getElementById("courseThumbnail")
      .addEventListener("change", function (e) {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = function (e) {
            document.getElementById("previewCourseImg").src = e.target.result;
            document.getElementById("courseThumbnailPreview").style.display =
              "block";
          };
          reader.readAsDataURL(file);
        }
      });

    // Reset course modal when hidden
    document
      .getElementById("courseModal")
      .addEventListener("hidden.bs.modal", function () {
        document.getElementById("courseForm").reset();
        document.getElementById("courseId").value = "";
        document.getElementById("courseModalTitle").textContent =
          "افزودن دوره جدید";
        document.getElementById("courseThumbnailPreview").style.display =
          "none";
      });
  },
};

// مقداردهی اولیه هنگام لود صفحه
document.addEventListener("DOMContentLoaded", function () {
  AdminPanelState.init();
  NavigationManager.initializeEventListeners();
  CoursesManager.loadCourses();

  // افزودن افکت fade-in به بخش دوره‌ها
  document.getElementById("coursesSection").classList.add("fade-in");
});
