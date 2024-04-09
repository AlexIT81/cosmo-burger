import { addIngredient, removeIngredient } from '../services/actions/ingredient';
import { ingredientReducer, initialState } from '../services/reducers/ingredientReducer';
import { TEST_INGREDIENT_BUN, TEST_INGREDIENT_MAIN, TEST_INGREDIENT_SAUCE } from '../utils/test-constants';
import { IIngredient } from '../utils/types';

describe('ingredientReducer', () => {
  it('should return initialState', () => {
    expect(ingredientReducer(undefined, {} as any)).toEqual(initialState);
  });

  it('should handle ADD_INGREDIENT', () => {
    expect(ingredientReducer(initialState, addIngredient(TEST_INGREDIENT_MAIN as IIngredient))).toEqual({
      ingredient: TEST_INGREDIENT_MAIN,
    });
    expect(ingredientReducer(initialState, addIngredient(TEST_INGREDIENT_BUN as IIngredient))).toEqual({
      ingredient: TEST_INGREDIENT_BUN,
    });
    expect(ingredientReducer(initialState, addIngredient(TEST_INGREDIENT_SAUCE as IIngredient))).toEqual({
      ingredient: TEST_INGREDIENT_SAUCE,
    });
  });

  it('should handle REMOVE_INGREDIENT', () => {
    const state = {
      ingredient: TEST_INGREDIENT_MAIN,
    };
    expect(ingredientReducer(state, removeIngredient())).toEqual({ ...initialState });
  });
});
