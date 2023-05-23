"use strict";
import { getMembers, getResults, createResult } from "./rest-service.js";
import { ageCalculator, juniorCompetitionTypeChange, convertTime } from "./helpers.js";
window.addEventListener("load", initApp);
let members = [];
let results = [];

function initApp() {
  updateJuniorTable();
  document.querySelector("#junior-create-new-time-btn").addEventListener("click", juniorShowCreateResultDialog);
  document.querySelector("#junior-type").addEventListener("change", (event) => juniorCompetitionTypeChange(event));
  document.querySelector("#junior-create-result-dialog .btn-cancel").addEventListener("click", formCreateResultCancelClicked);
  document.querySelector("#junior-select-filter-by").addEventListener("change", () => filterByChanged(results));
}

async function updateJuniorTable() {
  members = await getMembers();
  results = await getResults();
  for (const result of results) {
    const member = members.find((member) => member.id == result.memberId);
    result.member = member;
  }
  juniorShowMembers(results);
}
function juniorShowMembers(results) {
  document.querySelector("#junior-table-body").innerHTML = "";

  for (const result of results) {
    showJuniorTable(result);
  }
}

function showJuniorTable(result) {
  let age = ageCalculator(result.member);
  if (age < 18) {
    const juniorHTML = /*html*/ `
    <tr>
      <td style="color: blue; cursor: pointer" class="name">${result.member.firstName} ${result.member.lastName}</td>
      <td class="discipline">${result.discipline}</td>
      <td class="trainTime">${result.type === "Træning" ? convertTime(result.time) : ""}</td>
      <td class="compTime">${result.type === "Konkurrence" ? convertTime(result.time) : ""}</td>
    </tr>
  `;

    document.querySelector("#junior-table-body").insertAdjacentHTML("beforeend", juniorHTML);
    const rows = document.querySelectorAll("#junior-table-body tr");
    const lastRow = rows[rows.length - 1];
    lastRow.addEventListener("click", () => memberClicked(result));
  }
}
function memberClicked(result) {
  const member = members.find((member) => member.id == result.memberId);
  let memberInfo = /*html*/ `
  <h3>${member.firstName} ${member.lastName}</h3><br>
  <h4>Træninger</h4>
  <p>Dato: ${result.date}</p>
  <p>Tid: ${result.type === "Træning" ? convertTime(result.time) : ""}</p>
  <p>Disciplin: ${result.discipline}</p>
  <h4>Konkurrencer</h4>
  <p>Dato: ${result.date}</p>
  <p>Tid: ${result.type === "Konkurrence" ? convertTime(result.time) : ""}</p>
  <p>Disciplin: ${result.discipline}</p>
`;
  document.querySelector("#member-detail-view").innerHTML = memberInfo;
  document.querySelector("#member-detail-view").showModal();
}
function juniorShowCreateResultDialog() {
  document.querySelector("#junior-create-result-dialog").showModal();
  const swimmerSelect = document.querySelector("#junior-swimmer-name");
  let optionsHTML = "";
  members.forEach((member, index) => {
    let age = ageCalculator(member);
    if (age < 18) {
      optionsHTML += `<option value="junior-swimmer-name${index + 1}">${member.firstName} ${member.lastName}</option>`;
    }
  });
  swimmerSelect.innerHTML = optionsHTML;
  document.querySelector("#junior-create-result-dialog").addEventListener("submit", (event) => prepareNewResultData(event, swimmerSelect));
}
function formCreateResultCancelClicked() {
  document.querySelector("#junior-create-result-dialog").close();
}
async function prepareNewResultData(event, swimmerSelect) {
  event.preventDefault();
  const selectedSwimmerId = swimmerSelect.value;
  const swimmerId = selectedSwimmerId.match(/\d+/)[0];
  const selectedMember = members[swimmerId - 1];
  const memberId = selectedMember.id;
  const discipline = document.querySelector("#junior-discipline").value;
  const timeString = document.querySelector("#junior-time").value;
  const timeParts = timeString.split(":");
  const minutes = parseInt(timeParts[0]);
  const seconds = parseInt(timeParts[1]);
  const milliseconds = parseInt(timeParts[2]);
  const time = minutes * 60 * 1000 + seconds * 1000 + milliseconds;
  const date = document.querySelector("#junior-date").value;
  console.log(date);
  const type = document.querySelector("#junior-type").value;
  const competitionName = document.querySelector("#competition-name").value;
  const placement = type === "Konkurrence" ? document.querySelector("#placement").value : "";
  const response = await createResult(memberId, discipline, time, date, type, competitionName, placement);
  if (response.ok) {
    updateJuniorTable();
    document.querySelector("#junior-create-result-dialog").close();
    document.querySelector("#junior-create-result-form").reset();
    location.reload();
  }
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

function filterByChanged(results) {
  const filterValue = document.querySelector("#junior-select-filter-by").value;
  let topFiveResults = [];
  if (filterValue === "showAll") {
    topFiveResults = results.filter((result) => ageCalculator(result.member) < 18);
  } else {
    const filterResults = results.filter((result) => result.discipline === filterValue && ageCalculator(result.member) < 18);
    const sortedResults = filterResults.sort((a, b) => a.time - b.time);
    topFiveResults = sortedResults.slice(0, 5);
  }
  juniorShowMembers(topFiveResults);
}

export { juniorShowMembers, searchMembersJunior };
