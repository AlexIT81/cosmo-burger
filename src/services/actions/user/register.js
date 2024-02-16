import { registerRequest } from '../../../utils/api';
import { setCookie } from '../../../utils/cookie';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_ERROR = 'REGISTER_ERROR';

export const registerAction = (email, password, name) => {
  return (dispatch) => {
    dispatch({
      type: REGISTER_REQUEST,
    });
    registerRequest(email, password, name)
      .then((res) => {
        const accessToken = res.accessToken.split('Bearer ')[1];
        const { refreshToken } = res;
        setCookie('accessToken', accessToken)
        localStorage.setItem('refreshToken', refreshToken);

        dispatch({
          type: REGISTER_SUCCESS,
          email: res.user.email,
          name: res.user.name,
        });
      })
      .catch(() => dispatch({ type: REGISTER_ERROR }));
  };
};
