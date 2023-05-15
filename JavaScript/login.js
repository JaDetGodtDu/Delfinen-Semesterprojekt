"use strict";

import { showMembers } from "./formand.js";
import { getMembers, members } from "./rest-service.js";

window.addEventListener("load", initListeners);

function initListeners() {
  document
    .querySelector("#login-formand-btn")
    .addEventListener("click", showFormandView);
  document
    .querySelector("#login-kassér-btn")
    .addEventListener("click", showKassérView);
  document
    .querySelector("#login-senior-btn")
    .addEventListener("click", showSeniorView);
  document
    .querySelector("#login-junior-btn")
    .addEventListener("click", showJuniorView);
}
async function showFormandView() {
  console.log("show formand view");
  document.querySelector("#login-view").classList.add("hidden");
  document.querySelector("#formand-view").classList.remove("hidden");
  let members = await getMembers();
  showMembers(members);
}
function showKassérView() {
  console.log("show kassér view");
  document.querySelector("#login-view").classList.add("hidden");
  document.querySelector("#kassér-view").classList.remove("hidden");
}
function showSeniorView() {
  console.log("show senior view");
  document.querySelector("#login-view").classList.add("hidden");
  document.querySelector("#senior-view").classList.remove("hidden");
}
function showJuniorView() {
  console.log("show junior view");
  document.querySelector("#login-view").classList.add("hidden");
  document.querySelector("#junior-view").classList.remove("hidden");
}
