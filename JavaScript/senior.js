"use strict";
import { getMembers, getResults, createResult } from "./rest-service.js";
import {
  ageCalculator,
  competitionTypeChange,
  filterMembersByAge,
} from "./helpers.js";
window.addEventListener("load", initApp);
let members = [];

function initApp() {
  updateSeniorTable();
  document
    .querySelector("#senior-select-filter-by")
    .addEventListener("change", filterByChanged);
  document
    .querySelector("#create-new-time-btn")
    .addEventListener("click", showCreateResultDialog);
  document
    .querySelector("#type")
    .addEventListener("change", (event) => competitionTypeChange(event));
}

async function updateSeniorTable() {
  members = await getMembers();
  let results = await getResults();
  seniorShowMembers(results);
}
function seniorShowMembers(results) {
  document.querySelector("#senior-table-body").innerHTML = "";

  for (const result of results) {
    showSeniorTable(result);
  }
}

async function showSeniorTable(result) {
  const member = members.find((member) => member.id == result.memberId);
  let age = ageCalculator(member);
  if (age >= 18) {
    const seniorHTML = /*html*/ `
    <tr>
      <td class="name">${member.firstName} ${member.lastName}</td>
      <td class="discipline">${result.discipline}</td>
      <td class="trainTime">${
        result.type === "Træning" ? convertTime(result.time) : ""
      }</td>
      <td class="compTime">${
        result.type === "Konkurrence" ? convertTime(result.time) : ""
      }</td>
    </tr>
  `;

    document
      .querySelector("#senior-table-body")
      .insertAdjacentHTML("beforeend", seniorHTML);
  }
}

function convertTime(timeInMillis) {
  const minutes = Math.floor(timeInMillis / 60000);
  const seconds = Math.floor((timeInMillis % 60000) / 1000);
  const milliseconds = timeInMillis % 1000;
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}:${milliseconds.toString().padStart(3, "0")}`;
}
function showCreateResultDialog() {
  document.querySelector("#create-result-dialog").showModal();

  document
    .querySelector("#create-member-form")
    .addEventListener("submit", prepareNewResultData);
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
async function filterByChanged() {
  const filterValue = document.querySelector("#senior-select-filter-by").value;
  const members = await getMembers();

  let results = [];
  if (filterValue === "junior") {
    results = members.filter((member) => ageCalculator(member) < 18);
  } else if (filterValue === "senior") {
    results = members.filter((member) => ageCalculator(member) >= 18);
  } else if (filterValue.startsWith("!")) {
    results = members.filter(
      (member) => member[filterValue.substring(1)] === "false"
    );
  } else if (filterValue === "showAll") {
    results = members;
  } else {
    results = members.filter((member) => member[filterValue] === "true");
  }
  seniorShowMembers(results);
}
export { seniorShowMembers, searchMembersSenior };
