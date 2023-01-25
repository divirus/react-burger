import { createSlice } from '@reduxjs/toolkit'

export const ingredientSlice = createSlice({
  name: 'ingredient',
  initialState: {
    selectedIngredient: {},
    isIngredientModalOpen: false
  },
  reducers: {
    openIngredientModal(state: any, action) {
      state.isIngredientModalOpen = true;
      state.selectedIngredient = action.payload;
    },
    closeIngredientModal(state: any) {
      state.isIngredientModalOpen = false;
      state.selectedIngredient = {};
    }
  }
}) 