import { createSlice } from '@reduxjs/toolkit'

export const burgerConstructorInitialState = {
    bun: {},
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
    addIngredient(state: any, action: any) {
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
    calcTotalPrice(state: any) {
        !!state.bun.name ? 
        (
            state.totalPrice = state.bun.price * 2 + state.ingredients.reduce((acc: any, p: any) => acc + p.price, 0)
        ) : 
        ( 
            state.ingredients.length ? 
            (
                state.totalPrice = state.ingredients.reduce((acc: any, p: any) => acc + p.price, 0)
            ) : 
            (
                state.totalPrice = 0
            )
        );
    }
  }
}) 