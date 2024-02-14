import {} from '../actions/burger';
import { GET_USER_DATA_ERROR, GET_USER_DATA_REQUEST, GET_USER_DATA_SUCCESS } from '../actions/user/get-user';
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
        isLoading: false,
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
        isLoading: false,
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
        isLoading: false,
      };
    }
    case GET_USER_DATA_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case GET_USER_DATA_SUCCESS: {
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
    case GET_USER_DATA_ERROR: {
      return {
        ...state,
        isLoading: false,
        isLogedIn: false,
        isRequestFailed: true,
      };
    }
    default: {
      return state;
    }
  }
};
