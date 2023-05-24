"use strict";

import { searchMembersFormand } from "./formand.js";
import { searchMembersKassér } from "./kassér.js";
import { searchMembersSenior } from "./senior.js";
import { searchMembersJunior } from "./junior.js";
import { getMembers } from "./rest-service.js";
window.addEventListener("load", initApp);

function initApp() {
  getMembers();
  document
    .querySelector("#input-search-kassér")
    .addEventListener("keydown", searchMembersKassér);
  document
    .querySelector("#input-search-formand")
    .addEventListener("keydown", searchMembersFormand);
  document
    .querySelector("#input-search-senior")
    .addEventListener("keydown", searchMembersSenior);
  document
    .querySelector("#input-search-junior")
    .addEventListener("keydown", searchMembersJunior);
}
