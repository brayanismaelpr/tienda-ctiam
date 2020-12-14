function menuToggle() {
    const toggleMenu = document.querySelector('.header-responsive');
    toggleMenu.classList.toggle('h-responsive-active');
    document.body.style.overflow = 'hidden';
}
function notifications() {
    const toggleFilter = document.querySelector('.h-c-notifications');
    toggleFilter.classList.toggle('h-c-notifications-active');
}
function options_menu_profile() {
    const toggleFilter = document.querySelector('.cont-options-profile');
    toggleFilter.classList.toggle('cont-options-profile-acitve');
}
function categoryToggle() {
    const toggleMenu = document.querySelector('.responsive-category');
    toggleMenu.classList.toggle('r-category-active');
    document.body.style.overflow = 'hidden';
}