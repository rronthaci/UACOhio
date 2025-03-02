document.addEventListener("DOMContentLoaded", function () {
    function isMobileView() {
        return window.innerWidth < 992; // Bootstrap lg breakpoint
    }

    function updateMenu() {
        const dropdowns = document.querySelectorAll(".nav-item.dropdown");

        dropdowns.forEach((dropdown) => {
            const link = dropdown.querySelector(".nav-link");

            if (isMobileView()) {
                // Remove dropdown behavior but keep the link
                link.setAttribute("href", "#");
                link.addEventListener("click", function () {
                    window.location.href = this.dataset.href;
                });

                dropdown.style.display = "block"; // Ensure it remains visible
            } else {
                // Restore original behavior in desktop view
                link.removeAttribute("href");
                dropdown.style.display = "flex";
            }
        });
    }

    // Store original href values
    document.querySelectorAll(".nav-item.dropdown .nav-link").forEach(link => {
        link.dataset.href = link.getAttribute("href"); // Save original link
    });

    // Run function on page load and window resize
    updateMenu();
    window.addEventListener("resize", updateMenu);
});

document.addEventListener("DOMContentLoaded", function () {
    const navOverlay = document.getElementById("navOverlay");
    const dropdowns = document.querySelectorAll(".nav-item.dropdown");

    function showOverlay() {
        if (window.innerWidth >= 992) { // Only enable on desktop
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



    const options = document.querySelectorAll(".selection-option");
    const contentBox = document.querySelector(".selection-content");
    const title = document.getElementById("selection-title");
    const text = document.getElementById("selection-text");
    const button = document.getElementById("selection-button");
    const buttonText = document.getElementById("selection-button-text");

    // Content Mapping
    const contentData = {
        "why-choose-us": {
            title: "Why Choose Us?",
            text: "We provide a high-quality education in a nurturing environment, focusing on academic excellence and personal growth.",
            buttonText: "Learn More",
            buttonLink: "#why-choose-us"
        },
        "academic-advantage": {
            title: "Academic Advantage",
            text: "Our curriculum emphasizes critical thinking, STEM programs, and hands-on learning to prepare students for success.",
            buttonText: "Academics",
            buttonLink: "#academics"
        },
        "faith-based-environment": {
            title: "Faith-Based Environment",
            text: "We integrate strong moral values and spiritual growth into education, fostering a supportive and inclusive community.",
            buttonText: "Explore",
            buttonLink: "#about"
        }
    };

    options.forEach(option => {
        option.addEventListener("click", function () {
            // Remove 'active' class from all options
            options.forEach(opt => opt.classList.remove("active"));
            this.classList.add("active");

            // Get the data-content value
            const contentKey = this.getAttribute("data-content");

            // Reset animation by forcing a reflow (trick)
            contentBox.classList.remove("active");
            void contentBox.offsetWidth; // Triggers reflow to restart animation
            contentBox.classList.add("fade-in");

            // Change content after animation delay
            setTimeout(() => {
                title.textContent = contentData[contentKey].title;
                text.textContent = contentData[contentKey].text;
                document.getElementById("selection-button-text").textContent = contentData[contentKey].buttonText; // FIXED
                button.href= contentData[contentKey].buttonLink;

                // Remove fade-in class & add active class to fade back in
                contentBox.classList.remove("fade-in");
                contentBox.classList.add("active");
            }, 300); // Delay matches CSS transition time
        });
    });



    const counters = document.querySelectorAll(".counter");
    const animationDuration = 2000; // All numbers finish in 2 seconds

    function animateCounters() {
        const startTime = performance.now();
        function updateCounters(currentTime) {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / animationDuration, 1);

            counters.forEach(counter => {
                const target = +counter.getAttribute("data-target");
                const count = Math.floor(progress * target);
                counter.textContent = count + (target >= 100 ? "+" : "");
            });

            if (progress < 1) {
                requestAnimationFrame(updateCounters);
            }
        }
        requestAnimationFrame(updateCounters);
    }

    // Run animation when section becomes visible
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.disconnect(); // Stop observing after animation runs
            }
        });
    }, { threshold: 0.5 });

    observer.observe(document.querySelector(".stats-section"));

});
