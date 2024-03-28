import { IIngredient } from '../../utils/types';
import { ADD_INGREDIENT, REMOVE_INGREDIENT, TIngredientActions } from '../actions/ingredient';

type TIngredientState = {
  ingredient: IIngredient | {};
};

const initialState: TIngredientState = {
  ingredient: {},
};

// eslint-disable-next-line
export const ingredientReducer = (state = initialState, action: TIngredientActions): TIngredientState => {
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
