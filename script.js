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



// =========================
// WhatsApp CTA (front-only) - applies to any element with data-whatsapp="diagnostic"
// =========================
const WHATSAPP_PHONE = '55SEUNUMEROAQUI'; // ex: 5531999999999 (DDI + DDD + número), sem "+"

const WHATSAPP_DEFAULT_MESSAGE =
  'Olá! Quero um diagnóstico de performance e conversão. Meu negócio é ___. Meu objetivo é ___. Link atual: ___.';

function buildWhatsAppUrl(phoneE164, message) {
  const text = encodeURIComponent(message);
  return `https://wa.me/${phoneE164}?text=${text}`;
}

function applyWhatsAppCtas() {
  const ctas = document.querySelectorAll('[data-whatsapp="diagnostic"]');
  if (!ctas.length) return;

  const url = buildWhatsAppUrl(WHATSAPP_PHONE, WHATSAPP_DEFAULT_MESSAGE);
  ctas.forEach((el) => {
    if (el.tagName.toLowerCase() === 'a') {
      el.href = url;
      el.target = '_blank';
      el.rel = 'noopener noreferrer';
    } else {
      el.addEventListener('click', () => window.open(url, '_blank', 'noopener,noreferrer'));
    }
  });
}

applyWhatsAppCtas();

// =========================
// Contact form -> opens WhatsApp with filled message (front-only)
// Looks for form#leadForm (new) and falls back to existing #contactForm simulation
// =========================
const leadForm = document.getElementById('leadForm');
if (leadForm) {
  leadForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(leadForm);
    const name = String(formData.get('nome') || '').trim();
    const whatsapp = String(formData.get('whatsapp') || '').trim();
    const objetivo = String(formData.get('objetivo') || '').trim();
    const link = String(formData.get('link') || '').trim();

    const message =
      `Olá! Quero um diagnóstico de performance e conversão.\n` +
      `Meu nome é: ${name || '—'}\n` +
      `Meu WhatsApp é: ${whatsapp || '—'}\n` +
      `Meu objetivo é: ${objetivo || '—'}\n` +
      `Link atual: ${link || '—'}`;

    const url = buildWhatsAppUrl(WHATSAPP_PHONE, message);
    window.open(url, '_blank', 'noopener,noreferrer');
  });
}

// =========================
// Multi-page active nav (highlights based on current path)
// Keeps existing scroll-based highlight when on single-page sections
// =========================
(function setActiveNavByPath() {
  const path = (window.location.pathname || '').toLowerCase();
  const map = [
    { match: 'servicos', href: 'servicos.html' },
    { match: 'cases', href: 'cases.html' },
    { match: 'processo', href: 'processo.html' },
    { match: 'auditoria', href: 'auditoria.html' },
    { match: 'sobre', href: 'sobre.html' },
    { match: 'conteudos', href: 'conteudos.html' },
    { match: 'contato', href: 'contato.html' },
  ];

  const found = map.find((m) => path.includes(m.match));
  if (!found) return;

  document.querySelectorAll('.menu a').forEach((a) => {
    const href = (a.getAttribute('href') || '').toLowerCase();
    if (href.endsWith(found.href)) {
      a.classList.add('active');
    } else {
      a.classList.remove('active');
    }
  });
})();
