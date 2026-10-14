const AdminPanelState = {
  supportTickets: [],

  init() {
    this.loadFromStorage();
    if (this.supportTickets.length === 0) {
      this.supportTickets = [...this.getMockData().supportTickets];
    }
    this.saveToStorage();
  },

  loadFromStorage() {
    const savedData = localStorage.getItem("adminSupportData");
    if (savedData) {
      const data = JSON.parse(savedData);
      this.supportTickets = data.supportTickets || [];
    }
  },

  saveToStorage() {
    const data = {
      supportTickets: this.supportTickets,
    };
    localStorage.setItem("adminSupportData", JSON.stringify(data));
  },

  getMockData() {
    return {
      supportTickets: [
        {
          id: 1,
          userId: 1,
          userName: "علی احمدی",
          userAvatar:
            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiM0Q0FGNTAiLz4KPHRleHQgeD0iMjAiIHk9IjI1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSIxNCI+2KjYsTwvdGV4dD4KPC9zdmc+",
          status: "open",
          priority: "urgent",
          category: "payment",
          subject: "مشکل در پرداخت",
          lastMessage: "وقتی میخوام پرداخت کنم خطای ۵۰۳ میاد",
          lastMessageTime: "۱۴:۳۰",
          unreadCount: 2,
          userStatus: "online",
          lastSeen: "هم اکنون",
          messages: [
            {
              id: 1,
              sender: "user",
              text: "با سلام، من مشکل در پرداخت دارم",
              time: "۱۴:۲۵",
              read: true,
            },
            {
              id: 2,
              sender: "admin",
              text: "سلام علی جان، چه مشکلی دارید؟",
              time: "۱۴:۲۷",
              read: true,
            },
            {
              id: 3,
              sender: "user",
              text: "وقتی میخوام پرداخت کنم خطای ۵۰۳ میاد",
              time: "۱۴:۳۰",
              read: false,
            },
          ],
          createdAt: "1402/10/15",
        },
        {
          id: 2,
          userId: 2,
          userName: "سارا محمدی",
          userAvatar:
            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiM2RDRDNDEiLz4KPHRleHQgeD0iMjAiIHk9IjI1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSIxNCI+2KfYsDwvdGV4dD4KPC9zdmc+",
          status: "open",
          priority: "high",
          category: "product",
          subject: "کیفیت محصول",
          lastMessage: "محصولی که دریافت کردم کیفیت پایینی داشت",
          lastMessageTime: "۱۳:۴۵",
          unreadCount: 0,
          userStatus: "online",
          lastSeen: "۵ دقیقه پیش",
          messages: [
            {
              id: 1,
              sender: "user",
              text: "محصولی که دریافت کردم کیفیت پایینی داشت",
              time: "۱۳:۴۰",
              read: true,
            },
            {
              id: 2,
              sender: "admin",
              text: "لطفاً عکس محصول را ارسال کنید تا بررسی کنیم",
              time: "۱۳:۴۵",
              read: true,
            },
          ],
          createdAt: "1402/10/14",
        },
        {
          id: 3,
          userId: 3,
          userName: "محمد رضایی",
          userAvatar:
            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiM5NDdGQkIiLz4KPHRleHQgeD0iMjAiIHk9IjI1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSIxNCI+2YfZhDwvdGV4dD4KPC9zdmc+",
          status: "resolved",
          priority: "medium",
          category: "suggestion",
          subject: "پیشنهاد بهبود سایت",
          lastMessage: "ممنون از راهنمایی شما",
          lastMessageTime: "دیروز",
          unreadCount: 0,
          userStatus: "offline",
          lastSeen: "۲ ساعت پیش",
          messages: [
            {
              id: 1,
              sender: "user",
              text: "پیشنهاد می‌کنم امکان مقایسه محصولات را اضافه کنید",
              time: "دیروز ۱۰:۲۰",
              read: true,
            },
            {
              id: 2,
              sender: "admin",
              text: "پیشنهاد خوبیه، در نسخه بعدی اضافه خواهد شد",
              time: "دیروز ۱۰:۳۰",
              read: true,
            },
            {
              id: 3,
              sender: "user",
              text: "ممنون از راهنمایی شما",
              time: "دیروز ۱۰:۳۵",
              read: true,
            },
          ],
          createdAt: "1402/10/12",
        },
        {
          id: 4,
          userId: 4,
          userName: "فاطمه حسینی",
          userAvatar:
            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiNGRjU3MjIiLz4KPHRleHQgeD0iMjAiIHk9IjI1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSIxNCI+2KfZhNixPC90ZXh0Pgo8L3N2Zz4=",
          status: "open",
          priority: "high",
          category: "technical",
          subject: "مشکل در دریافت دوره",
          lastMessage: "دوره ای که خریداری کردم دانلود نمیشه",
          lastMessageTime: "۱۱:۲۰",
          unreadCount: 1,
          userStatus: "away",
          lastSeen: "۳۰ دقیقه پیش",
          messages: [
            {
              id: 1,
              sender: "user",
              text: "دوره ای که خریداری کردم دانلود نمیشه",
              time: "۱۱:۱۵",
              read: true,
            },
            {
              id: 2,
              sender: "user",
              text: "خطای ۴۰۴ میگیرم وقتی میخوام دانلود کنم",
              time: "۱۱:۲۰",
              read: false,
            },
          ],
          createdAt: "1402/10/15",
        },
        {
          id: 5,
          userId: 5,
          userName: "رضا کریمی",
          userAvatar:
            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiM3NTc1NzUiLz4KPHRleHQgeD0iMjAiIHk9IjI1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSIxNCI+2KfYr9mGPC90ZXh0Pgo8L3N2Zz4=",
          status: "open",
          priority: "low",
          category: "other",
          subject: "سوال درباره گارانتی",
          lastMessage: "گارانتی محصولات چند ساله؟",
          lastMessageTime: "۱۰:۱۵",
          unreadCount: 0,
          userStatus: "online",
          lastSeen: "۱۰ دقیقه پیش",
          messages: [
            {
              id: 1,
              sender: "user",
              text: "گارانتی محصولات چند ساله؟",
              time: "۱۰:۱۵",
              read: true,
            },
          ],
          createdAt: "1402/10/16",
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

// مدیریت پشتیبانی و چت
const SupportManager = {
  currentTicketId: null,
  isTyping: false,
  typingTimer: null,
  currentFilter: "all",
  currentPriority: null,
  currentCategory: null,

  loadSupportTickets(filter = "all", priority = null, category = null) {
    const usersList = document.getElementById("usersList");
    usersList.innerHTML = "";

    this.currentFilter = filter;
    this.currentPriority = priority;
    this.currentCategory = category;

    let filteredTickets = AdminPanelState.supportTickets;

    // اعمال فیلتر وضعیت
    if (filter === "unread") {
      filteredTickets = AdminPanelState.supportTickets.filter(
        (ticket) => ticket.unreadCount > 0
      );
    }

    // اعمال فیلتر اولویت
    if (priority) {
      filteredTickets = filteredTickets.filter(
        (ticket) => ticket.priority === priority
      );
    }

    // اعمال فیلتر موضوع
    if (category) {
      filteredTickets = filteredTickets.filter(
        (ticket) => ticket.category === category
      );
    }

    // به روزرسانی دکمه‌های فیلتر فعال
    this.updateActiveFilters(filter, priority, category);

    filteredTickets.forEach((ticket) => {
      const statusClass = {
        open: "ticket-open",
        pending: "ticket-pending",
        resolved: "ticket-resolved",
        closed: "ticket-closed",
      };

      const priorityIcon = {
        urgent: "fa-exclamation-circle text-danger",
        high: "fa-exclamation-triangle text-warning",
        medium: "fa-info-circle text-info",
        low: "fa-info-circle text-muted",
      };

      const userItem = document.createElement("a");
      userItem.href = "#";
      userItem.className = `list-group-item list-group-item-action d-flex justify-content-between align-items-center ${
        ticket.unreadCount > 0 ? "unread-chat" : ""
      }`;
      userItem.innerHTML = `
                        <div class="d-flex align-items-center">
                            <div class="position-relative me-3">
                                <img src="${ticket.userAvatar}" alt="${
        ticket.userName
      }" class="user-avatar">
                                <span class="user-status status-${
                                  ticket.userStatus
                                }"></span>
                            </div>
                            <div>
                                <h6 class="mb-0">${ticket.userName}</h6>
                                <small class="text-muted">${
                                  ticket.lastMessage
                                }</small>
                                <div class="mt-1">
                                    <span class="ticket-badge ${
                                      statusClass[ticket.status]
                                    }">${this.getStatusText(
        ticket.status
      )}</span>
                                    <i class="fas ${
                                      priorityIcon[ticket.priority]
                                    } ms-1"></i>
                                    <small class="text-muted">${this.getCategoryText(
                                      ticket.category
                                    )}</small>
                                </div>
                            </div>
                        </div>
                        <div class="text-end">
                            <small class="text-muted d-block">${
                              ticket.lastMessageTime
                            }</small>
                            ${
                              ticket.unreadCount > 0
                                ? `<span class="badge bg-primary rounded-pill">${ticket.unreadCount}</span>`
                                : ""
                            }
                        </div>
                    `;

      userItem.addEventListener("click", () => {
        this.selectTicket(ticket.id);
      });

      usersList.appendChild(userItem);
    });

    this.updateStats();
  },

  getStatusText(status) {
    const statusTexts = {
      open: "باز",
      pending: "در انتظار",
      resolved: "حل شده",
      closed: "بسته",
    };
    return statusTexts[status] || status;
  },

  getCategoryText(category) {
    const categoryTexts = {
      product: "محصول",
      payment: "خرید",
      suggestion: "پیشنهاد",
      technical: "فنی",
      other: "سایر",
    };
    return categoryTexts[category] || category;
  },

  updateActiveFilters(filter, priority, category) {
    // به روزرسانی دکمه‌های فیلتر وضعیت
    document.querySelectorAll(".card-header .btn").forEach((btn) => {
      if (btn.textContent.includes("همه") && filter === "all") {
        btn.classList.add("active");
      } else if (
        btn.textContent.includes("خوانده نشده") &&
        filter === "unread"
      ) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    // به روزرسانی دکمه‌های فیلتر اولویت
    document.querySelectorAll(".filter-btn[data-priority]").forEach((btn) => {
      if (btn.dataset.priority === priority) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    // به روزرسانی دکمه‌های فیلتر موضوع
    document.querySelectorAll(".filter-btn[data-category]").forEach((btn) => {
      if (btn.dataset.category === category) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
  },

  updateStats() {
    const totalTickets = AdminPanelState.supportTickets.length;
    const openTickets = AdminPanelState.supportTickets.filter(
      (t) => t.status === "open"
    ).length;

    // شبیه‌سازی آمار
    const responseTime = Math.floor(Math.random() * 30) + 5; // 5-35 دقیقه
    const satisfactionRate = Math.floor(Math.random() * 30) + 70; // 70-100%

    document.getElementById("totalTickets").textContent = totalTickets;
    document.getElementById("openTickets").textContent = openTickets;
    document.getElementById("responseTime").textContent = responseTime + "m";
    document.getElementById("satisfactionRate").textContent =
      satisfactionRate + "%";
  },

  filterTickets(filter) {
    this.loadSupportTickets(filter, this.currentPriority, this.currentCategory);
  },

  filterByPriority(priority) {
    this.loadSupportTickets(this.currentFilter, priority, this.currentCategory);
  },

  filterByCategory(category) {
    this.loadSupportTickets(this.currentFilter, this.currentPriority, category);
  },

  selectTicket(ticketId) {
    this.currentTicketId = ticketId;
    const ticket = AdminPanelState.supportTickets.find(
      (t) => t.id === ticketId
    );

    if (!ticket) return;

    // فعال کردن فیلد ارسال پیام
    document.getElementById("messageInput").disabled = false;
    document.getElementById("sendMessageBtn").disabled = false;

    // به روزرسانی اطلاعات کاربر انتخاب شده
    document.getElementById(
      "currentChatUser"
    ).textContent = `${ticket.userName} - ${ticket.subject}`;
    document.getElementById(
      "userLastSeen"
    ).textContent = `آخرین فعالیت: ${ticket.lastSeen}`;

    const statusElement = document.getElementById("userStatus");
    statusElement.classList.remove("d-none");
    statusElement.textContent =
      ticket.userStatus === "online"
        ? "آنلاین"
        : ticket.userStatus === "away"
        ? "مشغول"
        : "آفلاین";
    statusElement.className = `badge bg-${
      ticket.userStatus === "online"
        ? "success"
        : ticket.userStatus === "away"
        ? "warning"
        : "secondary"
    }`;

    // نمایش پیام‌ها
    this.loadChatMessages(ticket);

    // علامت زدن پیام‌ها به عنوان خوانده شده
    this.markAsRead(ticketId);

    // شبیه‌سازی تایپینگ
    this.simulateTyping(ticket);
  },

  loadChatMessages(ticket) {
    const chatContainer = document.getElementById("chatMessages");
    chatContainer.innerHTML = "";

    if (!ticket.messages || ticket.messages.length === 0) {
      chatContainer.innerHTML = `
                        <div class="text-center text-muted py-5">
                            <i class="fas fa-comment-slash fa-3x mb-3"></i>
                            <p>هنوز هیچ پیامی رد و بدل نشده است.</p>
                        </div>
                    `;
      return;
    }

    ticket.messages.forEach((message) => {
      const messageElement = document.createElement("div");
      messageElement.className = `d-flex mb-3 ${
        message.sender === "admin"
          ? "justify-content-end"
          : "justify-content-start"
      }`;

      messageElement.innerHTML = `
                        <div class="chat-message ${
                          message.sender === "admin"
                            ? "admin-message"
                            : "user-message"
                        }">
                            <div class="message-text">${message.text}</div>
                            <div class="message-time">${message.time} ${
        message.read ? "✓✓" : "✓"
      }</div>
                        </div>
                    `;

      chatContainer.appendChild(messageElement);
    });

    // اسکرول به پایین
    chatContainer.scrollTop = chatContainer.scrollHeight;
  },

  simulateTyping(ticket) {
    if (ticket.userStatus === "online" && ticket.messages.length > 0) {
      const lastMessage = ticket.messages[ticket.messages.length - 1];
      if (lastMessage.sender === "user" && !lastMessage.read) {
        this.showTypingIndicator();

        // پنهان کردن تایپینگ بعد از 3 ثانیه
        setTimeout(() => {
          this.hideTypingIndicator();
        }, 3000);
      }
    }
  },

  showTypingIndicator() {
    const chatContainer = document.getElementById("chatMessages");
    const typingElement = document.createElement("div");
    typingElement.className = "typing-indicator";
    typingElement.innerHTML = `
                    <div class="typing-dots">
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                    </div>
                    <span>${
                      document
                        .getElementById("currentChatUser")
                        .textContent.split(" - ")[0]
                    } در حال تایپ است...</span>
                `;
    chatContainer.appendChild(typingElement);
    chatContainer.scrollTop = chatContainer.scrollHeight;
  },

  hideTypingIndicator() {
    const chatContainer = document.getElementById("chatMessages");
    const typingElement = chatContainer.querySelector(".typing-indicator");
    if (typingElement) {
      typingElement.remove();
    }
  },

  sendMessage() {
    if (!this.currentTicketId) return;

    const messageInput = document.getElementById("messageInput");
    const messageText = messageInput.value.trim();

    if (!messageText) return;

    const ticket = AdminPanelState.supportTickets.find(
      (t) => t.id === this.currentTicketId
    );
    if (!ticket) return;

    // ایجاد پیام جدید
    const newMessage = {
      id:
        ticket.messages.length > 0
          ? Math.max(...ticket.messages.map((m) => m.id)) + 1
          : 1,
      sender: "admin",
      text: messageText,
      time: this.getCurrentTime(),
      read: true,
    };

    // افزودن پیام به تیکت
    ticket.messages.push(newMessage);

    // به روزرسانی اطلاعات تیکت
    ticket.lastMessage = messageText;
    ticket.lastMessageTime = "هم اکنون";
    ticket.status = "open";

    // ذخیره تغییرات
    AdminPanelState.saveToStorage();

    // به روزرسانی نمایش
    this.loadChatMessages(ticket);
    this.loadSupportTickets(
      this.currentFilter,
      this.currentPriority,
      this.currentCategory
    );

    // پاک کردن فیلد ورودی
    messageInput.value = "";
    this.updateCharCount();

    NotificationManager.show("پیام با موفقیت ارسال شد", "success");
  },

  insertQuickReply(text) {
    const messageInput = document.getElementById("messageInput");
    messageInput.value = text;
    messageInput.focus();
    this.updateCharCount();
  },

  markAsRead(ticketId) {
    const ticket = AdminPanelState.supportTickets.find(
      (t) => t.id === ticketId
    );
    if (!ticket || !ticket.messages) return;

    // علامت زدن همه پیام‌ها به عنوان خوانده شده
    ticket.messages.forEach((message) => {
      message.read = true;
    });

    // بازنشانی تعداد پیام‌های خوانده نشده
    ticket.unreadCount = 0;

    // ذخیره تغییرات
    AdminPanelState.saveToStorage();
    this.loadSupportTickets(
      this.currentFilter,
      this.currentPriority,
      this.currentCategory
    );
  },

  closeTicket() {
    if (!this.currentTicketId) return;

    const ticket = AdminPanelState.supportTickets.find(
      (t) => t.id === this.currentTicketId
    );
    if (!ticket) return;

    if (confirm("آیا از بستن این تیکت اطمینان دارید؟")) {
      ticket.status = "closed";
      AdminPanelState.saveToStorage();
      this.loadSupportTickets(
        this.currentFilter,
        this.currentPriority,
        this.currentCategory
      );
      NotificationManager.show("تیکت با موفقیت بسته شد", "success");
    }
  },

  getCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  },

  updateCharCount() {
    const messageInput = document.getElementById("messageInput");
    const charCount = document.getElementById("charCount");
    const count = messageInput.value.length;
    charCount.textContent = `${count}/1000`;

    if (count > 1000) {
      charCount.className = "text-muted text-danger";
    } else if (count > 800) {
      charCount.className = "text-muted text-warning";
    } else {
      charCount.className = "text-muted";
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

    // Navigation
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

    // Send message on button click
    document.getElementById("sendMessageBtn").addEventListener("click", () => {
      SupportManager.sendMessage();
    });

    // Send message on Enter key (with Shift for new line)
    document.getElementById("messageInput").addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        SupportManager.sendMessage();
      }
    });

    // Auto-resize textarea and update char count
    document
      .getElementById("messageInput")
      .addEventListener("input", function () {
        this.style.height = "auto";
        this.style.height = this.scrollHeight + "px";
        SupportManager.updateCharCount();
      });

    // Initialize char count
    document.getElementById("messageInput").addEventListener("focus", () => {
      SupportManager.updateCharCount();
    });

    // فیلترهای جدید - اولویت
    document.querySelectorAll(".filter-btn[data-priority]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const priority = btn.dataset.priority;
        SupportManager.filterByPriority(
          priority === SupportManager.currentPriority ? null : priority
        );
      });
    });

    // فیلترهای جدید - موضوع
    document.querySelectorAll(".filter-btn[data-category]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const category = btn.dataset.category;
        SupportManager.filterByCategory(
          category === SupportManager.currentCategory ? null : category
        );
      });
    });
  },
};

// مقداردهی اولیه هنگام لود صفحه
document.addEventListener("DOMContentLoaded", function () {
  AdminPanelState.init();
  NavigationManager.initializeEventListeners();
  SupportManager.loadSupportTickets();

  // افزودن افکت fade-in به بخش پشتیبانی
  document.getElementById("supportSection").classList.add("fade-in");

  // شبیه‌سازی دریافت پیام جدید هر 30 ثانیه
  setInterval(() => {
    const randomTicket =
      AdminPanelState.supportTickets[
        Math.floor(Math.random() * AdminPanelState.supportTickets.length)
      ];
    if (
      randomTicket &&
      randomTicket.status === "open" &&
      randomTicket.userStatus === "online"
    ) {
      randomTicket.unreadCount++;
      randomTicket.lastMessageTime = SupportManager.getCurrentTime();
      randomTicket.lastMessage = "پیام جدید دریافت شد";
      AdminPanelState.saveToStorage();
      SupportManager.loadSupportTickets(
        SupportManager.currentFilter,
        SupportManager.currentPriority,
        SupportManager.currentCategory
      );
    }
  }, 30000);
});
