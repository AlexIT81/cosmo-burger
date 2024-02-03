import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredientsReducer';
import { ingredientReducer } from './ingredientReducer';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  ingredient: ingredientReducer,
});
