
import { logoutRequest } from '../../../utils/api';
import { deleteCookie } from '../../../utils/cookie';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_ERROR = 'LOGOUT_ERROR';

export const logoutAction = () => (dispatch) => {
  dispatch({
    type: LOGOUT_REQUEST,
  });
  logoutRequest()
    .then((res) => {
      deleteCookie('accessToken');
      localStorage.removeItem('refreshToken');
      dispatch({
        type: LOGOUT_SUCCESS,
      });
    })
    .catch(() => dispatch({ type: LOGOUT_ERROR }));
};
