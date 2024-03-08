import { ReactElement, ReactNode } from "react";

export interface IIngredient {
  _id: string;
  name: string;
  type: 'bun' | 'sauce' | 'main';
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
};

export interface IIngredientWithId extends IIngredient {
  id: string;
};

export interface IBurgerConstructor {
  handleModalOrder: () => void;
}

export interface IConstructorCard {
  id?: string;
  isDraggable: boolean;
  isLocked: boolean;
  name: string;
  price: number;
  img: string;
  type?: 'top' | 'bottom';
  index?: number; 
}

export interface IHoverItem {
  id: string;
  index: number;
}

export interface IConstructorTotal {
  totalSum: number;
  handleModalOrder: () => void;
}

export interface IIngredientsList {
  ingredients: IIngredient[];
}

export interface IModal {
  title?: string;
  closeModal: () => void;
  children: ReactNode;
}

export interface IModalOverlay {
  closeModal: () => void;
  children: ReactNode; 
}

export interface IProtectedRouteElement {
  element: ReactElement;
  needAuth: boolean;
}