"use strict";

function showMembers(members) {
  for (const member of members) {
    showTable(member);
  }
}

function showTable(member) {
  const html = /*html*/ `
    <tr>
      <td>${member.firstName} ${member.lastName}</td>
      <td>${member.age}</td>
      <td>${member.compSwimmer}</td>
      <td>${member.email}</td>
      <td>${member.phone}</td>
      <td>${member.membership}</td>
    </tr>
    `;
  document
    .querySelector("#formand-table-body")
    .insertAdjacentHTML("beforeend", html); // append html to the DOM - section#posts
}

export { showMembers };
