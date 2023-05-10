"use strict";

// var dob = new Date("1995-08-06");
// //calculate month difference from current date in time
// var month_diff = Date.now() - dob.getTime();

// //convert the calculated difference in date format
// var age_dt = new Date(month_diff);

// //extract year from date
// var year = age_dt.getUTCFullYear();

// //now calculate the age of the user
// var age = Math.abs(year - 1970);

// //display the calculated age

// console.log(age);
ageCalculator();
function ageCalculator() {
  let dob = new Date("1995-08-06");
  let monthDiff = Date.now() - dob.getTime();
  let ageDateFormat = new Date(monthDiff);
  let year = ageDateFormat.getUTCFullYear();
  let age = Math.abs(year - 1970);
  console.log(age);
  document.querySelector("#h1").insertAdjacentHTML("beforeend", `You are ${age} years old.`);
}
