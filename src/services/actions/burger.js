import { v4 as uuidv4 } from 'uuid';

export const ADD_BURGER_INGREDIENT = 'ADD_BURGER_INGREDIENT';
export const REMOVE_BURGER_INGREDIENT = 'REMOVE_BURGER_INGREDIENT';
export const CLEAR_BURGER_INGREDIENT = 'CLEAR_BURGER_INGREDIENT';

export const addBurgerIngredient = (ingredient) => {
  return {type: ADD_BURGER_INGREDIENT, payload: { ...ingredient, id: uuidv4()}}
}

export const removeBurgerIngredient = (id) => {
  return {type: REMOVE_BURGER_INGREDIENT, payload: id}
}

export const clearBurgerIngredient = () => {
  return {type: CLEAR_BURGER_INGREDIENT}
}