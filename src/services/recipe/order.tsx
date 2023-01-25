import { createSlice } from '@reduxjs/toolkit'
import { getOrdersData  } from "../../utils/api";
import { burgerConstructorSlice } from './burger-constructor';
import { itemsSlice } from './items';

export const orderInitialState = {
  orderData: {},
  orderPendingStatus: null,
  isOrderModalOpen: false,
}

export const createOrder = (items: any) => {
  return (dispatch: (params: any) => void) => {
    dispatch(orderSlice.actions.request());

    getOrdersData(items)
    .then(res => {
      if (!res.ok && res.status !== 400) {
        throw Error(res.statusText);
        }
      return res.json();
      })
    .then((data) => {
      if (data.success)
        dispatch(orderSlice.actions.success({
          name: data.name,
          number: data.order.number,
          success: data.success
        }))
      else {
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
  }
}

export const orderSlice = createSlice({
  name: 'order',
  initialState: orderInitialState,
  reducers: {
    request(state: any) {
      state.orderPendingStatus = 'loading';
    },
    failed(state: any) {
      state.orderPendingStatus = 'error';
      state.orderData = {
        success: false
      }
    },
    success(state: any, action) {
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