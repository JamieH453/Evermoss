document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('toggle-dark-mode');
    const savedTheme = localStorage.getItem('theme') || 'light';

    document.body.classList.toggle('dark-mode', savedTheme === 'dark');

    if (themeToggle) {
        themeToggle.checked = savedTheme === 'dark';

        themeToggle.addEventListener('change', () => {
            const isDark = themeToggle.checked;

            document.body.classList.toggle('dark-mode', isDark);
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }
});