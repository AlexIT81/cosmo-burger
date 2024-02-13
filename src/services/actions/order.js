import { createOrderRequest } from '../../utils/api';

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';
export const CLEAR_ORDER = 'CLEAR_ORDER';

export const clearOrder = () => {
  return { type: CLEAR_ORDER };
};

export function getOrder(data) {
  return (dispatch) => {
    dispatch({
      type: GET_ORDER_REQUEST,
    });
    createOrderRequest(data)
      .then((res) => {
        dispatch({
          type: GET_ORDER_SUCCESS,
          payload: res,
        });
      })
      .catch((err) => dispatch({ type: GET_ORDER_FAILED }));
  };
}
