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

export const getDataRequest = () => request('ingredients');

export const createOrderRequest = (data) => {
  return request('orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ingredients: data }),
  });
};

export const forgotPasswordRequest = (email) => {
  return request('password-reset', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
};

export const resetPasswordRequest = ({password, token}) => {
  return request('password-reset/reset', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password, token }),
  });
};
