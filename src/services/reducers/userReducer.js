import {} from '../actions/burger';
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
          name: rest.name
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
    default: {
      return state;
    }
  }
};
