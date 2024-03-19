import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  CLEAR_ORDER,
  TGetOrderActions,
} from '../actions/order';

type TOrderState = {
  order: any,
  orderRequest: boolean,
  orderFailed: boolean,
}

const initialState: TOrderState = {
  order: {},
  orderRequest: false,
  orderFailed: false,
};

// eslint-disable-next-line
export const orderReducer = (state = initialState, action: TGetOrderActions): TOrderState => {
  switch (action.type) {
    case GET_ORDER_REQUEST: {
      return { ...state, orderRequest: true };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        orderFailed: false,
        order: action.payload,
        orderRequest: false,
      };
    }
    case GET_ORDER_FAILED: {
      return { ...state, orderFailed: true, orderRequest: false };
    }
    case CLEAR_ORDER: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};
