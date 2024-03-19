import { v4 as uuidv4 } from 'uuid';
import { IIngredient, IIngredientWithId } from '../../utils/types';

export const ADD_BURGER_INGREDIENT: 'ADD_BURGER_INGREDIENT' = 'ADD_BURGER_INGREDIENT';
export const REMOVE_BURGER_INGREDIENT: 'REMOVE_BURGER_INGREDIENT' = 'REMOVE_BURGER_INGREDIENT';
export const CLEAR_BURGER_INGREDIENT: 'CLEAR_BURGER_INGREDIENT' = 'CLEAR_BURGER_INGREDIENT';
export const SORT_BURGER_INGREDIENT: 'SORT_BURGER_INGREDIENT' = 'SORT_BURGER_INGREDIENT';

export interface IAddBurgerIngredientAction {
  readonly type: typeof ADD_BURGER_INGREDIENT;
  readonly payload: IIngredientWithId;
}

export interface IRemoveBurgerIngredientAction {
  readonly type: typeof REMOVE_BURGER_INGREDIENT;
  readonly payload: string;
}

export interface IClearBurgerIngredientAction {
  readonly type: typeof CLEAR_BURGER_INGREDIENT;
}

export interface ISortBurgerIngredientAction {
  readonly type: typeof SORT_BURGER_INGREDIENT;
  readonly payload: {
    [key: string]: number;
  };
}

export type TBurgerActions =
  | IAddBurgerIngredientAction
  | IRemoveBurgerIngredientAction
  | IClearBurgerIngredientAction
  | ISortBurgerIngredientAction;

export const addBurgerIngredient = (ingredient: IIngredient): IAddBurgerIngredientAction => {
  return { type: ADD_BURGER_INGREDIENT, payload: { ...ingredient, id: uuidv4() } };
};

export const removeBurgerIngredient = (id: string): IRemoveBurgerIngredientAction => {
  return { type: REMOVE_BURGER_INGREDIENT, payload: id };
};

export const clearBurgerIngredient = (): IClearBurgerIngredientAction => {
  return { type: CLEAR_BURGER_INGREDIENT };
};

export const sortBurgerIngredient = (dragIndex: number, hoverIndex: number): ISortBurgerIngredientAction => {
  return { type: SORT_BURGER_INGREDIENT, payload: { dragIndex, hoverIndex } };
};
