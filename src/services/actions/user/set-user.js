import { setUserDataRequest } from '../../../utils/api';

export const SET_USER_DATA_REQUEST = 'SET_USER_DATA_REQUEST';
export const SET_USER_DATA_SUCCESS = 'SET_USER_DATA_SUCCESS';
export const SET_USER_DATA_ERROR = 'SET_USER_DATA_ERROR';

export const setUserDataAction = (data) => (dispatch) => {
  dispatch({
    type: SET_USER_DATA_REQUEST,
  });
  setUserDataRequest(data)
    .then((res) => {
      console.log(res)
      dispatch({
        type: SET_USER_DATA_SUCCESS,
        email: res.user.email,
        name: res.user.name,
      });
    })
    .catch(() => dispatch({ type: SET_USER_DATA_ERROR }));
};
