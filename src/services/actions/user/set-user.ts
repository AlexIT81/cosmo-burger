import { setUserDataRequest } from '../../../utils/api';
import { AppDispatch, AppThunkAction, IBodyRequest } from '../../../utils/types';

export const SET_USER_DATA_REQUEST: 'SET_USER_DATA_REQUEST' = 'SET_USER_DATA_REQUEST';
export const SET_USER_DATA_SUCCESS: 'SET_USER_DATA_SUCCESS' = 'SET_USER_DATA_SUCCESS';
export const SET_USER_DATA_ERROR: 'SET_USER_DATA_ERROR' = 'SET_USER_DATA_ERROR';

interface ISetUserDataRequestAction {
  readonly type: typeof SET_USER_DATA_REQUEST;
}

interface ISetUserDataSuccessAction {
  readonly type: typeof SET_USER_DATA_SUCCESS;
  email: string;
  name: string;
}

interface ISetUserDataErrorAction {
  readonly type: typeof SET_USER_DATA_ERROR;
}

export type TSetUserDataActions = ISetUserDataRequestAction | ISetUserDataSuccessAction | ISetUserDataErrorAction;

const setUserDataReq = (): ISetUserDataRequestAction => ({
  type: SET_USER_DATA_REQUEST,
});

const setUserDataSuccess = (email: string, name: string): ISetUserDataSuccessAction => ({
  type: SET_USER_DATA_SUCCESS,
  email,
  name,
});

const setUserDataError = (): ISetUserDataErrorAction => ({
  type: SET_USER_DATA_ERROR,
});

export const setUserDataAction =
  (data: IBodyRequest): AppThunkAction =>
  (dispatch: AppDispatch) => {
    dispatch(setUserDataReq());
    setUserDataRequest(data)
      .then((res) => {
        dispatch(setUserDataSuccess(res.user.email, res.user.name));
      })
      .catch(() => dispatch(setUserDataError()));
  };
