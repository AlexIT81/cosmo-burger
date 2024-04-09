import { getUserDataError, getUserDataReq, getUserDataSuccess } from '../services/actions/user/get-user';
import { loginError, loginReq, loginSuccess } from '../services/actions/user/login';
import { logoutError, logoutReq, logoutSuccess } from '../services/actions/user/logout';
import { registerError, registerReq, registerSuccess } from '../services/actions/user/register';
import { setUserDataError, setUserDataReq, setUserDataSuccess } from '../services/actions/user/set-user';
import { userReducer, initialState } from '../services/reducers/userReducer';
import { TEST_USER_EMAIL, TEST_USER_NAME } from '../utils/test-constants';

describe('userReducer', () => {
  it("should return initialState", () => {
    expect(userReducer(undefined, {} as any)).toEqual(initialState);
  });

  it('should handle REGISTER_REQUEST', () => {
    expect(userReducer(initialState, registerReq())).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('should handle REGISTER_SUCCESS', () => {
    expect(userReducer(initialState, registerSuccess(TEST_USER_EMAIL, TEST_USER_NAME))).toEqual({
      ...initialState,
      isLoggedIn: true,
      user: {
        email: TEST_USER_EMAIL,
        name: TEST_USER_NAME,
      },
    });
  });

  it('should handle REGISTER_ERROR', () => {
    expect(userReducer(initialState, registerError())).toEqual({
      ...initialState,
      isRequestFailed: true,
    });
  });

  it('should handle LOGIN_REQUEST', () => {
    expect(userReducer(initialState, loginReq())).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('should handle LOGIN_SUCCESS', () => {
    expect(userReducer(initialState, loginSuccess(TEST_USER_EMAIL, TEST_USER_NAME))).toEqual({
      ...initialState,
      isLoggedIn: true,
      user: {
        email: TEST_USER_EMAIL,
        name: TEST_USER_NAME,
      },
    });
  });

  it('should handle LOGIN_ERROR', () => {
    expect(userReducer(initialState, loginError())).toEqual({
      ...initialState,
      isRequestFailed: true,
    });
  });

  it('should handle LOGOUT_REQUEST', () => {
    expect(userReducer(initialState, logoutReq())).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('should handle LOGOUT_SUCCESS', () => {
    expect(userReducer(initialState, logoutSuccess())).toEqual({
      ...initialState,
    });
  });

  it('should handle LOGOUT_ERROR', () => {
    expect(userReducer(initialState, logoutError())).toEqual({
      ...initialState,
      isRequestFailed: true,
    });
  });

  it('should handle GET_USER_DATA_REQUEST', () => {
    expect(userReducer(initialState, getUserDataReq())).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('should handle GET_USER_DATA_SUCCESS', () => {
    expect(userReducer(initialState, getUserDataSuccess(TEST_USER_EMAIL, TEST_USER_NAME))).toEqual({
      ...initialState,
      isLoggedIn: true,
      user: {
        email: TEST_USER_EMAIL,
        name: TEST_USER_NAME,
      },
    });
  });

  it('should handle GET_USER_DATA_ERROR', () => {
    expect(userReducer(initialState, getUserDataError())).toEqual({
      ...initialState,
      isRequestFailed: true,
    });
  });

  it('should handle SET_USER_DATA_REQUEST', () => {
    expect(userReducer(initialState, setUserDataReq())).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('should handle SET_USER_DATA_SUCCESS', () => {
    expect(userReducer(initialState, setUserDataSuccess(TEST_USER_EMAIL, TEST_USER_NAME))).toEqual({
      ...initialState,
      user: {
        email: TEST_USER_EMAIL,
        name: TEST_USER_NAME,
      },
    });
  });

  it('should handle SET_USER_DATA_ERROR', () => {
    expect(userReducer(initialState, setUserDataError())).toEqual({
      ...initialState,
      isRequestFailed: true,
    });
  });
});
