export function initMenu() {
  const header = document.querySelector("[data-header]");
  const burger = document.querySelector("[data-burger]");
  const mobileLinks = document.querySelectorAll("[data-mobile-link]");
  const navLinks = document.querySelectorAll("[data-nav-link]");
  const sections = [...document.querySelectorAll("[data-section]")];

  if (!header || !burger) return;

  const closeMenu = () => {
    header.classList.remove("is-open");
    document.body.classList.remove("is-locked");
    burger.setAttribute("aria-expanded", "false");
  };

  burger.addEventListener("click", () => {
    const open = header.classList.toggle("is-open");
    document.body.classList.toggle("is-locked", open);
    burger.setAttribute("aria-expanded", String(open));
  });

  mobileLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener(
    "scroll",
    () => {
      header.classList.toggle("is-scrolled", window.scrollY > 24);
    },
    { passive: true }
  );

  if (!sections.length || !navLinks.length) return;

  const spy = () => {
    const offset = window.scrollY + header.offsetHeight + 40;
    let current = sections[0]?.id;

    sections.forEach((section) => {
      if (section.offsetTop <= offset) {
        current = section.id;
      }
    });

    navLinks.forEach((link) => {
      const active = link.getAttribute("href") === `#${current}`;
      link.classList.toggle("is-active", active);
    });
  };

  window.addEventListener("scroll", spy, { passive: true });
  spy();
}
