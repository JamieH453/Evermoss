document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('toggle-darkMode');
    const darkModeKey = 'darkModeEnabled';

    function setDarkMode(enabled) {
      document.body.classList.toggle('darkMode', enabled);
      if (darkModeToggle) darkModeToggle.checked = enabled;
      try {
        localStorage.setItem(darkModeKey, enabled ? 'true' : 'false');
      } catch (e) {
        // ignore localStorage errors
      }
    }

    if (darkModeToggle) {
      darkModeToggle.addEventListener('change', (event) => {
        setDarkMode(event.target.checked);
      });
    }

    const savedDarkMode = (() => {
      try { return localStorage.getItem(darkModeKey); } catch (e) { return null; }
    })();

    setDarkMode(savedDarkMode === 'true');
  });