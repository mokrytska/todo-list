import { baseUrl } from './constants';

export async function getUsers() {
  let response = await fetch(`${baseUrl}/user`);
  let json = await response.json();
  return json;
}
export default 2;
