import { getDataRequest } from '../../utils/api';
import { IIngredient } from '../../utils/types';
import { AppDispatch, AppThunkAction } from '../../utils/types';

export const GET_INGREDIENTS_REQUEST: 'GET_INGREDIENTS_REQUEST' = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS: 'GET_INGREDIENTS_SUCCESS' = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED: 'GET_INGREDIENTS_FAILED' = 'GET_INGREDIENTS_FAILED';

interface IGetIngredientsRequestAction {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}

interface IGetIngredientsSuccessAction {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly payload: IIngredient[];
}

interface IGetIngredientsFailedAction {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}

export type TGetInrgedientsActions =
  | IGetIngredientsRequestAction
  | IGetIngredientsSuccessAction
  | IGetIngredientsFailedAction;

const getIngredientsRequest = (): IGetIngredientsRequestAction => ({
  type: GET_INGREDIENTS_REQUEST,
});

const getIngredientsSuccess = (ingredients: IIngredient[]): IGetIngredientsSuccessAction => ({
  type: GET_INGREDIENTS_SUCCESS,
  payload: ingredients,
});

const getIngredientsFailed = (): IGetIngredientsFailedAction => ({
  type: GET_INGREDIENTS_FAILED,
});

export const getInrgedients = (): AppThunkAction => (dispatch: AppDispatch) => {
  dispatch(getIngredientsRequest());
  getDataRequest()
    .then((res) => {
      dispatch(getIngredientsSuccess(res.data));
    })
    .catch((err) => dispatch(getIngredientsFailed()));
};
