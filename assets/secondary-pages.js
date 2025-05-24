// Global function for FAQ accordion
function toggleFaq(element) {
    const faqItem = element.parentElement;
    const isActive = faqItem.classList.contains('active');
    
    // Close all other FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Toggle current FAQ item
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

document.addEventListener("DOMContentLoaded", function () {
    // Function to handle smooth scrolling for anchor links
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Function to handle breadcrumb navigation
    function initBreadcrumbs() {
        const breadcrumbs = document.querySelector('.breadcrumbs-wrapper');
        if (breadcrumbs) {
            const currentPage = window.location.pathname.split('/').pop();
            const breadcrumbItems = breadcrumbs.querySelectorAll('.breadcrumb-item');
            
            breadcrumbItems.forEach(item => {
                const link = item.querySelector('a');
                if (link && link.getAttribute('href').includes(currentPage)) {
                    item.classList.add('active');
                }
            });
        }
    }

    // Function to handle responsive images
    function initResponsiveImages() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }
        });
    }

    // Function to handle form validation (if forms are present)
    function initFormValidation() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                if (!form.checkValidity()) {
                    e.preventDefault();
                    e.stopPropagation();
                }
                form.classList.add('was-validated');
            });
        });
    }

    // Initialize all functions
    initSmoothScroll();
    initBreadcrumbs();
    initResponsiveImages();
    initFormValidation();
}); 