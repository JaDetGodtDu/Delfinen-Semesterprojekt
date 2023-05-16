"use strict";

window.addEventListener("load", initApp);

function initApp() {
  const hjalte = { firstName: "Hjalte", lastName: "Hansen", email: "hjalte3480@gmail.com", phone: 51924833 };

  html(hjalte);
}

function html(member) {
  const kassérHTML = /*html*/ `
    <section id="kassér">
      <h2>Kassérens view</h2>
      <div class="grid-container">
        <div class="box container">
          <div class="box">Årlig kontigent indtjening</div>
          <div class="box">1.000.000,00kr</div>
        </div>
      </div>
      <section class="tools-grid">
        <label for="select-filter-by"
          >filter by:
          <select id="select-filter-by">
            <option value="" selected>Intet emne</option>
            <option value="aktiv">Aktiv</option>
            <option value="inaktiv">Inaktiv</option>
            <option value="konkurance">konkurance</option>
            <option value="motionist">Motionist</option>
            <option value="junior">Junior</option>
            <option value="senior">Senior</option>
          </select>
        </label>

        <div>
          <label for="input-search">Search:</label>
          <input type="search" id="input-search" placeholder="Search" />
        </div>
      </section>

      <br />
      <table id="member-table">
        <thead>
          <tr>
            <th class="clickable">Navn</th>
            <th class="clickable">Email</th>
            <th class="clickable">Tlf</th>
            <th class="clickable">Aldersgruppe</th>
            <th class="clickable">Medlemskab</th>
            <th class="clickable">Restance</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="name">${member.firstName} ${member.lastName}</td>
            <td class="email">${member.email}</td>
            <td class="phone">${member.phone}</td>
            <td class="age">l</td>
            <td class="member-status">Aktiv</td>
            <td class="payment"> kr</td>
          </tr>
        </tbody>
      </table>
    </section>
    `;
  document.querySelector("#kassér-view").insertAdjacentHTML("beforeend", kassérHTML);
}
