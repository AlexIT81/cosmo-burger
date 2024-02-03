export const API_URL = 'https://norma.nomoreparties.space/api';
export const ESC_KEYCODE = 27;

// Селекторы
export const getBurgerIngredientsSelector = (state) => {
  return state.burger.ingredients;
}

export const getBurgerBunSelector = (state) => {
  return state.burger.bun;
}

export const getInrgedientsSelector = (state) => {
  return state.ingredients.ingredients;
}

export const getCurrentInrgedientSelector = (state) => {
  return state.ingredient.ingredient;
}