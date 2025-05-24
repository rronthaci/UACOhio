document.addEventListener("DOMContentLoaded", function () {
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
}); 