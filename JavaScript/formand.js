"use strict";

import { memberAgeGroup, compSwimmer, subscriptionType } from "./helpers.js";
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
      <td>${memberAgeGroup(member)}</td>
      <td>${compSwimmer(member)}</td>
      <td>${member.email}</td>
      <td>${member.phone}</td>
      <td>${subscriptionType(member)}</td>
    </tr>
    `;
  document.querySelector("#formand-table-body").insertAdjacentHTML("beforeend", html); // append html to the DOM - section#posts
  const rows = document.querySelectorAll("#formand-table-body tr");
  const lastRow = rows[rows.length - 1];
  lastRow.addEventListener("click", () => memberClicked(member));
}
function memberClicked(member) {
  let memberInfo = /*html*/ `
  <h3>${member.firstName} ${member.lastName}</h3><br>
  <p>${member.email}</p>
  <p>${member.phone}</p>
  <p>${member.address}</p>
  <p>${member.dateOfBirth}</p>
  <p>${memberAgeGroup(member)}</p>
  <p>${member.gender}</p>
  <p>${subscriptionType(member)}</p>
  <p>${compSwimmer(member)}</p>
  `;
  console.log("memberclicked");
  document.querySelector("#member-detail-view").innerHTML = memberInfo;
  document.querySelector("#member-detail-view").showModal();
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
    document.querySelector("#create-member-form").reset();
  }
}
export { showMembers, showCreateMemberDialog };
