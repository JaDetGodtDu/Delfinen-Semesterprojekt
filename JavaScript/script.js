"use strict";

import { showCreateMemberDialog } from "./formand.js";

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

  document
    .querySelector("#create-new-member-btn")
    .addEventListener("click", showCreateMemberDialog);
}
