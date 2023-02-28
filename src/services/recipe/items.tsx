import { createSlice } from '@reduxjs/toolkit'
import { Dispatch } from 'react';
import { IIngridientsData, IItemsSliceState } from '../../shared/interfaces';
import { getIngredientsData } from "../../utils/api";

export const itemsInitialState: IItemsSliceState = {
    items: [],
    itemsPendingStatus: '',
}

export const getItems = () => {
  return ((dispatch : Dispatch<any>) => {
    dispatch(itemsSlice.actions.request());

    getIngredientsData()
    .then((response: {data: IIngridientsData[]}) => {
        dispatch(itemsSlice.actions.success(response.data));
    })
    .catch((error: Error) => {
        console.log(error);
        dispatch(itemsSlice.actions.failed());
    })
  })
}

export const itemsSlice = createSlice({
  name: 'items',
  initialState: itemsInitialState,
  reducers: {
    request(state) {
      state.itemsPendingStatus = 'loading';
    },
    failed(state) {
      state.itemsPendingStatus = 'error';
    },
    success(state, action) {
      state.itemsPendingStatus = 'success';
      state.items = action.payload;
    },
    increaseQuantityValue(state: IItemsSliceState, action) {
      state.items = [...state.items].map(item =>
        item._id === action.payload ? { ...item, value: item?.value ? ++item.value : 1 } : item
      );
    },
    decreaseQuantityValue(state: IItemsSliceState, action) {
      state.items = [...state.items].map(item =>
        item.value && item._id === action.payload ? { ...item, value: --item.value } : item
      );
    },
    clearValues(state: IItemsSliceState) {
      state.items = [...state.items].map(item => (
        {
          ...item,
          value: 0
        }));
    }
  }
}) 