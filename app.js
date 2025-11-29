// ============================================
// Portfolio Website - Complete JavaScript
// ============================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initScrollAnimations();
    initSkillBars();
    initPortfolio();
    initButtons();
    initFooter();
    initImageLoading();
    initParallax();
    initMobileMenu();
});

// ============================================
// Navigation Functionality
// ============================================
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link, .footer-nav-link');
    const sections = document.querySelectorAll('section[id]');
    const header = document.querySelector('.header');

    // Update active navigation state on scroll
    function updateActiveNav() {
        let current = '';
        const scrollPosition = window.pageYOffset + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href && href === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || !href) return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update active state immediately
                updateActiveNav();
            }
        });
    });

    // Header scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.background = 'rgba(10, 10, 10, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.background = 'rgba(10, 10, 10, 0.95)';
            header.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
        updateActiveNav();
    });

    // Initial call
    updateActiveNav();
    window.addEventListener('load', updateActiveNav);
}

// ============================================
// Scroll Animations
// ============================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in, .resume-block, .portfolio-item, .about-content');
    fadeElements.forEach(el => {
        if (!el.classList.contains('fade-in')) {
            el.classList.add('fade-in');
        }
        observer.observe(el);
    });

    // Section reveal animations
    const sections = document.querySelectorAll('section:not(.hero-section)');
    sections.forEach((section, index) => {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                    sectionObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        sectionObserver.observe(section);
    });
}

// ============================================
// Skill Bars Animation
// ============================================
function initSkillBars() {
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillFills = entry.target.querySelectorAll('.skill-fill');
                skillFills.forEach((fill, index) => {
                    const percent = fill.getAttribute('data-percent');
                    if (percent) {
                        setTimeout(() => {
                            fill.style.setProperty('--skill-width', `${percent}%`);
                            fill.classList.add('animate');
                        }, index * 150);
                    }
                });
                skillObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    const resumeSection = document.querySelector('.resume-section');
    if (resumeSection) {
        skillObserver.observe(resumeSection);
    }
}

// ============================================
// Portfolio Interactions
// ============================================
function initPortfolio() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        // Hover effects
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });

        // Click to view details (can be extended)
        item.addEventListener('click', function() {
            const title = this.querySelector('.portfolio-title')?.textContent;
            const category = this.querySelector('.portfolio-category')?.textContent;
            console.log(`Viewing project: ${title} - ${category}`);
            // Add modal or detail view functionality here if needed
        });
    });
}

// ============================================
// Button Functionality
// ============================================
function initButtons() {
    // Hero section buttons
    const btnPrimary = document.querySelector('.btn-primary');
    const btnSecondary = document.querySelector('.btn-secondary');
    const btnJoin = document.querySelector('.btn-join');

    if (btnPrimary) {
        btnPrimary.addEventListener('click', function() {
            const resumeSection = document.querySelector('#resume');
            if (resumeSection) {
                resumeSection.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }
        });
    }

    if (btnSecondary) {
        btnSecondary.addEventListener('click', function() {
            const portfolioSection = document.querySelector('#portfolio');
            if (portfolioSection) {
                portfolioSection.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }
        });
    }

    if (btnJoin) {
        btnJoin.addEventListener('click', function() {
            // Scroll to contact or show contact modal
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                aboutSection.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }
            // Or trigger contact form/modal
            console.log('Join Us clicked');
        });
    }

    // Resume block hover enhancement
    document.querySelectorAll('.resume-block').forEach(block => {
        block.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
}

// ============================================
// Footer Functionality
// ============================================
function initFooter() {
    // Footer icon buttons
    const footerIcons = document.querySelectorAll('.footer-icon-btn');
    
    footerIcons.forEach((icon, index) => {
        icon.addEventListener('click', function() {
            const icons = ['circle', 'lightning', 'refresh', 'search'];
            const iconName = icons[index] || 'icon';
            
            // Add click animation
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);

            // Handle different icon actions
            switch(iconName) {
                case 'search':
                    // Could open search modal
                    console.log('Search clicked');
                    break;
                case 'refresh':
                    // Could reload content or refresh animations
                    location.reload();
                    break;
                default:
                    console.log(`${iconName} clicked`);
            }
        });
    });

    // Footer category links hover effect
    document.querySelectorAll('.category-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            // Could filter portfolio or navigate
            console.log('Category clicked:', this.textContent);
        });
    });
}

// ============================================
// Image Loading
// ============================================
function initImageLoading() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // Set initial opacity
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';

        // Handle loaded images
        if (img.complete) {
            img.style.opacity = '1';
        } else {
            img.addEventListener('load', function() {
                this.style.opacity = '1';
            });

            img.addEventListener('error', function() {
                this.style.opacity = '1';
                // Could add error placeholder
                console.warn('Image failed to load:', this.src);
            });
        }
    });
}

// ============================================
// Parallax Effects
// ============================================
function initParallax() {
    let ticking = false;
    const hero = document.querySelector('.hero-section');
    const heroBackground = document.querySelector('.hero-background');

    function updateParallax() {
        const currentScroll = window.pageYOffset;
        
        if (hero && currentScroll < window.innerHeight) {
            const parallaxValue = currentScroll * 0.3;
            hero.style.transform = `translateY(${parallaxValue}px)`;
            
            if (heroBackground) {
                const bgParallax = currentScroll * 0.5;
                heroBackground.style.transform = `translateY(${bgParallax}px)`;
            }
        }
        
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });
}

// ============================================
// Mobile Menu
// ============================================
function initMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const navContainer = document.querySelector('.nav-container');
    let mobileMenu = null;

    function createMobileMenu() {
        if (mobileMenu) return;

        mobileMenu = document.createElement('button');
        mobileMenu.className = 'mobile-menu-toggle';
        mobileMenu.innerHTML = '<i class="fas fa-bars"></i>';
        mobileMenu.setAttribute('aria-label', 'Toggle menu');
        
        const logo = document.querySelector('.logo');
        if (logo && window.innerWidth <= 768) {
            logo.appendChild(mobileMenu);
        }
    }

    function toggleMobileMenu() {
        if (navLinks) {
            navLinks.classList.toggle('mobile-active');
            if (mobileMenu) {
                const icon = mobileMenu.querySelector('i');
                if (icon) {
                    icon.classList.toggle('fa-bars');
                    icon.classList.toggle('fa-times');
                }
            }
        }
    }

    function handleResize() {
        if (window.innerWidth <= 768) {
            createMobileMenu();
            if (mobileMenu) {
                mobileMenu.addEventListener('click', toggleMobileMenu);
            }
        } else {
            if (navLinks) {
                navLinks.classList.remove('mobile-active');
            }
            if (mobileMenu) {
                mobileMenu.remove();
                mobileMenu = null;
            }
        }
    }

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768 && navLinks) {
                navLinks.classList.remove('mobile-active');
                if (mobileMenu) {
                    const icon = mobileMenu.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
            }
        });
    });

    window.addEventListener('resize', handleResize);
    handleResize();
}

// ============================================
// Smooth Scroll Polyfill (for older browsers)
// ============================================
if (!('scrollBehavior' in document.documentElement.style)) {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/gh/cferdinandi/smooth-scroll@15/dist/smooth-scroll.polyfills.min.js';
    document.head.appendChild(script);
}

// ============================================
// Performance Optimization
// ============================================
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ============================================
// Console Welcome Message
// ============================================
console.log('%c✨ Portfolio Website Loaded Successfully! ✨', 'color: #FFD700; font-size: 16px; font-weight: bold;');
console.log('%cBuilt with modern JavaScript and smooth animations', 'color: #b0b0b0; font-size: 12px;');
