/**
 * ========================================
 * CV WEBSITE JAVASCRIPT - ENHANCED VERSION
 * ========================================
 * Author: Nguyễn Ngọc Tuấn
 * Description: Interactive effects and animations for CV website
 * Features: Matrix rain, custom cursor, typing effects, smooth animations
 * Dependencies: Font Awesome icons, Google Fonts
 * ========================================
 */

/**
 * MAIN INITIALIZATION
 * Khởi tạo tất cả các hiệu ứng khi trang web được tải
 */
document.addEventListener("DOMContentLoaded", function () {
  // Khởi tạo các hiệu ứng theo thứ tự ưu tiên
  initializeLoadingScreen(); // Màn hình loading
  initializeCustomCursor(); // Con trỏ tùy chỉnh
  initializeMatrixRain(); // Hiệu ứng mưa matrix
  initializeParticles(); // Hạt bay
  initializeTypingEffect(); // Hiệu ứng gõ chữ
  initializeScrollAnimations(); // Animation khi scroll
  initializeMouseTracker(); // Theo dõi chuột
  initializeKeyboardNavigation(); // Điều hướng bằng phím
  initializeSkillProgressAnimations(); // Animation thanh kỹ năng
});

/**
 * LOADING SCREEN FUNCTIONALITY
 * Quản lý màn hình loading ban đầu
 */
function initializeLoadingScreen() {
  // Ẩn loading screen sau 2 giây
  setTimeout(() => {
    document.getElementById("loadingScreen").classList.add("hidden");
  }, 2000);
}

/**
 * CUSTOM CURSOR EFFECTS
 * Tạo hiệu ứng con trỏ tùy chỉnh (chỉ trên desktop)
 */
function initializeCustomCursor() {
  const cursor = document.getElementById("cursor");
  const cursorFollower = document.getElementById("cursorFollower");

  // Chỉ áp dụng trên màn hình lớn (desktop)
  if (window.innerWidth > 768) {
    // Theo dõi chuyển động chuột
    document.addEventListener("mousemove", (e) => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";

      setTimeout(() => {
        cursorFollower.style.left = e.clientX + "px";
        cursorFollower.style.top = e.clientY + "px";
      }, 100);
    });

    // Cursor interactions
    document.querySelectorAll("a, button, .skill-tag").forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursor.style.transform = "scale(1.5)";
        cursorFollower.style.transform = "scale(1.5)";
      });

      el.addEventListener("mouseleave", () => {
        cursor.style.transform = "scale(1)";
        cursorFollower.style.transform = "scale(1)";
      });
    });
  }
}

// Matrix Rain Effect
function initializeMatrixRain() {
  const matrixRain = document.getElementById("matrixRain");
  const characters =
    "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";

  for (let i = 0; i < 50; i++) {
    const column = document.createElement("div");
    column.className = "matrix-column";
    column.style.left = Math.random() * 100 + "%";
    column.style.animationDuration = Math.random() * 3 + 2 + "s";
    column.style.animationDelay = Math.random() * 2 + "s";

    let text = "";
    for (let j = 0; j < 20; j++) {
      text +=
        characters.charAt(Math.floor(Math.random() * characters.length)) +
        "<br>";
    }
    column.innerHTML = text;

    matrixRain.appendChild(column);
  }
}

// Enhanced Particles
function initializeParticles() {
  const particlesContainer = document.getElementById("particles");
  const particleCount = 80;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    const type = Math.floor(Math.random() * 3) + 1;
    particle.className = `particle type-${type}`;
    particle.style.left = Math.random() * 100 + "%";
    particle.style.animationDelay = Math.random() * 15 + "s";
    particle.style.animationDuration = Math.random() * 10 + 10 + "s";
    particlesContainer.appendChild(particle);
  }
}

// Enhanced Typing Effect
function initializeTypingEffect() {
  const nameElement = document.getElementById("name-text");
  const subtitleElement = document.getElementById("subtitle-text");

  const lang = document.getElementById("languageSelect")?.value || "vi";
  const t = translations[lang];

  function typeWriter(element, text, speed = 100, callback) {
    element.textContent = "";
    let i = 0;

    function type() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      } else if (callback) {
        callback();
      }
    }

    type();
  }

  setTimeout(() => {
    typeWriter(nameElement, t.typewriter_name, 120, () => {
      setTimeout(() => {
        typeWriter(subtitleElement, t.typewriter_subtitle, 80);
      }, 500);
    });
  }, 2500);
}

// Scroll Animations
function initializeScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0) rotateX(0)";
      }
    });
  }, observerOptions);

  document
    .querySelectorAll(
      ".info-item, .experience-item, .skill-category, .education-item, .project-item, .contact-item"
    )
    .forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(50px) rotateX(10deg)";
      el.style.transition =
        "opacity 1s cubic-bezier(0.4, 0, 0.2, 1), transform 1s cubic-bezier(0.4, 0, 0.2, 1)";
      observer.observe(el);
    });
}

// Mouse Tracker for Cards
function initializeMouseTracker() {
  document.querySelectorAll(".info-item, .contact-item").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      card.style.setProperty("--mouse-x", x + "%");
      card.style.setProperty("--mouse-y", y + "%");
    });
  });
}

// Enhanced Tab Switching
function showTab(tabName) {
  const tabContents = document.querySelectorAll(".tab-content");
  const navTabs = document.querySelectorAll(".nav-tab");

  // Fade out current tab
  const currentTab = document.querySelector(".tab-content.active");
  if (currentTab) {
    currentTab.style.opacity = "0";
    currentTab.style.transform = "translateY(30px) scale(0.95)";
    currentTab.style.filter = "blur(5px)";

    setTimeout(() => {
      currentTab.classList.remove("active");

      // Show new tab
      const newTab = document.getElementById(tabName);
      newTab.classList.add("active");

      setTimeout(() => {
        newTab.style.opacity = "1";
        newTab.style.transform = "translateY(0) scale(1)";
        newTab.style.filter = "blur(0)";
      }, 50);
    }, 300);
  }

  // Update nav tabs
  navTabs.forEach((tab) => tab.classList.remove("active"));
  event.target.classList.add("active");

  // Trigger specific animations
  if (tabName === "skills") {
    setTimeout(() => {
      triggerSkillAnimations();
    }, 500);
  }
}

// Skill Progress Animations
function initializeSkillProgressAnimations() {
  const skillProgressBars = document.querySelectorAll(".skill-progress-fill");
  skillProgressBars.forEach((bar) => {
    bar.style.width = "0%";
  });
}

function triggerSkillAnimations() {
  const progressBars = document.querySelectorAll(".skill-progress-fill");
  progressBars.forEach((bar, index) => {
    setTimeout(() => {
      const targetWidth = bar.style.width;
      bar.style.width = "0%";
      setTimeout(() => {
        bar.style.width = targetWidth;
      }, 100);
    }, index * 200);
  });
}

// Keyboard Navigation
function initializeKeyboardNavigation() {
  document.addEventListener("keydown", (e) => {
    if (e.key >= "1" && e.key <= "6") {
      const tabs = [
        "about",
        "experience",
        "skills",
        "education",
        "projects",
        "contact",
      ];
      const tabIndex = parseInt(e.key) - 1;
      if (tabs[tabIndex]) {
        const tabButton = document.querySelector(
          `[onclick="showTab('${tabs[tabIndex]}')"]`
        );
        if (tabButton) {
          tabButton.click();
        }
      }
    }
  });
}

// Scroll to Top
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// Enhanced Parallax Effect
let ticking = false;

function updateParallax() {
  const scrolled = window.pageYOffset;
  const header = document.querySelector(".header");
  const geometricShapes = document.querySelectorAll(".geometric-shape");

  if (header) {
    header.style.transform = `translateY(${scrolled * 0.5}px)`;
  }

  geometricShapes.forEach((shape, index) => {
    const speed = 0.2 + index * 0.1;
    shape.style.transform = `translateY(${scrolled * speed}px) rotate(${
      scrolled * 0.1
    }deg)`;
  });

  ticking = false;
}

function requestTick() {
  if (!ticking) {
    requestAnimationFrame(updateParallax);
    ticking = true;
  }
}

window.addEventListener("scroll", requestTick);

// Performance optimization
window.addEventListener("load", () => {
  document.body.classList.add("loaded");

  // Preload critical animations
  setTimeout(() => {
    document.querySelectorAll(".skill-progress-fill").forEach((bar) => {
      bar.style.transition = "width 2s cubic-bezier(0.4, 0, 0.2, 1)";
    });
  }, 1000);
});
function switchLanguage() {
  const lang = document.getElementById("languageSelect").value;
  const t = translations[lang];

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (t[key]) {
      el.textContent = t[key];
    }
  });
}
document.addEventListener("DOMContentLoaded", () => {
  switchLanguage();
});

const translations = {
  vi: {
    typewriter_name: "Nguyễn Ngọc Tuấn",
    typewriter_subtitle:
      "Sinh viên năm 2 - Trường Đại học Giao thông vận tải TP.HCM",
    about: "Giới thiệu",
    experience: "Kinh nghiệm",
    skills: "Kỹ năng",
    education: "Học vấn",
    projects: "Dự án",
    contact: "Liên hệ",
    summary:
      "Sinh viên năm 2 ngành Công nghệ Thông tin tại Đại học UTH, yêu thích phát triển web và khám phá các công nghệ mới.",
    fullName: "Nguyễn Ngọc Tuấn",
    subtitle: "🫶❤️🫶",
    about_title: "Thông tin cá nhân",
    label_fullname: "Họ và tên",
    value_fullname: "Nguyễn Ngọc Tuấn",
    label_position: "Vị trí mong muốn",
    value_position: "Lập trình Full-Stack",
    label_phone: "Điện thoại",
    value_phone: "+84 915990195",
    label_email: "Email",
    value_email: "tuanlxl123@gmail.com",
    label_address: "Địa chỉ",
    value_address: "Hồ Chí Minh, Việt Nam",
    label_age: "Tuổi",
    value_age: "20 tuổi",
    summary:
      "Sinh viên năm 2 ngành Công nghệ Thông tin tại Đại học UTH, yêu thích phát triển web và khám phá các công nghệ mới. Có kinh nghiệm thực hành với HTML, CSS, JavaScript và Python thông qua các dự án cá nhân và bài tập lớn. Đang trau dồi kỹ năng lập trình, làm việc nhóm và tư duy giải quyết vấn đề. Mong muốn được học hỏi trong môi trường thực tế và đóng góp vào các sản phẩm công nghệ sáng tạo.",
    experience_title: "Kinh nghiệm",

    exp_cv_title: "Thực hiện dự án cá nhân: Website CV cá nhân",
    exp_cv_company: "Tự học và thực hành",
    exp_cv_date: "03/2024 – Nay",
    exp_cv_1:
      "Thiết kế và lập trình giao diện CV cá nhân với HTML, CSS và JavaScript",
    exp_cv_2:
      "Áp dụng hiệu ứng hoạt ảnh, hiệu ứng chuyển tab và responsive design",
    exp_cv_3:
      "Triển khai website lên GitHub Pages để chia sẻ với nhà tuyển dụng",

    exp_click_title: "Thiết kế tool chống click ảo cho quảng cáo Google",
    exp_click_company: "Dự án cá nhân - Python Automation",
    exp_click_date: "03/2024 – 06/2024",
    exp_click_1:
      "Phát triển tool tự động phát hiện IP bất thường truy cập vào quảng cáo Google",
    exp_click_2:
      "Sử dụng Python, Google Sheet API và Task Scheduler để ghi log và gửi cảnh báo qua email",
    exp_click_3:
      "Thiết kế giao diện web đơn giản giúp người dùng theo dõi hoạt động click dễ dàng trên điện thoại",
    exp_click_4:
      "Hiểu sâu hơn về việc bảo mật quảng cáo và hiệu quả chi tiêu ngân sách marketing",

    exp_club_title: "Thành viên CLB Tiếng Anh Chất lượng cao",
    exp_club_company: "Trường Đại học UTH",
    exp_club_date: "09/2023 – Nay",
    exp_club_1:
      "Tham gia các buổi thuyết trình, debate và workshop rèn luyện kỹ năng giao tiếp tiếng Anh",
    exp_club_2:
      "Phát triển khả năng sử dụng tiếng Anh học thuật, viết luận, thuyết trình dự án kỹ thuật",
    exp_club_3: "Hỗ trợ biên tập nội dung song ngữ cho bản tin sinh viên",
    exp_club_4:
      "Tự tin giao tiếp tiếng Anh trong môi trường học thuật và hợp tác nhóm đa ngôn ngữ",
    skills_title: "Kỹ năng",
    skill_prog_title: "Ngôn ngữ lập trình",
    skill_web_title: "Phát triển Web",
    skill_db_title: "Cơ sở dữ liệu",
    skill_tools_title: "Công cụ học tập",
    skill_soft_title: "Kỹ năng mềm",
    soft_team: "Làm việc nhóm",
    soft_communication: "Giao tiếp",
    soft_selflearn: "Tự học",
    soft_presentation: "Thuyết trình",
    education_title: "Học vấn",
    edu_degree: "Cử nhân Công nghệ Thông tin",
    edu_school: "Đại học Công nghệ TP.HCM (UTH)",
    edu_date: "2022 - 2026 (Dự kiến) | TP. Hồ Chí Minh, Việt Nam",
    edu_gpa_label: "GPA hiện tại:",
    edu_gpa_value: "3.3/4.0",
    edu_activities_label: "Hoạt động:",
    edu_activities_value:
      "Thành viên CLB Công nghệ, tham gia workshop về Web và Python",
    edu_projects_label: "Dự án học tập:",
    edu_projects_value:
      "Xây dựng website CV cá nhân, hệ thống quản lý sinh viên (PHP, MySQL)",
    edu_subjects_label: "Môn học nổi bật:",
    edu_subjects_value:
      "Lập trình Web, Cơ sở dữ liệu, Nhập môn AI, Cấu trúc dữ liệu và Giải thuật",

    cert_heading: "Chứng chỉ & Khóa học",

    cert_python_title: "Lập trình Python cơ bản",
    cert_python_org: "Coursera - University of Michigan",
    cert_python_date: "2023 | Đã hoàn thành",
    cert_python_desc:
      "Khóa học nền tảng giúp nắm vững cú pháp và ứng dụng cơ bản của Python trong xử lý dữ liệu và lập trình web.",

    cert_html_title: "Giới thiệu về HTML, CSS và JavaScript",
    cert_html_org: "freeCodeCamp",
    cert_html_date: "2023 | Đã hoàn thành",
    cert_html_desc:
      "Thực hành xây dựng giao diện web cơ bản và học cách tạo hiệu ứng tương tác đơn giản bằng JavaScript.",

    cert_flask_title: "Lập trình Web với Flask",
    cert_flask_org: "Udemy",
    cert_flask_date: "2024 | Đang học",
    cert_flask_desc:
      "Tìm hiểu cách xây dựng ứng dụng web backend bằng Python Flask, kết nối với cơ sở dữ liệu và triển khai ứng dụng.",
    projects_title: "Dự án cá nhân",

    project_cv_title: "Website CV cá nhân",
    project_cv_desc:
      "Thiết kế và lập trình website giới thiệu bản thân sử dụng HTML, CSS và JavaScript. Giao diện tương tác với hiệu ứng chuyển tab, hiệu ứng gõ chữ và hỗ trợ responsive trên điện thoại. Triển khai trên GitHub Pages.",

    project_task_title: "Ứng dụng quản lý công việc nhóm (Bài tập lớn)",
    project_task_desc:
      "Thực hiện trong môn Lập trình Web, ứng dụng cho phép tạo task, gán deadline, đánh dấu hoàn thành và lọc theo trạng thái. Sử dụng Bootstrap cho giao diện và lưu trữ dữ liệu bằng localStorage.",

    project_game_title: "Mini game: Đoán số may mắn",
    project_game_desc:
      "Một trò chơi nhỏ luyện kỹ năng JavaScript: người dùng nhập số để đoán, hệ thống phản hồi lớn hơn / nhỏ hơn / đúng. Thiết kế đơn giản, thân thiện, phục vụ học logic lập trình cơ bản.",

    project_book_title: "Dự án nhóm: Website bán sách (demo)",
    project_book_desc:
      "Dự án mô phỏng hệ thống bán sách trực tuyến với trang chủ, giỏ hàng và thanh toán đơn giản. Giao diện chia module, dùng PHP và MySQL để lưu sản phẩm và đơn hàng. Là bài tập lớn cuối kỳ năm nhất.",

    tag_simple_ui: "UI đơn giản",
    tag_mvc: "Mô hình MVC đơn giản",
    contact_title: "Liên hệ",
    contact_email_label: "Email",
    contact_email_value: "tuanlxl123@gmail.com",
    contact_facebook_label: "Facebook",
    contact_facebook_value: "Tuấn Nguyễn",
    contact_phone_label: "Điện thoại",
    contact_phone_value: "0915990195",
  },

  en: {
    typewriter_name: "Nguyen Ngoc Tuan",
    typewriter_subtitle: "2nd-year Student - University of Transport HCMC",
    about: "About",
    experience: "Experience",
    skills: "Skills",
    education: "Education",
    projects: "Projects",
    contact: "Contact",
    summary:
      "Second-year IT student at UTH University, passionate about web development and exploring new technologies.",
    fullName: "Nguyen Ngoc Tuan",
    subtitle: "🫶❤️🫶",
    about_title: "Personal Information",
    label_fullname: "Full Name",
    value_fullname: "Nguyen Ngoc Tuan",
    label_position: "Desired Position",
    value_position: "Full-Stack Developer",
    label_phone: "Phone",
    value_phone: "+84 915990195",
    label_email: "Email",
    value_email: "tuanlxl123@gmail.com",
    label_address: "Address",
    value_address: "Ho Chi Minh City, Vietnam",
    label_age: "Age",
    value_age: "20 years old",
    summary:
      "A second-year Information Technology student at UTH University, passionate about web development and exploring new technologies. Experienced with HTML, CSS, JavaScript, and Python through personal projects and major assignments. Continuously improving programming, teamwork, and problem-solving skills. Eager to learn in real-world environments and contribute to innovative tech products.",
    experience_title: "Experience",

    exp_cv_title: "Personal Project: CV Website",
    exp_cv_company: "Self-learning and Practice",
    exp_cv_date: "03/2024 – Present",
    exp_cv_1:
      "Designed and built a personal CV website using HTML, CSS, and JavaScript",
    exp_cv_2: "Applied animations, tab switching, and responsive design",
    exp_cv_3: "Deployed the website on GitHub Pages for recruiters",

    exp_click_title: "Anti-fake-click Tool for Google Ads",
    exp_click_company: "Personal Project - Python Automation",
    exp_click_date: "03/2024 – 06/2024",
    exp_click_1:
      "Developed a tool to detect suspicious IPs clicking on Google ads",
    exp_click_2:
      "Used Python, Google Sheets API, and Task Scheduler for logging and email alerts",
    exp_click_3: "Created a simple web UI for easy click monitoring on phones",
    exp_click_4:
      "Gained deeper understanding of ad security and marketing budget efficiency",

    exp_club_title: "Member of Advanced English Club",
    exp_club_company: "UTH University",
    exp_club_date: "09/2023 – Present",
    exp_club_1:
      "Participated in presentations, debates, and workshops to enhance English communication",
    exp_club_2:
      "Improved academic English skills: essay writing, technical presentation",
    exp_club_3: "Helped edit bilingual content for student newsletters",
    exp_club_4:
      "Confident in academic English communication and multilingual teamwork",
    skills_title: "Skills",
    skill_prog_title: "Programming Languages",
    skill_web_title: "Web Development",
    skill_db_title: "Databases",
    skill_tools_title: "Learning Tools",
    skill_soft_title: "Soft Skills",
    soft_team: "Teamwork",
    soft_communication: "Communication",
    soft_selflearn: "Self-learning",
    soft_presentation: "Presentation",
    education_title: "Education",
    edu_degree: "Bachelor of Information Technology",
    edu_school: "Ho Chi Minh City University of Technology (UTH)",
    edu_date: "2022 - 2026 (Expected) | Ho Chi Minh City, Vietnam",
    edu_gpa_label: "Current GPA:",
    edu_gpa_value: "3.3/4.0",
    edu_activities_label: "Activities:",
    edu_activities_value:
      "Member of Technology Club, participated in Web and Python workshops",
    edu_projects_label: "Academic Projects:",
    edu_projects_value:
      "Built a personal CV website, student management system (PHP, MySQL)",
    edu_subjects_label: "Key Courses:",
    edu_subjects_value:
      "Web Programming, Databases, Introduction to AI, Data Structures and Algorithms",

    cert_heading: "Certificates & Courses",
    cert_python_title: "Basic Python Programming",
    cert_python_org: "Coursera - University of Michigan",
    cert_python_date: "2023 | Completed",
    cert_python_desc:
      "Fundamental course covering Python syntax and applications in data processing and web development.",
    cert_html_title: "Intro to HTML, CSS, and JavaScript",
    cert_html_org: "freeCodeCamp",
    cert_html_date: "2023 | Completed",
    cert_html_desc:
      "Practiced building basic web interfaces and creating interactive effects using JavaScript.",
    cert_flask_title: "Web Development with Flask",
    cert_flask_org: "Udemy",
    cert_flask_date: "2024 | In Progress",
    cert_flask_desc:
      "Learning to build backend web apps with Python Flask, connect to databases, and deploy applications.",
    projects_title: "Personal Projects",

    project_cv_title: "Personal CV Website",
    project_cv_desc:
      "Designed and coded a personal introduction website using HTML, CSS, and JavaScript. Interactive UI with tab transitions, typewriter effect, and mobile responsiveness. Deployed on GitHub Pages.",

    project_task_title: "Team Task Management App (Major Assignment)",
    project_task_desc:
      "Built for Web Programming class, allowing users to create tasks, set deadlines, mark completion, and filter by status. Used Bootstrap UI and localStorage for data.",

    project_game_title: "Mini Game: Guess the Lucky Number",
    project_game_desc:
      "A simple JavaScript-based game where users guess a number with feedback (higher/lower/correct). Friendly UI for practicing basic programming logic.",

    project_book_title: "Group Project: Bookstore Website (Demo)",
    project_book_desc:
      "Simulated online bookstore with homepage, cart, and checkout. Modular UI design using PHP and MySQL to store products and orders. Final group assignment in first year.",

    tag_simple_ui: "Simple UI",
    tag_mvc: "Basic MVC pattern",
    contact_title: "Contact",
    contact_email_label: "Email",
    contact_email_value: "tuanlxl123@gmail.com",
    contact_facebook_label: "Facebook",
    contact_facebook_value: "Tuan Nguyen",
    contact_phone_label: "Phone",
    contact_phone_value: "0915990195",
  },
  zh: {
    typewriter_name: "阮玉俊",
    typewriter_subtitle: "大二学生 - 胡志明交通运输大学",
    about: "简介",
    experience: "经验",
    skills: "技能",
    education: "学历",
    projects: "项目",
    contact: "联系",
    summary: "UTH大学二年级信息技术学生，热爱网页开发和探索新技术。",
    fullName: "阮玉俊",
    subtitle: "🫶❤️🫶",
    about_title: "个人信息",
    label_fullname: "姓名",
    value_fullname: "阮玉俊",
    label_position: "期望职位",
    value_position: "全栈开发者",
    label_phone: "电话",
    value_phone: "+84 915990195",
    label_email: "邮箱",
    value_email: "tuanlxl123@gmail.com",
    label_address: "地址",
    value_address: "越南胡志明市",
    label_age: "年龄",
    value_age: "20岁",
    summary:
      "UTH大学二年级信息技术学生，热爱网页开发与探索新技术。通过个人项目和大作业积累了HTML、CSS、JavaScript和Python经验。正在提升编程、团队协作与问题解决能力。希望在真实环境中学习并为创新科技产品贡献力量。",
    experience_title: "经验",

    exp_cv_title: "个人项目：简历网站",
    exp_cv_company: "自学与实践",
    exp_cv_date: "2024年3月 – 至今",
    exp_cv_1: "使用 HTML、CSS 和 JavaScript 构建个人简历网站",
    exp_cv_2: "应用动画效果、选项卡切换与响应式设计",
    exp_cv_3: "部署至 GitHub Pages，便于招聘方查看",

    exp_click_title: "Google广告反虚假点击工具",
    exp_click_company: "个人项目 - Python 自动化",
    exp_click_date: "2024年3月 – 2024年6月",
    exp_click_1: "开发工具自动检测广告异常点击的 IP 地址",
    exp_click_2:
      "使用 Python、Google Sheets API 和任务计划器记录日志并发送警报邮件",
    exp_click_3: "设计简洁的网页界面方便手机查看点击记录",
    exp_click_4: "深入理解广告安全与市场预算效率",

    exp_club_title: "英语优质俱乐部成员",
    exp_club_company: "UTH大学",
    exp_club_date: "2023年9月 – 至今",
    exp_club_1: "参与演讲、辩论和工作坊，提升英语交流能力",
    exp_club_2: "培养学术英语能力，写作、项目展示",
    exp_club_3: "协助编辑学生双语简报内容",
    exp_club_4: "自信使用英语进行学术交流与多语言协作",
    skills_title: "技能",
    skill_prog_title: "编程语言",
    skill_web_title: "网页开发",
    skill_db_title: "数据库",
    skill_tools_title: "学习工具",
    skill_soft_title: "软技能",
    soft_team: "团队合作",
    soft_communication: "沟通能力",
    soft_selflearn: "自学能力",
    soft_presentation: "演讲能力",
    education_title: "学历",
    edu_degree: "信息技术学士",
    edu_school: "胡志明市技术大学 (UTH)",
    edu_date: "2022 - 2026（预计）| 越南胡志明市",
    edu_gpa_label: "当前 GPA：",
    edu_gpa_value: "3.3/4.0",
    edu_activities_label: "课外活动：",
    edu_activities_value: "科技俱乐部成员，参加了 Web 和 Python 工作坊",
    edu_projects_label: "学习项目：",
    edu_projects_value: "构建个人简历网站，学生管理系统（PHP，MySQL）",
    edu_subjects_label: "重点课程：",
    edu_subjects_value: "网页编程、数据库、人工智能导论、数据结构与算法",

    cert_heading: "证书与课程",
    cert_python_title: "Python 编程基础",
    cert_python_org: "Coursera - 密歇根大学",
    cert_python_date: "2023 | 已完成",
    cert_python_desc:
      "基础课程，掌握 Python 语法及其在数据处理和网页开发中的应用。",
    cert_html_title: "HTML、CSS 和 JavaScript 入门",
    cert_html_org: "freeCodeCamp",
    cert_html_date: "2023 | 已完成",
    cert_html_desc: "练习构建基础网页界面，并使用 JavaScript 创建交互效果。",
    cert_flask_title: "使用 Flask 进行 Web 开发",
    cert_flask_org: "Udemy",
    cert_flask_date: "2024 | 学习中",
    cert_flask_desc:
      "学习使用 Python Flask 构建后端网页应用，连接数据库并部署项目。",
    projects_title: "个人项目",

    project_cv_title: "个人简历网站",
    project_cv_desc:
      "使用 HTML、CSS 和 JavaScript 设计并开发个人介绍网站。界面交互包含标签切换、打字动画，并支持手机响应式布局。部署在 GitHub Pages 上。",

    project_task_title: "团队任务管理应用（大作业）",
    project_task_desc:
      "在 Web 编程课程中开发的应用，可创建任务、设置截止日期、标记完成并按状态筛选。界面使用 Bootstrap，数据存储于 localStorage。",

    project_game_title: "小游戏：猜幸运数字",
    project_game_desc:
      "一个简单的 JavaScript 练习游戏，用户输入数字进行猜测，系统提示大于/小于/正确。界面简洁，适合训练基础编程逻辑。",

    project_book_title: "小组项目：在线书店网站（演示）",
    project_book_desc:
      "模拟在线书店系统，包含首页、购物车与结账模块。界面采用模块化设计，使用 PHP 和 MySQL 存储产品和订单。为大一学期末项目。",

    tag_simple_ui: "简洁界面",
    tag_mvc: "基础 MVC 模型",
    contact_title: "联系",
    contact_email_label: "邮箱",
    contact_email_value: "tuanlxl123@gmail.com",
    contact_facebook_label: "脸书",
    contact_facebook_value: "阮俊",
    contact_phone_label: "电话",
    contact_phone_value: "0915990195",
  },
};
// Toggle menu cho mobile

/**
 * ========================================
 * ENHANCED ANIMATION CONTROLLERS
 * ========================================
 * Các function điều khiển animation CSS3
 */

/**
 * INTERSECTION OBSERVER FOR ANIMATIONS
 * Kích hoạt animation khi element xuất hiện trên màn hình
 */
function initializeIntersectionAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const element = entry.target;

        // Thêm class animation dựa trên data attribute
        const animationType = element.dataset.animation;
        if (animationType) {
          element.classList.add(animationType);
        }

        // Trigger stagger animation cho children
        if (element.classList.contains("stagger-container")) {
          element.classList.add("stagger-animation");
        }

        // Trigger elastic bounce cho buttons
        if (element.classList.contains("bounce-trigger")) {
          element.classList.add("elastic-bounce");
        }
      }
    });
  }, observerOptions);

  // Observe tất cả elements có data-animation
  document.querySelectorAll("[data-animation]").forEach((el) => {
    observer.observe(el);
  });

  // Observe stagger containers
  document.querySelectorAll(".stagger-container").forEach((el) => {
    observer.observe(el);
  });
}

/**
 * MAGNETIC HOVER EFFECT
 * Tạo hiệu ứng từ tính khi hover
 */
function initializeMagneticHover() {
  document.querySelectorAll(".magnetic-hover").forEach((element) => {
    element.addEventListener("mousemove", (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Giới hạn khoảng cách di chuyển
      const maxDistance = 20;
      const distance = Math.sqrt(x * x + y * y);
      const factor = Math.min(distance / 100, 1);

      const moveX = (x / distance) * maxDistance * factor;
      const moveY = (y / distance) * maxDistance * factor;

      element.style.setProperty("--mouse-x", `${moveX}px`);
      element.style.setProperty("--mouse-y", `${moveY}px`);
    });

    element.addEventListener("mouseleave", () => {
      element.style.setProperty("--mouse-x", "0px");
      element.style.setProperty("--mouse-y", "0px");
    });
  });
}

/**
 * RIPPLE EFFECT ON CLICK
 * Tạo hiệu ứng ripple khi click
 */
function initializeRippleEffect() {
  document.querySelectorAll(".ripple-effect").forEach((element) => {
    element.addEventListener("click", function (e) {
      const ripple = document.createElement("span");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = x + "px";
      ripple.style.top = y + "px";
      ripple.classList.add("ripple");

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
}

/**
 * PARALLAX SCROLL EFFECT
 * Hiệu ứng parallax khi scroll
 */
function initializeParallaxScroll() {
  const parallaxElements = document.querySelectorAll(".parallax-element");

  function updateParallax() {
    const scrolled = window.pageYOffset;

    parallaxElements.forEach((element, index) => {
      const rate = scrolled * -0.5 * (index + 1) * 0.1;
      element.style.transform = `translateY(${rate}px)`;
    });
  }

  // Throttle scroll event
  let ticking = false;
  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
      setTimeout(() => {
        ticking = false;
      }, 16);
    }
  }

  window.addEventListener("scroll", requestTick);
}

/**
 * TYPEWRITER EFFECT ENHANCED
 * Hiệu ứng gõ chữ nâng cao
 */
function initializeTypewriterEffect() {
  const typewriterElements = document.querySelectorAll(".typewriter-text");

  typewriterElements.forEach((element, index) => {
    const text = element.textContent;
    element.textContent = "";

    setTimeout(() => {
      let i = 0;
      const timer = setInterval(() => {
        if (i < text.length) {
          element.textContent += text.charAt(i);
          i++;
        } else {
          clearInterval(timer);
          // Remove cursor after typing
          setTimeout(() => {
            element.style.borderRight = "none";
          }, 1000);
        }
      }, 100);
    }, index * 1000);
  });
}

/**
 * SMOOTH SCROLL TO SECTIONS
 * Cuộn mượt đến các section
 */
function initializeSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

/**
 * ENHANCED TAB SWITCHING WITH ANIMATIONS
 * Chuyển tab với animation nâng cao
 */
function showTabEnhanced(tabName) {
  const tabContents = document.querySelectorAll(".tab-content");
  const navTabs = document.querySelectorAll(".nav-tab-enhanced");

  // Fade out current tab với animation
  const currentTab = document.querySelector(".tab-content.active");
  if (currentTab) {
    currentTab.style.opacity = "0";
    currentTab.style.transform = "translateY(30px) scale(0.95)";
    currentTab.style.filter = "blur(5px)";

    setTimeout(() => {
      currentTab.classList.remove("active");

      // Show new tab với animation
      const newTab = document.getElementById(tabName);
      newTab.classList.add("active");

      // Reset styles
      newTab.style.opacity = "0";
      newTab.style.transform = "translateY(30px) scale(0.95)";
      newTab.style.filter = "blur(5px)";

      setTimeout(() => {
        newTab.style.opacity = "1";
        newTab.style.transform = "translateY(0) scale(1)";
        newTab.style.filter = "blur(0)";

        // Trigger animations for new content
        triggerContentAnimations(newTab);
      }, 50);
    }, 300);
  }

  // Update nav tabs
  navTabs.forEach((tab) => {
    tab.classList.remove("active");
    tab.classList.add("elastic-bounce");
    setTimeout(() => tab.classList.remove("elastic-bounce"), 800);
  });

  // Find and activate clicked tab
  const clickedTab = Array.from(navTabs).find((tab) =>
    tab.getAttribute("onclick").includes(tabName)
  );
  if (clickedTab) {
    clickedTab.classList.add("active");
  }
}

/**
 * TRIGGER CONTENT ANIMATIONS
 * Kích hoạt animation cho nội dung mới
 */
function triggerContentAnimations(container) {
  // Trigger stagger animations
  const staggerElements = container.querySelectorAll(
    ".info-item-enhanced, .experience-item, .skill-category"
  );
  staggerElements.forEach((element, index) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";

    setTimeout(() => {
      element.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    }, index * 100);
  });

  // Trigger skill progress animations
  if (container.id === "skills") {
    setTimeout(() => {
      triggerSkillAnimationsEnhanced();
    }, 500);
  }
}

/**
 * ENHANCED SKILL PROGRESS ANIMATIONS
 * Animation thanh kỹ năng nâng cao
 */
function triggerSkillAnimationsEnhanced() {
  const progressBars = document.querySelectorAll(
    ".skill-progress-fill-enhanced"
  );
  progressBars.forEach((bar, index) => {
    const targetWidth = bar.style.width;
    bar.style.width = "0%";

    setTimeout(() => {
      bar.style.transition = "width 2s cubic-bezier(0.4, 0, 0.2, 1)";
      bar.style.width = targetWidth;

      // Add shine effect
      bar.classList.add("skill-shine-effect");
    }, index * 200);
  });
}

/**
 * INITIALIZE ALL ENHANCED ANIMATIONS
 * Khởi tạo tất cả animation nâng cao
 */
function initializeEnhancedAnimations() {
  initializeIntersectionAnimations();
  initializeMagneticHover();
  initializeRippleEffect();
  initializeParallaxScroll();
  initializeTypewriterEffect();
  initializeSmoothScroll();
}

// Gọi function khi DOM loaded
document.addEventListener("DOMContentLoaded", () => {
  initializeEnhancedAnimations();
});

// Override showTab function với enhanced version
window.showTab = showTabEnhanced;

/**
 * ========================================
 * IMAGE HANDLING ENHANCEMENTS
 * ========================================
 * Xử lý ảnh và gallery nâng cao
 */

/**
 * LAZY LOADING FOR IMAGES
 * Tải ảnh lazy loading để tối ưu performance
 */
function initializeLazyLoading() {
  const images = document.querySelectorAll("img[data-src]");

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("image-loading");
        img.classList.add("image-fade-in");

        img.onload = () => {
          img.classList.add("loaded");
        };

        observer.unobserve(img);
      }
    });
  });

  images.forEach((img) => {
    img.classList.add("image-loading");
    imageObserver.observe(img);
  });
}

/**
 * IMAGE LIGHTBOX FUNCTIONALITY
 * Hiệu ứng lightbox cho ảnh
 */
function initializeImageLightbox() {
  // Tạo lightbox container
  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.innerHTML = `
    <span class="lightbox-close">&times;</span>
    <img src="" alt="Lightbox Image">
  `;
  document.body.appendChild(lightbox);

  const lightboxImg = lightbox.querySelector("img");
  const closeBtn = lightbox.querySelector(".lightbox-close");

  // Thêm click event cho tất cả ảnh có class lightbox-trigger
  document.querySelectorAll(".lightbox-trigger").forEach((img) => {
    img.addEventListener("click", () => {
      lightboxImg.src = img.src;
      lightbox.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  // Đóng lightbox
  function closeLightbox() {
    lightbox.classList.remove("active");
    document.body.style.overflow = "auto";
  }

  closeBtn.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Đóng bằng phím ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("active")) {
      closeLightbox();
    }
  });
}

/**
 * PROFILE IMAGE ENHANCEMENTS
 * Cải thiện hiệu ứng ảnh profile
 */
function initializeProfileImageEffects() {
  const profileImg = document.querySelector(".profile-img-enhanced");

  if (profileImg) {
    // Thêm badge status
    const badge = document.createElement("div");
    badge.className = "profile-badge";
    badge.innerHTML = '<i class="fas fa-check"></i>';
    badge.title = "Đã xác thực";
    profileImg.appendChild(badge);

    // Thêm hiệu ứng hover nâng cao
    profileImg.addEventListener("mouseenter", () => {
      profileImg.style.transform = "scale(1.05) rotateY(10deg)";
    });

    profileImg.addEventListener("mouseleave", () => {
      profileImg.style.transform = "scale(1) rotateY(0deg)";
    });
  }
}

/**
 * IMAGE GALLERY FUNCTIONALITY
 * Chức năng gallery ảnh
 */
function initializeImageGallery() {
  const galleryItems = document.querySelectorAll(".gallery-item");

  galleryItems.forEach((item, index) => {
    // Thêm animation delay
    item.style.animationDelay = `${index * 0.1}s`;

    // Thêm hover effect
    item.addEventListener("mouseenter", () => {
      item.style.transform = "translateY(-10px) scale(1.05)";
    });

    item.addEventListener("mouseleave", () => {
      item.style.transform = "translateY(0) scale(1)";
    });
  });
}

/**
 * IMAGE OPTIMIZATION
 * Tối ưu hóa ảnh
 */
function optimizeImages() {
  const images = document.querySelectorAll("img");

  images.forEach((img) => {
    // Thêm loading="lazy" cho ảnh chưa có
    if (!img.hasAttribute("loading")) {
      img.setAttribute("loading", "lazy");
    }

    // Thêm error handling
    img.addEventListener("error", () => {
      img.src =
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBmb3VuZDwvdGV4dD48L3N2Zz4=";
      img.alt = "Image not found";
    });
  });
}

/**
 * RESPONSIVE IMAGE HANDLING
 * Xử lý ảnh responsive
 */
function handleResponsiveImages() {
  const images = document.querySelectorAll("img[data-sizes]");

  function updateImageSizes() {
    const screenWidth = window.innerWidth;

    images.forEach((img) => {
      const sizes = JSON.parse(img.dataset.sizes);
      let selectedSrc = img.src;

      if (screenWidth <= 480 && sizes.small) {
        selectedSrc = sizes.small;
      } else if (screenWidth <= 768 && sizes.medium) {
        selectedSrc = sizes.medium;
      } else if (sizes.large) {
        selectedSrc = sizes.large;
      }

      if (img.src !== selectedSrc) {
        img.src = selectedSrc;
      }
    });
  }

  window.addEventListener("resize", updateImageSizes);
  updateImageSizes();
}

/**
 * INITIALIZE ALL IMAGE ENHANCEMENTS
 * Khởi tạo tất cả cải tiến ảnh
 */
function initializeImageEnhancements() {
  initializeLazyLoading();
  initializeImageLightbox();
  initializeProfileImageEffects();
  initializeImageGallery();
  optimizeImages();
  handleResponsiveImages();
}

// Thêm vào main initialization
document.addEventListener("DOMContentLoaded", () => {
  initializeImageEnhancements();
});
