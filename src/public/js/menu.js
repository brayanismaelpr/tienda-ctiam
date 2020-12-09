function menuToggle() {
    const toggleMenu = document.querySelector('.header-responsive');
    toggleMenu.classList.toggle('h-responsive-active');
    document.body.style.overflow = 'hidden';
}
function notifications() {
    const toggleFilter = document.querySelector('.h-c-notifications');
    toggleFilter.classList.toggle('h-c-notifications-active');
}