import { updateTokenRequest } from '../../../utils/api';
import { setCookie } from '../../../utils/cookie';

export const UPDATE_TOKEN_REQUEST = 'UPDATE_TOKEN_REQUEST';
export const UPDATE_TOKEN_SUCCESS = 'UPDATE_TOKEN_SUCCESS';
export const UPDATE_TOKEN_ERROR = 'UPDATE_TOKEN_ERROR';

export const updateTokenAction = () => (dispatch) => {
  dispatch({
    type: UPDATE_TOKEN_REQUEST,
  });
  updateTokenRequest()
    .then((res) => {
      const accessToken = res.accessToken.split('Bearer ')[1];
      const { refreshToken } = res;
      setCookie('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      dispatch({ type: UPDATE_TOKEN_SUCCESS });
    })
    .catch(() => dispatch({ type: UPDATE_TOKEN_ERROR }));
};
