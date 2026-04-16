// ===========================
// Three.js 3D Background
// ===========================
let scene, camera, renderer, particles;

function initThreeJS() {
    const canvas = document.getElementById('three-canvas');

    // Scene
    scene = new THREE.Scene();

    // Camera
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.z = 50;

    // Renderer
    renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Create particle system
    createParticles();

    // Animation loop
    animate();

    // Handle resize
    window.addEventListener('resize', onWindowResize);
}

function createParticles() {
    const geometry = new THREE.BufferGeometry();
    const particleCount = 1000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color('hsl(0, 0%, 85%)');
    const color2 = new THREE.Color('hsl(0, 0%, 60%)');

    for (let i = 0; i < particleCount * 3; i += 3) {
        // Positions
        positions[i] = (Math.random() - 0.5) * 100;
        positions[i + 1] = (Math.random() - 0.5) * 100;
        positions[i + 2] = (Math.random() - 0.5) * 100;

        // Colors
        const mixedColor = color1.clone().lerp(color2, Math.random());
        colors[i] = mixedColor.r;
        colors[i + 1] = mixedColor.g;
        colors[i + 2] = mixedColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
        size: 0.5,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });

    particles = new THREE.Points(geometry, material);
    scene.add(particles);
}

function animate() {
    requestAnimationFrame(animate);

    // Rotate particles
    particles.rotation.x += 0.0005;
    particles.rotation.y += 0.001;

    // Mouse parallax effect
    if (window.mouseX !== undefined && window.mouseY !== undefined) {
        camera.position.x += (window.mouseX * 0.05 - camera.position.x) * 0.05;
        camera.position.y += (window.mouseY * -0.05 - camera.position.y) * 0.05;
        camera.lookAt(scene.position);
    }

    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Mouse tracking for parallax
document.addEventListener('mousemove', (event) => {
    window.mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    window.mouseY = (event.clientY / window.innerHeight) * 2 - 1;
});

// ===========================
// Navigation
// ===========================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const navAnchors = document.querySelectorAll('.nav-menu a.nav-link');
const navMoreToggle = document.getElementById('nav-more-toggle');
const navDropdown = navMoreToggle ? navMoreToggle.closest('.dropdown') : null;

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu on link click
navAnchors.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        if (navDropdown) {
            navDropdown.classList.remove('open');
            navMoreToggle.setAttribute('aria-expanded', 'false');
        }
    });
});

// More dropdown toggle
if (navMoreToggle && navDropdown) {
    navMoreToggle.addEventListener('click', (event) => {
        event.stopPropagation();
        const isOpen = navDropdown.classList.toggle('open');
        navMoreToggle.setAttribute('aria-expanded', String(isOpen));
    });

    document.addEventListener('click', (event) => {
        if (!navDropdown.contains(event.target)) {
            navDropdown.classList.remove('open');
            navMoreToggle.setAttribute('aria-expanded', 'false');
        }
    });
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Active section highlighting
const sections = document.querySelectorAll('.section');
const observerOptions = {
    threshold: 0.3
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

// ===========================
// Dynamic Content Loading
// ===========================

// Load Technologies
async function loadTechnologies() {
    try {
        const response = await fetch('data/technologies.json');
        const technologies = await response.json();
        const grid = document.getElementById('technologies-grid');

        technologies.forEach(tech => {
            const card = document.createElement('div');
            card.className = 'tech-card';
            card.innerHTML = `
                <i class="${tech.icon} tech-icon colored"></i>
                <h3 class="tech-name">${tech.name}</h3>
                <p class="tech-level">${tech.level}</p>
            `;
            grid.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading technologies:', error);
    }
}

// Load Case Studies
async function loadCaseStudies() {
    try {
        const response = await fetch('data/case-studies.json');
        const caseStudies = await response.json();
        const container = document.getElementById('case-studies-container');

        caseStudies.forEach(cs => {
            const card = document.createElement('div');
            card.className = 'case-study-card';
            card.innerHTML = `
                <div class="case-study-icon-wrapper" style="background: ${cs.color}">
                    <i class="${cs.icon} case-study-main-icon"></i>
                </div>
                <div class="case-study-details">
                    <h3 class="case-study-title">${cs.title}</h3>
                    <div class="case-study-section">
                        <h4><i class="fas fa-exclamation-circle"></i> Problem</h4>
                        <p>${cs.problem}</p>
                    </div>
                    <div class="case-study-section">
                        <h4><i class="fas fa-tools"></i> What I Built</h4>
                        <p>${cs.built}</p>
                    </div>
                    <div class="case-study-section">
                        <h4><i class="fas fa-check-circle"></i> Result</h4>
                        <p>${cs.result}</p>
                    </div>
                    <div class="case-study-tags">
                        ${cs.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>
            `;
            container.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading case studies:', error);
    }
}

// Load Projects
async function loadProjects() {
    try {
        const response = await fetch('data/projects.json');
        const projects = await response.json();
        const grid = document.getElementById('projects-grid');

        projects.forEach(project => {
            const card = document.createElement('div');
            card.className = 'project-card';
            card.innerHTML = `
                <img src="${project.image}" alt="${project.title}" class="project-image">
                <div class="project-content">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <div class="project-tags">
                        ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                    <a href="${project.link}" target="_blank" class="project-link">
                        View Project <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            `;
            grid.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading projects:', error);
    }
}

// Load Education
async function loadEducation() {
    try {
        const response = await fetch('data/education.json');
        const education = await response.json();
        const grid = document.getElementById('education-grid');

        education.forEach(edu => {
            const card = document.createElement('div');
            card.className = 'education-card';
            card.innerHTML = `
                <h3 class="education-degree">${edu.degree}</h3>
                <div class="education-header">
                    ${edu.logo ? `<img src="${edu.logo}" alt="${edu.institution}" class="university-logo">` : ''}
                    <h4 class="education-institution">${edu.institution}</h4>
                </div>
                <p class="education-year">${edu.year}</p>
                <p class="education-description">${edu.description}</p>
            `;
            grid.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading education:', error);
    }
}

// Load Certifications
async function loadCertifications() {
    try {
        const response = await fetch('data/certifications.json');
        const certifications = await response.json();
        const grid = document.getElementById('certifications-grid');

        certifications.forEach(cert => {
            const card = document.createElement('div');
            card.className = 'achievement-card';
            card.innerHTML = `
                <div class="achievement-icon">
                    <i class='${cert.icon}'></i>
                </div>
                <h3 class="achievement-title">${cert.title}</h3>
                <p class="achievement-issuer">${cert.issuer}</p>
                <p class="achievement-date">${cert.date}</p>
            `;
            grid.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading certifications:', error);
    }
}

// Load Achievements
async function loadAchievements() {
    try {
        const response = await fetch('data/achievements.json');
        const achievements = await response.json();
        const grid = document.getElementById('achievements-grid');

        achievements.forEach(achievement => {
            const card = document.createElement('div');
            card.className = 'achievement-card';
            card.innerHTML = `
                <div class="achievement-icon">
                    <i class='${achievement.icon}'></i>
                </div>
                <h3 class="achievement-title">${achievement.title}</h3>
                <p class="achievement-issuer">${achievement.issuer}</p>
                <p class="achievement-date">${achievement.date}</p>
            `;
            grid.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading achievements:', error);
    }
}

// Load Blogs
async function loadBlogs() {
    try {
        const response = await fetch('data/blogs.json');
        const blogs = await response.json();
        const grid = document.getElementById('blogs-grid');

        blogs.forEach(blog => {
            const card = document.createElement('div');
            card.className = 'blog-card';
            card.innerHTML = `
                <img src="${blog.image}" alt="${blog.title}" class="blog-image">
                <div class="blog-content">
                    <div class="blog-meta">
                        <span><i class="far fa-calendar"></i> ${blog.date}</span>
                        <span><i class="far fa-clock"></i> ${blog.readTime}</span>
                    </div>
                    <h3 class="blog-title">${blog.title}</h3>
                    <p class="blog-excerpt">${blog.excerpt}</p>
                    <a href="${blog.link}" target="_blank" class="blog-link">
                        Read More <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            `;
            grid.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading blogs:', error);
    }
}

// Load Testimonials
async function loadTestimonials() {
    try {
        const response = await fetch('data/testimonials.json');
        const testimonials = await response.json();
        const grid = document.getElementById('testimonials-grid');

        testimonials.forEach(testimonial => {
            const card = document.createElement('div');
            card.className = 'testimonial-card';

            const isLong = testimonial.content.length > 420;
            const displayContent = isLong
                ? testimonial.content.substring(0, 420) + '...'
                : testimonial.content;

            card.innerHTML = `
                <div class="testimonial-icon">
                    <i class="fas fa-quote-right"></i>
                </div>
                <p class="testimonial-content">
                    ${displayContent}
                    ${isLong ? `<a href="testimonial-detail.html?id=${testimonial.id}" class="read-more-link">Read More</a>` : ''}
                </p>
                <div class="testimonial-author">
                    <img src="${testimonial.image}" alt="${testimonial.name}" class="author-image">
                    <div class="author-info">
                        <h3>${testimonial.name}</h3>
                        <p>${testimonial.position}, ${testimonial.company}</p>
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading testimonials:', error);
    }
}

// Load Services
async function loadServices() {
    try {
        const response = await fetch('data/services.json');
        const services = await response.json();
        const grid = document.getElementById('services-grid');

        services.forEach(service => {
            const card = document.createElement('div');
            card.className = 'service-card';
            card.style.setProperty('--accent-color', service.accent);
            card.innerHTML = `
                <div class="service-icon-box">
                    <i class="${service.icon}"></i>
                </div>
                <h3 class="service-title">${service.title}</h3>
                <div class="service-meta">
                    <span><i class="far fa-clock"></i> ${service.timeline}</span>
                    <span><i class="fas fa-tag"></i> ${service.investment}</span>
                </div>
                <p class="service-target">${service.target}</p>
                <div class="service-includes">
                    <h4>What's included:</h4>
                    <ul>
                        ${service.included.map(item => `<li><i class="fas fa-check"></i> ${item}</li>`).join('')}
                    </ul>
                </div>
                <a href="#contact" class="btn btn-outline">Book a Call</a>
            `;
            grid.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading services:', error);
    }
}

// ===========================
// Contact Form
// ===========================
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('.btn-submit');
    const originalBtnText = submitBtn.innerHTML;

    // Change button state
    submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
    submitBtn.disabled = true;

    const templateParams = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    try {
        // Sending live email via EmailJS
        await emailjs.send('service_bat1ubh', 'template_06chmue', templateParams);

        formMessage.textContent = 'Thank you for your message! I will get back to you soon.';
        formMessage.className = 'form-message success';
        formMessage.style.display = 'block';
        contactForm.reset();

    } catch (error) {
        console.error('EmailJS Error:', error);
        formMessage.textContent = 'Oops! Something went wrong. Please try again later.';
        formMessage.className = 'form-message error';
        formMessage.style.display = 'block';
    } finally {
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;

        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
});

// ===========================
// Smooth Scroll
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===========================
// Scroll Animations
// ===========================
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.tech-card, .project-card, .education-card, .achievement-card, .blog-card, .timeline-item, .case-study-card, .service-card');

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(30px)';

                setTimeout(() => {
                    entry.target.style.transition = 'all 0.6s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);

                scrollObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    elements.forEach(element => {
        scrollObserver.observe(element);
    });
};

// ===========================
// Initialize
// ===========================
document.addEventListener('DOMContentLoaded', async () => {
    // Initialize Three.js
    initThreeJS();

    // Load dynamic content
    await Promise.all([
        loadTechnologies(),
        loadCaseStudies(),
        loadServices(),
        loadProjects(),
        loadEducation(),
        loadCertifications(),
        loadAchievements(),
        loadBlogs(),
        loadTestimonials()
    ]);

    // Initialize scroll animations
    setTimeout(animateOnScroll, 500);
});

// ===========================
// Performance Optimization
// ===========================
// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Debounce scroll events
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(() => {
        // Scroll-based animations can go here
    });
}, { passive: true });
