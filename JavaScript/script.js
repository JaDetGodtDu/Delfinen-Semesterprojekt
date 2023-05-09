"use strict";
import { getMembers, getResults } from "./rest-service.js";
window.addEventListener("load", initApp);
function initApp() {
  getMembers();
  console.log(getMembers());
  console.log(getResults());
}
