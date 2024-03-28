import { updateTokenRequest } from '../../../utils/api';
import { setCookie } from '../../../utils/cookie';
import { AppDispatch, AppThunkAction } from '../../../utils/types';

export const UPDATE_TOKEN_REQUEST: 'UPDATE_TOKEN_REQUEST' = 'UPDATE_TOKEN_REQUEST';
export const UPDATE_TOKEN_SUCCESS: 'UPDATE_TOKEN_SUCCESS' = 'UPDATE_TOKEN_SUCCESS';
export const UPDATE_TOKEN_ERROR: 'UPDATE_TOKEN_ERROR' = 'UPDATE_TOKEN_ERROR';

interface IUpdateTokenRequestAction {
  readonly type: typeof UPDATE_TOKEN_REQUEST;
}

interface IUpdateTokenSuccessAction {
  readonly type: typeof UPDATE_TOKEN_SUCCESS;
}

interface IUpdateTokenErrorAction {
  readonly type: typeof UPDATE_TOKEN_ERROR;
}

export type TUpdateTokenActions = IUpdateTokenRequestAction | IUpdateTokenSuccessAction | IUpdateTokenErrorAction;

const updateTokenReq = (): IUpdateTokenRequestAction => ({
  type: UPDATE_TOKEN_REQUEST,
});

const updateTokenSuccess = (): IUpdateTokenSuccessAction => ({
  type: UPDATE_TOKEN_SUCCESS,
});

const updateTokenError = (): IUpdateTokenErrorAction => ({
  type: UPDATE_TOKEN_ERROR,
});

export const updateTokenAction = (): AppThunkAction => (dispatch: AppDispatch) => {
  dispatch(updateTokenReq());
  updateTokenRequest()
    .then((res) => {
      const accessToken = res.accessToken.split('Bearer ')[1];
      const { refreshToken } = res;
      setCookie('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      dispatch(updateTokenSuccess());
    })
    .catch(() => dispatch(updateTokenError()));
};
