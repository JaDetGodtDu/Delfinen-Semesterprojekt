"use strict";

import { memberAgegroup, compSwimmer, subscriptionType } from "./helpers.js";

function showMembers(members) {
  for (const member of members) {
    showTable(member);
  }
}
function showTable(member) {
  const html = /*html*/ `
    <tr>
      <td>${member.firstName} ${member.lastName}</td>
      <td>${memberAgegroup(member)}</td>
      <td>${compSwimmer(member)}</td>
      <td>${member.email}</td>
      <td>${member.phone}</td>
      <td>${subscriptionType(member)}</td>
    </tr>
    `;
  document
    .querySelector("#formand-table-body")
    .insertAdjacentHTML("beforeend", html); // append html to the DOM - section#posts
}
function showCreateMemberDialog() {
  document.querySelector("#create-member-dialog").showModal();
}

export { showMembers, showCreateMemberDialog };
