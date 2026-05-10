// Mobile menu toggle functionality
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');

    if (hamburger && mobileMenu && mobileMenuOverlay) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            mobileMenuOverlay.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
        });

        // Close menu when clicking on a nav link
        const navLinks = document.querySelectorAll('.mobile-menu .nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                mobileMenuOverlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });

        // Close menu when clicking overlay
        mobileMenuOverlay.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            mobileMenuOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }
}

// Character reveal animation for name - looping
function typeWriterEffect(element, speed = 50) {
    const text = element.textContent;

    function typeLoop() {
        element.textContent = '';
        let index = 0;

        function type() {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                setTimeout(type, speed);
            } else {
                // After typing is complete, wait then reset and repeat
                setTimeout(typeLoop, 3000);
            }
        }

        type();
    }

    // Start the loop
    typeLoop();
}

// Glow pulse effect on profile image
function addGlowPulse(element) {
    element.style.animation = 'none';
    setTimeout(() => {
        element.style.animation = 'glowPulse 2s ease-in-out infinite';
    }, 100);
}

// Create gradient text animation
function animateGradientText(element) {
    let hue = 0;
    setInterval(() => {
        hue = (hue + 1) % 360;
        element.style.backgroundImage = `linear-gradient(90deg, hsl(${hue}, 100%, 60%), hsl(${hue + 60}, 100%, 60%))`;
        element.style.backgroundClip = 'text';
        element.style.webkitBackgroundClip = 'text';
        element.style.color = 'transparent';
    }, 30);
}

// Mouse follow glow effect
function addMouseFollowGlow(profileElement) {
    document.addEventListener('mousemove', (e) => {
        const rect = profileElement.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Create subtle glow effect
        const glowX = (x / rect.width) * 200;
        const glowY = (y / rect.height) * 200;

        profileElement.style.boxShadow = `
            0 0 40px rgba(77, 171, 247, 0.5),
            0 0 60px rgba(77, 171, 247, 0.3)
        `;
    });
}

// Smooth text reveal on scroll
function revealOnScroll() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -500px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove animation first to allow re-trigger
                entry.target.style.animation = 'none';
                // Trigger reflow to restart animation
                void entry.target.offsetWidth;
                // Apply animation
                entry.target.style.animation = 'slideUpFade 0.8s ease-out 0.2s both';
            }
        });
    }, observerOptions);

    // Observe all section titles
    document.querySelectorAll('.about-content h2, .skills-content h2, .projects-content h2, .contact-content h2').forEach(el => {
        observer.observe(el);
    });
}

// Initialize all animations when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize mobile menu
    initMobileMenu();

    // Typewriter effect for name
    const nameElement = document.querySelector('.text-content h1');
    if (nameElement) {
        nameElement.style.opacity = '1';
        typeWriterEffect(nameElement, 80);

        // Add continuous glow animation to the name
        setTimeout(() => {
            nameElement.style.animation = 'neonGlow 2s ease-in-out infinite';
        }, 2000);
    }

    // Glow pulse for profile
    const profileImg = document.querySelector('.profile-img');
    if (profileImg) {
        addGlowPulse(profileImg);
        addMouseFollowGlow(profileImg);
    }

    // Scroll reveal animations
    revealOnScroll();
});

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes glowPulse {
        0%, 100% {
            box-shadow: 0 0 40px rgba(77, 171, 247, 0.5),
                        0 0 20px rgba(77, 171, 247, 0.3);
        }
        50% {
            box-shadow: 0 0 60px rgba(77, 171, 247, 0.8),
                        0 0 40px rgba(77, 171, 247, 0.5);
        }
    }
    
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes neonGlow {
        0%, 100% {
            text-shadow: 0 0 10px rgba(136, 139, 142, 0.5);
        }
        50% {
            text-shadow: 0 0 20px rgba(136, 139, 142, 0.5);
        }
    }
`;
document.head.appendChild(style);