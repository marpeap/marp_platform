// Theme Toggle Management
document.addEventListener('DOMContentLoaded', function() {
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;
  
  // Get saved theme or default to dark
  const savedTheme = localStorage.getItem('theme') || 'dark';
  
  // Apply saved theme
  if (savedTheme === 'light') {
    html.setAttribute('data-theme', 'light');
    updateLogoForTheme('light');
  } else {
    html.removeAttribute('data-theme');
    updateLogoForTheme('dark');
  }
  
  // Function to update logo based on theme
  function updateLogoForTheme(theme) {
    const logoDark = document.querySelector('.logo-img-dark');
    const logoLight = document.querySelector('.logo-img-light');
    
    if (theme === 'light') {
      if (logoDark) logoDark.style.display = 'none';
      if (logoLight) logoLight.style.display = 'block';
    } else {
      if (logoDark) logoDark.style.display = 'block';
      if (logoLight) logoLight.style.display = 'none';
    }
  }
  
  // Toggle theme on button click
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      const currentTheme = html.getAttribute('data-theme');
      
      if (currentTheme === 'light') {
        // Switch to dark
        html.removeAttribute('data-theme');
        localStorage.setItem('theme', 'dark');
        updateLogoForTheme('dark');
      } else {
        // Switch to light
        html.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        updateLogoForTheme('light');
      }
    });
  }
});

