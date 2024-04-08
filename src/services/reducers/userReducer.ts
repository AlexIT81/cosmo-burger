import { TUserActions } from '../actions/user';
import { GET_USER_DATA_ERROR, GET_USER_DATA_REQUEST, GET_USER_DATA_SUCCESS } from '../actions/user/get-user';
import { LOGIN_ERROR, LOGIN_REQUEST, LOGIN_SUCCESS } from '../actions/user/login';
import { LOGOUT_ERROR, LOGOUT_REQUEST, LOGOUT_SUCCESS } from '../actions/user/logout';
import { REGISTER_ERROR, REGISTER_REQUEST, REGISTER_SUCCESS } from '../actions/user/register';
import { SET_USER_DATA_ERROR, SET_USER_DATA_REQUEST, SET_USER_DATA_SUCCESS } from '../actions/user/set-user';

type TUserState = {
  user: {
    email: string | null,
    name: string | null,
  },
  isLoggedIn: boolean,
  isLoading: boolean,
  isRequestFailed: boolean,
}

export const initialState: TUserState = {
  user: {
    email: null,
    name: null,
  },
  isLoggedIn: false,
  isLoading: false,
  isRequestFailed: false,
};

// eslint-disable-next-line
export const userReducer = (state = initialState, action: TUserActions): TUserState => {
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
        isLoggedIn: true,
        user: {
          email: action.email,
          name: action.name,
        },
      };
    }
    case REGISTER_ERROR: {
      return {
        ...state,
        isLoggedIn: false,
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
        isLoggedIn: true,
        user: {
          email: action.email,
          name: action.name,
        },
      };
    }
    case LOGIN_ERROR: {
      return {
        ...state,
        isLoggedIn: false,
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
        isLoggedIn: true,
        user: {
          email: action.email,
          name: action.name,
        },
      };
    }
    case GET_USER_DATA_ERROR: {
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        isRequestFailed: true,
      };
    }
    case SET_USER_DATA_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case SET_USER_DATA_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isRequestFailed: false,
        user: {
          email: action.email,
          name: action.name,
        },
      };
    }
    case SET_USER_DATA_ERROR: {
      return {
        ...state,
        isLoading: false,
        isRequestFailed: true,
      };
    }
    default: {
      return state;
    }
  }
};
