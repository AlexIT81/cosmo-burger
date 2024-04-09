import { loginRequest } from '../../../utils/api';
import { setCookie } from '../../../utils/cookie';
import { AppDispatch, AppThunkAction } from '../../../utils/types';

export const LOGIN_REQUEST: 'LOGIN_REQUEST' = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS: 'LOGIN_SUCCESS' = 'LOGIN_SUCCESS';
export const LOGIN_ERROR: 'LOGIN_ERROR' = 'LOGIN_ERROR';

interface ILoginRequestAction {
  readonly type: typeof LOGIN_REQUEST;
}

interface ILoginSuccessAction {
  readonly type: typeof LOGIN_SUCCESS;
  readonly email: string;
  readonly name: string;
}

interface ILoginErrorAction {
  readonly type: typeof LOGIN_ERROR;
}

export type TLoginActions = ILoginRequestAction | ILoginSuccessAction | ILoginErrorAction;

export const loginReq = (): ILoginRequestAction => ({
  type: LOGIN_REQUEST,
});

export const loginSuccess = (email: string, name: string): ILoginSuccessAction => ({
  type: LOGIN_SUCCESS,
  email,
  name,
});

export const loginError = (): ILoginErrorAction => ({
  type: LOGIN_ERROR,
});

export const loginAction =
  (email: string, password: string): AppThunkAction =>
  (dispatch: AppDispatch) => {
    dispatch(loginReq());
    loginRequest(email, password)
      .then((res) => {
        const accessToken = res.accessToken.split('Bearer ')[1];
        const { refreshToken } = res;
        setCookie('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        dispatch(loginSuccess(res.user.email, res.user.name));
      })
      .catch(() => dispatch(loginError()));
  };
