"use strict";

// Get the filter select element and table
var filterSelect = document.getElementById("select-filter-by");
var table = document.getElementById("formand-table-body");

// Add an event listener to the filter select element
filterSelect.addEventListener("change", function () {
  var filterValue = filterSelect.value.toLowerCase();
  var rows = table.getElementsByTagName("tr");

  // Loop through the table rows and hide/show based on the filter value
  for (var i = 0; i < rows.length; i++) {
    var cells = rows[i].getElementsByTagName("td");
    var shouldHide = true;

    // Loop through the cells of each row
    for (var j = 0; j < cells.length; j++) {
      var cell = cells[j];
      if (cell && cell.getAttribute("data-filter")) {
        var cellFilterValue = cell.getAttribute("data-filter").toLowerCase();
        if (filterValue === "" || filterValue === cellFilterValue) {
          shouldHide = false;
          break;
        }
      }
    }

    // Toggle the display property based on the filter condition
    rows[i].style.display = shouldHide ? "none" : "";
  }
});
