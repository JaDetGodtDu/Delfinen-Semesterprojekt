"use strict";
import { getMembers, getResults } from "./rest-service.js";
updateSeniorTable();

let members = [];

async function updateSeniorTable() {
  members = await getMembers();
  let results = await getResults();
  seniorShowMembers(results);
}
function seniorShowMembers(results) {
  document.querySelector("#senior-table-body").innerHTML = "";

  for (const result of results) {
    showSeniorTable(result);
    console.log(result);
  }
}

function showSeniorTable(result) {
  const member = members.find((member) => member.id == result.memberId);
  console.log(result);

  const seniorHTML = /*html*/ `
          <tr>
            <td class="name">${member?.firstName}</td>
            <td class="disciplin">${result.discipline}</td>
            <td class="disciplin">${result.discipline}</td>
            <td class="disciplin">${result.discipline}</td>
          </tr>
    `;
  document.querySelector("#senior-table-body").insertAdjacentHTML("beforeend", seniorHTML);
}
export { seniorShowMembers };
