// Resume download functionality for GitHub Pages
// IMPORTANT: Place your resume.pdf file in the root directory of your GitHub repository
// The file should be accessible at: https://yourusername.github.io/yourrepository/resume.pdf

function downloadResume() {
    // Try to download from the repository root
    // Replace 'yourusername' and 'yourrepository' with your actual GitHub username and repository name
    const resumeUrl = './resume.pdf';
    
    // Create a temporary link to test if file exists and download it
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'Avishkar_Solat_Resume.pdf';
    
    // Test if the file exists by trying to fetch it
    fetch(resumeUrl)
        .then(response => {
            if (response.ok) {
                // File exists, trigger download
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                showNotification('Resume download started!');
            } else {
                // File doesn't exist, show instructions modal
                showResumeInstructionsModal();
            }
        })
        .catch(error => {
            // Network error or file not found, show instructions modal
            console.log('Resume file not found, showing instructions');
            showResumeInstructionsModal();
        });
}

function showResumeInstructionsModal() {
    const modal = document.getElementById('resume-instructions-modal');
    if (modal) {
        modal.classList.remove('hidden');
    } else {
        createResumeInstructionsModal();
    }
}

function createResumeInstructionsModal() {
    const modal = document.createElement('div');
    modal.id = 'resume-instructions-modal';
    modal.className = 'modal';
    
    modal.innerHTML = `
        <div class="modal__content">
            <h3 class="modal__title">Resume Setup Instructions</h3>
            <p class="modal__text">
                To enable resume downloads on GitHub Pages, please follow these steps:
            </p>
            <div class="modal__instructions">
                <h4>GitHub Setup:</h4>
                <ol>
                    <li>Upload your resume.pdf file to the root directory of your GitHub repository</li>
                    <li>The file should be named exactly "resume.pdf"</li>
                    <li>Commit and push the changes to GitHub</li>
                    <li>Wait a few minutes for GitHub Pages to update</li>
                    <li>The download button will then work automatically</li>
                </ol>
            </div>
            <p class="modal__text">
                <strong>Contact me directly:</strong><br>
                📧 <a href="mailto:avishkar.solat@myself.com">avishkar.solat@myself.com</a><br>
                📱 <a href="tel:+917558555950">+91 7558555950</a>
            </p>
            <div class="modal__actions">
                <button class="btn btn--primary" onclick="closeResumeModal()">Got it</button>
                <button class="btn btn--outline" onclick="sendEmailForResume()">Email Me</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeResumeModal();
        }
    });
}

function closeResumeModal() {
    const modal = document.getElementById('resume-instructions-modal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

function sendEmailForResume() {
    const subject = encodeURIComponent('Resume Request - Avishkar Solat');
    const body = encodeURIComponent('Hello Avishkar,\n\nI visited your portfolio website and would like to request a copy of your resume.\n\nBest regards,');
    window.open(`mailto:avishkar.solat@myself.com?subject=${subject}&body=${body}`, '_blank');
    closeResumeModal();
}

function scrollToContact() {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// DOM Content Loaded event handler
document.addEventListener('DOMContentLoaded', function() {
    // Add event listeners to the buttons using their IDs
    const downloadBtn = document.getElementById('download-resume-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            downloadResume();
        });
    }

    const contactBtn = document.getElementById('contact-me-btn');
    if (contactBtn) {
        contactBtn.addEventListener('click', function(e) {
            e.preventDefault();
            scrollToContact();
        });
    }

    // Add smooth scrolling to all internal links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.experience__item, .skill, .case-study, .highlight, .career-objective');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add click tracking for analytics (placeholder)
    const trackableElements = document.querySelectorAll('.btn, .contact__item a');
    trackableElements.forEach(el => {
        el.addEventListener('click', function() {
            console.log('User interaction:', this.textContent || this.href);
        });
    });

    // Enhanced contact form interactions
    const contactItems = document.querySelectorAll('.contact__item');
    contactItems.forEach(item => {
        const link = item.querySelector('a');
        if (link) {
            item.addEventListener('click', function(e) {
                if (e.target !== link && !e.target.classList.contains('copy-btn')) {
                    link.click();
                }
            });
            item.style.cursor = 'pointer';
            item.title = 'Click to ' + (link.href.startsWith('mailto:') ? 'send email' : link.href.startsWith('tel:') ? 'call' : 'visit link');
        }
    });

    // Add keyboard navigation enhancements
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const modal = document.getElementById('resume-instructions-modal');
            if (modal && !modal.classList.contains('hidden')) {
                closeResumeModal();
            } else {
                const heroTitle = document.querySelector('.hero__title');
                if (heroTitle) {
                    heroTitle.focus();
                }
            }
        }
    });

    // Add loading state management
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    // Add skip to content link for accessibility
    const skipLink = document.createElement('a');
    skipLink.href = '#about';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--color-primary);
        color: var(--color-btn-primary-text);
        padding: 8px 12px;
        z-index: 1000;
        text-decoration: none;
        border-radius: 4px;
        transition: top 0.3s ease;
        font-size: var(--font-size-sm);
        font-weight: var(--font-weight-medium);
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add proper ARIA labels where needed
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        if (!btn.getAttribute('aria-label')) {
            btn.setAttribute('aria-label', btn.textContent.trim());
        }
    });

    // Add copy functionality to contact items
    const emailItem = document.querySelector('.contact__item a[href^="mailto:"]');
    if (emailItem) {
        addCopyButton(emailItem, 'avishkar.solat@myself.com');
    }

    const phoneItem = document.querySelector('.contact__item a[href^="tel:"]');
    if (phoneItem) {
        addCopyButton(phoneItem, '+91 7558555950');
    }
});

function addCopyButton(element, textToCopy) {
    const copyButton = document.createElement('button');
    copyButton.textContent = '📋';
    copyButton.className = 'copy-btn';
    copyButton.title = 'Copy to clipboard';
    copyButton.style.cssText = `
        background: none;
        border: none;
        cursor: pointer;
        margin-left: 8px;
        font-size: 14px;
        opacity: 0.7;
        transition: opacity 0.2s ease;
        padding: 2px 4px;
        border-radius: 4px;
    `;
    
    copyButton.addEventListener('mouseover', function() {
        this.style.opacity = '1';
        this.style.background = 'var(--color-secondary)';
    });
    
    copyButton.addEventListener('mouseout', function() {
        this.style.opacity = '0.7';
        this.style.background = 'none';
    });
    
    copyButton.addEventListener('click', function(e) {
        e.stopPropagation();
        e.preventDefault();
        copyToClipboard(textToCopy);
    });
    
    element.parentNode.appendChild(copyButton);
}

// Enhanced contact functionality
function initiateCall() {
    window.open('tel:+917558555950', '_self');
}

function sendEmail() {
    const subject = encodeURIComponent('Opportunity Discussion - Avishkar Solat');
    const body = encodeURIComponent('Hello Avishkar,\n\nI came across your portfolio and would like to discuss potential opportunities.\n\nBest regards,');
    window.open(`mailto:avishkar.solat@myself.com?subject=${subject}&body=${body}`, '_blank');
}

// Utility functions
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(function() {
            showNotification('Copied to clipboard!');
        }).catch(function() {
            fallbackCopyToClipboard(text);
        });
    } else {
        fallbackCopyToClipboard(text);
    }
}

function fallbackCopyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showNotification('Copied to clipboard!');
    } catch (err) {
        console.error('Failed to copy text: ', err);
        showNotification('Copy failed. Please copy manually.');
    }
    
    document.body.removeChild(textArea);
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--color-success);
        color: var(--color-btn-primary-text);
        padding: 12px 20px;
        border-radius: 6px;
        z-index: 1000;
        opacity: 0;
        transform: translateY(-20px);
        transition: all 0.3s ease;
        font-family: var(--font-family-base);
        font-size: var(--font-size-sm);
        font-weight: var(--font-weight-medium);
        box-shadow: var(--shadow-lg);
        border: 1px solid var(--color-card-border);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Performance optimization for images
if ('IntersectionObserver' in window) {
    document.addEventListener('DOMContentLoaded', function() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => {
            imageObserver.observe(img);
        });
    });
}

// GitHub Pages Resume Setup Instructions
// =====================================
// To make the resume download work on GitHub Pages:
//
// 1. Upload your resume PDF file to the root directory of your GitHub repository
// 2. Name the file exactly "resume.pdf" (lowercase)
// 3. Commit and push to GitHub
// 4. Wait for GitHub Pages to rebuild (usually 1-2 minutes)
// 5. The download button will automatically work
//
// File structure should look like:
// your-repository/
// ├── index.html
// ├── style.css  
// ├── app.js
// └── resume.pdf  ← Add this file
//
// Alternative: If you want to use a different filename or path,
// update the 'resumeUrl' variable in the downloadResume() function above