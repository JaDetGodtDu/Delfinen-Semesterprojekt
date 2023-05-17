"use strict";

import { showMembers } from "./formand.js";
import { getMembers, getResults } from "./rest-service.js";
import { kassérShowMembers } from "./kassér.js";
import { seniorShowMembers } from "./senior.js";

window.addEventListener("load", initListeners);

function initListeners() {
  document.querySelector("#login-formand-btn").addEventListener("click", showFormandView);
  document.querySelector("#login-kassér-btn").addEventListener("click", showKassérView);
  document.querySelector("#login-senior-btn").addEventListener("click", showSeniorView);
  document.querySelector("#login-junior-btn").addEventListener("click", showJuniorView);
}
async function showFormandView() {
  console.log("show formand view");
  document.querySelector("#login-view").classList.add("hidden");
  document.querySelector("#formand-view").classList.remove("hidden");
  let members = await getMembers();
  showMembers(members);
}
async function showKassérView() {
  console.log("show kassér view");
  document.querySelector("#login-view").classList.add("hidden");
  document.querySelector("#kassér-view").classList.remove("hidden");
  let members = await getMembers();
  kassérShowMembers(members);
}
async function showSeniorView() {
  console.log("show senior view");
  document.querySelector("#login-view").classList.add("hidden");
  document.querySelector("#senior-view").classList.remove("hidden");
  let results = await getResults();
  seniorShowMembers(results);
}
function showJuniorView() {
  console.log("show junior view");
  document.querySelector("#login-view").classList.add("hidden");
  document.querySelector("#junior-view").classList.remove("hidden");
}
