// hamburger.js
let menuOpen = false;

function toggleMenu() {
    const navLinks = document.getElementById('nav-links');
    const hamburger = document.querySelector('.hamburger');
    
    // Alternar menú
    navLinks.classList.toggle('show');
    menuOpen = !menuOpen;
    
    // Cambiar ícono
    if (menuOpen) {
        hamburger.innerHTML = '✕';
        hamburger.style.color = '#00d1d1';
    } else {
        hamburger.innerHTML = '☰';
        hamburger.style.color = '#ffffff';
    }
}

// Cerrar menú al hacer clic en enlace
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('#nav-links a');
    const hamburger = document.querySelector('.hamburger');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const navMenu = document.getElementById('nav-links');
            
            // Cerrar menú si está abierto
            if (navMenu.classList.contains('show')) {
                navMenu.classList.remove('show');
                menuOpen = false;
                hamburger.innerHTML = '☰';
                hamburger.style.color = '#ffffff';
            }
        });
    });
    
    // Evento resize
    window.addEventListener('resize', () => {
        const navMenu = document.getElementById('nav-links');
        const screenWidth = window.innerWidth;
        
        // Si la pantalla es mayor a 768px y el menú está abierto, cerrarlo
        if (screenWidth > 768 && navMenu.classList.contains('show')) {
            navMenu.classList.remove('show');
            menuOpen = false;
            const hamburger = document.querySelector('.hamburger');
            if (hamburger) {
                hamburger.innerHTML = '☰';
                hamburger.style.color = '#ffffff';
            }
        }
    });
    
    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', (event) => {
        const navMenu = document.getElementById('nav-links');
        const hamburgerBtn = document.querySelector('.hamburger');
        
        if (menuOpen && 
            navMenu && 
            hamburgerBtn && 
            !navMenu.contains(event.target) && 
            !hamburgerBtn.contains(event.target)) {
            
            navMenu.classList.remove('show');
            menuOpen = false;
            hamburgerBtn.innerHTML = '☰';
            hamburgerBtn.style.color = '#ffffff';
        }
    });
});