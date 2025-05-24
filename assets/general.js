document.addEventListener("DOMContentLoaded", function () {
    // Navbar Functionality
    // Mobile Dropdown Menu Handling
    function isMobileView() {
        return window.innerWidth < 992; // Bootstrap lg breakpoint
    }

    function updateMenu() {
        const dropdowns = document.querySelectorAll(".nav-item.dropdown");

        dropdowns.forEach((dropdown) => {
            const link = dropdown.querySelector(".nav-link");

            if (isMobileView()) {
                link.setAttribute("href", "#");
                link.addEventListener("click", function () {
                    window.location.href = this.dataset.href;
                });

                dropdown.style.display = "block";
            } else {
                link.removeAttribute("href");
                dropdown.style.display = "flex";
            }
        });
    }

    document.querySelectorAll(".nav-item.dropdown .nav-link").forEach(link => {
        link.dataset.href = link.getAttribute("href");
    });

    updateMenu();
    window.addEventListener("resize", updateMenu);

    // Overlay for Desktop Dropdowns
    const navOverlay = document.getElementById("navOverlay");
    const dropdowns = document.querySelectorAll(".nav-item.dropdown");

    function showOverlay() {
        if (window.innerWidth >= 992) {
            navOverlay.style.opacity = "1";
            navOverlay.style.visibility = "visible";
        }
    }

    function hideOverlay() {
        navOverlay.style.opacity = "0";
        navOverlay.style.visibility = "hidden";
    }

    dropdowns.forEach(dropdown => {
        dropdown.addEventListener("mouseenter", showOverlay);
        dropdown.addEventListener("mouseleave", hideOverlay);
    });

    // Side Menu (Accordion) Functionality
    const accordionHeaders = document.querySelectorAll(".accordion h2");

    accordionHeaders.forEach(header => {
        header.addEventListener("click", function () {
            toggleAccordion(this);
        });
    });

    function toggleAccordion(element) {
        const content = element.nextElementSibling;
        const icon = element.querySelector('.icon');
        
        // Close all other accordion items
        document.querySelectorAll(".accordion-content").forEach((item) => {
            if (item !== content) {
                item.classList.remove('active');
                item.style.maxHeight = "0px";
                const otherIcon = item.previousElementSibling.querySelector('.icon');
                otherIcon.classList.remove('rotate');
            }
        });

        // Toggle current accordion item
        if (content.classList.contains('active')) {
            content.classList.remove('active');
            content.style.maxHeight = "0px";
            icon.classList.remove('rotate');
        } else {
            content.classList.add('active');
            content.style.maxHeight = content.scrollHeight + "px";
            icon.classList.add('rotate');
        }
    }

    // Initialize all accordion icons to plus
    document.querySelectorAll(".accordion h2 .icon").forEach(icon => {
        icon.classList.add("bi-plus");
    });
}); 