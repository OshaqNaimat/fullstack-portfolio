// script.js

// Simple form submission handler (for demonstration)
document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Message sent! (This is a demo)");
});

// Animate skills bars on scroll
window.addEventListener("scroll", function () {
  const skillsSection = document.getElementById("skills");
  if (skillsSection.getBoundingClientRect().top < window.innerHeight) {
    const progressBars = document.querySelectorAll(".progress-bar");
    progressBars.forEach((bar) => {
      bar.style.animation = "progressAnimation 2s ease-in-out forwards";
    });
  }
});

// 1. Mobile Menu Toggle (Existing Logic)
const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");
const menuOpenIcon = document.getElementById("menu-open-icon");
const menuCloseIcon = document.getElementById("menu-close-icon");

mobileMenuButton.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
  menuOpenIcon.classList.toggle("hidden");
  menuCloseIcon.classList.toggle("hidden");
});

// 2. Smooth Scrolling & Menu Closing (New/Modified Logic)

// Select all navigation links (desktop and mobile)
const allNavLinks = document.querySelectorAll(
  ".nav-link, .nav-link-mobile, .scroll-smooth-js"
);

allNavLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    // Only handle internal anchor links (like #about, #skills)
    if (this.hash !== "") {
      e.preventDefault(); // Stop the default jump

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // Programmatic Smooth Scroll
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Offset by 80px for the fixed header
          behavior: "smooth",
        });

        // Close the mobile menu after clicking a link
        if (mobileMenu && !mobileMenu.classList.contains("hidden")) {
          mobileMenu.classList.add("hidden");
          menuOpenIcon.classList.remove("hidden");
          menuCloseIcon.classList.add("hidden");
        }
      }
    }
  });
});

// 3. Scroll Reveal (Existing Logic)
const revealElements = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);
const words = [
  "Student",
  "Enthusiast",
  "PHP Developer",
  "MERN Stack Developer",
  "Web Developer",
  "Web Designer",
];

let index = 0;
let charIndex = 0;
let currentWord = "";
let isDeleting = false;
const typingText = document.getElementById("typing-text");

function typeEffect() {
  currentWord = words[index];

  if (!isDeleting) {
    typingText.innerHTML = currentWord.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentWord.length) {
      isDeleting = true;
      setTimeout(typeEffect, 1000); // pause after full word
      return;
    }
  } else {
    typingText.innerHTML = currentWord.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      index = (index + 1) % words.length;
    }
  }

  setTimeout(typeEffect, isDeleting ? 50 : 100);
}

typeEffect();
revealElements.forEach((el) => observer.observe(el));
