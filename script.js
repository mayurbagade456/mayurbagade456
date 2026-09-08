const html = document.documentElement;
const themeToggle = document.querySelector(".theme-toggle");
const cursorGlow = document.querySelector(".cursor-glow");
const revealElements = document.querySelectorAll(".reveal");
const savedTheme = localStorage.getItem("theme");
const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;

html.dataset.theme = savedTheme || (prefersLight ? "light" : "dark");

themeToggle?.addEventListener("click", () => {
    const nextTheme = html.dataset.theme === "dark" ? "light" : "dark";
    html.dataset.theme = nextTheme;
    localStorage.setItem("theme", nextTheme);
});

window.addEventListener("pointermove", (event) => {
    if (!cursorGlow) {
        return;
    }

    cursorGlow.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
});

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.16,
    rootMargin: "0px 0px -60px 0px"
});

revealElements.forEach((element, index) => {
    element.style.transitionDelay = `${Math.min(index * 35, 280)}ms`;
    revealObserver.observe(element);
});

document.querySelectorAll("a[href^='#']").forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
        const targetId = anchor.getAttribute("href");
        const target = targetId ? document.querySelector(targetId) : null;

        if (!target) {
            return;
        }

        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
});