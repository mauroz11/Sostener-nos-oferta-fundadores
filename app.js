document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // 2. MOBILE MENU NAVIGATION (REMOVED - SALES FOCUS LANDING)
    // ==========================================================================

    // ==========================================================================
    // 3. CURRICULUM MODULES ACCORDION
    // ==========================================================================
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const content = header.nextElementSibling;
            const icon = header.querySelector('.accordion-icon');
            const isActive = item.classList.contains('active');
            
            // Close other accordion items for a cleaner, unified interface
            const activeItems = document.querySelectorAll('.accordion-item.active');
            activeItems.forEach(activeItem => {
                if (activeItem !== item) {
                    activeItem.classList.remove('active');
                    const activeHeader = activeItem.querySelector('.accordion-header');
                    activeHeader.setAttribute('aria-expanded', 'false');
                    const activeContent = activeItem.querySelector('.accordion-content');
                    activeContent.style.maxHeight = null;
                    activeContent.setAttribute('aria-hidden', 'true');
                }
            });

            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
                header.setAttribute('aria-expanded', 'true');
                // Calculate precise height to support fluid transitions
                content.style.maxHeight = content.scrollHeight + 'px';
                content.setAttribute('aria-hidden', 'false');
            } else {
                item.classList.remove('active');
                header.setAttribute('aria-expanded', 'false');
                content.style.maxHeight = null;
                content.setAttribute('aria-hidden', 'true');
            }
        });
    });

    // Open first module automatically to guide interaction
    if (accordionHeaders.length > 0) {
        setTimeout(() => {
            const firstHeader = accordionHeaders[0];
            const firstItem = firstHeader.parentElement;
            const firstContent = firstHeader.nextElementSibling;
            
            firstItem.classList.add('active');
            firstHeader.setAttribute('aria-expanded', 'true');
            firstContent.style.maxHeight = firstContent.scrollHeight + 'px';
            firstContent.setAttribute('aria-hidden', 'false');
        }, 800);
    }

    // ==========================================================================
    // 4. INTERSECTION OBSERVER FOR ENTRANCE ANIMATIONS
    // ==========================================================================
    const animatableElements = document.querySelectorAll('.scroll-animate');
    
    if ('IntersectionObserver' in window) {
        const animationObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target); // Stop observing once animated
                }
            });
        }, {
            threshold: 0.10, // Animate when 10% of the element is visible
            rootMargin: '0px 0px -50px 0px' // Slightly delay trigger for natural feel
        });
        
        animatableElements.forEach(element => {
            animationObserver.observe(element);
        });
    } else {
        // Fallback for older browsers: animate everything instantly
        animatableElements.forEach(element => {
            element.classList.add('animated');
        });
    }

    // ==========================================================================
    // 5. INTERACTION AUDIT FOR CTA / CHECKOUT BUTTONS
    // ==========================================================================
    const checkoutBtn = document.getElementById('checkout-cta-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', (e) => {
            // Keep hotmart link behavior, but log click or trigger feedback if needed
            console.log('Miembro fundador haciendo clic en botón de pago vitalicio Sostener-nos');
        });
    }

    // ==========================================================================
    // 6. CUSTOM SMOOTH SCROLLING WITH CUBIC BEZIER EASING
    // ==========================================================================
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                const duration = 900; // Duration in milliseconds
                let start = null;
                
                // Cubic Bezier Ease In Out Easing Function
                function easeInOutCubic(t, b, c, d) {
                    t /= d/2;
                    if (t < 1) return c/2*t*t*t + b;
                    t -= 2;
                    return c/2*(t*t*t + 2) + b;
                }
                
                function step(timestamp) {
                    if (!start) start = timestamp;
                    const progress = timestamp - start;
                    const scrollY = easeInOutCubic(progress, startPosition, distance, duration);
                    window.scrollTo(0, scrollY);
                    if (progress < duration) {
                        window.requestAnimationFrame(step);
                    } else {
                        window.scrollTo(0, targetPosition); // Precise fallback landing
                    }
                }
                
                window.requestAnimationFrame(step);
            }
        });
    });
});
