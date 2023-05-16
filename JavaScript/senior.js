"use strict";
import { getMembers } from "./rest-service.js";

async function updateMemberTable() {
  let members = await getMembers();
  showMembers(members);
}

function showMembers(members) {
  document.querySelector("#senior-table-body").innerHTML = "";
  for (const member of members) {
    showTable(member);
  }
}
function showTable(member, time) {
  const html = /*html*/ `
    <tr>
      <td>${member.firstName} ${member.lastName}</td>
      <td>${bestTraningTime(time)}</td>
      <td>${lastCompetisionTime(time)}</td>
    </tr>
    `;
  document.querySelector("#senior-table-body").insertAdjacentHTML("beforeend", html); // append html to the DOM - section#posts
}
export { showMembers, updateMemberTable };
