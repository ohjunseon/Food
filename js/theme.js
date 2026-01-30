document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Function to apply theme and update icon
    const applyTheme = (theme) => {
        htmlElement.dataset.theme = theme;
        if (themeToggle) {
            themeToggle.innerHTML = theme === 'dark' 
                ? '<i data-lucide="sun"></i>' 
                : '<i data-lucide="moon"></i>';
            lucide.createIcons();
        }
        localStorage.setItem('theme', theme);
    };

    // Initialize theme on page load
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);

    // Event listener for the toggle button
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = htmlElement.dataset.theme;
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyTheme(newTheme);
        });
    }
});
