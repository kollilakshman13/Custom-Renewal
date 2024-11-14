// Get the elements
const sidebar = document.querySelector('.sidebar');
const mainContent = document.querySelector('.main-content');
const toggleButton = document.querySelector('.sidebar-toggle-btn');

// Toggle the sidebar visibility
toggleButton.addEventListener('click', () => {
    sidebar.classList.toggle('hidden');
    mainContent.classList.toggle('sidebar-hidden');
});
