// Get elements
const mobileToggle = document.getElementById("mobileToggle");
const navMenu = document.getElementById("navMenu");
const overlay = document.getElementById("overlay");
const dropdownBtn = document.getElementById("dropdownBtn");
const servicesDropdown = document.getElementById("servicesDropdown");

let isOpen = false;

// OPEN MENU
function openMenu() {
  if (!navMenu || !overlay) return;

  navMenu.classList.add("active");
  overlay.classList.add("active");
  document.body.classList.add("menu-open");

  mobileToggle.innerHTML = '<i class="fas fa-times"></i>';
  isOpen = true;
}

// CLOSE MENU
function closeMenu() {
  if (!navMenu || !overlay) return;

  navMenu.classList.remove("active");
  overlay.classList.remove("active");
  document.body.classList.remove("menu-open");

  mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
  isOpen = false;

  // Close dropdown if open
  if (servicesDropdown) {
    servicesDropdown.classList.remove("show");
  }
}

// TOGGLE MENU
function toggleMenu(e) {
  e.stopPropagation();

  if (isOpen) {
    closeMenu();
  } else {
    openMenu();
  }
}

// EVENT LISTENERS

// Hamburger click
mobileToggle.addEventListener("click", toggleMenu);

// Overlay click
overlay.addEventListener("click", closeMenu);

// Click outside menu
document.addEventListener("click", function (e) {
  if (!isOpen) return;

  const insideMenu = navMenu.contains(e.target);
  const onToggle = mobileToggle.contains(e.target);

  if (!insideMenu && !onToggle) {
    closeMenu();
  }
});

// ESC key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && isOpen) {
    closeMenu();
  }
});

// Dropdown (mobile)
if (dropdownBtn && servicesDropdown) {
  dropdownBtn.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    servicesDropdown.classList.toggle("show");
  });
}

// Close menu when clicking links
document.querySelectorAll(".nav-links a, .dropdown-menu a")
  .forEach(function (link) {
    link.addEventListener("click", function () {
      if (isOpen) closeMenu();
    });
  });