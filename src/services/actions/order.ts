import { createOrderRequest } from '../../utils/api';
import { AppDispatch, AppThunkAction, TCreateOrderRequest } from '../../utils/types';

export const GET_ORDER_REQUEST: 'GET_ORDER_REQUEST' = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS: 'GET_ORDER_SUCCESS' = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED: 'GET_ORDER_FAILED' = 'GET_ORDER_FAILED';
export const CLEAR_ORDER: 'CLEAR_ORDER' = 'CLEAR_ORDER';

interface IGetOrderRequestAction {
  readonly type: typeof GET_ORDER_REQUEST;
}

interface IGetOrderSuccessAction {
  readonly type: typeof GET_ORDER_SUCCESS;
  readonly payload: TCreateOrderRequest;
}

interface IGetOrderFailedAction {
  readonly type: typeof GET_ORDER_FAILED;
}

interface IClearOrderAction {
  readonly type: typeof CLEAR_ORDER;
}

export type TGetOrderActions =
  | IGetOrderRequestAction
  | IGetOrderSuccessAction
  | IGetOrderFailedAction
  | IClearOrderAction;

const getOrderRequest = (): IGetOrderRequestAction => ({
  type: GET_ORDER_REQUEST,
});

const getOrderSuccess = (res: TCreateOrderRequest): IGetOrderSuccessAction => ({
  type: GET_ORDER_SUCCESS,
  payload: res,
});

const getOrderFailed = () => ({
  type: GET_ORDER_FAILED,
});

export const clearOrder = () => ({
  type: CLEAR_ORDER,
});

export const getOrder = (data: string[]):AppThunkAction => (dispatch: AppDispatch) => {
  dispatch(getOrderRequest());
  createOrderRequest(data)
    .then((res) => {
      dispatch(getOrderSuccess(res));
    })
    .catch((err) => dispatch(getOrderFailed()));
};
