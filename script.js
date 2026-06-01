/**
 * Neumorphic Portfolio Interaction & Theme Toggle Logic
 * Jayasurya B | 2026
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Theme Management (Light / Dark Neumorphism) ---
  const htmlElement = document.documentElement;
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  
  // Load saved theme or fall back to system preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme) {
    htmlElement.setAttribute('data-theme', savedTheme);
  } else {
    htmlElement.setAttribute('data-theme', systemPrefersDark ? 'dark' : 'light');
  }

  // Toggle Theme Function
  const toggleTheme = () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
  }

  // --- 2. Interactive Soft Skills Tab-switching Panel ---
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Deactivate all buttons
      tabButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.classList.remove('nm-inset');
        btn.classList.add('nm-flat');
      });

      // Hide all panels
      tabPanes.forEach(pane => pane.classList.remove('active'));

      // Activate selected button
      button.classList.add('active');
      button.classList.add('nm-inset');
      button.classList.remove('nm-flat');

      // Show matching panel
      const targetId = button.getAttribute('data-tab');
      const targetPane = document.getElementById(targetId);
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });

  // Initialize soft skills tab classes correctly on start
  const activeTab = document.querySelector('.tab-btn.active');
  if (activeTab) {
    activeTab.classList.remove('nm-flat');
    activeTab.classList.add('nm-inset');
  }

  // --- 3. Interactive Skills Chips Toggling ---
  const skillChips = document.querySelectorAll('.skill-interactive-chip');
  skillChips.forEach(chip => {
    chip.addEventListener('click', () => {
      chip.classList.toggle('active');
      if (chip.classList.contains('active')) {
        chip.classList.remove('nm-flat');
        chip.classList.add('nm-inset');
      } else {
        chip.classList.remove('nm-inset');
        chip.classList.add('nm-flat');
      }
    });
  });

  // --- 4. Interactive Neumorphic Click Morph Effect (Extruded -> Pressed) ---
  const nmButtons = document.querySelectorAll('.btn, .timeline-card, .project-card, .cert-card, .edu-card');
  
  nmButtons.forEach(element => {
    // Only apply click-morphing to clickable buttons to preserve page stability
    if (element.tagName === 'BUTTON' || element.tagName === 'A' || element.classList.contains('btn')) {
      element.addEventListener('mousedown', () => {
        element.classList.add('pressed');
      });
      element.addEventListener('mouseup', () => {
        element.classList.remove('pressed');
      });
      element.addEventListener('mouseleave', () => {
        element.classList.remove('pressed');
      });
      
      // Touch support
      element.addEventListener('touchstart', () => {
        element.classList.add('pressed');
      });
      element.addEventListener('touchend', () => {
        element.classList.remove('pressed');
      });
    }
  });

  // --- 5. Interactive Scroll Link Highlighting ---
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');

  const highlightNavOnScroll = () => {
    let scrollPos = window.scrollY + 150;
    
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNavOnScroll);
  highlightNavOnScroll(); // Initial call
});
