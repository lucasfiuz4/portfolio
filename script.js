// Mobile menu functionality
const menuBtn = document.querySelector('.mobile-menu-btn');
const navigation = document.querySelector('.navigation');
const menuLinks = document.querySelectorAll('.menu a');
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle ? themeToggle.querySelector('.theme-toggle-icon') : null;
const themeText = themeToggle ? themeToggle.querySelector('.theme-toggle-text') : null;
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

const getPreferredTheme = () => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'light' || storedTheme === 'dark') {
        return storedTheme;
    }
    return prefersDarkScheme.matches ? 'dark' : 'light';
};

const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    if (!themeToggle) {
        return;
    }
    themeToggle.setAttribute('aria-pressed', theme === 'dark');
    if (themeIcon) {
        themeIcon.textContent = theme === 'dark' ? '🌙' : '☀️';
    }
    if (themeText) {
        themeText.textContent = theme === 'dark' ? 'Escuro' : 'Claro';
    }
};

applyTheme(getPreferredTheme());

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || getPreferredTheme();
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', nextTheme);
        applyTheme(nextTheme);
    });

    prefersDarkScheme.addEventListener('change', (event) => {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme) {
            return;
        }
        applyTheme(event.matches ? 'dark' : 'light');
    });
}

menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('open');
    navigation.classList.toggle('open');
});

// Close menu when clicking a link
menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuBtn.classList.remove('open');
        navigation.classList.remove('open');
    });
});

// Active menu item based on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.menu a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Typing effect for hero title
const text = document.querySelector('.typing-effect');
const originalText = text.textContent;
text.textContent = '';

let i = 0;
function typeWriter() {
    if (i < originalText.length) {
        text.textContent += originalText.charAt(i);
        i++;
        setTimeout(typeWriter, Math.random() * 100 + 50);
    }
}

setTimeout(typeWriter, 500);

// Form submission
const form = document.getElementById('contactForm');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simulate form submission
        const button = form.querySelector('button');
        const originalText = button.textContent;
        button.textContent = 'Enviando...';
        
        setTimeout(() => {
            button.textContent = 'Enviado!';
            form.reset();
            
            setTimeout(() => {
                button.textContent = originalText;
            }, 2000);
        }, 1000);
    });
}

// Update copyright year
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Project card hover effect
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    const overlay = card.querySelector('.project-overlay');
    
    card.addEventListener('mouseenter', () => {
        overlay.style.opacity = '1';
    });
    
    card.addEventListener('mouseleave', () => {
        overlay.style.opacity = '0';
    });
});
