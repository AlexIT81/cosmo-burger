import { wsConnectionClosedAction, wsConnectionErrorAction, wsConnectionStartAction, wsConnectionSuccessAction, wsGetOrdersAction } from '../services/actions/wsActions';
import { wsReducer, initialState } from '../services/reducers/wsReducer';
import { TEST_WS_ORDERS } from '../utils/test-constants';

describe('wsReducer', () => {
  it('should return initialState', () => {
    expect(wsReducer(undefined, {} as any)).toEqual(initialState);
  });

  it('should handle WS_CONNECTION_START', () => {
    expect(wsReducer(initialState, wsConnectionStartAction(''))).toEqual({
      ...initialState,
      error: undefined,
    });
  });

  it('should handle WS_CONNECTION_SUCCESS', () => {
    expect(wsReducer(initialState, wsConnectionSuccessAction())).toEqual({
      ...initialState,
      error: undefined,
      wsConnected: true,
    });
  });

  it('should handle WS_CONNECTION_ERROR', () => {
    expect(wsReducer(initialState, wsConnectionErrorAction({} as any))).toEqual({
      ...initialState,
      error: {},
      wsConnected: false,
    });
  });
  
  it('should handle WS_CONNECTION_CLOSED', () => {
    expect(wsReducer(initialState, wsConnectionClosedAction())).toEqual({
      ...initialState,
      error: undefined,
      wsConnected: false,
      orders: null,
    });
  });

  it('should handle WS_GET_ORDERS', () => {
    expect(wsReducer(initialState, wsGetOrdersAction(TEST_WS_ORDERS))).toEqual({
      ...initialState,
      error: undefined,
      orders: TEST_WS_ORDERS,
    });
  });
});
