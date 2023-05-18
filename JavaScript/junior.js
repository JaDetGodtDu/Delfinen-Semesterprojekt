"use strict";
import { getMembers, getResults } from "./rest-service.js";
import {
  convertTime,
  ageCalculator,
  competitionTypeChange,
} from "./helpers.js";
window.addEventListener("load", initApp);

function initApp() {
  updateJuniorTable();
  document
    .querySelector("#junior-create-new-time-btn")
    .addEventListener("click", juniorShowCreateResultDialog);
  document
    .querySelector("#type")
    .addEventListener("change", (event) => competitionTypeChange(event));
  document
    .querySelector("#junior-create-result-dialog .btn-cancel")
    .addEventListener("click", formCreateResultCancelClicked);
}
let members = [];

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
    .addEventListener("submit", prepareNewResultData);
}
function formCreateResultCancelClicked() {
  document.querySelector("#junior-create-result-dialog").close();
}
async function prepareNewResultData() {
  const swimmerName = document.querySelector("#swimmerName").value;
  const discipline = document.querySelector("#discipline").value;
  const time = document.querySelector("#time").value;
  const date = document.querySelector("#date").value;
  const type = document.querySelector("#type").value;
  const competitionName = document.querySelector("#competitionName").value;
  const placement = document.querySelector("#placement").value;
  const response = await createResult(
    swimmerName,
    discipline,
    time,
    date,
    type,
    competitionName,
    placement
  );
  if (response.ok) {
    updateSeniorTable();
    document.querySelector("#create-result-dialog").close();
    document.querySelector("#create-result-form").reset();
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
