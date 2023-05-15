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
function memberAgegroup(member) {
  let HTML = "";
  if (ageCalculator(member) <= 18) {
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
  if (member.compSwimmer === true) {
    HTML = /*hmtl*/ `Konkurrence`;
  } else {
    HTML = /*hmtl*/ `Motionist`;
  }
  return HTML;
}
function subscriptionType(member) {
  let HTML = "";
  if (member.active === true) {
    HTML = /*hmtl*/ `Aktiv`;
  } else {
    HTML = /*hmtl*/ `Passiv`;
  }
  return HTML;
}

export {
  prepareMemberData,
  prepareResultData,
  ageCalculator,
  memberAgegroup,
  compSwimmer,
  subscriptionType,
};
