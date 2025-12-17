document.addEventListener("DOMContentLoaded", () => {

  /* NAV TOGGLE */
  const toggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  toggle.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", !expanded);
    navLinks.classList.toggle("active");
  });

  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  /* SMOOTH SCROLL */
  document.querySelectorAll('a[href^="#"]:not(.lightbox)').forEach(anchor => {
    anchor.addEventListener("click", e => {
      const target = document.querySelector(anchor.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    });
  });

  /* COUNTERS */
  const stats = document.querySelector(".stats");
  if (stats) {
    const counters = stats.querySelectorAll("strong");
    let started = false;

    const runCounters = () => {
      counters.forEach(counter => {
        const target = +counter.dataset.count;
        let current = 0;
        const step = target / 60;

        const update = () => {
          current += step;
          if (current < target) {
            counter.textContent = Math.ceil(current);
            requestAnimationFrame(update);
          } else {
            counter.textContent = target + "+";
          }
        };
        update();
      });
    };

    new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !started) {
        runCounters();
        started = true;
      }
    }, { threshold: 0.5 }).observe(stats);
  }

  /* LIGHTBOX */
  document.querySelectorAll(".lightbox").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();

      const overlay = document.createElement("div");
      overlay.style.cssText = `
        position:fixed;
        inset:0;
        background:rgba(0,0,0,0.85);
        display:flex;
        justify-content:center;
        align-items:center;
        z-index:9999;
      `;

      const img = document.createElement("img");
      img.src = link.href;
      img.style.maxWidth = "90%";
      img.style.maxHeight = "90%";

      overlay.appendChild(img);
      overlay.addEventListener("click", () => overlay.remove());

      document.addEventListener("keydown", e => {
        if (e.key === "Escape") overlay.remove();
      }, { once: true });

      document.body.appendChild(overlay);
    });
  });

});
