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
    luma: {
        title: 'LUMA House',
        description: 'LUMA House is a small, light-filled retreat designed to sit gently within its landscape. Its curved form softens the boundary between built space and nature, while the glass facade allows daylight to move freely through the interior. The structure feels calm and grounded, offering openness without losing privacy. LUMA House is meant to be a quiet place for rest, reflection, and simple living, shaped by light, material, and its surroundings.',
        images: ['images/1.jpg', 'images/7.jpg', 'images/8.jpg']
    },
    infinity: {
        title: 'Infinity Shelter',
        description: 'Infinity is a figure-eight shelter designed as a shared space for pause and connection. Its looping form creates two intimate areas linked by a central crossing, allowing people to gather, rest, and move naturally within the landscape. The design explores the infinity shape through sketches, focusing on curved seating and wood as the main material. The figure-eight form creates two connected areas that feel social, comfortable, and open to light and nature.',
        images: ['images/2.jpg']
    },
    architectural: {
        title: 'Architectural Concepts',
        description: 'A collection of modern dwelling designs exploring organic forms, curved structures, and the integration of interior and exterior spaces. These concepts emphasize natural materials, light-filled interiors, and harmonious relationships with their environments.',
        images: ['images/3.jpg']
    },
    floorplans: {
        title: 'Floor Plans & Space Planning',
        description: 'Thoughtful space planning and layout design for various residential projects. Each plan considers flow, function, and the relationship between different living areas, creating efficient and comfortable spaces.',
        images: ['images/4.jpg']
    },
    process: {
        title: 'Design Process',
        description: 'The design process explores form, material, and function through sketches and iterative exploration. This work focuses on curved seating, wood as the main material, and creating spaces that feel social, comfortable, and open to light and nature.',
        images: ['images/5.jpg']
    },
    site: {
        title: 'Site Plans & Landscape Integration',
        description: 'Site planning and landscape integration designs that consider the relationship between built structures and their natural surroundings. These plans explore how architecture can sit gently within its environment.',
        images: ['images/6.jpg']
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
    
    // Set green background for last three projects
    const greenProjects = ['floorplans', 'process', 'site'];
    if (greenProjects.includes(projectId)) {
        section.style.background = 'linear-gradient(135deg, #3a4a2a 0%, #2a3a1a 100%)';
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
    if (e.target.classList.contains('project-nav-next')) {
        const projectId = e.target.getAttribute('data-project');
        nextProjectImage(projectId);
    }
    if (e.target.classList.contains('project-nav-prev')) {
        const projectId = e.target.getAttribute('data-project');
        prevProjectImage(projectId);
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

// Color palette interaction
document.querySelectorAll('.color-swatch').forEach(swatch => {
    swatch.addEventListener('click', function() {
        const color = window.getComputedStyle(this).backgroundColor;
        document.body.style.setProperty('--accent-color', color);
        
        // Visual feedback
        this.style.transform = 'scale(1.3)';
        setTimeout(() => {
            this.style.transform = '';
        }, 300);
    });
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

