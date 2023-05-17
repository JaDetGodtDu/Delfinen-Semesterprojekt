"use strict";
import { getMembers, getResults } from "./rest-service.js";
window.addEventListener("load", initApp);

function initApp() {
  updateSeniorTable();
}
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
            <td class="disciplin">${result.time}</td>
            <td class="disciplin">${result.discipline}</td>
          </tr>
    `;
  document.querySelector("#senior-table-body").insertAdjacentHTML("beforeend", seniorHTML);
}

function searchMembersSenior() {
  let searchInput = document.getElementById("input-search-senior");
  let table = document.getElementById("senior-table-body");

  // Add an event listener to the input field
  searchInput.addEventListener("input", function () {
    let filter = searchInput.value.toUpperCase();
    let rows = table.getElementsByTagName("tr");

    // Loop through the table rows and hide those that don't match the filter
    for (let i = 0; i < rows.length; i++) {
      let cells = rows[i].getElementsByTagName("td");
      let shouldHide = true;

      // Loop through the cells of each row
      for (let j = 0; j < cells.length; j++) {
        let cell = cells[j];
        if (cell) {
          let cellText = cell.textContent || cell.innerText;
          if (cellText.toUpperCase().indexOf(filter) > -1) {
            shouldHide = false;
            break;
          }
        }
      }

      // Toggle the display property based on the filter condition
      rows[i].style.display = shouldHide ? "none" : "";
    }
  });
}
export { seniorShowMembers, searchMembersSenior };
