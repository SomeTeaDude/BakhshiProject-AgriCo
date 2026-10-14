const CONFIG = {
  AUTO_SAVE_INTERVAL: 30000,
  NOTIFICATION_DURATION: 3000,
  STORAGE_KEY: "userData",
  SESSION_KEY: "isLoggedIn",
};

class StorageManager {
  static save(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error("Error saving to localStorage:", error);
      NotificationManager.show("خطا در ذخیره داده‌ها", "error");
      return false;
    }
  }

  static load(key) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error("Error loading from localStorage:", error);
      return null;
    }
  }

  static remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error("Error removing from localStorage:", error);
      return false;
    }
  }
}

const NotificationManager = {
  show(message, type = "info", duration = CONFIG.NOTIFICATION_DURATION) {
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
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                `;

    document.body.appendChild(notification);

    const timeoutId = setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, duration);

    notification.querySelector(".btn-close").addEventListener("click", () => {
      clearTimeout(timeoutId);
      notification.remove();
    });
  },
};

const SupportManager = {
  loadTickets() {
    console.log("🔍 Loading tickets...");

    if (!this.validateTicketData()) {
      console.error("❌ Ticket data validation failed");
      return;
    }

    const ticketsTable = document.getElementById("ticketsTable");
    if (!ticketsTable) {
      console.error("❌ Tickets table element not found");
      return;
    }

    const fragment = document.createDocumentFragment();

    if (UserPanelState.userData.supportTickets.length === 0) {
      console.log("ℹ️ No tickets found");
      ticketsTable.innerHTML = `
                        <tr>
                            <td colspan="6" class="text-center py-4 text-muted">
                                <i class="fas fa-inbox fa-2x mb-2"></i>
                                <p>هنوز تیکتی ایجاد نکرده‌اید</p>
                            </td>
                        </tr>
                    `;
    } else {
      console.log(
        `✅ Found ${UserPanelState.userData.supportTickets.length} tickets`
      );

      UserPanelState.userData.supportTickets.forEach((ticket, index) => {
        console.log(`📋 Ticket ${index + 1}:`, ticket.id, ticket.subject);

        const statusBadge = this.getStatusBadge(ticket.status);
        const priorityBadge = this.getPriorityBadge(ticket.priority);

        const row = document.createElement("tr");
        row.innerHTML = `
                            <td>#${ticket.id}</td>
                            <td>${ticket.subject}</td>
                            <td>${ticket.createdAt}</td>
                            <td>${statusBadge}</td>
                            <td>${ticket.updatedAt}</td>
                            <td>
                                <button class="btn btn-sm btn-outline-primary" onclick="SupportManager.viewTicket('${ticket.id}')">
                                    <i class="fas fa-eye"></i>
                                </button>
                            </td>
                        `;
        fragment.appendChild(row);
      });

      ticketsTable.innerHTML = "";
      ticketsTable.appendChild(fragment);
    }

    const ticketsCountElement = document.getElementById("ticketsCount");
    if (ticketsCountElement) {
      ticketsCountElement.textContent =
        UserPanelState.userData.supportTickets.length;
      console.log(
        "🔢 Tickets count updated to:",
        UserPanelState.userData.supportTickets.length
      );
    }
  },

  createNewTicket() {
    try {
      console.log("🚀 Creating new ticket...");

      const subject = document.getElementById("ticketSubject").value;
      const priority = document.getElementById("ticketPriority").value;
      const message = document.getElementById("ticketMessage").value;

      if (!subject || subject === "" || !message || message.trim() === "") {
        NotificationManager.show("لطفاً موضوع و پیام را وارد کنید", "error");
        return false;
      }

      const newTicket = {
        id: this.generateTicketId(),
        subject: subject,
        priority: priority,
        status: "open",
        messages: [
          {
            id: 1,
            sender: "user",
            message: message.trim(),
            timestamp: new Date().toLocaleString("fa-IR"),
            attachment: null,
          },
        ],
        createdAt: new Date().toLocaleString("fa-IR"),
        updatedAt: new Date().toLocaleString("fa-IR"),
      };

      console.log("✅ New ticket created:", newTicket);

      if (!UserPanelState.userData.supportTickets) {
        console.log("🆕 Initializing supportTickets array");
        UserPanelState.userData.supportTickets = [];
      }

      UserPanelState.userData.supportTickets.unshift(newTicket);
      console.log(
        "📥 Ticket added. Total tickets:",
        UserPanelState.userData.supportTickets.length
      );

      const saved = UserPanelState.saveUserData();
      console.log("💾 Data saved:", saved);

      NotificationManager.show("تیکت با موفقیت ایجاد شد", "success");

      document.getElementById("supportForm").reset();

      setTimeout(() => {
        this.addSystemMessage(
          newTicket.id,
          "تیکت شما با موفقیت ثبت شد. همکاران ما به زودی با شما تماس خواهند گرفت. شماره تیکت شما: " +
            newTicket.id
        );
      }, 1000);

      this.switchTab("tickets");

      return true;
    } catch (error) {
      console.error("❌ Error creating ticket:", error);
      NotificationManager.show("خطا در ایجاد تیکت", "error");
      return false;
    }
  },

  viewTicket(ticketId) {
    console.log("👀 Viewing ticket:", ticketId);
    const ticket = UserPanelState.userData.supportTickets.find(
      (t) => t.id === ticketId
    );
    if (!ticket) {
      console.error("❌ Ticket not found:", ticketId);
      return;
    }

    document.getElementById("ticketNumber").textContent = ticket.id;
    document.getElementById("ticketStatus").innerHTML = this.getStatusBadge(
      ticket.status
    );
    document.getElementById("ticketSubjectText").textContent = ticket.subject;
    document.getElementById("ticketPriorityText").innerHTML =
      this.getPriorityBadge(ticket.priority);

    this.renderTicketMessages(ticket);

    const modal = new bootstrap.Modal(
      document.getElementById("ticketChatModal")
    );
    modal.show();

    document.getElementById("ticketChatModal").dataset.currentTicketId =
      ticketId;
  },

  validateTicketData() {
    if (!UserPanelState.userData) {
      console.error("❌ User data is not loaded");
      return false;
    }

    if (!UserPanelState.userData.supportTickets) {
      console.log("🆕 Initializing supportTickets array in validation");
      UserPanelState.userData.supportTickets = [];
    }

    return true;
  },

  renderTicketMessages(ticket) {
    const container = document.getElementById("ticketChatMessages");
    if (!container) return;

    container.innerHTML = "";

    ticket.messages.forEach((message) => {
      const messageDiv = document.createElement("div");
      messageDiv.className = `ticket-message ${message.sender}`;

      let senderName = "شما";
      let senderIcon = "fas fa-user";

      if (message.sender === "support") {
        senderName = "پشتیبانی";
        senderIcon = "fas fa-headset";
      } else if (message.sender === "system") {
        senderName = "سیستم";
        senderIcon = "fas fa-robot";
      }

      messageDiv.innerHTML = `
                        <div class="d-flex justify-content-between align-items-center mb-1">
                            <small><i class="${senderIcon} me-1"></i>${senderName}</small>
                            <small class="text-muted">${
                              message.timestamp
                            }</small>
                        </div>
                        <div class="message-content">${message.message}</div>
                        ${
                          message.attachment
                            ? `
                            <div class="mt-2">
                                <a href="${message.attachment.url}" class="btn btn-sm btn-outline-secondary" target="_blank">
                                    <i class="fas fa-paperclip me-1"></i>${message.attachment.name}
                                </a>
                            </div>
                        `
                            : ""
                        }
                    `;

      container.appendChild(messageDiv);
    });

    container.scrollTop = container.scrollHeight;
  },

  sendTicketReply() {
    const ticketId =
      document.getElementById("ticketChatModal").dataset.currentTicketId;
    const message = document.getElementById("ticketReplyMessage").value;

    if (!message.trim()) {
      NotificationManager.show("لطفاً پیام خود را وارد کنید", "error");
      return;
    }

    const ticket = UserPanelState.userData.supportTickets.find(
      (t) => t.id === ticketId
    );
    if (!ticket) return;

    const newMessage = {
      id: ticket.messages.length + 1,
      sender: "user",
      message: message.trim(),
      timestamp: new Date().toLocaleString("fa-IR"),
      attachment: null,
    };

    ticket.messages.push(newMessage);
    ticket.updatedAt = new Date().toLocaleString("fa-IR");
    ticket.status = "pending";

    UserPanelState.saveUserData();
    this.renderTicketMessages(ticket);

    setTimeout(() => {
      this.addSupportReply(
        ticketId,
        "پیام شما دریافت شد. همکاران ما در اسرع وقت پاسخ خواهند داد."
      );
    }, 2000);

    document.getElementById("ticketReplyMessage").value = "";
    NotificationManager.show("پاسخ شما ارسال شد", "success");
  },

  addSystemMessage(ticketId, message) {
    const ticket = UserPanelState.userData.supportTickets.find(
      (t) => t.id === ticketId
    );
    if (!ticket) return;

    const systemMessage = {
      id: ticket.messages.length + 1,
      sender: "system",
      message: message,
      timestamp: new Date().toLocaleString("fa-IR"),
    };

    ticket.messages.push(systemMessage);
    ticket.updatedAt = new Date().toLocaleString("fa-IR");
    UserPanelState.saveUserData();

    if (
      document.getElementById("ticketChatModal").dataset.currentTicketId ===
      ticketId
    ) {
      this.renderTicketMessages(ticket);
    }
  },

  addSupportReply(ticketId, message) {
    const ticket = UserPanelState.userData.supportTickets.find(
      (t) => t.id === ticketId
    );
    if (!ticket) return;

    const supportMessage = {
      id: ticket.messages.length + 1,
      sender: "support",
      message: message,
      timestamp: new Date().toLocaleString("fa-IR"),
    };

    ticket.messages.push(supportMessage);
    ticket.updatedAt = new Date().toLocaleString("fa-IR");
    ticket.status = "resolved";

    UserPanelState.saveUserData();

    if (
      document.getElementById("ticketChatModal").dataset.currentTicketId ===
      ticketId
    ) {
      this.renderTicketMessages(ticket);
      document.getElementById("ticketStatus").innerHTML =
        this.getStatusBadge("resolved");
    }
  },

  switchTab(tabName) {
    try {
      console.log("🔄 Switching to tab:", tabName);

      document.querySelectorAll(".support-tab").forEach((tab) => {
        tab.classList.remove("active");
      });

      document.querySelectorAll("#supportTabs .btn").forEach((btn) => {
        btn.classList.remove("active");
      });

      const targetTab = document.getElementById(tabName + "Tab");
      const targetButton = document.querySelector(`[data-tab="${tabName}"]`);

      if (targetTab) {
        targetTab.classList.add("active");
        console.log("✅ Tab activated:", tabName + "Tab");
      } else {
        console.error("❌ Tab not found:", tabName + "Tab");
        return false;
      }

      if (targetButton) {
        targetButton.classList.add("active");
      }

      if (tabName === "tickets") {
        console.log("📋 Loading tickets for tickets tab");
        setTimeout(() => {
          this.loadTickets();
        }, 50);
      }

      return true;
    } catch (error) {
      console.error("❌ Error switching tab:", error);
      return false;
    }
  },

  generateTicketId() {
    return "TKT-" + Date.now().toString().slice(-6);
  },

  getStatusBadge(status) {
    const statuses = {
      open: ["باز", "status-open"],
      pending: ["در انتظار پاسخ", "status-pending"],
      resolved: ["حل شده", "status-resolved"],
      closed: ["بسته", "status-closed"],
    };

    const [text, className] = statuses[status] || ["نامشخص", "status-closed"];
    return `<span class="ticket-status-badge ${className}">${text}</span>`;
  },

  getPriorityBadge(priority) {
    const priorities = {
      low: ["کم", "priority-low"],
      medium: ["متوسط", "priority-medium"],
      high: ["بالا", "priority-high"],
      urgent: ["فوری", "priority-urgent"],
    };

    const [text, className] = priorities[priority] || [
      "متوسط",
      "priority-medium",
    ];
    return `<span class="priority-badge ${className}">${text}</span>`;
  },
};

// مدیریت ناوبری
const NavigationManager = {
  currentSection: "support",

  showSection(sectionName) {
    const validSections = [
      "dashboard",
      "payments",
      "cart",
      "mycourses",
      "myproducts",
      "news",
      "profile",
      "support",
    ];

    if (!validSections.includes(sectionName)) {
      console.warn("Invalid section name:", sectionName);
      return;
    }

    // اگر کاربر روی لینک دیگری غیر از پشتیبانی کلیک کرد
    if (sectionName !== "support") {
      // هدایت به صفحه مربوطه
      const pageMap = {
        dashboard: "Dashboard.html",
        payments: "payment.html",
        cart: "cart.html",
        mycourses: "mycourses.html",
        myproducts: "myProducts.html",
        news: "news.html",
        profile: "profile.html",
      };

      if (pageMap[sectionName]) {
        console.log(`🔄 Redirecting to: ${pageMap[sectionName]}`);
        window.location.href = pageMap[sectionName];
        return;
      }
    }

    this.currentSection = sectionName;

    // مخفی کردن همه بخش‌ها
    document.querySelectorAll("section").forEach((section) => {
      section.style.display = "none";
    });

    // نمایش بخش مورد نظر
    const targetSection = document.getElementById(sectionName + "Section");
    if (targetSection) {
      targetSection.style.display = "block";
      targetSection.classList.add("fade-in");
      this.loadSectionData(sectionName);

      console.log(`✅ Section displayed: ${sectionName}`);
    } else {
      console.error(`❌ Section not found: ${sectionName}Section`);
      // اگر بخش پیدا نشد، پیام خطا نمایش دهید
      this.showSectionNotFound(sectionName);
    }

    this.updatePageTitle(sectionName);
    this.closeSidebarOnMobile();
    this.updateActiveNavigation(sectionName);
  },

  // نمایش پیام وقتی بخش پیدا نشد
  showSectionNotFound(sectionName) {
    const mainContent = document.querySelector(".main-content");
    const notFoundHtml = `
            <div class="container-fluid py-4">
                <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-body text-center py-5">
                                <i class="fas fa-exclamation-triangle fa-3x text-warning mb-3"></i>
                                <h5>بخش مورد نظر یافت نشد</h5>
                                <p class="text-muted">بخش "${this.getSectionTitle(
                                  sectionName
                                )}" در این صفحه در دسترس نیست.</p>
                                <div class="d-flex justify-content-center gap-2">
                                    <a href="${sectionName}.html" class="btn btn-primary">
                                        <i class="fas fa-external-link-alt me-1"></i>
                                        رفتن به صفحه ${this.getSectionTitle(
                                          sectionName
                                        )}
                                    </a>
                                    <button onclick="NavigationManager.showSection('support')" class="btn btn-outline-secondary">
                                        <i class="fas fa-arrow-right me-1"></i>
                                        بازگشت به پشتیبانی
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

    // ایجاد یک بخش موقت برای نمایش پیام
    const tempSection = document.createElement("div");
    tempSection.innerHTML = notFoundHtml;
    mainContent.appendChild(tempSection);
  },

  // دریافت عنوان فارسی بخش
  getSectionTitle(sectionName) {
    const titles = {
      dashboard: "داشبورد",
      payments: "پرداخت‌ها",
      cart: "سبد خرید",
      mycourses: "دوره‌های من",
      myproducts: "محصولات من",
      news: "اخبار",
      profile: "پروفایل",
      support: "پشتیبانی",
    };
    return titles[sectionName] || sectionName;
  },

  updatePageTitle(sectionName) {
    const titles = {
      dashboard: "داشبورد",
      payments: "پرداخت‌ها",
      cart: "سبد خرید",
      mycourses: "دوره‌های من",
      myproducts: "محصولات من",
      news: "اخبار",
      profile: "ویرایش پروفایل",
      support: "پیام به پشتیبانی",
    };

    const pageTitle = document.getElementById("pageTitle");
    if (pageTitle) {
      pageTitle.textContent = titles[sectionName] || "داشبورد";
    }
  },

  closeSidebarOnMobile() {
    if (window.innerWidth < 992) {
      const sidebar = document.getElementById("sidebar");
      const overlay = document.getElementById("sidebarOverlay");
      if (sidebar && overlay) {
        sidebar.classList.remove("show");
        overlay.classList.remove("show");
      }
    }
  },

  updateActiveNavigation(sectionName) {
    document.querySelectorAll(".sidebar .nav-link").forEach((link) => {
      link.classList.remove("active");

      // پیدا کردن لینک مربوط به این بخش
      const linkSection = link.getAttribute("data-section");
      if (linkSection === sectionName) {
        link.classList.add("active");
      }
    });
  },

  loadSectionData(sectionName) {
    const loadMethods = {
      payments: () => UserPanelState.loadPayments(),
      cart: () => UserPanelState.loadCart(),
      mycourses: () => UserPanelState.loadMyCourses(),
      myproducts: () => UserPanelState.loadMyProducts(),
      news: () => UserPanelState.loadNews(),
      support: () => UserPanelState.loadSupportChat(),
    };

    if (loadMethods[sectionName]) {
      console.log(`📂 Loading data for: ${sectionName}`);
      loadMethods[sectionName]();
    }
  },

  initializeEventListeners() {
    this.initSidebarToggle();
    this.initNavigationLinks();
    this.initializeForms();

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.closeSidebarOnMobile();
      }
    });

    // مدیریت رویداد beforeunload برای ذخیره وضعیت
    window.addEventListener("beforeunload", () => {
      this.saveCurrentState();
    });

    console.log("🎯 Navigation event listeners initialized");
  },

  initSidebarToggle() {
    const toggleBtn = document.getElementById("toggleSidebar");
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("sidebarOverlay");

    if (toggleBtn && sidebar && overlay) {
      toggleBtn.addEventListener("click", () => {
        sidebar.classList.add("show");
        overlay.classList.add("show");
        console.log("📱 Sidebar opened");
      });

      overlay.addEventListener("click", () => {
        sidebar.classList.remove("show");
        overlay.classList.remove("show");
        console.log("📱 Sidebar closed");
      });

      // بستن سایدبار وقتی روی لینک کلیک می‌شود (در موبایل)
      document.querySelectorAll(".sidebar .nav-link").forEach((link) => {
        link.addEventListener("click", () => {
          if (window.innerWidth < 992) {
            sidebar.classList.remove("show");
            overlay.classList.remove("show");
            console.log("📱 Sidebar closed after link click");
          }
        });
      });
    } else {
      console.error("❌ Sidebar elements not found");
    }
  },

  initNavigationLinks() {
    const links = document.querySelectorAll(".sidebar .nav-link");
    console.log(`🔗 Found ${links.length} navigation links`);

    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        const href = link.getAttribute("href");
        const section = link.getAttribute("data-section");

        console.log(`🖱️ Link clicked:`, { href, section });

        // اگر لینک دارای data-section است (همه لینک‌های داخلی)
        if (section) {
          e.preventDefault(); // از رفتن به صفحه دیگر جلوگیری کن

          console.log(`🔄 Navigating to section: ${section}`);

          // وضعیت active را به‌روزرسانی کن
          document
            .querySelectorAll(".sidebar .nav-link")
            .forEach((l) => l.classList.remove("active"));
          link.classList.add("active");

          // بخش مربوطه را نمایش بده
          this.showSection(section);
        }
        // اگر لینک خارجی است (فروشگاه)، اجازه بده طبیعی عمل کند
        else if (href && href !== "#") {
          console.log(`🌐 External link: ${href}`);
          // وضعیت active را به‌روزرسانی کن
          document
            .querySelectorAll(".sidebar .nav-link")
            .forEach((l) => l.classList.remove("active"));
          link.classList.add("active");
          // اجازه بده لینک به صورت طبیعی عمل کند
        }
      });
    });
  },

  initializeForms() {
    // فرم پشتیبانی
    const supportForm = document.getElementById("supportForm");
    if (supportForm) {
      supportForm.addEventListener("submit", (e) => {
        e.preventDefault();
        console.log("📝 Support form submitted");
        SupportManager.createNewTicket();
      });
    } else {
      console.warn("⚠️ Support form not found");
    }

    // فرم پاسخ تیکت
    const ticketReplyForm = document.getElementById("ticketReplyForm");
    if (ticketReplyForm) {
      ticketReplyForm.addEventListener("submit", (e) => {
        e.preventDefault();
        console.log("📨 Ticket reply form submitted");
        SupportManager.sendTicketReply();
      });
    }

    // تب‌های پشتیبانی
    const supportTabs = document.querySelectorAll("#supportTabs .btn");
    if (supportTabs.length > 0) {
      supportTabs.forEach((btn) => {
        btn.addEventListener("click", function () {
          const tab = this.getAttribute("data-tab");
          console.log(`📑 Support tab clicked: ${tab}`);
          SupportManager.switchTab(tab);
        });
      });
    }

    console.log("✅ Forms initialized successfully");
  },

  // ذخیره وضعیت فعلی
  saveCurrentState() {
    const state = {
      currentSection: this.currentSection,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem("navigationState", JSON.stringify(state));
    console.log("💾 Navigation state saved:", state);
  },

  // بازیابی وضعیت قبلی
  restoreState() {
    const savedState = localStorage.getItem("navigationState");
    if (savedState) {
      const state = JSON.parse(savedState);
      console.log("📥 Restoring navigation state:", state);
      this.showSection(state.currentSection);
    }
  },

  // رفتن به بخش خاص
  navigateTo(sectionName) {
    this.showSection(sectionName);
  },

  // رفرش بخش فعلی
  refreshCurrentSection() {
    console.log("🔄 Refreshing current section:", this.currentSection);
    this.showSection(this.currentSection);
  },
};

// مدیریت وضعیت کاربر
const UserPanelState = {
  userData: null,
  autoSaveInterval: null,

  init() {
    this.loadUserData();
    NavigationManager.initializeEventListeners();

    // در صفحه پشتیبانی، بخش پشتیبانی را نمایش بده
    NavigationManager.showSection("support");

    this.updateStats();
    this.startAutoSave();
    this.loadAllSections();
  },

  loadUserData() {
    const savedData = StorageManager.load(CONFIG.STORAGE_KEY);

    if (savedData && this.validateUserData(savedData)) {
      this.userData = savedData;
    } else {
      this.userData = this.getDefaultUserData();
      this.saveUserData();
    }
  },

  validateUserData(data) {
    const requiredFields = [
      "profile",
      "orders",
      "courses",
      "totalSpent",
      "cartItems",
    ];
    return requiredFields.every((field) => data.hasOwnProperty(field));
  },

  getDefaultUserData() {
    return {
      profile: {
        firstName: "رضا",
        lastName: "موسوی",
        email: "profesorDied@gmail.com",
        phone: "09379863252",
        address: "نکا بلوار انقلاب پلاک 123",
        joinDate: "1404/05/10",
      },
      orders: 5,
      courses: 3,
      totalSpent: 2450000,
      cartItems: 2,
      supportTickets: [
        {
          id: "TKT-1001",
          subject: "پرسش درباره محصول بذر گوجه فرنگی",
          priority: "medium",
          status: "resolved",
          messages: [
            {
              id: 1,
              sender: "user",
              message:
                "سلام، می‌خواستم بدونم این بذر برای کشت در گلخانه مناسب هست؟",
              timestamp: "1402/09/15 - ۱۴:۳۰",
              attachment: null,
            },
            {
              id: 2,
              sender: "support",
              message:
                "با سلام، بله این بذر کاملاً برای کشت گلخانه‌ای مناسب است. نیاز به نور کافی و دمای ۲۰-۲۵ درجه دارد.",
              timestamp: "1402/09/15 - ۱۶:۴۵",
              attachment: null,
            },
          ],
          createdAt: "1402/09/15 - ۱۴:۳۰",
          updatedAt: "1402/09/16 - ۱۰:۲۰",
        },
      ],
    };
  },

  saveUserData() {
    return StorageManager.save(CONFIG.STORAGE_KEY, this.userData);
  },

  updateStats() {
    // این تابع برای صفحه پشتیبانی نیاز نیست
  },

  loadAllSections() {
    // فقط بخش پشتیبانی را لود کن
    this.loadSupportChat();
  },

  loadSupportChat() {
    try {
      if (!this.userData.supportTickets) {
        this.userData.supportTickets = [];
      }

      SupportManager.loadTickets();

      if (this.userData.supportTickets.length > 0) {
        setTimeout(() => {
          SupportManager.switchTab("tickets");
        }, 100);
      }
    } catch (error) {
      console.error("Error loading support chat:", error);
      NotificationManager.show("خطا در بارگذاری بخش پشتیبانی", "error");
    }
  },

  startAutoSave() {
    if (this.autoSaveInterval) {
      clearInterval(this.autoSaveInterval);
    }

    this.autoSaveInterval = setInterval(() => {
      this.saveUserData();
    }, CONFIG.AUTO_SAVE_INTERVAL);
  },

  stopAutoSave() {
    if (this.autoSaveInterval) {
      clearInterval(this.autoSaveInterval);
      this.autoSaveInterval = null;
    }
  },

  showLogoutModal() {
    const modal = new bootstrap.Modal(document.getElementById("logoutModal"));
    modal.show();
  },

  confirmLogout() {
    this.stopAutoSave();
    StorageManager.remove(CONFIG.SESSION_KEY);
    this.saveUserData();
    NotificationManager.show("با موفقیت خارج شدید!", "success");

    const modal = bootstrap.Modal.getInstance(
      document.getElementById("logoutModal")
    );
    if (modal) modal.hide();

    setTimeout(() => {
      window.location.href = "index.html";
    }, 1000);
  },

  // سایر متدهای بارگذاری بخش‌ها (برای سازگاری)
  loadPayments() {
    /* ... */
  },
  loadCart() {
    /* ... */
  },
  loadMyCourses() {
    /* ... */
  },
  loadMyProducts() {
    /* ... */
  },
  loadNews() {
    /* ... */
  },
};

// مقداردهی اولیه برنامه
document.addEventListener("DOMContentLoaded", function () {
  if (!window.localStorage) {
    alert(
      "مرورگر شما از LocalStorage پشتیبانی نمی‌کند. لطفاً مرورگر خود را بروزرسانی کنید."
    );
    return;
  }

  try {
    UserPanelState.init();
    setTimeout(() => {
      NotificationManager.show("به بخش پشتیبانی خوش آمدید", "info", 2000);
    }, 500);
  } catch (error) {
    console.error("Error initializing user panel:", error);
    NotificationManager.show("خطا در بارگذاری پنل کاربری", "error");
  }
});

// مدیریت خطاها
window.addEventListener("error", function (event) {
  console.error("Global error:", event.error);
  NotificationManager.show("خطایی در برنامه رخ داده است", "error");
});

window.addEventListener("unhandledrejection", function (event) {
  console.error("Unhandled promise rejection:", event.reason);
  NotificationManager.show("خطای ناشناخته رخ داده است", "error");
});

window.addEventListener("beforeunload", function () {
  UserPanelState.stopAutoSave();
  UserPanelState.saveUserData();
});
