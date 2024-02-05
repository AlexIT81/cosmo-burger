import { API_URL } from './constants';

// const checkRes = (res) => {
//     if (res.ok) {
//     return res.json();
//   }
//   return res.json().then((err) => {
//     throw new Error(err.message);
//   });
// };

// const request = (endpoint, options) => {
//   return fetch(`${API_URL}/${endpoint}`, options).then(checkRes)
// }

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(new Error(`Ошибка ${res.status}`));
};

const checkSuccess = (res) => {
  if (res && res.success) {
    return res;
  }
  return Promise.reject(new Error(`Ответ не success: ${res}`));
};

const request = (endpoint, options) => {
  return fetch(`${API_URL}/${endpoint}`, options).then(checkResponse).then(checkSuccess);
};

export const getData = () => request('ingredients');

export const createOrder = (data) => {
  return request('orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ingredients: data }),
  });
};
