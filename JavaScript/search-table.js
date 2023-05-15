"use strict";

// Get the input field and table
// Get the input field and table
var searchInput = document.getElementById("input-search");
var table = document.getElementById("formand-table");

// Add an event listener to the input field
searchInput.addEventListener("input", function () {
  var filter = searchInput.value.toUpperCase();
  var rows = table.getElementsByTagName("tr");

  // Loop through the table rows and hide those that don't match the filter
  for (var i = 0; i < rows.length; i++) {
    var cells = rows[i].getElementsByTagName("td");
    var shouldHide = true;

    // Loop through the cells of each row
    for (var j = 0; j < cells.length; j++) {
      var cell = cells[j];
      if (cell) {
        var cellText = cell.textContent || cell.innerText;
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
