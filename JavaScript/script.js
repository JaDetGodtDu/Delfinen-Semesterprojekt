"use strict";

import {
  getMembers,
  getResults,
  createMember,
  createResult,
} from "./rest-service.js";
window.addEventListener("load", initApp);

function initApp() {
  getMembers();
  console.log(getMembers());
  console.log(getResults());
}
