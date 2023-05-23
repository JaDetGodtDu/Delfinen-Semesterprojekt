"use strict";
import {
  memberAgeGroup,
  compSwimmer,
  subscriptionType,
  memberPrice,
  memberHasPayed,
  yearlyIncome,
  ageCalculator,
} from "./helpers.js";
import { updateMember } from "./rest-service.js";
import { getMembers, createMember, endpoint } from "./rest-service.js";

window.addEventListener("load", initApp);

function initApp() {
  updateKassérTable();
  document
    .querySelector("#kassér-select-filter-by")
    .addEventListener("change", filterByChanged);
}

async function updateKassérTable() {
  let members = await getMembers();
  kassérShowMembers(members);
}
function kassérShowMembers(members) {
  document.querySelector("#kassér-table-body").innerHTML = "";
  document.querySelector("#yearly-earnings").innerHTML = `${yearlyIncome(
    members
  )}kr`;
  for (const member of members) {
    showKassérTable(member);
    memberHasPayed(member, `member-${member.id}`);
  }
}
function showKassérTable(member) {
  const memberId = `member-${member.id}`;
  const kassérHTML = /*html*/ `
          <tr>
            <td style="color:blue" class="name">
              <u>${member.firstName} ${member.lastName}</u>
            </td>
            <td class="email">${member.email}</td>
            <td class="phone">${member.phone}</td>
            <td class="age">${memberAgeGroup(member)}</td>
            <td class="member-status">${subscriptionType(member)}</td>
            <td id="${memberId}" class="payment"> ${memberPrice(member)}kr</td>
          </tr>
    `;
  document
    .querySelector("#kassér-table-body")
    .insertAdjacentHTML("beforeend", kassérHTML);

  const rows = document.querySelectorAll("#kassér-table-body tr");
  const lastRow = rows[rows.length - 1];

  lastRow.addEventListener("click", () => kassérDetailView(member));
}

function searchMembersKassér() {
  let searchInput = document.getElementById("input-search-kassér");
  let table = document.getElementById("kassér-table-body");

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
  const filterValue = document.querySelector("#kassér-select-filter-by").value;
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
  kassérShowMembers(results);
}
function kassérDetailView(member) {
  const kassérDetailHTML = /*html*/ `
  <h3>${member.firstName} ${member.lastName}</h3><br>
  <p>Email: ${member.email}</p>
  <p>Telefon nr: ${member.phone}</p>
  <p>Addresse: ${member.address}</p>
  <p>Aldersgruppe: ${memberAgeGroup(member)}</p>
  <p>Medlemsskab: ${subscriptionType(member)}</p>
  <p>Årligt kontingent: ${memberPrice(member)}kr</p>
  <p>Betalingsstatus: </p>
  <label class="slider">
    <input type="checkbox" id="toggle" ${member.hasPayed ? "checked" : ""}>
    <div class="oval ${member.hasPayed ? "checked" : ""}">
      <div class="circle"></div>
    </div>
  </label>
  <br>
  <br>
  <br>
  <input type="button" button value="Opdater status" id="kassér-detail-view-update-btn">
  <input type="button" value="Tilbage"button id="kassér-detail-view-cancel-btn">
  `;
  document.querySelector("#kassér-detail-view").innerHTML = kassérDetailHTML;
  document.querySelector("#kassér-detail-view").showModal();
  document
    .querySelector("#kassér-detail-view-cancel-btn")
    .addEventListener("click", kassérViewCancel);
  document.getElementById("kassér-detail-view-update-btn");
  document.getElementById("toggle").addEventListener("change", handleToggle);
  document
    .querySelector("#kassér-detail-view-update-btn")
    .addEventListener("click", async () => {
      const toggle = document.querySelector("#toggle");
      const hasPayed = toggle.checked;
      member.hasPayed = hasPayed ? "true" : "false";
      const response = await updateMember(
        member.id,
        member.firstName,
        member.lastName,
        member.address,
        member.phone,
        member.email,
        member.compSwimmer,
        member.active,
        member.gender,
        member.dateOfBirth,
        member.hasPayed
      );
      if (response.ok) {
        console.log("Paymentstatus succesfully updated!");
        kassérViewCancel();
      } else {
        console.log("And error has occured!");
      }
    });

  function handleToggle() {
    if (toggle.checked) {
      console.log("Knappen er aktiveret");
    } else {
      console.log("Knappen er deaktiveret");
    }
  }
}
function kassérViewCancel() {
  location.reload();
  document.querySelector("#kassér-detail-view").close();
}

export { kassérShowMembers, searchMembersKassér };
