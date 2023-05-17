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
function memberPrice(member) {
  let HTML = "";
  if (
    ageCalculator(member) >= 18 &&
    ageCalculator(member) < 60 &&
    member.active === "true"
  ) {
    HTML = /*html*/ `1600`;
  } else if (ageCalculator(member) >= 60 && member.active === "true") {
    HTML = /*html*/ `1200`;
  } else if (ageCalculator(member) < 18 && member.active === "true") {
    HTML = /*html*/ `1000`;
  } else {
    HTML = /*html*/ `500`;
  }
  return HTML;
}
function memberHasPayed(member, memberId) {
  if (member.hasPayed === "true") {
    document.querySelector(`#${memberId}`).classList.add("hasPayedTrue");
  } else if (member.hasPayed === "false") {
    document.querySelector(`#${memberId}`).classList.add("hasPayedFalse");
  }
}
function yearlyIncome(members) {
  let totalIncome = 0;
  for (const member of members) {
    const price = parseFloat(memberPrice(member));
    totalIncome += price;
  }
  return totalIncome;
}

export {
  prepareMemberData,
  prepareResultData,
  ageCalculator,
  memberAgeGroup,
  compSwimmer,
  subscriptionType,
  memberGender,
  memberPrice,
  memberHasPayed,
  yearlyIncome,
};
