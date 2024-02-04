import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredientsReducer';
import { ingredientReducer } from './ingredientReducer';
import { burgerReducer } from './burgerReducer';
import { orderReducer } from './orderReducer';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  ingredient: ingredientReducer,
  burger: burgerReducer,
  order: orderReducer,
});
