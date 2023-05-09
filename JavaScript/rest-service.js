const endpoint = "https://delfinen-8e9fa-default-rtdb.europe-west1.firebasedatabase.app/";
import { prepareMemberData, prepareResultData } from "./helpers.js";
async function getMembers() {
  const response = await fetch(`${endpoint}/members.json`);
  const data = await response.json();
  const members = prepareMemberData(data);
  prepareMemberData(data);
  return members;
}
// FETCH COMPETITION RESULTS
async function getCompetitionResults() {
  const response = await fetch(`${endpoint}/competitionResults.json`);
  const data = await response.json();
  const results = prepareResultData(data);
  prepareResultData(data);
  return results;
}
async function getTrainingResults() {
  const response = await fetch(`${endpoint}/trainingResults.json`);
  const data = await response.json();
  const results = prepareResultData(data);
  prepareResultData(data);
  return results;
}
// CREATE NEW MEMBERS
async function createMember(firstName, lastName, address, phone, email, compSwimmer, active, gender, dateOfBirth) {
  const newMember = { firstName, lastName, address, phone, email, compSwimmer, active, gender, dateOfBirth };
  const json = JSON.stringify(newMember);
  const response = await fetch(`${endpoint}/members.json`, {
    method: "POST",
    body: json,
  });
  return response;
}
// CREATE NEW RESULTS
async function createCompetitionResult(discipline, memberId, placement, time, competition) {
  const newResult = { discipline, memberId, placement, time, competition };
  const json = JSON.stringify(newResult);
  const response = await fetch(`${endpoint}/competitionResults.json`, {
    method: "POST",
    body: json,
  });
  return response;
}
async function createTrainingResult(bestTime, date, memberId, discipline) {
  const newResult = { bestTime, date, memberId, discipline };
  const json = JSON.stringify(newResult);
  const response = await fetch(`${endpoint}/trainingResults.json`, {
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
  const memberToUpdate = { firstName, lastName, address, phone, email, compSwimmer, active, gender, dateOfBirth };
  const json = JSON.stringify(memberToUpdate);
  const response = await fetch(`${endpoint}/members/${id}.json`, {
    method: "PUT",
    body: json,
  });
  return response;
}
// UPDATE RESULTS
async function updateCompetitionResult(discipline, memberId, placement, time, competition) {
  const resultToUpdate = { discipline, memberId, placement, time, competition };
  const json = JSON.stringify(resultToUpdate);
  const response = await fetch(`${endpoint}/competitionResults/${id}.json`, {
    method: "PUT",
    body: json,
  });
  return response;
}
async function updateTrainingResult(bestTime, date, memberId, discipline) {
  const resultToUpdate = { bestTime, date, memberId, discipline };
  const json = JSON.stringify(resultToUpdate);
  const response = await fetch(`${endpoint}/trainingResults/${id}.json`, {
    method: "PUT",
    body: json,
  });
  return response;
}
export { getMembers, getCompetitionResults, getTrainingResults, createMember, createCompetitionResult, createTrainingResult, deleteMember, updateMember, updateCompetitionResult, updateTrainingResult };
