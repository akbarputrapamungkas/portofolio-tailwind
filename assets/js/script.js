// navbar fix
window.onscroll = function () {
  const header = document.querySelector("header");
  const fixedNav = header.offsetTop;

  if (window.pageYOffset > fixedNav) {
    header.classList.add("navbar-fixed");
  } else {
    header.classList.remove("navbar-fixed");
  }
};

// hamburger
const hamburger = document.querySelector("#hamburger");
const navMenu = document.querySelector("#nav-menu");

hamburger.addEventListener("click", function () {
  hamburger.classList.toggle("hamburger-active");
  navMenu.classList.toggle("hidden");
});

// Close nav-menu when link is clicked on mobile
const navLinks = document.querySelectorAll("#nav-menu a");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("hamburger-active");
    navMenu.classList.add("hidden");
  });
});

// Dark Mode Toggle
const themeToggleBtn = document.querySelector("#theme-toggle");
const darkIcon = document.querySelector("#theme-toggle-dark-icon");
const lightIcon = document.querySelector("#theme-toggle-light-icon");

// Function to update icon states
function updateThemeIcons() {
  if (document.documentElement.classList.contains("dark")) {
    if (darkIcon) darkIcon.classList.add("hidden");
    if (lightIcon) lightIcon.classList.remove("hidden");
  } else {
    if (lightIcon) lightIcon.classList.add("hidden");
    if (darkIcon) darkIcon.classList.remove("hidden");
  }
}

// Initial update
updateThemeIcons();

if (themeToggleBtn) {
  themeToggleBtn.addEventListener("click", function () {
    // If theme is dark, make light
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("color-theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("color-theme", "dark");
    }
    updateThemeIcons();
  });
}

// Typing effect for Mock Terminal
function initTerminalTyping() {
  const terminalContent = document.getElementById("terminal-text");
  if (!terminalContent) return;

  const lines = [
    { text: "whoami", isCommand: true },
    { text: "akbarputrapamungkas", isCommand: false },
    { text: "sysinfo --status", isCommand: true },
    { text: "OS: Ubuntu Server 24.04 LTS\nHost: Pasundan-Univ Student-Node\nKernel: 6.8.0-sysadmin\nShell: bash 5.2\nStatus: Active Student | Aspiring SysAdmin", isCommand: false },
    { text: "skills --infrastructure", isCommand: true },
    { text: "[✔] Linux Server administration & Hardening\n[✔] Virtualization & Containerization (Docker)\n[✔] Web Server deployment (Nginx, Reverse Proxy)\n[✔] CI/CD Automation & GitHub Action workflow\n[✔] Networking basics & Scripting (Bash)", isCommand: false },
    { text: "cat message.txt", isCommand: true },
    { text: "\"Building highly available infrastructure and elegant web applications with passion!\"", isCommand: false }
  ];

  let currentLineIndex = 0;
  
  function typeLine() {
    if (currentLineIndex >= lines.length) {
      setTimeout(() => {
        terminalContent.innerHTML = "";
        currentLineIndex = 0;
        typeLine();
      }, 6000);
      return;
    }

    const line = lines[currentLineIndex];
    const lineElement = document.createElement("div");
    
    if (line.isCommand) {
      lineElement.className = "text-emerald-400 font-mono text-sm mb-1";
      lineElement.innerHTML = `<span class="text-indigo-400">visitor@akbar-infra:~$</span> `;
      terminalContent.appendChild(lineElement);
      
      let charIndex = 0;
      function typeChar() {
        if (charIndex < line.text.length) {
          lineElement.innerHTML += line.text.charAt(charIndex);
          charIndex++;
          setTimeout(typeChar, 60);
        } else {
          currentLineIndex++;
          setTimeout(typeLine, 500);
        }
      }
      typeChar();
    } else {
      lineElement.className = "text-slate-300 font-mono text-xs md:text-sm mb-3 whitespace-pre-line pl-3 border-l-2 border-slate-700 dark:border-slate-800";
      terminalContent.appendChild(lineElement);
      
      let charIndex = 0;
      function printOutput() {
        if (charIndex < line.text.length) {
          lineElement.innerHTML += line.text.charAt(charIndex);
          charIndex++;
          setTimeout(printOutput, 5);
        } else {
          currentLineIndex++;
          setTimeout(typeLine, 1500);
        }
      }
      printOutput();
    }
  }

  typeLine();
}

// Portfolio Filter
function initPortfolioFilter() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  if (filterButtons.length > 0 && projectCards.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener("click", () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => {
          btn.classList.remove("active", "bg-primary", "text-white");
          btn.classList.add("bg-slate-200", "dark:bg-slate-800", "text-slate-700", "dark:text-slate-300");
        });

        // Add active class to clicked button
        button.classList.add("active", "bg-primary", "text-white");
        button.classList.remove("bg-slate-200", "dark:bg-slate-800", "text-slate-700", "dark:text-slate-300");

        const filterValue = button.getAttribute("data-filter");

        projectCards.forEach(card => {
          // Reset styles
          card.style.transition = "transform 0.3s ease, opacity 0.3s ease";
          
          if (filterValue === "all" || card.getAttribute("data-category") === filterValue) {
            card.classList.remove("hidden");
            setTimeout(() => {
              card.style.transform = "scale(1)";
              card.style.opacity = "1";
            }, 10);
          } else {
            card.style.transform = "scale(0.95)";
            card.style.opacity = "0";
            setTimeout(() => {
              card.classList.add("hidden");
            }, 300);
          }
        });
      });
    });
  }
}

// Initialise on load
document.addEventListener("DOMContentLoaded", () => {
  initTerminalTyping();
  initPortfolioFilter();
  updateThemeIcons();
});

