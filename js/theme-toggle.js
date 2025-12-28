/**
 * Theme Toggle Functionality
 * Allows users to switch between light and dark themes
 * Persists preference in localStorage
 */

(function() {
  'use strict';

  const THEME_KEY = 'theme-preference';
  const DARK_THEME = 'dark';
  const LIGHT_THEME = 'light';

  /**
   * Get the user's theme preference
   * Priority: localStorage > system preference > dark (default)
   */
  function getThemePreference() {
    // Check localStorage first
    const storedTheme = localStorage.getItem(THEME_KEY);
    if (storedTheme) {
      return storedTheme;
    }

    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return LIGHT_THEME;
    }

    // Default to dark theme
    return DARK_THEME;
  }

  /**
   * Apply the theme to the document
   */
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    
    // Update highlight.js theme for code blocks
    updateCodeTheme(theme);
  }

  /**
   * Update the code highlighting theme based on current theme
   */
  function updateCodeTheme(theme) {
    const existingLink = document.getElementById('hljs-theme');
    if (existingLink) {
      if (theme === LIGHT_THEME) {
        existingLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css';
      } else {
        existingLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css';
      }
    }
  }

  /**
   * Toggle between light and dark themes
   */
  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || DARK_THEME;
    const newTheme = currentTheme === DARK_THEME ? LIGHT_THEME : DARK_THEME;
    
    applyTheme(newTheme);
    localStorage.setItem(THEME_KEY, newTheme);
    
    // Announce change for screen readers
    announceThemeChange(newTheme);
  }

  /**
   * Announce theme change for accessibility
   */
  function announceThemeChange(theme) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = `Theme changed to ${theme} mode`;
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }

  /**
   * Create and inject the theme toggle button
   */
  function createThemeToggle() {
    const toggle = document.createElement('button');
    toggle.className = 'theme-toggle';
    toggle.setAttribute('aria-label', 'Toggle theme');
    toggle.setAttribute('title', 'Toggle light/dark theme');
    toggle.innerHTML = `
      <svg class="sun-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>
      <svg class="moon-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    `;
    
    toggle.addEventListener('click', toggleTheme);
    
    return toggle;
  }

  /**
   * Initialize the theme system
   */
  function init() {
    // Apply initial theme (do this ASAP to prevent flash)
    const initialTheme = getThemePreference();
    applyTheme(initialTheme);

    // Wait for DOM to be ready before adding toggle button
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', addToggleToPage);
    } else {
      addToggleToPage();
    }

    // Listen for system theme changes
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        // Only auto-switch if user hasn't set a preference
        if (!localStorage.getItem(THEME_KEY)) {
          applyTheme(e.matches ? DARK_THEME : LIGHT_THEME);
        }
      });
    }
  }

  /**
   * Add the toggle button to the page
   */
  function addToggleToPage() {
    const header = document.querySelector('.site-header .wrapper');
    if (header) {
      const toggle = createThemeToggle();
      
      // Insert at the end of the header wrapper (far right)
      header.appendChild(toggle);
    }
  }

  // Start initialization
  init();
})();

