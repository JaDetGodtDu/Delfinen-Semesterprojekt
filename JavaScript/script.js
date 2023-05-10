"use strict";
window.addEventListener("load", initApp);
function initApp() {
  document.querySelector("#type").addEventListener("change", (event) => competitionTypeChange(event));
}
function competitionTypeChange(event) {
  const selectedTargetValue = event.target.value;
  if (selectedTargetValue === "competition") {
    document.querySelector("#competition-name").removeAttribute("hidden");
    document.querySelector("#competition-name-label").removeAttribute("hidden");
    document.querySelector("#placement-label").removeAttribute("hidden");
    document.querySelector("#placement").removeAttribute("hidden");
  } else {
    document.querySelector("#competition-name").setAttribute("hidden", "true");
    document.querySelector("#competition-name-label").setAttribute("hidden", "true");
    document.querySelector("#placement-label").setAttribute("hidden", "true");
    document.querySelector("#placement").setAttribute("hidden", "true");
  }
}
