// Images are now always visible as thumbnails - no need for error handlers

// Navigation functionality
const navbar = document.getElementById('navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scroll for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    const floatingElements = document.querySelectorAll('.float-element');
    
    if (hero && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
        
        floatingElements.forEach((element, index) => {
            const speed = (index + 1) * 0.1;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }
});

// Portfolio items interaction - wait for DOM to be ready
let portfolioItems;

function initPortfolioItems() {
    portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (portfolioItems.length === 0) {
        return;
    }
    
    // Make entire portfolio item clickable
    portfolioItems.forEach((item, index) => {
        const projectId = item.getAttribute('data-project');
        
        if (!projectId) {
            return;
        }
        
        // Remove any existing listeners by cloning
        const newItem = item.cloneNode(true);
        item.parentNode.replaceChild(newItem, item);
        
        // Ensure child elements don't block clicks
        const overlay = newItem.querySelector('.portfolio-overlay');
        if (overlay) {
            overlay.style.pointerEvents = 'none';
        }
        
        const imageWrapper = newItem.querySelector('.portfolio-image-wrapper');
        if (imageWrapper) {
            imageWrapper.style.pointerEvents = 'none';
        }
        
        // Add click listener to the new item - use capture phase
        newItem.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const projectSection = document.getElementById(`project-${projectId}`);
            
            if (projectSection) {
                const offsetTop = projectSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update background based on image
                updateProjectBackground(projectId);
            } else {
                console.error(`Project section not found: project-${projectId}`);
            }
        }, true); // Capture phase to ensure it fires first
        
        // Make sure the entire item is clickable
        newItem.style.cursor = 'pointer';
        newItem.style.pointerEvents = 'auto';
    });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPortfolioItems);
} else {
    // DOM already loaded, initialize immediately
    setTimeout(initPortfolioItems, 100);
}

// Project data
const projects = {
    rosedale: {
        title: 'Project Rosedale',
        subtitle: 'Full-home residential design',
        description: "Project Rosedale is a full-home interior design project for a classic Rosedale residence, reimagining the living room, kitchen, breakfast nook, and dining room as one cohesive, layered home. The palette moves from a soft Monterey White in the living spaces, to a calming Gloucester Sage in the kitchen, and into a deep, enveloping Chimichurri green in the dining room.",
        images: ['images/rosedale-slide-1.png', 'images/rosedale-slide-2.png', 'images/rosedale-slide-3.png', 'images/rosedale-slide-4.png', 'images/rosedale-slide-5.png', 'images/rosedale-slide-6.png', 'images/rosedale-slide-7.png', 'images/rosedale-slide-8.png', 'images/rosedale-slide-9.png', 'images/rosedale-slide-10.png']
    },
    luma: {
        title: 'LUMA House',
        subtitle: 'Temporary living structure',
        description: 'LUMA House is a small, light-filled retreat designed to sit gently within its landscape. Its curved form softens the boundary between built space and nature, while the glass facade allows daylight to move freely through the interior. The structure feels calm and grounded, offering openness without losing privacy. LUMA House is meant to be a quiet place for rest, reflection, and simple living, shaped by light, material, and its surroundings.',
        images: ['images/1.jpg', 'images/2.jpg', 'images/3.jpg']
    },
    bathroom: {
        title: 'The Unwind',
        subtitle: 'Minimal warm retreat',
        description: 'This bathroom is designed for those who appreciate minimal spaces that still feel intentional and meaningful. Every element serves a purpose, creating a clean and calming environment without excess. Warm lighting softens the space at night, transforming it into a more intimate and relaxing atmosphere.',
        images: ['images/bathroom-1.png', 'images/bathroom-2.png', 'images/bathroom-3.png', 'images/bathroom-4.png', 'images/bathroom-5.png', 'images/bathroom-6.png']
    }
};

// Project detail image navigation
function updateProjectImage(projectId, imageIndex) {
    const project = projects[projectId];
    if (!project || !project.images) return;
    
    const section = document.getElementById(`project-${projectId}`);
    if (!section) return;
    
    const image = section.querySelector('.project-main-image');
    const counter = section.querySelector('.project-image-counter');
    const prevBtn = section.querySelector('.project-nav-prev');
    const nextBtn = section.querySelector('.project-nav-next');
    
    if (image && project.images[imageIndex]) {
        // Update image with fade effect
        image.style.opacity = '0';
        setTimeout(() => {
            image.src = project.images[imageIndex];
            image.style.opacity = '1';
        }, 200);
        
        if (counter) {
            counter.textContent = project.images.length > 1 
                ? `${imageIndex + 1} / ${project.images.length}` 
                : '';
            counter.style.display = project.images.length > 1 ? 'block' : 'none';
        }
        
        // Show/hide navigation buttons
        if (prevBtn) {
            prevBtn.style.display = project.images.length > 1 ? 'flex' : 'none';
        }
        if (nextBtn) {
            nextBtn.style.display = project.images.length > 1 ? 'flex' : 'none';
        }
        
        // Update background
        updateProjectBackground(projectId, imageIndex);
        
        // Update tracked index
        projectImageIndices[projectId] = imageIndex;
    }
}

// Track current image index for each project
const projectImageIndices = {};

// Initialize image indices on load
window.addEventListener('load', () => {
    Object.keys(projects).forEach(projectId => {
        projectImageIndices[projectId] = 0;
        updateProjectImage(projectId, 0);
    });
});

function nextProjectImage(projectId) {
    const project = projects[projectId];
    if (!project || !project.images || project.images.length <= 1) return;
    
    // Initialize index if not set
    if (projectImageIndices[projectId] === undefined) {
        projectImageIndices[projectId] = 0;
    }
    
    // Move to next image
    projectImageIndices[projectId] = (projectImageIndices[projectId] + 1) % project.images.length;
    
    updateProjectImage(projectId, projectImageIndices[projectId]);
}

function prevProjectImage(projectId) {
    const project = projects[projectId];
    if (!project || !project.images || project.images.length <= 1) return;
    
    // Initialize index if not set
    if (projectImageIndices[projectId] === undefined) {
        projectImageIndices[projectId] = 0;
    }
    
    // Move to previous image
    projectImageIndices[projectId] = (projectImageIndices[projectId] - 1 + project.images.length) % project.images.length;
    
    updateProjectImage(projectId, projectImageIndices[projectId]);
}

// Update project background based on image
function updateProjectBackground(projectId, imageIndex = 0) {
    const project = projects[projectId];
    if (!project || !project.images) return;
    
    const section = document.querySelector(`#project-${projectId}`);
    if (!section) return;
    
    const bgElement = section.querySelector('.project-detail-background');
    const imageSrc = project.images[imageIndex];
    
    if (bgElement && imageSrc) {
        // Create a new image to preload
        const img = new Image();
        img.onload = function() {
            bgElement.style.backgroundImage = `url(${imageSrc})`;
            bgElement.style.backgroundSize = 'cover';
            bgElement.style.backgroundPosition = 'center';
            bgElement.style.backgroundRepeat = 'no-repeat';
        };
        img.src = imageSrc;
    }
    
}

// Initialize backgrounds on load
window.addEventListener('load', () => {
    Object.keys(projects).forEach(projectId => {
        updateProjectBackground(projectId, 0);
    });
});

// Project navigation event listeners
document.addEventListener('click', (e) => {
    const nextBtn = e.target.closest('.project-nav-next');
    if (nextBtn) {
        e.preventDefault();
        e.stopPropagation();
        nextProjectImage(nextBtn.getAttribute('data-project'));
        return;
    }

    const prevBtn = e.target.closest('.project-nav-prev');
    if (prevBtn) {
        e.preventDefault();
        e.stopPropagation();
        prevProjectImage(prevBtn.getAttribute('data-project'));
        return;
    }

    // Click anywhere on the main image to advance to the next image
    const mainImage = e.target.closest('.project-main-image');
    if (mainImage) {
        const section = mainImage.closest('.project-detail');
        if (section) {
            nextProjectImage(section.getAttribute('data-project'));
        }
    }
});

// Scroll to project detail section
function scrollToProject(projectId) {
    const projectSection = document.getElementById(`project-${projectId}`);
    
    if (projectSection) {
        const offsetTop = projectSection.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
        
        // Update background based on image
        updateProjectBackground(projectId);
    }
}

// Removed duplicate - handled in initPortfolioItems()

// Keyboard navigation for project images
document.addEventListener('keydown', (e) => {
    // Find which project section is currently in view
    const projectSections = document.querySelectorAll('.project-detail');
    projectSections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
            const projectId = section.getAttribute('data-project');
            if (e.key === 'ArrowRight') {
                nextProjectImage(projectId);
            } else if (e.key === 'ArrowLeft') {
                prevProjectImage(projectId);
            }
        }
    });
    
    if (e.key === 'Escape' && lightbox && lightbox.classList.contains('active')) {
        closeLightbox();
    }
});

// Lightbox functionality
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');
const lightboxCounter = document.getElementById('lightboxCounter');
let currentImages = [];
let currentIndex = 0;

function openLightbox(images, index = 0) {
    currentImages = images;
    currentIndex = index;
    updateLightboxImage();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function updateLightboxImage() {
    if (currentImages.length > 0) {
        lightboxImage.src = currentImages[currentIndex];
        lightboxCounter.textContent = `${currentIndex + 1} / ${currentImages.length}`;
    }
}

function nextImage() {
    if (currentImages.length > 0) {
        currentIndex = (currentIndex + 1) % currentImages.length;
        updateLightboxImage();
    }
}

function prevImage() {
    if (currentImages.length > 0) {
        currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
        updateLightboxImage();
    }
}

// Lightbox event listeners
if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
}

if (lightboxNext) {
    lightboxNext.addEventListener('click', nextImage);
}

if (lightboxPrev) {
    lightboxPrev.addEventListener('click', prevImage);
}

// Close lightbox when clicking outside image
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('active')) {
        if (e.key === 'ArrowRight') {
            nextImage();
        } else if (e.key === 'ArrowLeft') {
            prevImage();
        }
    }
});

// Scroll animations removed - keeping it simple

// Contact section - simple display, no form needed

// Cursor effect (optional creative feature)
let cursor = null;
let cursorFollower = null;

function createCustomCursor() {
    cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        width: 20px;
        height: 20px;
        border: 2px solid var(--color-brown);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
        display: none;
    `;
    
    cursorFollower = document.createElement('div');
    cursorFollower.className = 'cursor-follower';
    cursorFollower.style.cssText = `
        width: 8px;
        height: 8px;
        background: var(--color-brown);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9998;
        transition: transform 0.15s ease;
        display: none;
    `;
    
    document.body.appendChild(cursor);
    document.body.appendChild(cursorFollower);
}

// Enable custom cursor on desktop only
if (window.innerWidth > 768) {
    // Hide default cursor
    document.body.classList.add('custom-cursor-active');
    
    createCustomCursor();
    
    document.addEventListener('mousemove', (e) => {
        if (cursor && cursorFollower) {
            cursor.style.left = e.clientX - 10 + 'px';
            cursor.style.top = e.clientY - 10 + 'px';
            cursor.style.display = 'block';
            
            setTimeout(() => {
                cursorFollower.style.left = e.clientX - 4 + 'px';
                cursorFollower.style.top = e.clientY - 4 + 'px';
                cursorFollower.style.display = 'block';
            }, 50);
        }
    });
    
    // Cursor hover effects
    const interactiveElements = document.querySelectorAll('a, button, .portfolio-item');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            if (cursor) cursor.style.transform = 'scale(1.5)';
            if (cursorFollower) cursorFollower.style.transform = 'scale(1.5)';
        });
        
        element.addEventListener('mouseleave', () => {
            if (cursor) cursor.style.transform = 'scale(1)';
            if (cursorFollower) cursorFollower.style.transform = 'scale(1)';
        });
    });
}

// Scroll progress indicator
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, var(--color-brown), var(--color-green));
        z-index: 10000;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

createScrollProgress();

// Add smooth reveal animation on load
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Scroll animations and parallax effects removed - keeping it simple

// Single fixed palette – two cream tones only
const palette = {
    "--bg-main": "#f4f1e9",
    "--bg-alt": "#d6cdbb",
    "--bg-deep": "#f4f1e9",
    "--nav-bg": "rgba(244, 241, 233, 0.95)",
    "--hero-overlay": "rgba(214, 205, 187, 0.25)",
    "--project-overlay-start": "rgba(244, 241, 233, 0.92)",
    "--project-overlay-end": "rgba(214, 205, 187, 0.95)",
    "--card-bg-soft": "rgba(214, 205, 187, 0.5)",
    "--text-color": "#1a1a1a",
    "--text-light": "#2a2a2a",
    "--hero-title-color": "#1a1a1a",
    "--hero-subtitle-color": "#1a1a1a"
};

Object.entries(palette).forEach(([key, value]) => {
    document.documentElement.style.setProperty(key, value);
});

// Toggle project specifications
function toggleSpecs(projectId) {
    const toggle = document.querySelector(`#specs-${projectId}`).previousElementSibling;
    const content = document.getElementById(`specs-${projectId}`);
    
    toggle.classList.toggle('active');
    content.classList.toggle('active');
}

// Parallax for about section visual element
const aboutVisual = document.querySelector('.visual-element');
if (aboutVisual) {
    window.addEventListener('scroll', () => {
        const aboutSection = document.querySelector('.about');
        if (aboutSection) {
            const rect = aboutSection.getBoundingClientRect();
            const scrolled = window.pageYOffset;
            const sectionTop = aboutSection.offsetTop;
            const sectionHeight = aboutSection.offsetHeight;
            
            if (scrolled > sectionTop - window.innerHeight && scrolled < sectionTop + sectionHeight) {
                const progress = (scrolled - sectionTop + window.innerHeight) / (sectionHeight + window.innerHeight);
                aboutVisual.style.transform = `translateY(${progress * 50}px) rotate(${progress * 5}deg)`;
            }
        }
    });
}

// Add subtle tilt effect to portfolio items on mouse move - DISABLED to fix click issues
// The tilt effect was interfering with click events
// setTimeout(() => {
//     const portfolioItemsTilt = document.querySelectorAll('.portfolio-item');
//     portfolioItemsTilt.forEach(item => {
//         item.addEventListener('mousemove', (e) => {
//             const rect = item.getBoundingClientRect();
//             const x = e.clientX - rect.left;
//             const y = e.clientY - rect.top;
//             
//             const centerX = rect.width / 2;
//             const centerY = rect.height / 2;
//             
//             const rotateX = (y - centerY) / 10;
//             const rotateY = (centerX - x) / 10;
//             
//             item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
//         });
//         
//         item.addEventListener('mouseleave', () => {
//             item.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
//         });
//     });
// }, 100);

