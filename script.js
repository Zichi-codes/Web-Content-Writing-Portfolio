const menuToggle = document.getElementById('menu-toggle');
const closeMenu = document.getElementById('close-menu');
const navList = document.querySelector('nav ul');
const navLinks = document.querySelectorAll('nav ul li a');
const header = document.querySelector('header');

// Function to make the navbar sticky on scroll
function handleStickyNavbar() {
  if (window.scrollY > header.offsetTop) {
    header.classList.add('sticky'); // Add sticky class when the page is scrolled down
  } else {
    header.classList.remove('sticky'); // Remove sticky class when the page is at the top
  }
}

// Toggle mobile menu visibility
function toggleMenu() {
  if (window.innerWidth <= 944) {
    navList.classList.toggle('show');
    menuToggle.style.display = navList.classList.contains('show')
      ? 'none'
      : 'block';
    closeMenu.style.display = navList.classList.contains('show')
      ? 'block'
      : 'none';
  }
}

// Add event listeners
menuToggle.addEventListener('click', toggleMenu);
closeMenu.addEventListener('click', toggleMenu);

// Auto-close menu when a nav link is clicked on mobile
navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 944) {
      navList.classList.remove('show');
      menuToggle.style.display = 'block';
      closeMenu.style.display = 'none';
    }
  });
});

// Handle resizing
window.addEventListener('resize', () => {
  if (window.innerWidth > 944) {
    // On desktop: hide hamburger and close icon, close mobile menu
    menuToggle.style.display = 'none';
    closeMenu.style.display = 'none';
    navList.classList.remove('show');
  } else {
    // On mobile: show hamburger only if menu is not open
    if (!navList.classList.contains('show')) {
      menuToggle.style.display = 'block';
      closeMenu.style.display = 'none';
    }
  }

  // Force a reset if menu is open but window is resized above 768px
  if (window.innerWidth > 944 && navList.classList.contains('show')) {
    navList.classList.remove('show');
    menuToggle.style.display = 'none';
    closeMenu.style.display = 'none';
  }
});

// Add scroll event listener to make the navbar sticky
window.addEventListener('scroll', handleStickyNavbar);

// Get all sections
const sections = document.querySelectorAll('section');

// Get the current year
const currentYear = new Date().getFullYear();
document.getElementById('currentYear').textContent = currentYear;

// Throttle scroll event for better performance
let scrollTimeout;
window.addEventListener('scroll', () => {
  if (scrollTimeout) return;

  scrollTimeout = setTimeout(() => {
    let currentSection = '';

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (pageYOffset >= sectionTop - sectionHeight / 3) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href').includes(currentSection)) {
        link.classList.add('active');
      }
    });

    scrollTimeout = null;
  }, 100); // 100ms throttle
});
