"use strict";
import { getMembers, getResults, createResult } from "./rest-service.js";
import {
  convertTime,
  ageCalculator,
  juniorCompetitionTypeChange,
} from "./helpers.js";
window.addEventListener("load", initApp);
let members = [];
let swimmerSelect;

function initApp() {
  updateJuniorTable();
  document
    .querySelector("#junior-create-new-time-btn")
    .addEventListener("click", juniorShowCreateResultDialog);
  document
    .querySelector("#junior-type")
    .addEventListener("change", (event) => juniorCompetitionTypeChange(event));
  document
    .querySelector("#junior-create-result-dialog .btn-cancel")
    .addEventListener("click", formCreateResultCancelClicked);
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
  let age = ageCalculator(member);
  if (age < 18) {
    const juniorHTML = /*html*/ `
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
      .querySelector("#junior-table-body")
      .insertAdjacentHTML("beforeend", juniorHTML);
  }
}
function juniorShowCreateResultDialog() {
  document.querySelector("#junior-create-result-dialog").showModal();
  const swimmerSelect = document.querySelector("#junior-swimmer-name");
  let optionsHTML = "";
  members.forEach((member, index) => {
    let age = ageCalculator(member);
    if (age < 18) {
      optionsHTML += `<option value="junior-swimmer-name${index + 1}">${
        member.firstName
      } ${member.lastName}</option>`;
    }
  });
  swimmerSelect.innerHTML = optionsHTML;
  document
    .querySelector("#junior-create-result-dialog")
    .addEventListener("submit", (event) =>
      prepareNewResultData(event, swimmerSelect)
    );
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
  const discipline = document.querySelector("#discipline").value;
  const time = document.querySelector("#time").value;
  const date = document.querySelector("#date").value;
  const type = document.querySelector("#type").value;
  const competitionName = document.querySelector("#competition-name").value;
  const placement = document.querySelector("#placement").value;
  const response = await createResult(
    memberId,
    discipline,
    time,
    date,
    type,
    competitionName,
    placement
  );
  if (response.ok) {
    updateJuniorTable();
    document.querySelector("#junior-create-result-dialog").close();
    document.querySelector("#junior-create-result-form").reset();
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
export { juniorShowMembers, searchMembersJunior };
