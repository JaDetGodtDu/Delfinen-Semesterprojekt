"use strict";

// // Get the filter select element and table
// var filterSelect = document.getElementById("select-filter-by");
// var table = document.getElementById("formand-table-body");

// // Add an event listener to the filter select element
// filterSelect.addEventListener("change", function () {
//   var filterValue = filterSelect.value.toLowerCase();
//   var rows = table.getElementsByTagName("tr");

//   // Loop through the table rows and hide/show based on the filter value
//   for (var i = 0; i < rows.length; i++) {
//     var cells = rows[i].getElementsByTagName("td");
//     var shouldHide = true;

//     // Loop through the cells of each row
//     for (var j = 0; j < cells.length; j++) {
//       var cell = cells[j];
//       if (cell && cell.getAttribute("data-filter")) {
//         var cellFilterValue = cell.getAttribute("data-filter").toLowerCase();
//         if (filterValue === "" || filterValue === cellFilterValue) {
//           shouldHide = false;
//           break;
//         }
//       }
//     }

//     // Toggle the display property based on the filter condition
//     rows[i].style.display = shouldHide ? "none" : "";
//   }
// });

async function filterMembersByActive(members) {
  const result = members.filter((member) => member.active === true);
  console.log(result);
  return result;
}

async function filterMembersByCompSwimmer(members) {
  const result = members.filter((member) => member.compSwimmer === true);
  console.log(result);
  return result;
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
      <td>${member.firstName} ${member.lastName}</td>
      <td>${memberAgegroup(member)}</td>
      <td>${compSwimmer(member)}</td>
      <td>${member.email}</td>
      <td>${member.phone}</td>
      <td>${subscriptionType(member)}</td>
    </tr>
    `;
  document.querySelector("#formand-table-body").insertAdjacentHTML("beforeend", html); // append html to the DOM - section#posts
}

function filterMembersByAge(members) {
  const membersOver18 = [];
  const membersUnder18 = [];
  members.forEach((member) => {
    let age = ageCalculator(member);
    if (age >= 18) {
      membersOver18.push(member);
    } else {
      membersUnder18.push(member);
    }
  });
  return { over18: membersOver18, under18: membersUnder18 };
}
