"use strict";
import { getMembers, getResults, createMember, createResult } from "./rest-service.js";
window.addEventListener("load", initApp);
let members;
async function initApp() {
  await showMembers();
  await filterMembersByPayed(members);
  await filterMembersByNotPayed(members);
}
async function showMembers() {
  members = await getMembers();
}
async function filterMembersByPayed(members) {
  const result = members.filter((member) => member.hasPayed === true);
  console.log(result);
}
async function filterMembersByNotPayed(members) {
  const result = members.filter((member) => member.hasPayed !== true);
  console.log(result);
}
