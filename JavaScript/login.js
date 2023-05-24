"use strict";

import { showMembers } from "./formand.js";
import { getMembers, getResults } from "./rest-service.js";
import { kassérShowMembers } from "./kassér.js";
import { seniorShowMembers } from "./senior.js";

window.addEventListener("load", initListeners);

async function initListeners() {
  document
    .querySelector("#login-formand-btn")
    .addEventListener("click", showFormandView);
  document
    .querySelector("#login-kassér-btn")
    .addEventListener("click", showKassérView);
  document
    .querySelector("#login-senior-btn")
    .addEventListener("click", showSeniorView);
  document
    .querySelector("#login-junior-btn")
    .addEventListener("click", showJuniorView);
  document
    .querySelector("#logout-user-btn")
    .addEventListener("click", showLoginView);
  window
    .addEventListener("hashchange", handleHashChange);
  handleHashChange();
}

async function handleHashChange() {
  const hash = window.location.hash;
  if (hash === "#previous-view") {
    const previousHash = localStorage.getItem("previousHash");
    if (previousHash) {
      window.location.hash = previousHash;
      return;
    }
  }  
  document.querySelectorAll("section").forEach(section => {
    section.classList.add("hidden");
  });
  if (hash === "#formand-view") {
    document.querySelector("#formand-view").classList.remove("hidden");
  } else if (hash === "#kass%C3%A9r-view") {
    document.querySelector("#kassér-view").classList.remove("hidden");
  } else if (hash === "#senior-view") {
    document.querySelector("#senior-view").classList.remove("hidden");
  } else if (hash === "#junior-view") {
    document.querySelector("#junior-view").classList.remove("hidden");
  } else if (hash === "#kontakt-information") {
    document.querySelector("#kontakt-information").classList.remove("hidden");
  } else {
    document.querySelector("#login-view").classList.remove("hidden");
  }
}

async function showFormandView(event) {
  event.preventDefault(); 
  window.location.hash = "formand-view"; 
  localStorage.setItem("previousHash", window.location.hash);
}

async function showKassérView(event) {
  event.preventDefault(); 
  window.location.hash = "kass%C3%A9r-view";
  localStorage.setItem("previousHash", window.location.hash); 
}

async function showSeniorView(event) {
  event.preventDefault(); 
  window.location.hash = "senior-view"; 
  localStorage.setItem("previousHash", window.location.hash);
}

async function showJuniorView(event) {
  event.preventDefault(); 
  window.location.hash = "junior-view"; 
  localStorage.setItem("previousHash", window.location.hash);
}

async function showLoginView(event) {
  event.preventDefault(); 
  window.location.hash = "login-view"; 
}