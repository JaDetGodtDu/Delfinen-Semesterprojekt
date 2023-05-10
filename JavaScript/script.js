"use strict";
import { getMembers, getResults, createMember, createResult, deleteMember } from "./rest-service.js";
let members;
let results;
window.addEventListener("load", initApp);
async function initApp() {
  await showResults();
  await sortResultsByType();
  await sortResultsByTime();
  await sortResultsByDiscipline();
  await showMembers();
  await sortMembersByName();
}
async function showResults() {
  results = await getResults();
}
async function sortResultsByType() {
  await showResults();
  results.sort((a, b) => a.type.localeCompare(b.type));
  console.log(results);
}
async function sortResultsByTime() {
  await showResults();
  results.sort((a, b) => a.time - b.time);
  console.log(results);
}
async function sortResultsByDiscipline() {
  await showResults();
  results.sort((a, b) => a.discipline.localeCompare(b.discipline));
  console.log(results);
}
async function showMembers() {
  members = await getMembers();
}
async function sortMembersByName() {
  await showMembers();
  members.sort((a, b) => a.lastName.localeCompare(b.lastName));
  console.log(members);
}
