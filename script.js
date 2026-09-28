document.addEventListener("DOMContentLoaded", () => {

    /* Mobile navigation */
    const menuToggle = document.querySelector(".menu-toggle");
    const mainNav = document.querySelector(".main-nav");

    if (menuToggle && mainNav) {
        menuToggle.addEventListener("click", () => {
            mainNav.classList.toggle("open");
        });

        mainNav.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                mainNav.classList.remove("open");
            });
        });
    }


    /* Scroll reveal animation */
    const revealElements = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    /* Smooth navigation */
    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            const headerHeight = 75;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });
        });

    });


    /* Subtle profile card movement */
    const profileCard = document.querySelector(".profile-card");

    if (profileCard && window.innerWidth > 850) {

        profileCard.addEventListener("mousemove", event => {

            const rect = profileCard.getBoundingClientRect();

            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const rotateY = ((x / rect.width) - 0.5) * 5;
            const rotateX = ((y / rect.height) - 0.5) * -5;

            profileCard.style.transform =
                `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        profileCard.addEventListener("mouseleave", () => {
            profileCard.style.transform = "rotate(2deg)";
        });
    }


    /* Image fallback */
    document.querySelectorAll(".project-image img, .profile-image").forEach(image => {

        image.addEventListener("error", () => {
            image.style.opacity = "0";

            const parent = image.parentElement;

            if (parent) {
                parent.classList.add("image-error");
            }
        });

    });

});
