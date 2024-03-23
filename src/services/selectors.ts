import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../utils/types';

// Селекторы
export const getBurgerIngredientsSelector = (state: RootState) => {
  return state.burger.ingredients;
};

export const getBurgerBunSelector = (state: RootState) => {
  return state.burger.bun;
};

export const getBurgerIngredientsErrorSelector = (state: RootState) => {
  return state.ingredients.ingredientsFailed;
};

export const getInrgedientsSelector = (state: RootState) => {
  return state.ingredients.ingredients;
};

export const getCurrentInrgedientSelector = (state: RootState) => {
  return state.ingredient.ingredient;
};

export const getOrderSelector = (state: RootState) => {
  return state.order.order.order;
};

export const getOrderRequestActiveSelector = (state: RootState) => {
  return state.order.orderRequest;
};

export const getOrderErrorSelector = (state: RootState) => {
  return state.order.orderFailed;
};

const selectIngredients = (state: RootState) => state.burger.ingredients;
const selectBun = (state: RootState) => state.burger.bun;

export const getAllBurgerParts = createSelector([selectIngredients, selectBun], (a, b) => {
  if (a.length > 0 || b !== null) return [...a, b];
  return [];
});

// Users selectors
export const getUserDataSelector = (state: RootState) => {
  return state.user.user;
};

export const isLoggedInSelector = (state: RootState) => {
  return state.user.isLoggedIn;
};

// WS orders selectors
export const getAllOrdersQuantitySelector = (state: RootState) => {
  return state.orders.orders?.total;
};

export const getTodayOrdersQuantitySelector = (state: RootState) => {
  return state.orders.orders?.totalToday;
};

export const getAllOrdersSelector = (state: RootState) => {
  return state.orders.orders?.orders;
};

export const getWsConnectionStatusSelector = (state: RootState) => {
  return state.orders.wsConnected;
}

export const getUserDataLoading = (state: RootState) => {
  return state.user.isLoading;
}
