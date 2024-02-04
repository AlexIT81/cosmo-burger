import { createOrder } from '../../utils/api';

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';
export const CLEAR_ORDER = 'CLEAR_ORDER';

export const clearOrder = () => {
  return {type: CLEAR_ORDER}
}

export function getOrder(data) {
  return function (dispatch) {
    dispatch({
      type: GET_ORDER_REQUEST,
    });
    createOrder(data).then((res) => {
      if (res && res.success) {
        dispatch({
          type: GET_ORDER_SUCCESS,
          payload: res,
        });
      } else {
        dispatch({
          type: GET_ORDER_FAILED,
        });
      }
    })
    .catch((err) => dispatch({type: GET_ORDER_FAILED}));
  };
}
