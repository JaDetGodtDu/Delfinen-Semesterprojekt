function prepareMemberData(dataObject) {
  const memberArray = [];
  for (const key in dataObject) {
    const member = dataObject[key];
    member.id = key;
    memberArray.push(member);
  }
  return memberArray;
}
function prepareResultData(dataObject) {
  const resultArray = [];
  for (const key in dataObject) {
    const result = dataObject[key];
    result.id = key;
    resultArray.push(result);
  }
  return resultArray;
}
function ageCalculator(members) {
  let dob = new Date(members.dateOfBirth);
  let monthDiff = Date.now() - dob.getTime();
  let ageDateFormat = new Date(monthDiff);
  let year = ageDateFormat.getUTCFullYear();
  let age = Math.abs(year - 1970);
  return age;
}
function filterMembersByAge(members) {
  const membersOver18 = [];
  const membersUnder18 = [];
  members.forEach((member) => {
    let age = ageCalculator(member);
    if (age >= 18) {
      membersOver18.push(member);
    } else {
      membersUnder18.push(member);
    }
  });
  return { over18: membersOver18, under18: membersUnder18 };
}
function memberAgeGroup(member) {
  let HTML = "";
  if (ageCalculator(member) < 18) {
    HTML = /*html*/ `
    Junior`;
  } else {
    HTML = /*html*/ `
    Senior`;
  }
  return HTML;
}
function compSwimmer(member) {
  let HTML = "";
  if (member.compSwimmer == "true") {
    HTML = /*html*/ `Konkurrence`;
  } else {
    HTML = /*html*/ `Motionist`;
  }
  return HTML;
}
function subscriptionType(member) {
  let HTML = "";
  if (member.active == "true") {
    HTML = /*html*/ `Aktiv`;
  } else {
    HTML = /*html*/ `Passiv`;
  }
  return HTML;
}
function memberGender(member) {
  let HTML = "";
  if (member.gender === "male") {
    HTML = /*html*/ `Mand`;
  } else if (member.gender === "female") {
    HTML = /*html*/ `Kvinde`;
  } else {
    HTML = /*html*/ `Andet`;
  }
  return HTML;
}
export { prepareMemberData, prepareResultData, ageCalculator, memberAgeGroup, compSwimmer, subscriptionType, memberGender };
