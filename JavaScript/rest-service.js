const endpoint = "https://delfinen-8e9fa-default-rtdb.europe-west1.firebasedatabase.app/";
import { prepareMemberData } from "./helpers.js";
async function getMembers() {
  const response = await fetch(`${endpoint}/members.json`);
  const data = await response.json();
  const members = prepareMemberData(data);
  prepareMemberData(data);
  return members;
}
export { getMembers };
