"use strict";
import {
  getMembers,
  getResults,
  createMember,
  createResult,
} from "./rest-service.js";
window.addEventListener("load", initApp);
function initApp() {
  initViews();
  getMembers();
  console.log(getMembers());
  console.log(getResults());
}
