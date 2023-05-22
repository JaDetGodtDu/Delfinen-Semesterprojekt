"use strict";

import {
  memberAgeGroup,
  compSwimmer,
  subscriptionType,
  memberGender,
  ageCalculator,
} from "./helpers.js";
import {
  getMembers,
  createMember,
  deleteMember,
  updateMember,
} from "./rest-service.js";

window.addEventListener("load", initApp);

function initApp() {
  updateMemberTable();
  document
    .querySelector("#form-delete-member")
    .addEventListener("submit", deleteMemberClicked);
  document
    .querySelector("#form-delete-member .btn-cancel")
    .addEventListener("click", deleteCancelClicked);
  document
    .querySelector("#form-update-member")
    .addEventListener("submit", updateMemberClicked);
  document
    .querySelector("#form-update-member .btn-cancel")
    .addEventListener("click", updateCancelClicked);
  document
    .querySelector("#formand-select-filter-by")
    .addEventListener("change", filterByChanged);
  document
    .querySelector("#create-new-member-btn")
    .addEventListener("click", showCreateMemberDialog);
}
async function updateMemberTable() {
  let members = await getMembers();
  showMembers(members);
}
function showMembers(members) {
  document.querySelector("#formand-table-body").innerHTML = "";
  for (const member of members) {
    showTable(member);
  }
}
function showTable(member) {
  const html = /*html*/ `
    <tr>
      <td style="color:blue" class="name"><u>${member.firstName} ${member.lastName}</u></td>
      <td>${memberAgeGroup(member)}</td>
      <td>${compSwimmer(member)}</td>
      <td>${member.email}</td>
      <td>${member.phone}</td>
      <td>${subscriptionType(member)}</td>
    </tr>
    `;
  document
    .querySelector("#formand-table-body")
    .insertAdjacentHTML("beforeend", html); // append html to the DOM - section#posts
  const rows = document.querySelectorAll("#formand-table-body tr");
  const lastRow = rows[rows.length - 1];
  lastRow.addEventListener("click", () => memberClicked(member));
}
function memberClicked(member) {
  let memberInfo = /*html*/ `
  <h3>${member.firstName} ${member.lastName}</h3><br>
  <p>Email: ${member.email}</p>
  <p>Telefon nr: ${member.phone}</p>
  <p>Addresse: ${member.address}</p>
  <p>Fødselsdato: ${member.dateOfBirth}</p>
  <p>Aldersgruppe: ${memberAgeGroup(member)}</p>
  <p>Køn: ${memberGender(member)}</p>
  <p>Medlemsskab: ${subscriptionType(member)}</p>
  <p>Hold: ${compSwimmer(member)}</p>
  <input type="button" value="Opdater medlem" button id="update-member-btn">
  <input type="button" value="Slet medlem" button id="delete-member-btn">
  <input type="button" value="Tilbage" button id="member-clicked-cancel-btn">
 
  `;
  document.querySelector("#member-detail-view").innerHTML = memberInfo;
  document.querySelector("#member-detail-view").showModal();
  document
    .querySelector("#delete-member-btn")
    .addEventListener("click", () => deleteClicked(member));
  document
    .querySelector("#update-member-btn")
    .addEventListener("click", () => updateClicked(member));
  document
    .querySelector("#member-clicked-cancel-btn")
    .addEventListener("click", memberClickedCancel);
}
function memberClickedCancel() {
  document.querySelector("#member-detail-view").close();
}
function showCreateMemberDialog() {
  document.querySelector("#create-member-dialog").showModal();
  document
    .querySelector("#create-member-form")
    .addEventListener("submit", prepareNewMemberData);
}
function deleteClicked(memberObject) {
  document.querySelector("#dialog-delete-member-name").textContent =
    memberObject.firstName + " " + memberObject.lastName;
  document
    .querySelector("#form-delete-member")
    .setAttribute("data-id", memberObject.id);
  document.querySelector("#dialog-delete-member").showModal();
}
async function deleteMemberClicked(event) {
  console.log("delete member clicked");
  const id = event.target.getAttribute("data-id");
  const response = await deleteMember(id);
  document.querySelector("#dialog-delete-member").close();
  document.querySelector("#member-detail-view").close();
  if (response.ok) {
    updateMemberTable();
  }
}
function deleteCancelClicked() {
  document.querySelector("#dialog-delete-member").close();
}
function updateCancelClicked() {
  document.querySelector("#dialog-update-member").close();
}
function updateClicked(memberObject) {
  const updateForm = document.querySelector("#form-update-member");
  updateForm.firstName.value = memberObject.firstName;
  updateForm.lastName.value = memberObject.lastName;
  updateForm.address.value = memberObject.address;
  updateForm.phone.value = memberObject.phone;
  updateForm.email.value = memberObject.email;
  updateForm.dateOfBirth.value = memberObject.dateOfBirth;
  updateForm.gender.value = memberObject.gender;
  updateForm.active.value = memberObject.active;
  updateForm.compSwimmer.value = memberObject.compSwimmer;
  updateForm.setAttribute("data-id", memberObject.id);
  document.querySelector("#dialog-update-member").showModal();
}
async function updateMemberClicked(event) {
  const form = event.target;
  const firstName = form.firstName.value;
  const lastName = form.lastName.value;
  const address = form.address.value;
  const phone = form.phone.value;
  const email = form.email.value;
  const dateOfBirth = form.dateOfBirth.value;
  const gender = form.gender.value;
  const active = form.active.value;
  const compSwimmer = form.compSwimmer.value;
  const id = form.getAttribute("data-id");

  const response = await updateMember(
    id,
    firstName,
    lastName,
    address,
    phone,
    email,
    compSwimmer,
    active,
    gender,
    dateOfBirth
  );
  document.querySelector("#member-detail-view").close();
  if (response.ok) {
    updateMemberTable();
  }
}
async function prepareNewMemberData() {
  const firstName = document.querySelector("#firstName").value;
  const lastName = document.querySelector("#lastName").value;
  const address = document.querySelector("#address").value;
  const phone = document.querySelector("#phone").value;
  const email = document.querySelector("#email").value;
  const dateOfBirth = document.querySelector("#dateOfBirth").value;
  const gender = document.querySelector("#gender").value;
  const active = document.querySelector("#active").value;
  const compSwimmer = document.querySelector("#compSwimmer").value;
  const response = await createMember(
    firstName,
    lastName,
    address,
    phone,
    email,
    dateOfBirth,
    gender,
    active,
    compSwimmer
  );
  if (response.ok) {
    updateMemberTable();
    document.querySelector("#create-member-dialog").close();
    document.querySelector("#create-member-form").reset();
  }
}
async function filterByChanged() {
  const filterValue = document.querySelector("#formand-select-filter-by").value;
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
  showMembers(results);
}
function searchMembersFormand() {
  let searchInput = document.getElementById("input-search-formand");
  let table = document.getElementById("formand-table-body");

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

export { showMembers, showCreateMemberDialog, searchMembersFormand };
