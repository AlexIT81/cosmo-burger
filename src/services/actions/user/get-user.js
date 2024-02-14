
import { getUserDataRequest } from '../../../utils/api';

export const GET_USER_DATA_REQUEST = 'GET_USER_DATA_REQUEST';
export const GET_USER_DATA_SUCCESS = 'GET_USER_DATA_SUCCESS';
export const GET_USER_DATA_ERROR = 'GET_USER_DATA_ERROR';

export const getUserDataAction = () => (dispatch) => {
  dispatch({
    type: GET_USER_DATA_REQUEST,
  });
  getUserDataRequest()
    .then((res) => {
      dispatch({
        type: GET_USER_DATA_SUCCESS,
        email: res.user.email,
        name: res.user.name,
      });
    })
    .catch(() => dispatch({ type: GET_USER_DATA_ERROR }));
};