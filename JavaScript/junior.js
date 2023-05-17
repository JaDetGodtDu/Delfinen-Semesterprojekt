"use strict";

import { memberAgeGroup, compSwimmer, subscriptionType, memberGender, ageCalculator } from "./helpers";
import { getMember, updateMember, getResults, updateResult, getMembers } from "./rest-service";
import { showMembers, updateMemberTable } from "./senior";

window.addEventListener("load", initJunior);

function initJunior() {
  updateJuniorTable();
  document.querySelector("#form-update-results").addEventListener("submit", updateResultClicked);
  document.querySelector("#form-update-results .btn-cancel").addEventListener("click", updateResultClicked);
}

async function updateJuniorTable() {
  let members = await getMembers();
  showMembers();
}

function showJuniorTable(member, result) {
  const html = /*html*/ `
    <tr>
    <td style="color:blue"><u>${member.firstname} ${member.lastName}</u></td>
    <td>${}</td>
    <td>${}</td>
    <td>${}</td>
    </tr>
    `;
    document.querySelector("#junior-table-body").insertAdjacentHTML("beforeend", html);
const rows = document.querySelectorAll("#junior-table-body tr");
const lastRow = rows[rows.length - 1];
lastRow.addEventListener("click", () => memberClicked(member));
}

function memberClicked(member){
    let memberInfo = /*html*/`
    <h3>${member.firstName} ${member.lastName}</h3>
    <p>Navn: ${member.firstName} ${member.lastName}</p>
    <p>Disciplin: ${}</p>
    <p>Bedste træningstid: ${}</p>
    <p>Sidste Konkurrence tid: ${}</p>
  <input type="button" value="Opdater tid" button id="update-results-btn">
  <input type="button" value="Tilbage" button id="junior-clicked-cancel-btn">
    `
}

function searchMembersJunior() {
  let searchInput = document.getElementById("input-search-junior");
  let table = document.getElementById("junior-table-body");

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
export { showMembers, searchMembersJunior };
