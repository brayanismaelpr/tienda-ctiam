function menuToggle() {
    const toggleMenu = document.querySelector('.header-responsive');
    toggleMenu.classList.toggle('h-responsive-active');
    document.body.style.overflow = 'hidden';
}