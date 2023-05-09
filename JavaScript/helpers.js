function prepareMemberData(dataObject) {
  const memberArray = [];
  for (const key in dataObject) {
    const member = dataObject[key];
    member.id = key;
    memberArray.push(member);
  }
  return memberArray;
}
export { prepareMemberData };
