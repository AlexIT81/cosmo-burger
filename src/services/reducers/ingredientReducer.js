import { ADD_INGREDIENT, REMOVE_INGREDIENT } from '../actions/ingredient';

const initialState = {
  ingredient: {},
};

// eslint-disable-next-line
export const ingredientReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT: {
      return {
        ...state,
        ingredient: action.payload,
      };
    }
    case REMOVE_INGREDIENT: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};
