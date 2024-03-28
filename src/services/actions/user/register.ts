import { registerRequest } from '../../../utils/api';
import { setCookie } from '../../../utils/cookie';
import { AppDispatch, AppThunkAction } from '../../../utils/types';

export const REGISTER_REQUEST: 'REGISTER_REQUEST' = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS: 'REGISTER_SUCCESS' = 'REGISTER_SUCCESS';
export const REGISTER_ERROR: 'REGISTER_ERROR' = 'REGISTER_ERROR';

interface IRegisterRequestAction {
  readonly type: typeof REGISTER_REQUEST;
}

interface IRegisterSuccessAction {
  readonly type: typeof REGISTER_SUCCESS;
  readonly email: string;
  readonly name: string;
}

interface IRegisterErrorAction {
  readonly type: typeof REGISTER_ERROR;
}

export type TRegisterActions = IRegisterRequestAction | IRegisterSuccessAction | IRegisterErrorAction;

const registerReq = (): IRegisterRequestAction => ({
  type: REGISTER_REQUEST,
});

const registerSuccess = (email: string, name: string): IRegisterSuccessAction => ({
  type: REGISTER_SUCCESS,
  email,
  name,
});

const registerError = (): IRegisterErrorAction => ({
  type: REGISTER_ERROR,
});

export const registerAction = (email: string, password: string, name: string): AppThunkAction => {
  return (dispatch: AppDispatch) => {
    dispatch(registerReq());
    registerRequest(email, password, name)
      .then((res) => {
        const accessToken = res.accessToken.split('Bearer ')[1];
        const { refreshToken } = res;
        setCookie('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        dispatch(registerSuccess(res.user.email, res.user.name));
      })
      .catch(() => dispatch(registerError()));
  };
};
