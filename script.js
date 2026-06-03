// script.js

// ---------- TYPING EFFECT ----------
const typedSpan = document.querySelector('.typed-text');
const cursorSpan = document.querySelector('.cursor');

const words = ['CSE undergraduate', 'MERN Stack Developer', 'Software Developer', 'problem solver', 'Data Analyst'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeDelay = 100;

function typeEffect() {
  const currentWord = words[wordIndex];
  if (isDeleting) {
    typedSpan.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedSpan.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === currentWord.length) {
    isDeleting = true;
    typeDelay = 1500; // pause before deleting
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    typeDelay = 300;
  } else {
    typeDelay = isDeleting ? 50 : 100;
  }

  setTimeout(typeEffect, typeDelay);
}

if (typedSpan) {
  window.addEventListener('load', () => {
    setTimeout(typeEffect, 500);
  });
}

// ---------- MOBILE HAMBURGER MENU ----------
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // change icon
    const icon = hamburger.querySelector('i');
    if (navLinks.classList.contains('active')) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-times');
    } else {
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  });
}

// ---------- SMOOTH SCROLL (also close mobile menu on link click) ----------
const navBar = document.querySelector('.navbar');
const navOffset = () => (navBar ? navBar.offsetHeight : 70);

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href'); // #home etc
    const targetEl = document.querySelector(targetId);
    if (targetEl) {
      window.scrollTo({
        top: targetEl.offsetTop - navOffset(),
        behavior: 'smooth'
      });
    }
    // close mobile menu if open
    if (navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      const icon = hamburger.querySelector('i');
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  });
});

// ---------- ACTIVE NAV LINK HIGHLIGHT ON SCROLL (optional smooth UX) ----------
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  const offset = navOffset();
  sections.forEach(section => {
    const sectionTop = section.offsetTop - offset - 10;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active-link');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active-link');
    }
  });
});

// ---------- PROGRESS BARS ANIMATION ON SCROLL (trigger when visible) ----------
const progressBars = document.querySelectorAll('.fill');
function checkProgress() {
  progressBars.forEach(bar => {
    const barPosition = bar.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if (barPosition < windowHeight - 50) {
      // width already set inline in html, but we can enforce a small animation
      // just ensure width stays as set; we can also add a tiny reset if needed
      bar.style.transition = 'width 1s ease';
    }
  });
}
window.addEventListener('load', checkProgress);
window.addEventListener('scroll', checkProgress);

// ---------- THANK YOU MODAL FUNCTIONS ----------
function showThankYouModal() {
  const modal = document.getElementById('thankYouModal');
  if (modal) {
    modal.classList.add('show');
  }
}

function closeThankYouModal() {
  const modal = document.getElementById('thankYouModal');
  if (modal) {
    modal.classList.remove('show');
  }
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
  const modal = document.getElementById('thankYouModal');
  if (e.target === modal) {
    closeThankYouModal();
  }
});

// ---------- CONTACT FORM - SUBMIT TO GOOGLE FORMS ----------
const contactForm = document.getElementById('test-form');
const messageTextarea = contactForm?.querySelector('textarea');

// Submit form on Enter (allow Shift+Enter for new line)
if (messageTextarea) {
  messageTextarea.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      contactForm.dispatchEvent(new Event('submit'));
    }
  });
}

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const url = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLScdTFac4DApxBYI8lxSatiKRkzCuZs9KKQQQ9x_mTWKY8bwlQ/formResponse';
    
    fetch(url, {
      method: 'POST',
      body: formData,
      mode: 'no-cors'
    })
    .then(() => {
      showThankYouModal();
      contactForm.reset();
    })
    .catch(() => {
      showThankYouModal();
      contactForm.reset();
    });
  });
}

// ---------- SCROLL PROGRESS BAR ----------
const scrollProgress = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrollTop = document.documentElement.scrollTop;
  const scrolled = (scrollTop / height) * 100;
  if (scrollProgress) {
    scrollProgress.style.width = `${scrolled}%`;
  }
});

// ---------- DARK/LIGHT THEME TOGGLE ----------
const themeToggleBtn = document.getElementById('theme-toggle');
let currentTheme = localStorage.getItem('theme');

if (!currentTheme) {
  currentTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

if (currentTheme === 'dark') {
  document.documentElement.setAttribute('data-theme', 'dark');
  const icon = themeToggleBtn?.querySelector('i');
  if (icon) {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  }
}

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    let theme = 'light';
    const icon = themeToggleBtn.querySelector('i');
    if (document.documentElement.getAttribute('data-theme') !== 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      theme = 'dark';
      if (icon) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
      }
    } else {
      document.documentElement.removeAttribute('data-theme');
      if (icon) {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
      }
    }
    localStorage.setItem('theme', theme);
  });
}