/* ============================================
   AWWWARDS-INSPIRED INTERACTIONS
   ============================================ */

(function () {
    'use strict';

    // --- Loading Screen ---
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.getElementById('loader').classList.add('loaded');
        }, 1200);
    });

    // --- Custom Cursor ---
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursorFollower');
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    if (cursor && follower && window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';
        });

        function animateFollower() {
            followerX += (mouseX - followerX) * 0.12;
            followerY += (mouseY - followerY) * 0.12;
            follower.style.left = followerX + 'px';
            follower.style.top = followerY + 'px';
            requestAnimationFrame(animateFollower);
        }
        animateFollower();

        const hoverTargets = document.querySelectorAll(
            'a, button, [data-magnetic], input, textarea, .skill-pills span'
        );
        hoverTargets.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hover');
                follower.classList.add('hover');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover');
                follower.classList.remove('hover');
            });
        });
    }

    // --- Magnetic Effect ---
    const magneticElements = document.querySelectorAll('[data-magnetic]');

    if (window.innerWidth > 768) {
        magneticElements.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
            });

            el.addEventListener('mouseleave', () => {
                el.style.transform = 'translate(0, 0)';
                el.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
                setTimeout(() => { el.style.transition = ''; }, 500);
            });
        });
    }

    // --- Mobile Navigation ---
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // --- Smooth Scroll ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = window.innerWidth <= 768 ? 60 : 80;
                window.scrollTo({
                    top: target.offsetTop - offset,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const scroll = window.scrollY;
        if (scroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        lastScroll = scroll;
    });

    // --- Active Nav Link Highlighting ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveLink() {
        const scrollPos = window.scrollY + 200;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);

    // --- Scroll Reveal Animations ---
    function createObserver(selector, className) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        const delay = index * 80;
                        setTimeout(() => {
                            entry.target.classList.add(className);
                        }, delay);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
        );
        document.querySelectorAll(selector).forEach(el => observer.observe(el));
    }

    createObserver('.reveal-text', 'revealed');
    createObserver('.reveal-up', 'revealed');

    // --- Number Counter Animation ---
    function animateCounters() {
        const counters = document.querySelectorAll('[data-count]');
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const el = entry.target;
                        const target = parseInt(el.getAttribute('data-count'));
                        let current = 0;
                        const duration = 1500;
                        const increment = target / (duration / 16);

                        function update() {
                            current += increment;
                            if (current >= target) {
                                el.textContent = target;
                            } else {
                                el.textContent = Math.floor(current);
                                requestAnimationFrame(update);
                            }
                        }
                        update();
                        observer.unobserve(el);
                    }
                });
            },
            { threshold: 0.5 }
        );
        counters.forEach(c => observer.observe(c));
    }

    animateCounters();

    // --- 3D Tilt Effect ---
    if (window.innerWidth > 768) {
        document.querySelectorAll('[data-tilt]').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -3;
                const rotateY = ((x - centerX) / centerX) * 3;
                card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
                card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
                setTimeout(() => { card.style.transition = ''; }, 500);
            });
        });
    }

    // --- Parallax Blobs ---
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const blobs = document.querySelectorAll('.gradient-blob');
        blobs.forEach((blob, i) => {
            const speed = 0.03 + i * 0.015;
            blob.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // --- EmailJS Init ---
    (function () {
        if (typeof emailjs !== 'undefined') {
            emailjs.init("YOUR_PUBLIC_KEY");
        }
    })();

    // --- Contact Form ---
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        function showLoading(button) {
            const originalText = button.innerHTML;
            button.innerHTML = '<span class="btn-text"><i class="fas fa-spinner fa-spin"></i> Sending...</span>';
            button.disabled = true;
            return originalText;
        }

        function hideLoading(button, originalText) {
            button.innerHTML = originalText;
            button.disabled = false;
        }

        function showMessage(type, text) {
            const existing = contactForm.parentNode.querySelector('.form-success-message, .form-error-message');
            if (existing) existing.remove();

            const msg = document.createElement('div');
            msg.className = type === 'success' ? 'form-success-message' : 'form-error-message';
            msg.innerHTML = `
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
                <p>${text}</p>
            `;
            contactForm.parentNode.insertBefore(msg, contactForm.nextSibling);
            setTimeout(() => msg.remove(), 5000);
        }

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            const submitButton = contactForm.querySelector('button[type="submit"]');

            if (!name || !email || !subject || !message) {
                showMessage('error', 'Please fill in all fields.');
                return;
            }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                showMessage('error', 'Please enter a valid email address.');
                return;
            }

            const originalButtonText = showLoading(submitButton);

            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('subject', subject);
            formData.append('message', message);
            formData.append('_to', '19BCS2408@gmail.com');
            formData.append('_subject', `Portfolio Contact: ${subject}`);
            formData.append('_template', 'table');

            fetch('https://formsubmit.co/ajax/19BCS2408@gmail.com', {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            })
            .then(async (response) => {
                const json = await response.json();
                if (response.ok && json.success) {
                    hideLoading(submitButton, originalButtonText);
                    showMessage('success', `Thank you, ${name}! Your message has been sent. I'll get back to you soon!`);
                    contactForm.reset();
                } else {
                    throw new Error(json.message || 'Failed');
                }
            })
            .catch(() => {
                hideLoading(submitButton, originalButtonText);
                const serviceID = 'YOUR_SERVICE_ID';
                const templateID = 'YOUR_TEMPLATE_ID';
                const publicKey = 'YOUR_PUBLIC_KEY';

                if (serviceID !== 'YOUR_SERVICE_ID' && typeof emailjs !== 'undefined') {
                    emailjs.send(serviceID, templateID, {
                        from_name: name,
                        from_email: email,
                        subject: subject,
                        message: message,
                        to_email: '19BCS2408@gmail.com'
                    }, publicKey)
                    .then(() => {
                        hideLoading(submitButton, originalButtonText);
                        showMessage('success', `Thank you, ${name}! Message sent successfully.`);
                        contactForm.reset();
                    })
                    .catch(() => {
                        mailtoFallback(name, email, subject, message, submitButton, originalButtonText);
                    });
                } else {
                    mailtoFallback(name, email, subject, message, submitButton, originalButtonText);
                }
            });
        });

        function mailtoFallback(name, email, subject, message, submitButton, originalButtonText) {
            hideLoading(submitButton, originalButtonText);
            const mailto = `mailto:19BCS2408@gmail.com?subject=${encodeURIComponent(`Portfolio: ${subject}`)}&body=${encodeURIComponent(`From: ${name}\nEmail: ${email}\n\n${message}`)}`;
            if (confirm('Unable to send automatically. Open your email client?')) {
                window.location.href = mailto;
            } else {
                showMessage('error', 'Failed to send. Please email me directly at 19BCS2408@gmail.com');
            }
        }
    }

    // --- Console Branding ---
    console.log(
        '%cNitin Singh Samant%c — Portfolio',
        'color: #6366f1; font-size: 18px; font-weight: bold; font-family: monospace;',
        'color: #a1a1aa; font-size: 14px; font-family: monospace;'
    );

})();
