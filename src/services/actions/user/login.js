import { loginRequest } from '../../../utils/api';
import { setCookie } from '../../../utils/cookie';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export const loginAction = (email, password) => (dispatch) => {
  dispatch({
    type: LOGIN_REQUEST,
  });
  loginRequest(email, password)
    .then((res) => {
      const accessToken = res.accessToken.split('Bearer ')[1];
      const { refreshToken } = res;
      setCookie('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      dispatch({
        type: LOGIN_SUCCESS,
        email: res.user.email,
        name: res.user.name,
      });
    })
    .catch(() => dispatch({ type: LOGIN_ERROR }));
};
