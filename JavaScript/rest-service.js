const endpoint = "https://delfinen-8e9fa-default-rtdb.europe-west1.firebasedatabase.app/";

import { prepareMemberData, prepareResultData } from "./helpers.js";

let members;

// FETCH MEMBERS
async function getMembers() {
  const response = await fetch(`${endpoint}/members.json`);
  const data = await response.json();
  const members = prepareMemberData(data);
  prepareMemberData(data);
  return members;
}
// FETCH COMPETITION RESULTS
async function getResults() {
  const response = await fetch(`${endpoint}/results.json`);
  const data = await response.json();
  const results = prepareResultData(data);
  prepareResultData(data);
  return results;
}
// CREATE NEW MEMBERS
async function createMember(firstName, lastName, address, phone, email, dateOfBirth, gender, active, compSwimmer) {
  const newMember = {
    firstName,
    lastName,
    address,
    phone,
    email,
    dateOfBirth,
    gender,
    active,
    compSwimmer,
  };
  const json = JSON.stringify(newMember);
  const response = await fetch(`${endpoint}/members.json`, {
    method: "POST",
    body: json,
  });
  return response;
}
// CREATE NEW RESULTS
async function createResult(discipline, memberId, placement, time, competition, type, date) {
  const newResult = {
    discipline,
    memberId,
    placement,
    time,
    competition,
    type,
    date,
  };
  const json = JSON.stringify(newResult);
  const response = await fetch(`${endpoint}/results.json`, {
    method: "POST",
    body: json,
  });
  return response;
}
// DELETE MEMBERS
async function deleteMember(id) {
  const response = await fetch(`${endpoint}/members/${id}.json`, {
    method: "DELETE",
  });
  return response;
}
// UPDATE MEMBERS
async function updateMember(firstName, lastName, address, phone, email, compSwimmer, active, gender, dateOfBirth) {
  const memberToUpdate = {
    firstName,
    lastName,
    address,
    phone,
    email,
    compSwimmer,
    active,
    gender,
    dateOfBirth,
  };
  const json = JSON.stringify(memberToUpdate);
  const response = await fetch(`${endpoint}/members/${id}.json`, {
    method: "PUT",
    body: json,
  });
  return response;
}
// UPDATE RESULTS
async function updateResult(discipline, memberId, placement, time, competition, type, date) {
  const resultToUpdate = {
    discipline,
    memberId,
    placement,
    time,
    competition,
    type,
    date,
  };
  const json = JSON.stringify(resultToUpdate);
  const response = await fetch(`${endpoint}/results/${id}.json`, {
    method: "PUT",
    body: json,
  });
  return response;
}
export { members, getMembers, getResults, createMember, createResult, deleteMember, updateMember, updateResult };
