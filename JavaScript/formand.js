"use strict";

import { memberAgegroup, compSwimmer, subscriptionType } from "./helpers.js";
import { getMembers, createMember } from "./rest-service.js";

async function updateMemberTable() {
  let members = await getMembers();
  showMembers(members);
}

function showMembers(members) {
  document.querySelector("#formand-table-body").innerHTML = "";
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
  document.querySelector("#formand-table-body").insertAdjacentHTML("beforeend", html); // append html to the DOM - section#posts
}
function showCreateMemberDialog() {
  document.querySelector("#create-member-dialog").showModal();
  document.querySelector("#create-member-form").addEventListener("submit", prepareNewMemberData);
}

async function prepareNewMemberData() {
  const firstName = document.querySelector("#firstName").value;
  const lastName = document.querySelector("#lastName").value;
  const address = document.querySelector("#address").value;
  const phone = document.querySelector("#phone").value;
  const email = document.querySelector("#email").value;
  const dateOfBirth = document.querySelector("#dateOfBirth").value;
  const gender = document.querySelector("#gender").value;
  const active = document.querySelector("#active").value;
  const compSwimmer = document.querySelector("#compSwimmer").value;
  const response = await createMember(firstName, lastName, address, phone, email, dateOfBirth, gender, active, compSwimmer);
  if (response.ok) {
    updateMemberTable();
    document.querySelector("#create-member-dialog").close();
  }
}
export { showMembers, showCreateMemberDialog };
