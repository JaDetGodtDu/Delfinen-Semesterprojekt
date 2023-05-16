"use strict";

window.addEventListener("load", initApp);

function initApp() {
  const hjalte = { firstName: "Hjalte", lastName: "Hansen", email: "hjalte3480@gmail.com", phone: 51924833 };

  html(hjalte);
}

function html(member) {
  const kassérHTML = /*html*/ `
          <tr>
            <td class="name">${member.firstName} ${member.lastName}</td>
            <td class="email">${member.email}</td>
            <td class="phone">${member.phone}</td>
            <td class="age">l</td>
            <td class="member-status">Aktiv</td>
            <td class="payment"> kr</td>
          </tr>
    `;
  document.querySelector("#kassér-table-body").insertAdjacentHTML("beforeend", kassérHTML);
}
