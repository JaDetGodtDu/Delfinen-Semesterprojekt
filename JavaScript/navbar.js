"use strict";
import { showFormandView } from "./login.js";

window.addEventListener("load", initNavbar);

function initNavbar() {
  console.log("navbar listeners");
  document
    .querySelector("#formand-return-btn")
    .addEventListener("click", showFormandView);
  document
    .querySelector("#kontakt-btn")
    .addEventListener("click", showContactInfo);
  document.querySelector("#log-out-btn").addEventListener("click", backToStart);
}

function showContactInfo() {
  console.log("kontakt info");
  document.querySelector(".view").classList.add("hidden");
  document.querySelector("#kontaktinformation").classList.remove("hidden");
  document.querySelector("#log-out-btn").addEventListener("click", backToStart);
}
function backToStart() {
  console.log("back to start");
  document.querySelector(".view").classList.add("hidden");
  document.querySelector("#login-view").classList.remove("hidden");
}
