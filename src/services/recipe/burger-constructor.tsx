import { createSlice } from '@reduxjs/toolkit'
import { IBurgerConstructorSliceState, IIngredientsData, IIngredientsDataWithKey } from '../../shared/interfaces';

export const burgerConstructorInitialState: IBurgerConstructorSliceState = {
    bun: {
      _id: '',
      name: '',
      type: '',
      proteins: 0,
      fat: 0,
      carbohydrates: 0,
      calories: 0,
      price: 0,
      image: '',
      image_mobile: '',
      image_large: '',
      __v: 0
    },
    ingredients: [],
    totalPrice: 0
}

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState: burgerConstructorInitialState,
  reducers: {
    setBun(state, action) {
      state.bun = action.payload;
    },
    addIngredient(state: IBurgerConstructorSliceState, action: {payload: IIngredientsDataWithKey}) {
      state.ingredients.push(action.payload);
    },
    moveIngredient(state, action) {
      const movedItem = state.ingredients.splice(action.payload.oldIndex, 1);
      state.ingredients.splice(action.payload.newIndex, 0, movedItem[0]);
    },
    deleteIngredient(state, action) {
      state.ingredients.splice(action.payload, 1);
    },
    clearIngredients(state) {
      state.ingredients = [];
    },
    calcTotalPrice(state) {
        !!state.bun.name && !!state?.bun?.price ? 
        (
            state.totalPrice = state?.bun?.price * 2 + state.ingredients.reduce((accum: number, current: IIngredientsData) => accum + (current.price || 0), 0)
        ) : 
        ( 
            state.ingredients.length ? 
            (
                state.totalPrice = state.ingredients.reduce((accum: number, current: IIngredientsData) => accum + (current.price || 0), 0)
            ) : 
            (
                state.totalPrice = 0
            )
        );
    }
  }
}) 