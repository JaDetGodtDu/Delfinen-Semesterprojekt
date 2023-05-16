"use strict";

// Get the input field and table
// Get the input field and table
let searchInput = document.getElementById("input-search");
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
