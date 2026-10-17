
/* =========================================================
   MOBILE NAVIGATION
========================================================= */

const menuToggle = document.querySelector(".menu-toggle");

const navLinks = document.querySelector(".nav-links");

const themeToggle = document.querySelector(".theme-toggle");

const themeIcon = themeToggle.querySelector("i");

const profileAvatar = document.querySelector(".profile-avatar");

const profileLightbox = document.querySelector(".profile-lightbox");

const profileLightboxPortrait =
    document.querySelector(".profile-lightbox-portrait");

const profileLightboxClose =
    document.querySelector(".profile-lightbox-close");

if (profileAvatar && profileLightbox && profileLightboxPortrait && profileLightboxClose) {
    profileAvatar.addEventListener("click", function () {
        const avatarLetter = profileAvatar.querySelector(".profile-avatar-letter");

        if (avatarLetter) {
            profileLightboxPortrait.replaceChildren(avatarLetter.cloneNode(true));
        }

        profileLightbox.showModal();
    });

    profileLightboxClose.addEventListener("click", function () {
        profileLightbox.close();
    });

    profileLightbox.addEventListener("click", function (event) {
        if (event.target === profileLightbox) {
            profileLightbox.close();
        }
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && profileLightbox.open) {
            profileLightbox.close();
        }
    });
}

let savedTheme = "dark";

try {
    savedTheme = localStorage.getItem("portfolio-theme") || "dark";
} catch (error) {
    savedTheme = "dark";
}

function applyTheme(theme) {
    const isLight = theme === "light";

    document.documentElement.dataset.theme = theme;
    themeIcon.className = isLight ? "fas fa-moon" : "fas fa-sun";
    themeToggle.setAttribute(
        "aria-label",
        isLight ? "Switch to dark mode" : "Switch to light mode"
    );
    themeToggle.title = isLight ? "Switch to dark mode" : "Switch to light mode";
}

applyTheme(savedTheme);

themeToggle.addEventListener("click", function () {
    const nextTheme =
        document.documentElement.dataset.theme === "light" ? "dark" : "light";

    applyTheme(nextTheme);

    try {
        localStorage.setItem("portfolio-theme", nextTheme);
    } catch (error) {
        console.error("Could not save theme preference:", error);
    }
});

const projectPreviewVideos =
    document.querySelectorAll(".project-preview-video");

if (projectPreviewVideos.length > 0) {
    const playbackLimitSeconds = 15;
    const videoVisibilityObserver = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                const video = entry.target;

                if (entry.isIntersecting) {
                    video.play().catch(function (error) {
                        console.error("Project preview video could not autoplay:", error);
                    });
                } else {
                    video.pause();
                }
            });
        },
        { threshold: 0.5 }
    );

    projectPreviewVideos.forEach(function (video) {
        videoVisibilityObserver.observe(video);

        video.addEventListener("timeupdate", function () {
            if (video.currentTime >= playbackLimitSeconds) {
                video.currentTime = 0;
            }
        });

        video.addEventListener("seeking", function () {
            if (video.currentTime > playbackLimitSeconds) {
                video.currentTime = 0;
            }
        });

        video.addEventListener("play", function () {
            if (video.currentTime >= playbackLimitSeconds) {
                video.currentTime = 0;
            }
        });
    });
}


/* Open / close menu */

menuToggle.addEventListener("click", function () {

    navLinks.classList.toggle("active");

});


/* Close menu after clicking a link */

document.querySelectorAll(".nav-links a").forEach(function (link) {

    link.addEventListener("click", function () {

        navLinks.classList.remove("active");

    });

});


/* =========================================================
   SCROLL PROGRESS
========================================================= */

const scrollProgress =
    document.querySelector(".scroll-progress");


window.addEventListener("scroll", function () {

    const scrollTop =
        window.scrollY;

    const documentHeight =
        document.documentElement.scrollHeight
        - window.innerHeight;

    const scrollPercentage =
        (scrollTop / documentHeight) * 100;

    scrollProgress.style.width =
        scrollPercentage + "%";

});



/* =========================================================
   BACK TO TOP
========================================================= */

const backToTop =
    document.querySelector(".back-to-top");


window.addEventListener("scroll", function () {

    if (window.scrollY > 500) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

});


backToTop.addEventListener("click", function () {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});



/* =========================================================
   SECTION REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".section-heading, " +
        ".about-grid, " +
        ".skills-grid, " +
        ".education-grid, " +
        ".projects-grid, " +
        ".contact-box"
    );


const revealObserver =
    new IntersectionObserver(

        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "section-visible"
                    );

                }

            });

        },

        {
            threshold: 0.15
        }

    );


revealElements.forEach(function (element) {

    revealObserver.observe(element);

});



/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections =
    document.querySelectorAll("section[id]");


const navigationLinks =
    document.querySelectorAll(
        ".nav-links a"
    );


window.addEventListener("scroll", function () {

    let currentSection = "";

    sections.forEach(function (section) {

        const sectionTop =
            section.offsetTop - 120;

        const sectionHeight =
            section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navigationLinks.forEach(function (link) {

        link.classList.remove("active");

        if (
            link.getAttribute("href")
            === "#" + currentSection
        ) {

            link.classList.add("active");

        }

    });

});
