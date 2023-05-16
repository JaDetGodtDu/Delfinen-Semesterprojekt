"use strict";
import { memberAgeGroup, compSwimmer, subscriptionType } from "./helpers.js";
import { getMembers, createMember } from "./rest-service.js";

async function updateKassérTable() {
  let members = await getMembers();
  kassérShowMembers(members);
}
function kassérShowMembers(members) {
  document.querySelector("#kassér-table-body").innerHTML = "";
  for (const member of members) {
    showKassérTable(member);
  }
}
function showKassérTable(member) {
  const kassérHTML = /*html*/ `
          <tr>
            <td class="name">${member.firstName} ${member.lastName}</td>
            <td class="email">${member.email}</td>
            <td class="phone">${member.phone}</td>
            <td class="age">${memberAgeGroup(member)}</td>
            <td class="member-status">${subscriptionType(member)}</td>
            <td class="payment"> kr</td>
          </tr>
    `;
  document.querySelector("#kassér-table-body").insertAdjacentHTML("beforeend", kassérHTML);
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

// Attach the search function to the search button

export { kassérShowMembers, searchMembersKassér };
