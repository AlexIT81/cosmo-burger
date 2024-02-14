import {} from '../actions/burger';
import { LOGIN_ERROR, LOGIN_REQUEST, LOGIN_SUCCESS } from '../actions/user/login';
import { LOGOUT_ERROR, LOGOUT_REQUEST, LOGOUT_SUCCESS } from '../actions/user/logout';
import { REGISTER_ERROR, REGISTER_REQUEST, REGISTER_SUCCESS } from '../actions/user/register';

const initialState = {
  user: {
    email: null,
    name: null,
  },
  isLogedIn: false,
  isLoading: false,
  isRequestFailed: false,
};

// eslint-disable-next-line
export const userReducer = (state = initialState, action) => {
  const { type, ...rest } = action;
  switch (action.type) {
    case REGISTER_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case REGISTER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isRequestFailed: false,
        isLogedIn: true,
        user: {
          email: rest.email,
          name: rest.name,
        },
      };
    }
    case REGISTER_ERROR: {
      return {
        ...state,
        isLogedIn: false,
        isRequestFailed: true,
      };
    }
    case LOGIN_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isRequestFailed: false,
        isLogedIn: true,
        user: {
          email: rest.email,
          name: rest.name,
        },
      };
    }
    case LOGIN_ERROR: {
      return {
        ...state,
        isLogedIn: false,
        isRequestFailed: true,
      };
    }
    case LOGOUT_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case LOGOUT_SUCCESS: {
      return initialState;
    }
    case LOGOUT_ERROR: {
      return {
        ...state,
        isRequestFailed: true,
      };
    }
    default: {
      return state;
    }
  }
};
