"use strict";
import { getMembers, getResults } from "./rest-service.js";
import { memberAgeGroup, compSwimmer, ageCalculator } from "./helpers.js";
window.addEventListener("load", initApp);

let members = [];
function initApp() {
  updateJuniorTable();
  document.querySelector("#junior-select-filter-by").addEventListener("change", filterByChanged);
}

async function updateJuniorTable() {
  members = await getMembers();
  let results = await getResults();
  juniorShowMembers(results);
}
function juniorShowMembers(results) {
  document.querySelector("#junior-table-body").innerHTML = "";

  for (const result of results) {
    showJuniorTable(result);
  }
}

function showJuniorTable(result) {
  const member = members.find((member) => member.id == result.memberId);
  console.log(member.firstName);
  const juniorHTML = /*html*/ `
          <tr>
            <td class="name">${member?.firstName} ${member.lastName}</td>
            <td class="discipline">${result.discipline}</td>
            <td class="trainTime">${result.time}</td>
            <td class="comp Time">${result.discipline}</td>
          </tr>
    `;
  document.querySelector("#junior-table-body").insertAdjacentHTML("beforeend", juniorHTML);
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

async function filterByChanged() {
  const filterValue = document.querySelector("#junior-select-filter-by").value;
  const members = await getMembers();
  console.log(members);

  let results = [];
  if (filterValue.startsWith("!")) {
    results = members.filter((member) => member[filterValue.substring(1)] === "false");
  } else if (filterValue === "showAll") {
    results = members;
  } else {
    results = members.filter((member) => member[filterValue] === "true");
  }
  console.log(results);
  juniorShowMembers(results);
}
export { juniorShowMembers, searchMembersJunior };
