document.addEventListener("DOMContentLoaded", function () {
    // ✅ Attach event listeners for the accordion
    const accordionHeaders = document.querySelectorAll(".accordion h2");

    accordionHeaders.forEach(header => {
        header.addEventListener("click", function () {
            toggleAccordion(this);
        });
    });

    function toggleAccordion(element) {
        const content = element.nextElementSibling;
        const icon = element.querySelector('.icon');
    
        if (content.style.maxHeight && content.style.maxHeight !== "0px") {
            content.style.maxHeight = "0px"; // Collapse
            icon.classList.replace("bi-dash", "bi-plus"); // Change to plus icon
        } else {
            // Close other open items before opening a new one
            document.querySelectorAll(".accordion-content").forEach((item) => {
                item.style.maxHeight = "0px";
            });
    
            document.querySelectorAll(".icon").forEach((icon) => {
                icon.classList.replace("bi-dash", "bi-plus"); // Reset all icons to plus
            });
    
            content.style.maxHeight = content.scrollHeight + "px"; // Expand
            icon.classList.replace("bi-plus", "bi-dash"); // Change to minus icon
        }
    }

    // ✅ Fix Mobile Dropdown Menu Handling
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

    // ✅ Fix Overlay for Desktop Dropdowns
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

    // ✅ Fix Automatic Content Cycling
    const options = document.querySelectorAll(".selection-option");
    const contentBox = document.querySelector(".selection-content");
    const title = document.getElementById("selection-title");
    const text = document.getElementById("selection-text");
    const button = document.getElementById("selection-button");
    const buttonText = document.getElementById("selection-button-text");

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

    let currentIndex = 0;
    let interval;

    function changeSelection(index) {
        options.forEach(opt => opt.classList.remove("active"));
        options[index].classList.add("active");

        const contentKey = options[index].getAttribute("data-content");

        contentBox.classList.remove("fade-in");
        contentBox.classList.add("fade-out");

        setTimeout(() => {
            title.textContent = contentData[contentKey].title;
            text.textContent = contentData[contentKey].text;
            buttonText.textContent = contentData[contentKey].buttonText;
            button.href = contentData[contentKey].buttonLink;

            void contentBox.offsetWidth;

            contentBox.classList.remove("fade-out");
            contentBox.classList.add("fade-in");
        }, 300);
    }

    function startAutoCycle() {
        interval = setInterval(() => {
            currentIndex = (currentIndex + 1) % options.length;
            changeSelection(currentIndex);
        }, 5000);
    }

    function resetAutoCycle() {
        clearInterval(interval);
        startAutoCycle();
    }

    options.forEach((option, index) => {
        option.addEventListener("click", function () {
            currentIndex = index;
            changeSelection(currentIndex);
            resetAutoCycle();
        });
    });

    startAutoCycle();

    // ✅ Fix Counter Animation
    const counters = document.querySelectorAll(".counter");
    const animationDuration = 2000;

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

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.disconnect();
            }
        });
    }, { threshold: 0.5 });

    observer.observe(document.querySelector(".stats-section"));
});
