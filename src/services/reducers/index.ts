import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredientsReducer';
import { ingredientReducer } from './ingredientReducer';
import { burgerReducer } from './burgerReducer';
import { orderReducer } from './orderReducer';
import { userReducer } from './userReducer';
import { wsReducer } from './wsReducer';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  ingredient: ingredientReducer,
  burger: burgerReducer,
  order: orderReducer,
  user: userReducer,
  orders: wsReducer,
});
