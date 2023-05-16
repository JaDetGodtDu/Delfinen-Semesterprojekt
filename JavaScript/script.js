"use strict";

import { showCreateMemberDialog } from "./formand.js";
import { searchMembersKassér } from "./kassér.js";
import { getMembers, getResults, createMember, createResult } from "./rest-service.js";
window.addEventListener("load", initApp);

function initApp() {
  getMembers();
  console.log(getMembers());
  console.log(getResults());
  document.querySelector("#input-search-kassér").addEventListener("keydown", searchMembersKassér);
  document.querySelector("#create-new-member-btn").addEventListener("click", showCreateMemberDialog);
}
