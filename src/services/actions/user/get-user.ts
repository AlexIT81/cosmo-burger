import { getUserDataRequest } from '../../../utils/api';
import { AppDispatch, AppThunkAction } from '../../../utils/types';

export const GET_USER_DATA_REQUEST: 'GET_USER_DATA_REQUEST' = 'GET_USER_DATA_REQUEST';
export const GET_USER_DATA_SUCCESS: 'GET_USER_DATA_SUCCESS' = 'GET_USER_DATA_SUCCESS';
export const GET_USER_DATA_ERROR: 'GET_USER_DATA_ERROR' = 'GET_USER_DATA_ERROR';

interface IGetUserDataRequestAction {
  readonly type: typeof GET_USER_DATA_REQUEST;
}

interface IGetUserDataSuccessAction {
  readonly type: typeof GET_USER_DATA_SUCCESS;
  readonly email: string;
  readonly name: string;
}

interface IGetUserDataErrorAction {
  readonly type: typeof GET_USER_DATA_ERROR;
}

export type TGetUserDataActions = IGetUserDataRequestAction | IGetUserDataSuccessAction | IGetUserDataErrorAction;

const getUserDataReq = (): IGetUserDataRequestAction => ({
  type: GET_USER_DATA_REQUEST,
});

const getUserDataSuccess = (email: string, name: string): IGetUserDataSuccessAction => ({
  type: GET_USER_DATA_SUCCESS,
  email,
  name,
});

const getUserDataError = (): IGetUserDataErrorAction => ({
  type: GET_USER_DATA_ERROR,
});

export const getUserDataAction = (): AppThunkAction => (dispatch: AppDispatch) => {
  dispatch(getUserDataReq());
  getUserDataRequest()
    .then((res) => {
      dispatch(getUserDataSuccess(res.user.email, res.user.name));
    })
    .catch(() => dispatch(getUserDataError()));
};
