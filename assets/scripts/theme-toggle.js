const themeToggle = document.getElementById('theme-toggle');

(function() {
    if (themeToggle) {
        themeToggle.style.display = 'inline-block';

        if (document.documentElement.dataset.theme === 'dark') {
            themeToggle.textContent = 'Toggle Light Mode';
        } else {
            themeToggle.textContent = 'Toggle Dark Mode';
        }
    }
})();

themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.dataset.theme === 'dark';

    if (isDark) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        themeToggle.textContent = 'Toggle Dark Mode';
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeToggle.textContent = 'Toggle Light Mode';
    }
});