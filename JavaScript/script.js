"use strict";

import {initViews, showWelcomeView, } from "./view-router.js";

window.addEventListener("load", initApp);

function initApp() {
    console.log("JavaScript is running 🚀");
    initViews();
    showWelcomeView();
}

function logout() {
    hideAllViews();
    showWelcomeView();
  }