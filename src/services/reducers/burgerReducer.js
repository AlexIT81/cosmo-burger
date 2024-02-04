import { ADD_BURGER_INGREDIENT, CLEAR_BURGER_INGREDIENT, REMOVE_BURGER_INGREDIENT } from '../actions/burger';

const initialState = {
  bun: null,
  ingredients: [],
};

// eslint-disable-next-line
export const burgerReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BURGER_INGREDIENT: {
      if (action.payload.type === 'bun') {
        return { ...state, bun: action.payload };
      }
      return { ...state, ingredients: [...state.ingredients, action.payload] };
    }
    case REMOVE_BURGER_INGREDIENT: {
      if (action.payload.type === 'bun') {
        return {
          ...state,
          bun: initialState.bun,
        };
      }
      return { ...state, ingredients: [...state.ingredients].filter((item) => item.id !== action.payload) };
    }
    case CLEAR_BURGER_INGREDIENT: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};
