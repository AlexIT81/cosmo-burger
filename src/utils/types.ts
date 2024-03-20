import { ReactElement, ReactNode } from 'react';
import { TBurgerActions } from '../services/actions/burger';
import { TIngredientActions } from '../services/actions/ingredient';
import { TGetInrgedientsActions } from '../services/actions/ingredients';
import { TGetOrderActions } from '../services/actions/order';
import { TUserActions } from '../services/actions/user';
import { store } from '../services/store';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { TWSActions } from '../services/actions/wsActions';
import { Interface } from 'readline';

// store
type TApplicationActions =
  | TBurgerActions
  | TIngredientActions
  | TGetInrgedientsActions
  | TGetOrderActions
  | TUserActions
  | TWSActions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, unknown, TApplicationActions>;
export type AppThunkAction<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, TApplicationActions>;

// components
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

export interface IBurgerItem {
  name: string;
  number: number;
  data: string;
  images: string[];
  price: number;
  status?: string;
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
  };
}>;

export type TPasswordAndLogoutRequest = TServerResponse<{
  message: string;
}>;

export type TGetUserDataRequest = TServerResponse<{
  user: {
    email: string;
    name: string;
  };
}>;

export type TRegisterAndAuthRequest = TGetUserDataRequest & {
  accessToken: string;
  refreshToken: string;
};

// WS
export interface IOrder {
  ingredients: string[];
  _id: string;
  status: string;
  number: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}
export interface IOrdersResponse {
  success: boolean;
  total: number;
  totalToday: number;
  orders: IOrder[];
}
