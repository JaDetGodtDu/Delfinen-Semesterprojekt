"use strict";
function showTable(member) {
  const html = /*html*/ `
        <article class="grid-item"></article>            
        <table>
          <thead>
            <th class="clickable">Medlem</th>
            <th class="clickable">Aldersgruppe</th>
            <th class="clickable">Hold</th>
            <th class="clickable">Email</th>
            <th class="clickable">Tlf.</th>
            <th class="clickable">Medlemskab</th>
          </thead>
          <tbody>
            <tr>
              <td>${member.firstName} ${member.lastName}</td>
              <td>${member.age}</td>
              <td>${member.compSwimmer}</td>
              <td>${member.email}</td>
              <td>${member.phone}</td>
              <td>${member.membership}</td>
            </tr>
          </tbody>
        </table>
        <button id="" class="create-member">Opret nyt medlem</button>
            </div>
        </article>
    `; // html variable to hold generated html in backtick
  document.querySelector("#posts").insertAdjacentHTML("beforeend", html); // append html to the DOM - section#posts

  // add event listeners to .btn-delete and .btn-update
  document
    .querySelector("#posts article:last-child .btn-delete")
    .addEventListener("click", () => deleteClicked(postObject));
  document
    .querySelector("#posts article:last-child .btn-update")
    .addEventListener("click", () => updateClicked(postObject));

  // called when delete button is clicked
  function deleteClicked() {
    // show title of post you want to delete
    document.querySelector("#dialog-delete-post-title").textContent =
      postObject.title;
    // set data-id attribute of post you want to delete (... to use when delete)
    document
      .querySelector("#form-delete-post")
      .setAttribute("data-id", postObject.id);
    // show delete dialog
    document.querySelector("#dialog-delete-post").showModal();
  }
}
