import { createSlice } from '@reduxjs/toolkit'
import { getIngredientsData } from "../../utils/api";

export const itemsInitialState = {
    items: [],
    itemsPendingStatus: null,
}

export const getItems = () => {
  return (dispatch: (params: any) => void) => {
    dispatch(itemsSlice.actions.request());

    getIngredientsData()
    .then(({data}: any) => {
        dispatch(itemsSlice.actions.success(data));
    })
    .catch((error: any) => {
        console.log(error);
        dispatch(itemsSlice.actions.failed());
    })
  }
}

export const itemsSlice = createSlice({
  name: 'items',
  initialState: itemsInitialState,
  reducers: {
    request(state: any) {
      state.itemsPendingStatus = 'loading';
    },
    failed(state: any) {
        state.itemsPendingStatus = 'error';
    },
    success(state: any, action: any) {
        state.itemsPendingStatus = 'success';
      state.items = action.payload;
    },
    increaseQuantityValue(state: any, action: any) {
      state.items = [...state.items].map(item =>
        item._id === action.payload ? {
          ...item,
          __v: ++item.__v
        } : item
      );
    },
    decreaseQuantityValue(state: any, action: any) {
      state.items = [...state.items].map(item =>
        item._id === action.payload ? {
          ...item,
          __v: --item.__v
        } : item
      );
    },
    clearValues(state: any) {
      state.items = [...state.items].map(item => ({
          ...item,
          __v: 0
      }));
    }
  }
}) 