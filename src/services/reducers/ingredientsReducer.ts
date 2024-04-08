import { IIngredient } from '../../utils/types';
import {
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  TGetInrgedientsActions,
} from '../actions/ingredients';

type TIngredientsState = {
  ingredients: IIngredient[],
  ingredientsRequest: boolean,
  ingredientsFailed: boolean,
};

export const initialState: TIngredientsState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
};

// eslint-disable-next-line default-param-last
export const ingredientsReducer = (state = initialState, action: TGetInrgedientsActions): TIngredientsState => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return { ...state, ingredientsFailed: false, ingredients: action.payload, ingredientsRequest: false };
    }
    case GET_INGREDIENTS_FAILED: {
      return { ...state, ingredientsFailed: true, ingredientsRequest: false };
    }
    default: {
      return state;
    }
  }
};
