import { API_URL } from './constants';

const checkRes = (res) => {
  if (res.ok) {
    return res.json();
  }
  return res.json().then((err) => {
    throw new Error(err.message);
  });
};

export const apiData = (name, email, password) => {
  return fetch(`${API_URL}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => checkRes(res))
};
