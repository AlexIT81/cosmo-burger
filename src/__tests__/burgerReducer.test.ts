import { addBurgerIngredient, clearBurgerIngredient, removeBurgerIngredient, sortBurgerIngredient } from '../services/actions/burger';
import { burgerReducer, initialState, TBurgerState } from '../services/reducers/burgerReducer';
import { TEST_BURGER_STATE, TEST_INGREDIENT_BUN, TEST_INGREDIENT_BUN_WITH_ID, TEST_INGREDIENT_MAIN, TEST_INGREDIENT_MAIN_WITH_ID, TEST_INGREDIENT_SAUCE, TEST_INGREDIENT_SAUCE_WITH_ID } from '../utils/test-constants';
import { IIngredient } from '../utils/types';

describe('burgerReducer', () => {
  it("should return initialState", () => {
    expect(burgerReducer(undefined, {} as any)).toEqual(initialState);
  });

  it('should handle ADD_BURGER_INGREDIENT BUN', () => {
    const result = burgerReducer(initialState, addBurgerIngredient(TEST_INGREDIENT_BUN as IIngredient));
    expect(result.bun).not.toBeNull();
  });

  it('should handle ADD_BURGER_INGREDIENT', () => {
    let result = burgerReducer(initialState, addBurgerIngredient(TEST_INGREDIENT_MAIN as IIngredient));
    expect(result.ingredients.length).toBe(1);

    result = burgerReducer(result, addBurgerIngredient(TEST_INGREDIENT_SAUCE as IIngredient));
    expect(result.ingredients.length).toBe(2);
  });

  it('should handle REMOVE_BURGER_INGREDIENT', () => {
    let result = burgerReducer(TEST_BURGER_STATE as TBurgerState, removeBurgerIngredient('20153d15-105d-42a0-a33f-47a45b590619'));
    expect(result.ingredients.length).toBe(1);
    
    result = burgerReducer(result, removeBurgerIngredient('8b61365e-86f4-47fb-b8ef-c1d3ab39161d'));
    expect(result.ingredients.length).toBe(0);
  });

  it('should handle CLEAR_BURGER_INGREDIENT', () => {
    expect(burgerReducer(TEST_BURGER_STATE as TBurgerState, clearBurgerIngredient())).toEqual({
      ...initialState
    })
  });

  it('should handle SORT_BURGER_INGREDIENT', () => {
    expect(burgerReducer(TEST_BURGER_STATE as TBurgerState, sortBurgerIngredient(0, 1))).toEqual({
      bun: TEST_INGREDIENT_BUN_WITH_ID,
      ingredients: [TEST_INGREDIENT_MAIN_WITH_ID, TEST_INGREDIENT_SAUCE_WITH_ID],
    })
  });
});
