const endpoint =
  "https://delfinen-8e9fa-default-rtdb.europe-west1.firebasedatabase.app/";

import { prepareMemberData, prepareResultData } from "./helpers.js";

let members;

async function getMembers() {
  const response = await fetch(`${endpoint}/members.json`);
  const data = await response.json();
  const members = prepareMemberData(data);
  prepareMemberData(data);
  return members;
}
async function getResults() {
  const response = await fetch(`${endpoint}/results.json`);
  const data = await response.json();
  const results = prepareResultData(data);
  prepareResultData(data);
  return results;
}
async function createMember(
  firstName,
  lastName,
  address,
  phone,
  email,
  dateOfBirth,
  gender,
  active,
  compSwimmer,
  hasPayed
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
    hasPayed,
  };
  const json = JSON.stringify(newMember);
  const response = await fetch(`${endpoint}/members.json`, {
    method: "POST",
    body: json,
  });
  location.reload();
  return response;
}
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
  const json = JSON.stringify(newResult);
  const response = await fetch(`${endpoint}/results.json`, {
    method: "POST",
    body: json,
  });
  location.reload();
  return response;
}
async function deleteMember(id) {
  const deleteMemberResponse = await fetch(`${endpoint}/members/${id}.json`, {
    method: "DELETE",
  });

  if (deleteMemberResponse.ok) {
    const resultsResponse = await fetch(`${endpoint}/results.json`);
    if (resultsResponse.ok) {
      const resultsData = await resultsResponse.json();
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
async function deleteResult(id) {
  const deleteResultResponse = await fetch(`${endpoint}/results/${id}.json`, {
    method: "DELETE",
  });
  location.reload();
  return deleteResultResponse;
}
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
  location.reload();
  return response;
}

export {
  members,
  getMembers,
  getResults,
  createMember,
  createResult,
  deleteMember,
  updateMember,
  deleteResult,
};
