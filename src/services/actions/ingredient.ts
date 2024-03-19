import { IIngredient } from '../../utils/types';

export const ADD_INGREDIENT: 'ADD_INGREDIENT' = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT: 'REMOVE_INGREDIENT' = 'REMOVE_INGREDIENT';

export interface IAddIngredient {
  readonly type: typeof ADD_INGREDIENT;
  readonly payload: IIngredient;
}

export interface IRemoveIngredient {
  readonly type: typeof REMOVE_INGREDIENT;
}

export type TIngredientActions = IAddIngredient | IRemoveIngredient;

export const addIngredient = (ingredient: IIngredient): IAddIngredient => {
  return { type: ADD_INGREDIENT, payload: ingredient };
};

export const removeIngredient = (): IRemoveIngredient => {
  return { type: REMOVE_INGREDIENT };
};
