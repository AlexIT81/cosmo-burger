import { API_URL } from './constants';

const checkRes = (res) => {
  if (res.ok) {
    return res.json();
  }
  return res.json().then((err) => {
    throw new Error(err.message);
  });
};

export const getData = () => {
  return fetch(`${API_URL}/ingredients`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => checkRes(res))
};

export const createOrder = (data) => {
  return fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ingredients: data,
    }),
  })
    .then((res) => checkRes(res))
};
