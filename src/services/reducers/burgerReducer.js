import {
  ADD_BURGER_INGREDIENT,
  REMOVE_BURGER_INGREDIENT,
} from '../actions/burger';

const initialState = {
  //   bun: {
  //     "_id":"60666c42cc7b410027a1a9b1",
  //     "name":"Краторная булка N-200i",
  //     "type":"bun",
  //     "proteins":80,
  //     "fat":24,
  //     "carbohydrates":53,
  //     "calories":420,
  //     "price":1255,
  //     "image":"https://code.s3.yandex.net/react/code/bun-02.png",
  //     "image_mobile":"https://code.s3.yandex.net/react/code/bun-02-mobile.png",
  //     "image_large":"https://code.s3.yandex.net/react/code/bun-02-large.png",
  //     "__v":0
  //  },
  bun: null,
  ingredients: [],
};

// eslint-disable-next-line
export const burgerReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BURGER_INGREDIENT: {
      if (action.payload.type === 'bun') {
        return {
          ...state,
          bun: action.payload,
        };
      }
      return { ...state, ingredients: [...state.ingredients, action.payload] };
    }
    case REMOVE_BURGER_INGREDIENT: {
      if (action.payload.type === 'bun') {
        return {
          ...state,
          bun: initialState.bun,
        };
      }
      return {
        ...state,
        ingredients: [...state.ingredients].filter(
          (item) => item.id !== action.payload,
        ),
      };
    }
    default: {
      return state;
    }
  }
};
