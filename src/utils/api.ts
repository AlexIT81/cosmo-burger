import { API_URL } from './constants';
import { getCookie } from './cookie';
import {
  TGetDataRequest,
  TCreateOrderRequest,
  TRegisterAndAuthRequest,
  TGetUserDataRequest,
  TPasswordAndLogoutRequest,
  TServerResponse,
  IBodyRequest,
  TGetOrderInfoRequest,
} from './types';

const checkResponse = <T>(res: Response): Promise<T> => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(new Error(`Ошибка ${res.status}`));
};

const checkSuccess = <T>(res: TServerResponse<T>): T => {
  if (res && res.success) {
    return res;
  }
  throw new Error(`Ответ не success: ${res}`);
};

export const getDataRequest = () => {
  return fetch(`${API_URL}/ingredients`)
    .then((res) => checkResponse<TGetDataRequest>(res))
    .then((res) => checkSuccess<TGetDataRequest>(res));
};

export const createOrderRequest = (data: string[]) => {
  const myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${getCookie('accessToken')}`);
  myHeaders.append('Content-Type', 'application/json');
  return fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify({ ingredients: data }),
  })
    .then((res) => checkResponse<TCreateOrderRequest>(res))
    .then((res) => checkSuccess<TCreateOrderRequest>(res));
};

export const forgotPasswordRequest = (email: string) => {
  return fetch(`${API_URL}/password-reset`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  })
    .then((res) => checkResponse<TPasswordAndLogoutRequest>(res))
    .then((res) => checkSuccess<TPasswordAndLogoutRequest>(res));
};

export const resetPasswordRequest = (password: string, token: string) => {
  return fetch(`${API_URL}/password-reset/reset`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password, token }),
  })
    .then((res) => checkResponse<TPasswordAndLogoutRequest>(res))
    .then((res) => checkSuccess<TPasswordAndLogoutRequest>(res));
};

export const registerRequest = (email: string, password: string, name: string) => {
  return fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, name }),
  })
    .then((res) => checkResponse<TRegisterAndAuthRequest>(res))
    .then((res) => checkSuccess<TRegisterAndAuthRequest>(res));
};

export const loginRequest = (email: string, password: string) => {
  return fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => checkResponse<TRegisterAndAuthRequest>(res))
    .then((res) => checkSuccess<TRegisterAndAuthRequest>(res));
};

export const updateTokenRequest = () => {
  return fetch(`${API_URL}/auth/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
  })
    .then((res) => checkResponse<TRegisterAndAuthRequest>(res))
    .then((res) => checkSuccess<TRegisterAndAuthRequest>(res));
};

export const logoutRequest = () => {
  return fetch(`${API_URL}/auth/logout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
  })
    .then((res) => checkResponse<TPasswordAndLogoutRequest>(res))
    .then((res) => checkSuccess<TPasswordAndLogoutRequest>(res));
};

export const getUserDataRequest = () => {
  const myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${getCookie('accessToken')}`);
  return fetch(`${API_URL}/auth/user`, {
    headers: myHeaders,
  })
    .then((res) => checkResponse<TGetUserDataRequest>(res))
    .then((res) => checkSuccess<TGetUserDataRequest>(res));
};

export const setUserDataRequest = (data: IBodyRequest) => {
  const myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${getCookie('accessToken')}`);
  myHeaders.append('Content-Type', 'application/json');
  return fetch(`${API_URL}/auth/user`, {
    method: 'PATCH',
    headers: myHeaders,
    body: JSON.stringify(data),
  })
    .then((res) => checkResponse<TGetUserDataRequest>(res))
    .then((res) => checkSuccess<TGetUserDataRequest>(res));
};

export const getOrderInfoRequest = (orderNumber: string) => {
  return fetch(`${API_URL}/orders/${orderNumber}`)
    .then((res) => checkResponse<TGetOrderInfoRequest>(res))
    .then((res) => checkSuccess<TGetOrderInfoRequest>(res));
};
