"use strict";
import { getMembers, getResults, createMember, createResult } from "./rest-service.js";
window.addEventListener("load", initApp);
let members;
let results;
async function initApp() {
  await showMembers();
  await showResults();
  await filterMembersByPayed(members);
  await filterMembersByNotPayed(members);
  filterResultsByDiscipline("butterfly");
  filterTop5SwimmersByDiscipline("ryg");
}
async function showMembers() {
  members = await getMembers();
}
async function showResults() {
  results = await getResults();
  console.log(results);
}
async function filterMembersByPayed(members) {
  const result = members.filter((member) => member.hasPayed === true);
  console.log(result);
}
async function filterMembersByNotPayed(members) {
  const result = members.filter((member) => member.hasPayed !== true);
  console.log(result);
}
function filterResultsByDiscipline(searchValue) {
  searchValue = searchValue.toLowerCase();
  const result = results.filter(matchDiscipline);
  function matchDiscipline(result) {
    return result.discipline.toLowerCase().includes(searchValue);
  }
  console.log(result);
  return result;
}
function filterTop5SwimmersByDiscipline(searchValue) {
  searchValue = searchValue.toLowerCase();
  const filteredResults = results.filter((result) => result.discipline.toLowerCase().includes(searchValue));
  const sortedResults = filteredResults.sort((a, b) => a.time - b.time);
  const topFiveResults = sortedResults.slice(0, 4);
  console.log(topFiveResults);
  return topFiveResults;
}
