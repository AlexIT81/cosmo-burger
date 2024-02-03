import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredientsReducer';
import { ingredientReducer } from './ingredientReducer';
import { burgerReducer } from './burgerReducer';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  ingredient: ingredientReducer,
  burger: burgerReducer,
});
