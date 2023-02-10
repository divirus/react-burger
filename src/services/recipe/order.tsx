import { createSlice } from '@reduxjs/toolkit'
import { Dispatch } from 'react';
import { getOrdersData  } from "../../utils/api";
import { burgerConstructorSlice } from './burger-constructor';
import { itemsSlice } from './items';

export const orderInitialState = {
  orderData: {},
  orderPendingStatus: '',
  isOrderModalOpen: false,
}

export const createOrder = (items: string[]) => {
  return ((dispatch: Dispatch<any>) => {
    dispatch(orderSlice.actions.request());

    getOrdersData(items)
    .then((data) => {
      if (data.success) {
        dispatch(orderSlice.actions.success({
          name: data.name,
          number: data.order.number,
          success: data.success
        }))
      } else {
        dispatch(orderSlice.actions.failed())
        throw Error(data.message);
      }
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      dispatch(orderSlice.actions.openOrderModal())
      dispatch(burgerConstructorSlice.actions.setBun({}));
      dispatch(burgerConstructorSlice.actions.clearIngredients());
      dispatch(itemsSlice.actions.clearValues());
    })
  })
}

export const orderSlice = createSlice({
  name: 'order',
  initialState: orderInitialState,
  reducers: {
    request(state) {
      state.orderPendingStatus = 'loading';
    },
    failed(state) {
      state.orderPendingStatus = 'error';
      state.orderData = {
        id: null,
        name: null,
        success: false
      }
    },
    success(state, action) {
      state.orderPendingStatus = 'success';
      state.orderData = {
        name: action.payload.name,
        id: action.payload.number,
        success: action.payload.success
      }
    },
    openOrderModal(state) {
      state.isOrderModalOpen = true;
    },
    closeOrderModal(state) {
      state.isOrderModalOpen = false;
    }
  }
}) 