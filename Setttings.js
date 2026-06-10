  const darkModeToggle = document.getElementById('toggle-dark-mode');
    const darkModeKey = 'darkModeEnabled';

    function setDarkMode(enabled) {
      document.body.classList.toggle('dark-mode', enabled);
      darkModeToggle.checked = enabled;
      localStorage.setItem(darkModeKey, enabled ? 'true' : 'false');
    }

    darkModeToggle.addEventListener('change', (event) => {
      setDarkMode(event.target.checked);
    });

    const savedDarkMode = localStorage.getItem(darkModeKey);
    if (savedDarkMode === 'true') {
      setDarkMode(true);
    }