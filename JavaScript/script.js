"use strict";
import { getMembers } from "./rest-service.js";
import { initViews } from "./view-spa.js";

window.addEventListener("load", initApp);
function initApp() {
  initViews();
  getMembers();
  console.log(getMembers());
}
