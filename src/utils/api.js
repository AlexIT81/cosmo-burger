import { API_URL } from './constants';
import { getCookie } from './cookie';

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

const request = async (endpoint, options) => {
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

export const resetPasswordRequest = ({ password, token }) => {
  return request('password-reset/reset', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password, token }),
  });
};

export const registerRequest = (email, password, name) => {
  return request('auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, name }),
  });
};

export const loginRequest = (email, password) => {
  return request('auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
};

export const updateTokenRequest = () => {
  return request('auth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: localStorage.getItem('refreshToken')}),
  });
};

export const logoutRequest = () => {
  return request('auth/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: localStorage.getItem('refreshToken')}),
  });
};

export const getUserDataRequest = () => {
  const myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${getCookie('accessToken')}`);
  return request('auth/user', {
    headers: myHeaders,
  });
}

export const setUserDataRequest = (data) => {  
  const myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${getCookie('accessToken')}`);
  myHeaders.append('Content-Type', 'application/json');

  return request('auth/user', {
    method: 'PATCH',
    headers: myHeaders,
    body: JSON.stringify(data),
  });
}