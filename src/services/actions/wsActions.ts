import { IOrdersResponse } from '../../utils/types';

export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_GET_ORDERS: 'WS_GET_ORDERS' = 'WS_GET_ORDERS';

interface IWSConnectionStartAction {
  readonly type: typeof WS_CONNECTION_START;
  readonly url: string;
}

interface IWSConnectionSuccessAction {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}

interface IWSConnectionErrorAction {
  readonly type: typeof WS_CONNECTION_ERROR;
  readonly payload: Event;
}

interface IWSConnectionClosedAction {
  readonly type: typeof WS_CONNECTION_CLOSED;
}

interface IWSGetOrdersAction {
  readonly type: typeof WS_GET_ORDERS;
  readonly payload: IOrdersResponse;
}

export const wsConnectionStartAction = (url: string): IWSConnectionStartAction => ({
  type: WS_CONNECTION_START,
  url,
});

export const wsConnectionSuccessAction = (): IWSConnectionSuccessAction => ({
  type: WS_CONNECTION_SUCCESS,
});

export const wsConnectionErrorAction = (payload: Event): IWSConnectionErrorAction => ({
  type: WS_CONNECTION_ERROR,
  payload
});

export const wsConnectionClosedAction = (): IWSConnectionClosedAction => ({
  type: WS_CONNECTION_CLOSED,
});

export const wsGetOrdersAction = (payload: IOrdersResponse): IWSGetOrdersAction => ({
  type: WS_GET_ORDERS,
  payload
});

export type TWSActions =
  | IWSConnectionStartAction
  | IWSConnectionSuccessAction
  | IWSConnectionErrorAction
  | IWSConnectionClosedAction
  | IWSGetOrdersAction;

export type TWSStoreActions = {
  wsInit: typeof WS_CONNECTION_START;
  onOpen: typeof WS_CONNECTION_SUCCESS;
  onClose: typeof WS_CONNECTION_CLOSED;
  onError: typeof WS_CONNECTION_ERROR;
  onMessage: typeof WS_GET_ORDERS;
};
