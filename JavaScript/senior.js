"use strict";
import { getMembers, getResults, createResult } from "./rest-service.js";
import { ageCalculator, seniorCompetitionTypeChange, convertTime } from "./helpers.js";
window.addEventListener("load", initApp);
let members = [];

function initApp() {
  updateSeniorTable();
  document.querySelector("#senior-select-filter-by").addEventListener("change", filterByChanged);
  document.querySelector("#senior-create-new-time-btn").addEventListener("click", seniorShowCreateResultDialog);
  document.querySelector("#senior-type").addEventListener("change", (event) => seniorCompetitionTypeChange(event));
  document.querySelector("#senior-create-result-dialog .btn-cancel").addEventListener("click", formCreateResultCancelClicked);
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

function showSeniorTable(result) {
  const member = members.find((member) => member.id == result.memberId);
  let age = ageCalculator(member);
  if (age >= 18) {
    const seniorHTML = /*html*/ `
    <tr>
      <td class="name">${member.firstName} ${member.lastName}</td>
      <td class="discipline">${result.discipline}</td>
      <td class="trainTime">${result.type === "Træning" ? convertTime(result.time) : ""}</td>
      <td class="compTime">${result.type === "Konkurrence" ? convertTime(result.time) : ""}</td>
    </tr>
  `;

    document.querySelector("#senior-table-body").insertAdjacentHTML("beforeend", seniorHTML);
  }
}

function seniorShowCreateResultDialog() {
  document.querySelector("#senior-create-result-dialog").showModal();
  const swimmerSelect = document.querySelector("#senior-swimmer-name");
  let optionsHTML = "";
  members.forEach((member, index) => {
    let age = ageCalculator(member);
    if (age >= 18) {
      optionsHTML += `<option value="senior-swimmer-name${index + 1}">${member.firstName} ${member.lastName}</option>`;
    }
  });
  swimmerSelect.innerHTML = optionsHTML;
  document.querySelector("#senior-create-result-dialog").addEventListener("submit", (event) => prepareNewResultData(event, swimmerSelect));
}
function formCreateResultCancelClicked() {
  document.querySelector("#senior-create-result-dialog").close();
}
async function prepareNewResultData(event, swimmerSelect) {
  event.preventDefault();
  const selectedSwimmerId = swimmerSelect.value;
  const swimmerId = selectedSwimmerId.match(/\d+/)[0];
  const selectedMember = members[swimmerId - 1];
  const memberId = selectedMember.id;
  const discipline = document.querySelector("#discipline").value;
  const timeString = document.querySelector("#senior-time").value;
  const timeParts = timeString.split(":");
  const minutes = parseInt(timeParts[0]);
  const seconds = parseInt(timeParts[1]);
  const milliseconds = parseInt(timeParts[2]);
  const time = minutes * 60 * 1000 + seconds * 1000 + milliseconds;
  const date = document.querySelector("#senior-date").value;
  console.log(date);
  const type = document.querySelector("#senior-type").value;
  const competitionName = document.querySelector("#competition-name").value;
  const placement = type === "Konkurrence" ? document.querySelector("#placement").value : "";
  const response = await createResult(memberId, discipline, time, date, type, competitionName, placement);
  if (response.ok) {
    updateSeniorTable();
    document.querySelector("#senior-create-result-dialog").close();
    document.querySelector("#senior-create-result-form").reset();
    location.reload();
  }
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
    results = members.filter((member) => member[filterValue.substring(1)] === "false");
  } else if (filterValue === "showAll") {
    results = members;
  } else {
    results = members.filter((member) => member[filterValue] === "true");
  }
  seniorShowMembers(results);
}

function showTop5Senior(result) {
  {
    const member = members.find((member) => member.id == result.memberId);
    let age = ageCalculator(member);
    if (age >= 18) {
      const top5SeniorHTML = /*html*/ `
         <table>
            <tbody id="top-5-senior-body">
            <thead>
            <tr>
              <th class="clickable">Navn</th>
              <th class="clickable">Disciplin</th>
              <th class="clickable">Konkurrencetid</th>
            </tr>
          </thead>
    <tr>
      <td class="name">${member.firstName} ${member.lastName}</td>
      <td class="discipline">${result.discipline}</td>
      <td class="compTime">${result.type === "Konkurrence" ? convertTime(result.time) : ""}</td>
    </tr>
    </tbody>
          </table>
  `;
      document.querySelector("#top-5-senior").insertAdjacentHTML("beforeend", top5SeniorHTML);
    }
  }
}

export { seniorShowMembers, searchMembersSenior, showTop5Senior };
