import { createSelector } from '@reduxjs/toolkit';
// Селекторы
export const getBurgerIngredientsSelector = (state) => {
  return state.burger.ingredients;
};

export const getBurgerBunSelector = (state) => {
  return state.burger.bun;
};

export const getBurgerIngredientsErrorSelector = (state) => {
  return state.ingredients.ingredientsFailed;
};

export const getInrgedientsSelector = (state) => {
  return state.ingredients.ingredients;
};

export const getCurrentInrgedientSelector = (state) => {
  return state.ingredient.ingredient;
};

export const getOrderSelector = (state) => {
  return state.order.order.order;
};

export const getOrderRequestActiveSelector = (state) => {
  return state.order.orderRequest;
};

export const getOrderErrorSelector = (state) => {
  return state.order.orderFailed;
};

const selectIngredients = (state) => state.burger.ingredients;
const selectBun = (state) => state.burger.bun;

export const getAllBurgerParts = createSelector([selectIngredients, selectBun], (a, b) => {
  if (a.length > 0 || b !== null) return [...a, b];
  return [];
});

// export const getAllBurgerParts = (state) => {
//   return [...state.burger.ingredients, state.burger.bun];
// };
