import { ReactElement, ReactNode } from 'react';

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
}

export interface IIngredientWithId extends IIngredient {
  id: string;
}

export interface IOnlyModal {
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

export interface IConstructorTotal extends IOnlyModal {
  totalSum: number;
}

export interface IIngredientsList {
  ingredients: IIngredient[];
}

export interface IModalOverlay {
  closeModal: () => void;
  children: ReactNode;
}

export interface IModal extends IModalOverlay {
  title?: string;
}

export interface IProtectedRouteElement {
  element: ReactElement;
  needAuth: boolean;
}

export interface IUseForm {
  [name: string]: string | number | boolean | undefined;
}

export interface IBodyRequest {
  name?: string;
  email?: string;
  password?: string;
}

// API
export type TServerResponse<T> = {
  success: boolean;
} & T;

export type TGetDataRequest = TServerResponse<{
  data: IIngredient[];
}>;

export type TCreateOrderRequest = TServerResponse<{
  name: string;
  order: {
      number: number;
  }
}>

export type TPasswordAndLogoutRequest = TServerResponse<{
  message: string;
}>

export type TGetUserDataRequest = TServerResponse<{
  user: {
      email: string,
      name: string,
  },
}>

export type TRegisterAndAuthRequest = TGetUserDataRequest & {
  accessToken: string;
  refreshToken: string;
}
