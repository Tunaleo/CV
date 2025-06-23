// Initialize all effects
document.addEventListener("DOMContentLoaded", function () {
  initializeLoadingScreen();
  initializeCustomCursor();
  initializeMatrixRain();
  initializeParticles();
  initializeTypingEffect();
  initializeScrollAnimations();
  initializeMouseTracker();
  initializeKeyboardNavigation();
  initializeSkillProgressAnimations();
});

// Loading Screen
function initializeLoadingScreen() {
  setTimeout(() => {
    document.getElementById("loadingScreen").classList.add("hidden");
  }, 2000);
}

// Custom Cursor
function initializeCustomCursor() {
  const cursor = document.getElementById("cursor");
  const cursorFollower = document.getElementById("cursorFollower");

  if (window.innerWidth > 768) {
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
    typeWriter(nameElement, "Nguyễn Ngọc Tuấn", 120, () => {
      setTimeout(() => {
        typeWriter(
          subtitleElement,
          "Sinh viên năm 2 - Trường Đại học Giao thông vận tải TP.HCM",
          80
        );
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
