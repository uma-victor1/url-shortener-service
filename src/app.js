const Hamburger = document.querySelector(".hamburger");
const Nav = document.querySelector(".nav");
const hamburgerLine = document.querySelector(".hamburger-line");

let showMenu = false;

Hamburger.addEventListener("click", toggleMenu);

function toggleMenu() {
  if (!showMenu) {
    Hamburger.classList.toggle("change");
    Nav.classList.toggle("hidden");
    showMenu = true;
  } else {
    Hamburger.classList.toggle("change");
    Nav.classList.toggle("hidden");
    showMenu = false;
  }
}
