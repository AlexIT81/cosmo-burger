import { getIngredientsFailed, getIngredientsRequest, getIngredientsSuccess } from '../services/actions/ingredients';
import { ingredientsReducer, initialState } from '../services/reducers/ingredientsReducer';
import { TEST_INGREDIENTS_ARRAY } from '../utils/test-constants';
import { IIngredient } from '../utils/types';

describe('ingredientsReducer', () => {
  it("should return initialState", () => {
    expect(ingredientsReducer(undefined, {} as any)).toEqual(initialState);
  });

  it('should handle GET_INGREDIENTS_REQUEST', () => {
    expect(ingredientsReducer(initialState, getIngredientsRequest())).toEqual({
      ...initialState,
      ingredientsRequest: true,
    });
  });

  it('should handle GET_INGREDIENTS_SUCCESS', () => {
    expect(ingredientsReducer(initialState, getIngredientsSuccess(TEST_INGREDIENTS_ARRAY as IIngredient[]))).toEqual({
      ...initialState,
      ingredients: TEST_INGREDIENTS_ARRAY,
    });
  });

  it('should handle GET_INGREDIENTS_FAILED', () => {
    expect(ingredientsReducer(initialState, getIngredientsFailed())).toEqual({
      ...initialState,
      ingredientsFailed: true,
    });
  });
});