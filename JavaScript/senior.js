"use strict";
import { getMembers } from "./rest-service.js";

async function updateSeniorTable() {
  let members = await getMembers();
  seniorShowMembers(members);
}
function seniorShowMembers(members) {
  document.querySelector("#senior-table-body").innerHTML = "";
  for (const member of members) {
    showSeniorTable(member);
  }
}

function showSeniorTable(member) {
  const seniorHTML = /*html*/ `
          <tr>
            <td class="name">${member.firstName} ${member.lastName}</td>

          </tr>
    `;
  document.querySelector("#senior-table-body").insertAdjacentHTML("beforeend", seniorHTML);
}
export { seniorShowMembers };
