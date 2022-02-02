import { baseUrl } from './constants';

export async function getItems() {
  let response = await fetch(`${baseUrl}/item`);
  let json = await response.json();
  return json;
}

export async function postItem(item) {
  let response = await fetch(`${baseUrl}/item`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(item),
  });
  let json = await response.json();
  return json;
}

export async function getItemDetails(id) {
  let response = await fetch(`${baseUrl}/item/${id}`);
  let json = await response.json();
  return json;
}

export async function putItem(id, item) {
  let response = await fetch(`${baseUrl}/item/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(item),
  });
  let json = await response.json();
  return json;
}
