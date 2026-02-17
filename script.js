// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 23, 42, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Create animated starfield
function createStarfield() {
    const layers = [
        { class: 'starfield-layer-1', count: 200, sizes: ['small', 'medium'] },
        { class: 'starfield-layer-2', count: 150, sizes: ['small', 'medium', 'large'] },
        { class: 'starfield-layer-3', count: 100, sizes: ['medium', 'large'] }
    ];

    layers.forEach(layer => {
        const layerEl = document.querySelector(`.${layer.class}`);
        if (!layerEl) return;

        for (let i = 0; i < layer.count; i++) {
            const star = document.createElement('div');
            star.className = `star ${layer.sizes[Math.floor(Math.random() * layer.sizes.length)]}`;
            
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            star.style.animationDelay = Math.random() * 5 + 's';
            
            const twinkleSpeed = 2 + Math.random() * 3;
            star.style.animationDuration = twinkleSpeed + 's';
            
            layerEl.appendChild(star);
        }
    });
}

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    createStarfield();
    const animateElements = document.querySelectorAll('.project-card, .skill-category, .stat-item, .contact-item, .experience-item, .experience-project, .experience-achievements, .education-item, .certification-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Initialize EmailJS
(function() {
    emailjs.init("YOUR_PUBLIC_KEY");
})();

// Contact Form Handling
const contactForm = document.getElementById('contactForm');

function showLoading(button) {
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    button.disabled = true;
    return originalText;
}

function hideLoading(button, originalText) {
    button.innerHTML = originalText;
    button.disabled = false;
}

function showSuccessMessage(name) {
    const successMsg = document.createElement('div');
    successMsg.className = 'form-success-message';
    successMsg.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <p>Thank you, ${name}! Your message has been sent successfully. I'll get back to you soon!</p>
    `;
    contactForm.parentNode.insertBefore(successMsg, contactForm.nextSibling);
    
    setTimeout(() => {
        successMsg.remove();
    }, 5000);
}

function showErrorMessage() {
    const errorMsg = document.createElement('div');
    errorMsg.className = 'form-error-message';
    errorMsg.innerHTML = `
        <i class="fas fa-exclamation-circle"></i>
        <p>Sorry, there was an error sending your message. Please try again or email me directly at 19BCS2408@gmail.com</p>
    `;
    contactForm.parentNode.insertBefore(errorMsg, contactForm.nextSibling);
    
    setTimeout(() => {
        errorMsg.remove();
    }, 5000);
}

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    const submitButton = contactForm.querySelector('button[type="submit"]');

    if (!name || !email || !subject || !message) {
        alert('Please fill in all fields');
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }

    const originalButtonText = showLoading(submitButton);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('subject', subject);
    formData.append('message', message);
    formData.append('_to', '19BCS2408@gmail.com');
    formData.append('_subject', `Python Portfolio Contact: ${subject}`);
    formData.append('_template', 'table');

    fetch('https://formsubmit.co/ajax/19BCS2408@gmail.com', {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(async (response) => {
        const json = await response.json();
        if (response.ok && json.success) {
            hideLoading(submitButton, originalButtonText);
            showSuccessMessage(name);
            contactForm.reset();
        } else {
            throw new Error(json.message || 'Failed to send message');
        }
    })
    .catch((error) => {
        console.error('FormSubmit Error:', error);
        hideLoading(submitButton, originalButtonText);
        tryEmailJSFallback(name, email, subject, message, submitButton, originalButtonText);
    });
});

function tryEmailJSFallback(name, email, subject, message, submitButton, originalButtonText) {
    const serviceID = 'YOUR_SERVICE_ID';
    const templateID = 'YOUR_TEMPLATE_ID';
    const publicKey = 'YOUR_PUBLIC_KEY';

    if (serviceID !== 'YOUR_SERVICE_ID' && templateID !== 'YOUR_TEMPLATE_ID' && publicKey !== 'YOUR_PUBLIC_KEY') {
        const templateParams = {
            from_name: name,
            from_email: email,
            subject: subject,
            message: message,
            to_email: '19BCS2408@gmail.com'
        };

        emailjs.send(serviceID, templateID, templateParams, publicKey)
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
                hideLoading(submitButton, originalButtonText);
                showSuccessMessage(name);
                contactForm.reset();
            })
            .catch((error) => {
                console.error('EmailJS Error:', error);
                showMailtoFallback(name, email, subject, message, submitButton, originalButtonText);
            });
    } else {
        showMailtoFallback(name, email, subject, message, submitButton, originalButtonText);
    }
}

function showMailtoFallback(name, email, subject, message, submitButton, originalButtonText) {
    hideLoading(submitButton, originalButtonText);
    const mailtoLink = `mailto:19BCS2408@gmail.com?subject=${encodeURIComponent(`Python Portfolio Contact: ${subject}`)}&body=${encodeURIComponent(`From: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
    if (confirm('Unable to send email automatically. Would you like to open your email client to send the message manually?')) {
        window.location.href = mailtoLink;
    } else {
        showErrorMessage();
    }
}

// Add active class to nav links on click
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add CSS for active nav link
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--primary-color);
    }
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// Console message
console.log('%c Welcome to Nitin Singh Samant\'s Python Portfolio!', 'color: #3b82f6; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with Python expertise & modern web technologies', 'color: #06b6d4; font-size: 14px;');
