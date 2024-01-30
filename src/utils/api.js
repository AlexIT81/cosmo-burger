import { API_URL } from './constants';

const checkRes = (res) => {
    if (res.ok) {
    return res.json();
  }
  return res.json().then((err) => {
    throw new Error(err.message);
  });
};

const request = (endpoint, options) => {
  return fetch(`${API_URL}/${endpoint}`, options).then(checkRes)
}

export const getData = () => {
  return request('ingredients', {method: 'GET', headers: {'Content-Type': 'application/json'}})};

export const createOrder = (data) => {
  return request('orders', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ingredients: data}),
  })
};