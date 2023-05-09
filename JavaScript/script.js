"use strict";
import { getMembers } from "./rest-service.js";
window.addEventListener("load", initApp);
function initApp() {
  getMembers();
  console.log(getMembers());
}
