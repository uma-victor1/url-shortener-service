"use strict";

var Hamburger = document.querySelector(".hamburger");
var Nav = document.querySelector(".nav");
var hamburgerLine = document.querySelector(".hamburger-line");

var showMenu = false;

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
