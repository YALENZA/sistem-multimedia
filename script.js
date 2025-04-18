// Existing parallax scrolling effect
let text = document.getElementById("text");
let cloudl = document.getElementById("cloudl");
let cloudr = document.getElementById("cloudr");
let mountain = document.getElementById("mountain");
let grass = document.getElementById("grass");
let btn = document.getElementById("btn");
let header = document.getElementById("header");

window.addEventListener("scroll", function () {
  let value = window.scrollY;

  if (text && cloudl && cloudr && mountain && grass && btn && header) {
    text.style.top = 50 + value * -0.5 + "%";
    cloudl.style.top = value * -2 + "px";
    cloudl.style.left = value * -10 + "px";
    cloudr.style.top = value * -2 + "px";
    cloudr.style.left = value * 10 + "px";
    btn.style.marginTop = value * 1 + "px";
    grass.style.top = value * -0.12 + "px";
    mountain.style.top = value * 0.25 + "px";
    header.style.top = value * 0.5 + "px";
  }
});

// Loading animation
document.addEventListener("DOMContentLoaded", function () {
  // Create loading screen
  const loading = document.createElement("div");
  loading.className = "loading";
  loading.innerHTML = '<div class="loader"></div>';
  document.body.appendChild(loading);

  // Hide loading screen after content is loaded
  setTimeout(() => {
    loading.classList.add("hidden");
    setTimeout(() => {
      loading.remove();
    }, 500);
  }, 1000);

  // Toggle theme
  const themeToggle = document.querySelector(".theme-toggle");
  if (themeToggle) {
    // Check for saved theme preference
    if (localStorage.getItem("theme") === "dark") {
      document.body.classList.add("dark-theme");
    }

    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-theme");
      // Save theme preference
      localStorage.setItem(
        "theme",
        document.body.classList.contains("dark-theme") ? "dark" : "light"
      );
    });
  }

  // Mobile menu toggle
  const hamburger = document.querySelector(".hamburger");
  const navbar = document.querySelector(".navbar");

  if (hamburger && navbar) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navbar.classList.toggle("active");

      // Animation for hamburger
      const bars = hamburger.querySelectorAll(".bar");
      if (hamburger.classList.contains("active")) {
        bars[0].style.transform = "rotate(-45deg) translate(-5px, 6px)";
        bars[1].style.opacity = "0";
        bars[2].style.transform = "rotate(45deg) translate(-5px, -6px)";
      } else {
        bars[0].style.transform = "none";
        bars[1].style.opacity = "1";
        bars[2].style.transform = "none";
      }
    });

    // Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (navbar.classList.contains("active")) {
          hamburger.click();
        }
      });
    });
  }

  // Back to top button
  const backToTopButton = document.querySelector(".back-to-top");
  if (backToTopButton) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        backToTopButton.classList.add("active");
      } else {
        backToTopButton.classList.remove("active");
      }
    });
  }

  // Animate skill bars when in viewport
  const skillBars = document.querySelectorAll(".skill-bar");
  if (skillBars.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const progressBar = entry.target.querySelector(".progress");
            const width = progressBar.style.width;
            progressBar.style.width = "0";

            setTimeout(() => {
              progressBar.style.width = width;
            }, 200);

            // Stop observing once animation is triggered
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    skillBars.forEach((bar) => {
      observer.observe(bar);
    });
  }

  // Form submission with validation
  const messageForm = document.getElementById("messageForm");
  const formStatus = document.getElementById("formStatus");

  if (messageForm && formStatus) {
    messageForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Simple validation
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const message = document.getElementById("message").value;

      if (!name || !email || !message) {
        formStatus.innerHTML = "Mohon isi semua field!";
        formStatus.className = "form-status error";
        return;
      }

      // Email validation
      const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
      if (!email.match(emailPattern)) {
        formStatus.innerHTML = "Mohon masukkan alamat email yang valid!";
        formStatus.className = "form-status error";
        return;
      }

      // Simulate form submission
      formStatus.innerHTML = "Mengirim pesan...";
      formStatus.className = "form-status";

      setTimeout(() => {
        formStatus.innerHTML = "Pesan telah terkirim! Terima kasih.";
        formStatus.className = "form-status success";
        messageForm.reset();
      }, 1500);
    });
  }

  // Add typing animation to hero text
  const heroText = document.querySelector(".animated-text");
  if (heroText) {
    heroText.classList.add("typing");
  }

  // Image gallery modal functionality
  const galleryItems = document.querySelectorAll(".gallery-item");

  if (galleryItems.length > 0) {
    // Create modal
    const modal = document.createElement("div");
    modal.className = "modal";
    modal.innerHTML = `
      <div class="modal-content">
        <span class="modal-close">&times;</span>
        <img src="" alt="Expanded Image">
      </div>
    `;
    document.body.appendChild(modal);

    const modalImg = modal.querySelector("img");
    const modalClose = modal.querySelector(".modal-close");

    galleryItems.forEach((item) => {
      item.addEventListener("click", function () {
        const imgSrc = this.querySelector("img").src;
        modalImg.src = imgSrc;
        modal.classList.add("active");
        document.body.style.overflow = "hidden";
      });
    });

    // Close modal
    modalClose.addEventListener("click", () => {
      modal.classList.remove("active");
      document.body.style.overflow = "";
    });

    // Close modal when clicking outside
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("active");
        document.body.style.overflow = "";
      }
    });
  }

  // Add tooltip functionality
  const tooltipElements = document.querySelectorAll("[data-tooltip]");
  tooltipElements.forEach((element) => {
    element.addEventListener("mouseover", () => {
      element.style.position = "relative";
    });
  });

  // Add smooth scrolling to anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      if (href !== "#") {
        e.preventDefault();

        const targetElement = document.querySelector(href);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: "smooth",
          });
        }
      }
    });
  });

  // Add animated counter for statistics
  const counters = document.querySelectorAll(".counter");
  if (counters.length > 0) {
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.getAttribute("data-target"));
            let count = 0;

            const updateCounter = () => {
              const increment = target / 100;

              if (count < target) {
                count += increment;
                counter.innerText = Math.ceil(count);
                setTimeout(updateCounter, 10);
              } else {
                counter.innerText = target;
              }
            };

            updateCounter();
            counterObserver.unobserve(counter);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach((counter) => {
      counterObserver.observe(counter);
    });
  }
});

// Custom cursor effect (uncomment if needed)
/*
document.addEventListener('mousemove', function(e) {
  const cursor = document.querySelector('.custom-cursor');
  if (!cursor) {
    const newCursor = document.createElement('div');
    newCursor.className = 'custom-cursor';
    document.body.appendChild(newCursor);
    
    // Add styles to head
    const style = document.createElement('style');
    style.innerHTML = `
      .custom-cursor {
        position: fixed;
        width: 20px;
        height: 20px;
        border: 2px solid var(--primary-color);
        border-radius: 50%;
        pointer-events: none;
        transform: translate(-50%, -50%);
        transition: width 0.2s, height 0.2s;
        z-index: 9999;
      }
      
      .custom-cursor.active {
        width: 50px;
        height: 50px;
        border-color: var(--accent-color);
      }
    `;
    document.head.appendChild(style);
  }
  
  const cursor = document.querySelector('.custom-cursor');
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

document.addEventListener('click', function() {
  const cursor = document.querySelector('.custom-cursor');
  if (cursor) {
    cursor.classList.add('active');
    setTimeout(() => {
      cursor.classList.remove('active');
    }, 300);
  }
});
*/

// Add AOS-like scroll animations
function initScrollAnimations() {
  const elements = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  elements.forEach((element) => {
    observer.observe(element);
  });
}

// Add classes to elements you want to animate
document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll(
    "section, .about, .projects, .contact"
  );

  sections.forEach((section) => {
    section.classList.add("reveal");
  });

  // Add necessary CSS
  const style = document.createElement("style");
  style.innerHTML = `
    .reveal {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    .reveal.active {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);

  initScrollAnimations();
});
