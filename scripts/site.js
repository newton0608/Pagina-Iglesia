const toggle = document.querySelector("[data-nav-toggle]");
const menu = document.querySelector("[data-nav-menu]");

if (toggle && menu) {
  const closeMenu = () => {
    menu.classList.add("hidden");
    toggle.setAttribute("aria-expanded", "false");
  };

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    menu.classList.toggle("hidden", isOpen);
    toggle.setAttribute("aria-expanded", String(!isOpen));
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
}
