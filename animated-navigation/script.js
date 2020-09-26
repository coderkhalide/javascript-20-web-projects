const menuBars = document.getElementById("menu-bars");
const overlay = document.getElementById("overlay");
const nav1 = document.getElementById("nav-1");
const nav2 = document.getElementById("nav-2");
const nav3 = document.getElementById("nav-3");
const nav4 = document.getElementById("nav-4");
const nav5 = document.getElementById("nav-5");
const navItems = [nav1, nav2, nav3, nav4, nav5];

const animateNav = (beforeDirection, afterDirection) => {
  navItems.forEach((nav, index) => {
    nav.classList.replace(
      `slide-${beforeDirection}-${index + 1}`,
      `slide-${afterDirection}-${index + 1}`
    );
  });
};

const toggleNav = () => {
  menuBars.classList.toggle("change");
  overlay.classList.toggle("overlay-active");
  if (overlay.classList.contains("overlay-active")) {
    overlay.classList.replace("overlay-slide-left", "overlay-slide-right");
    animateNav("out", "in");
  } else {
    overlay.classList.replace("overlay-slide-right", "overlay-slide-left");
    animateNav("in", "out");
  }
};

menuBars.addEventListener("click", toggleNav);
for (const nav of navItems) {
  nav.addEventListener("click", toggleNav);
}
