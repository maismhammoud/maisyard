// ===============================
// SIDEBAR / NAVIGATION TOGGLE
// ===============================
document.addEventListener("DOMContentLoaded", () => {

  const toggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (toggle && navLinks) {
    toggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });

    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
      });
    });
  }

  // ===============================
  // SMOOTH SCROLL
  // ===============================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", e => {
      const target = document.querySelector(anchor.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    });
  });

  // ===============================
  // CONTACT FORM VALIDATION
  // ===============================
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", e => {
      const inputs = form.querySelectorAll("input, textarea, select");
      let valid = true;

      inputs.forEach(input => {
        if (input.hasAttribute("required") && !input.value.trim()) {
          valid = false;
        }
      });

      if (!valid) {
        e.preventDefault();
        alert("الرجاء تعبئة جميع الحقول المطلوبة");
      }
    });
  }

 // ===============================
// COUNTER ANIMATION (FIXED)
// ===============================
const statsSection = document.querySelector(".stats");

if (statsSection) {
  const counters = statsSection.querySelectorAll("strong");
  let started = false;

  const animateCounters = () => {
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute("data-count"), 10);
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

  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !started) {
      animateCounters();
      started = true;
    }
  }, { threshold: 0.5 });

  observer.observe(statsSection);
}


  // ===============================
  // PORTFOLIO LIGHTBOX
  // ===============================
  document.querySelectorAll(".lightbox").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();

      const img = document.createElement("img");
      img.src = link.href;
      img.style.maxWidth = "90%";
      img.style.maxHeight = "90%";

      const overlay = document.createElement("div");
      overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.85);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
      `;

      overlay.appendChild(img);
      overlay.addEventListener("click", () => overlay.remove());
      document.body.appendChild(overlay);
    });
  });

  // ===============================
  // COUNTRY CODE SELECT (AR SORTED)
  // ===============================
  const countrySelect = document.getElementById("countryCode");
  if (countrySelect) {
    const countries = [
  // ===== الدول العربية =====
  { name: "الإمارات العربية المتحدة", code: "+971", flag: "🇦🇪" },
  { name: "الأردن", code: "+962", flag: "🇯🇴" },
  { name: "البحرين", code: "+973", flag: "🇧🇭" },
  { name: "تونس", code: "+216", flag: "🇹🇳" },
  { name: "الجزائر", code: "+213", flag: "🇩🇿" },
  { name: "جيبوتي", code: "+253", flag: "🇩🇯" },
  { name: "السعودية", code: "+966", flag: "🇸🇦" },
  { name: "السودان", code: "+249", flag: "🇸🇩" },
  { name: "سوريا", code: "+963", flag: "🇸🇾" },
  { name: "الصومال", code: "+252", flag: "🇸🇴" },
  { name: "العراق", code: "+964", flag: "🇮🇶" },
  { name: "عُمان", code: "+968", flag: "🇴🇲" },
  { name: "فلسطين", code: "+970", flag: "🇵🇸" },
  { name: "قطر", code: "+974", flag: "🇶🇦" },
  { name: "الكويت", code: "+965", flag: "🇰🇼" },
  { name: "لبنان", code: "+961", flag: "🇱🇧" },
  { name: "ليبيا", code: "+218", flag: "🇱🇾" },
  { name: "مصر", code: "+20", flag: "🇪🇬" },
  { name: "المغرب", code: "+212", flag: "🇲🇦" },
  { name: "موريتانيا", code: "+222", flag: "🇲🇷" },
  { name: "اليمن", code: "+967", flag: "🇾🇪" },
  { name: "جزر القمر", code: "+269", flag: "🇰🇲" },

  // ===== دول أجنبية بوجود عربي كبير =====
  { name: "تركيا", code: "+90", flag: "🇹🇷" },
  { name: "ألمانيا", code: "+49", flag: "🇩🇪" },
  { name: "فرنسا", code: "+33", flag: "🇫🇷" },
  { name: "بريطانيا", code: "+44", flag: "🇬🇧" },
  { name: "السويد", code: "+46", flag: "🇸🇪" },
  { name: "هولندا", code: "+31", flag: "🇳🇱" },
  { name: "بلجيكا", code: "+32", flag: "🇧🇪" },
  { name: "النرويج", code: "+47", flag: "🇳🇴" },
  { name: "الدنمارك", code: "+45", flag: "🇩🇰" },
  { name: "سويسرا", code: "+41", flag: "🇨🇭" },
  { name: "كندا", code: "+1", flag: "🇨🇦" },
  { name: "الولايات المتحدة", code: "+1", flag: "🇺🇸" },
  { name: "أستراليا", code: "+61", flag: "🇦🇺" }
];


    countries
  .sort((a, b) => a.name.localeCompare(b.name, "ar"))
  .forEach(country => {
    const option = document.createElement("option");
    option.value = country.code;
    option.textContent = `${country.flag} ${country.name} ${country.code}`;
    document.getElementById("countryCode").appendChild(option);
  });

  }

});
