const endpoint =
  "https://delfinen-8e9fa-default-rtdb.europe-west1.firebasedatabase.app/";

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
async function createMember(
  firstName,
  lastName,
  address,
  phone,
  email,
  dateOfBirth,
  gender,
  active,
  compSwimmer
) {
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
async function createResult(
  memberId,
  discipline,
  time,
  date,
  type,
  competitionName,
  placement
) {
  const newResult = {
    memberId,
    discipline,
    time,
    date,
    type,
    competitionName,
    placement,
  };
  console.log(newResult);
  const json = JSON.stringify(newResult);
  const response = await fetch(`${endpoint}/results.json`, {
    method: "POST",
    body: json,
  });
  return response;
}
// DELETE MEMBERS
async function deleteMember(id) {
  // Delete member
  const deleteMemberResponse = await fetch(`${endpoint}/members/${id}.json`, {
    method: "DELETE",
  });

  // Delete associated results
  if (deleteMemberResponse.ok) {
    // Fetch all results
    const resultsResponse = await fetch(`${endpoint}/results.json`);
    if (resultsResponse.ok) {
      const resultsData = await resultsResponse.json();

      // Find and delete results with matching memberId
      for (const resultId in resultsData) {
        const result = resultsData[resultId];
        if (result.memberId === id) {
          await fetch(`${endpoint}/results/${resultId}.json`, {
            method: "DELETE",
          });
        }
      }
    }
  }
  location.reload();
  return deleteMemberResponse;
}
// UPDATE MEMBERS
async function updateMember(
  id,
  firstName,
  lastName,
  address,
  phone,
  email,
  compSwimmer,
  active,
  gender,
  dateOfBirth,
  hasPayed
) {
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
    hasPayed,
  };
  const json = JSON.stringify(memberToUpdate);
  const response = await fetch(`${endpoint}/members/${id}.json`, {
    method: "PUT",
    body: json,
  });
  return response;
}
// UPDATE RESULTS
async function updateResult(
  discipline,
  memberId,
  placement,
  time,
  competition,
  type,
  date
) {
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
// UPDATE PAYMENT STATUS
async function updatePaymentStatus(id, hasPayed) {
  const response = await fetch(`${endpoint}/members/${id}.json`);
  const member = await response.json();

  member[hasPayed] = newValue;

  const json = JSON.stringify(member);
  const updateResponse = await fetch(`${endpoint}/members/${id}.json`, {
    method: "PUT",
    body: json,
  });

  return updateResponse;
}
export {
  members,
  getMembers,
  getResults,
  createMember,
  createResult,
  deleteMember,
  updateMember,
  updateResult,
  endpoint,
};
