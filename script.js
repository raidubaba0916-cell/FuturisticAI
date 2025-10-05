// Check if device supports touch
const isTouchDevice = () => {
    return (('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0));
};

// Custom Cursor - only for non-touch devices
if (!isTouchDevice()) {
    const cursor = document.querySelector('.cursor');
    const cursorTrail = document.querySelector('.cursor-trail');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        // Add slight delay to trail for smooth effect
        setTimeout(() => {
            cursorTrail.style.left = e.clientX + 'px';
            cursorTrail.style.top = e.clientY + 'px';
        }, 100);
    });

    // Cursor hover effects
    const hoverElements = document.querySelectorAll('a, button, .btn, .feature-card, .service-card, .portfolio-item, .team-member');

    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });

    // Cursor click effect
    document.addEventListener('mousedown', () => {
        cursor.classList.add('click');
    });

    document.addEventListener('mouseup', () => {
        cursor.classList.remove('click');
    });
} else {
    // Remove cursor elements on touch devices
    const cursor = document.querySelector('.cursor');
    const cursorTrail = document.querySelector('.cursor-trail');
    if (cursor) cursor.remove();
    if (cursorTrail) cursorTrail.remove();
}

// Initialize AOS (Animate On Scroll)
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
        disable: window.innerWidth < 768 ? true : false // Disable on mobile for performance
    });
}

// Enhanced Navbar Scroll Effect
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    const scrollY = window.scrollY;
    
    if (scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

// Form submission with EmailJS
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // EmailJS configuration
        if (typeof emailjs !== 'undefined') {
            emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
                .then(function() {
                    // Show success message
                    showFormMessage('Message sent successfully!', 'success');
                    contactForm.reset();
                }, function(error) {
                    // Show error message
                    showFormMessage('Failed to send message. Please try again.', 'error');
                    console.error('EmailJS error:', error);
                })
                .finally(() => {
                    // Reset button
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                });
        } else {
            // Fallback if EmailJS not loaded
            showFormMessage('Thank you for your message! We will get back to you soon.', 'success');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

function showFormMessage(message, type) {
    // Remove existing messages
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.textContent = message;
    
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.appendChild(messageDiv);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }
}

// Initialize Tilt.js on cards - only on non-touch devices
if (typeof VanillaTilt !== 'undefined' && !isTouchDevice()) {
    VanillaTilt.init(document.querySelectorAll(".feature-card"), {
        max: 10,
        speed: 400,
        glare: true,
        "max-glare": 0.3
    });
}

// Initialize Typed.js
if (typeof Typed !== 'undefined' && document.querySelector('.typed-text')) {
    const typed = new Typed('.typed-text', {
        strings: ['Future', 'Nexus', 'AI World'],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });
}

// Initialize Particles.js
function initParticles(containerId, config) {
    if (typeof particlesJS !== 'undefined' && document.getElementById(containerId)) {
        particlesJS(containerId, config);
    }
}

// Particles configuration for CTA sections
if (document.getElementById('particles-js-cta')) {
    particlesJS('particles-js-cta', {
        particles: {
            number: { value: 40, density: { enable: true, value_area: 800 } },
            color: { value: "#00f7ff" },
            shape: { type: "circle" },
            opacity: { value: 0.3, random: true },
            size: { value: 3, random: true },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#7700ff",
                opacity: 0.2,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: "none",
                random: true,
                out_mode: "out"
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: true, mode: "repulse" },
                onclick: { enable: true, mode: "push" }
            }
        }
    });
}

// Particles configuration for features section
const particlesConfig1 = {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: "#00f7ff"
        },
        shape: {
            type: "circle",
            stroke: {
                width: 0,
                color: "#000000"
            }
        },
        opacity: {
            value: 0.5,
            random: true,
            anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.1,
                sync: false
            }
        },
        size: {
            value: 3,
            random: true,
            anim: {
                enable: true,
                speed: 2,
                size_min: 0.1,
                sync: false
            }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#7700ff",
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200
            }
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: {
                enable: true,
                mode: "grab"
            },
            onclick: {
                enable: true,
                mode: "push"
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 140,
                line_linked: {
                    opacity: 1
                }
            },
            push: {
                particles_nb: 4
            }
        }
    },
    retina_detect: true
};

// Particles configuration for services section
const particlesConfig2 = {
    particles: {
        number: {
            value: 60,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: "#ff00aa"
         },
        shape: {
            type: "circle",
            stroke: {
                width: 0,
                color: "#000000"
            }
        },
        opacity: {
            value: 0.5,
            random: true
        },
        
        size: {
            value: 4,
            random: true
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#00f7ff",
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 3,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out",
            bounce: false
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: {
                enable: true,
                mode: "repulse"
            },
            onclick: {
                enable: true,
                mode: "push"
            },
            resize: true
        }
    },
    retina_detect: true
};

// Initialize particles when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initParticles('particles-js', particlesConfig1);
    initParticles('particles-js-2', particlesConfig2);
    
    // Initialize FAQ functionality
    initFAQ();
});

// Enhanced Starfield Effect
function initSubtleThreeJS() {
    if (typeof THREE !== 'undefined' && document.getElementById('three-canvas') && window.innerWidth > 768) {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
        const renderer = new THREE.WebGLRenderer({ 
            alpha: true, 
            antialias: true,
            powerPreference: "high-performance"
        });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 0);
        document.getElementById('three-canvas').appendChild(renderer.domElement);

        // Create enhanced starfield
        const starGeometry = new THREE.BufferGeometry();
        const starCount = 3000; // Increased count
        
        const positions = new Float32Array(starCount * 3);
        const colors = new Float32Array(starCount * 3);
        const sizes = new Float32Array(starCount);
        const alphas = new Float32Array(starCount);

        for (let i = 0; i < starCount; i++) {
            const i3 = i * 3;
            
            // Positions - create a spherical distribution
            const radius = 50 + Math.random() * 950; // Stars at varying distances
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos((Math.random() * 2) - 1);
            
            positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i3 + 2] = radius * Math.cos(phi);

            // Colors - vibrant blues and cyans
            const colorChoice = Math.random();
            if (colorChoice < 0.7) {
                // Blue stars
                colors[i3] = 0.3 + Math.random() * 0.3; // R
                colors[i3 + 1] = 0.6 + Math.random() * 0.4; // G
                colors[i3 + 2] = 1.0; // B
            } else if (colorChoice < 0.9) {
                // Cyan stars
                colors[i3] = 0.1 + Math.random() * 0.2; // R
                colors[i3 + 1] = 0.8 + Math.random() * 0.2; // G
                colors[i3 + 2] = 0.9 + Math.random() * 0.1; // B
            } else {
                // White stars for variety
                colors[i3] = 0.8 + Math.random() * 0.2;
                colors[i3 + 1] = 0.8 + Math.random() * 0.2;
                colors[i3 + 2] = 1.0;
            }

            // Sizes - varied for depth perception
            sizes[i] = 0.5 + Math.random() * 3;
            
            // Alphas - varied for twinkling effect
            alphas[i] = 0.3 + Math.random() * 0.7;
        }

        starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        starGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        starGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
        starGeometry.setAttribute('alpha', new THREE.BufferAttribute(alphas, 1));

        // Custom shader material for better control
        const starMaterial = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0.0 }
            },
            vertexShader: `
                attribute float size;
                attribute float alpha;
                attribute vec3 color;
                varying vec3 vColor;
                varying float vAlpha;
                
                void main() {
                    vColor = color;
                    vAlpha = alpha;
                    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                    gl_PointSize = size * (300.0 / -mvPosition.z);
                    gl_Position = projectionMatrix * mvPosition;
                }
            `,
            fragmentShader: `
                varying vec3 vColor;
                varying float vAlpha;
                
                void main() {
                    // Create a circular point
                    vec2 coord = gl_PointCoord - vec2(0.5);
                    if(length(coord) > 0.5) discard;
                    
                    // Add glow effect
                    float intensity = 1.0 - (length(coord) * 2.0);
                    intensity = pow(intensity, 2.0);
                    
                    gl_FragColor = vec4(vColor, vAlpha * intensity);
                }
            `,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending
        });

        const stars = new THREE.Points(starGeometry, starMaterial);
        scene.add(stars);

        camera.position.z = 100;

        // Enhanced animation with twinkling
        function animate() {
            requestAnimationFrame(animate);
            
            const time = Date.now() * 0.001;
            
            // Update material time uniform for potential future effects
            starMaterial.uniforms.time.value = time;
            
            // Slow rotation for parallax effect
            stars.rotation.y = time * 0.02;
            stars.rotation.x = Math.sin(time * 0.01) * 0.1;
            
            // Twinkling effect by modifying alpha attributes
            const alphas = stars.geometry.attributes.alpha.array;
            for (let i = 0; i < alphas.length; i++) {
                // Each star twinkles at its own frequency
                const twinkleSpeed = 2 + (i % 5);
                const baseAlpha = 0.7 + ((i % 10) * 0.09);
                alphas[i] = baseAlpha + Math.sin(time * twinkleSpeed + i) * 0.3;
            }
            stars.geometry.attributes.alpha.needsUpdate = true;
            
            renderer.render(scene, camera);
        }

        animate();

        window.addEventListener('resize', function() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }
}

// Portfolio Filter Functionality
function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    if (filterButtons.length > 0 && portfolioItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');

                const filterValue = this.getAttribute('data-filter');

                portfolioItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        // Add animation
                        item.style.animation = 'fadeIn 0.5s ease-in';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
}

// FAQ Functionality
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

// Initialize enhanced features
document.addEventListener('DOMContentLoaded', function() {
    initSubtleThreeJS();
    initPortfolioFilter();
    
    // Add section dividers dynamically
    document.querySelectorAll('section').forEach(section => {
        if (section.nextElementSibling && section.nextElementSibling.tagName === 'SECTION') {
            const divider = document.createElement('div');
            divider.className = 'section-divider';
            section.appendChild(divider);
        }
    });
});

// GSAP Animations
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Animate hero content
    gsap.from('.hero-content h1', {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power3.out'
    });

    gsap.from('.hero-content p', {
        duration: 1,
        y: 50,
        opacity: 0,
        delay: 0.2,
        ease: 'power3.out'
    });

    gsap.from('.hero-btns', {
        duration: 1,
        y: 50,
        opacity: 0,
        delay: 0.4,
        ease: 'power3.out'
    });

    // Animate section titles on scroll
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    });

    // Anime.js animations for icons
    if (typeof anime !== 'undefined') {
        anime({
            targets: '.feature-icon, .service-icon',
            scale: [0.8, 1],
            opacity: [0, 1],
            delay: anime.stagger(100),
            duration: 1000,
            easing: 'easeOutElastic(1, .8)'
        });

        // Pulse animation for CTA buttons
        setInterval(() => {
            anime({
                targets: '.btn',
                boxShadow: [
                    '0 0 0 0 rgba(0, 247, 255, 0.7)',
                    '0 0 0 15px rgba(0, 247, 255, 0)'
                ],
                duration: 2000,
                easing: 'easeOutQuad'
            });
        }, 4000);
    }
}

// EmailJS Configuration
(function() {
    // Initialize EmailJS with your public key
    if (typeof emailjs !== 'undefined') {
        emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your actual public key
    }
})();

// Social Media Links Configuration
const socialLinks = {
    facebook: "https://facebook.com/nexusfuture",
    twitter: "https://twitter.com/nexusfuture",
    instagram: "https://instagram.com/nexusfuture",
    linkedin: "https://linkedin.com/company/nexusfuture",
    github: "https://github.com/nexusfuture"
};

// Initialize social links
document.addEventListener('DOMContentLoaded', function() {
    const socialIcons = document.querySelectorAll('.social-link');
    socialIcons.forEach(icon => {
        const platform = icon.querySelector('i').className.split(' ')[1].replace('fa-', '');
        if (socialLinks[platform]) {
            icon.href = socialLinks[platform];
            icon.target = "_blank";
        }
    });
});

// Handle window resize
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        // Reinitialize AOS on resize
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
    }, 250);
});