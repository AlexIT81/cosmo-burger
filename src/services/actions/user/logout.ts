import { logoutRequest } from '../../../utils/api';
import { deleteCookie } from '../../../utils/cookie';
import { AppDispatch, AppThunkAction } from '../../../utils/types';

export const LOGOUT_REQUEST: 'LOGOUT_REQUEST' = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS: 'LOGOUT_SUCCESS' = 'LOGOUT_SUCCESS';
export const LOGOUT_ERROR: 'LOGOUT_ERROR' = 'LOGOUT_ERROR';

interface ILogoutRequest {
  readonly type: typeof LOGOUT_REQUEST;
}

interface ILogoutSuccess {
  readonly type: typeof LOGOUT_SUCCESS;
}

interface ILogoutError {
  readonly type: typeof LOGOUT_ERROR;
}

export type TLogoutActions = ILogoutRequest | ILogoutSuccess | ILogoutError;

export const logoutReq = (): ILogoutRequest => ({
  type: LOGOUT_REQUEST,
});

export const logoutSuccess = (): ILogoutSuccess => ({
  type: LOGOUT_SUCCESS,
});

export const logoutError = (): ILogoutError => ({
  type: LOGOUT_ERROR,
});

export const logoutAction = (): AppThunkAction => (dispatch: AppDispatch) => {
  dispatch(logoutReq());
  logoutRequest()
    .then(() => {
      deleteCookie('accessToken');
      localStorage.removeItem('refreshToken');
      dispatch(logoutSuccess());
    })
    .catch(() => dispatch(logoutError()));
};
