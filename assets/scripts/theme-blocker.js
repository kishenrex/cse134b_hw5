(function() {
    try {
        const theme = localStorage.getItem('theme');
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
    } catch (err) {
        console.warn('Could not apply saved theme from localStorage.');
    }
})();