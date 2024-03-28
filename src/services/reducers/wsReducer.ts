import { IOrdersResponse } from '../../utils/types';
import {
  TWSActions,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_SUCCESS,
  WS_GET_ORDERS,
} from '../actions/wsActions';

type TWSState = {
  wsConnected: boolean;
  orders: IOrdersResponse | null;
  error?: Event;
};

const initialState: TWSState = {
  wsConnected: false,
  orders: null,
};

// eslint-disable-next-line default-param-last
export const wsReducer = (state = initialState, action: TWSActions) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        error: undefined,
        wsConnected: true,
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnected: false,
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        error: undefined,
        wsConnected: false,
        orders: null,
      };

    case WS_GET_ORDERS:
      return {
        ...state,
        error: undefined,
        orders: action.payload,
      };

    default:
      return state;
  }
};
