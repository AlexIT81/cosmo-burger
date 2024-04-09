import { clearOrder, getOrderFailed, getOrderRequest, getOrderSuccess } from '../services/actions/order';
import { orderReducer, initialState } from '../services/reducers/orderReducer';
import { TEST_ORDER } from '../utils/test-constants';

describe('orderReducer', () => {
  it("should return initialState", () => {
    expect(orderReducer(undefined, {} as any)).toEqual(initialState);
  });

  it('should handle GET_ORDER_REQUEST', () => {
    expect(orderReducer(initialState, getOrderRequest())).toEqual({
      ...initialState,
      orderRequest: true,
    });
  });

  it('should handle GET_ORDER_SUCCESS', () => {
    expect(orderReducer(initialState, getOrderSuccess(TEST_ORDER))).toEqual({
      ...initialState,
      order: TEST_ORDER,
    });
  });

  it('should handle GET_ORDER_FAILED', () => {
    expect(orderReducer(initialState, getOrderFailed())).toEqual({
      ...initialState,
      orderFailed: true,
    });
  });

  it('should handle CLEAR_ORDER', () => {
    const state = {
      order: TEST_ORDER,
      orderRequest: false,
      orderFailed: false,
    }  
    expect(orderReducer(state, clearOrder())).toEqual({ ...initialState });
  });
});
