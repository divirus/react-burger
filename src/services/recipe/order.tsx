import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useAppDispatch } from '../hooks'
import { INewOrder, IRefreshTokenData, IRefreshTokenResponse } from '../../shared/interfaces'
import { getOrdersData } from "../../utils/api";
import { burgerConstructorSlice } from './burger-constructor';
import { itemsSlice } from './items';
import { setCookie } from '../../utils/cookie';
import { refreshToken } from '../user';

export const createOrder = (items: Array<string>) => {
  return (dispatch = useAppDispatch()) => {
    dispatch(orderSlice.actions.request());
    dispatch(orderSlice.actions.openOrderModal());
    
    getOrdersData(items)
      .then((data) => {
        if (data.success) {
          dispatch(orderSlice.actions.success({
            name: data.name,
            number: data.order.number,
            success: data.success
          }))
        } else if (data.message && data.message === 'jwt expired') {
          dispatch(orderSlice.actions.request());
          refreshToken()
          .then((refresh_res: IRefreshTokenResponse) => {
            if (!refresh_res.ok && refresh_res.status >= 500) {
              throw Error(refresh_res.statusText);
            }
            return refresh_res.json();
          })
          .then((refresh_data: IRefreshTokenData) => {
            if (refresh_data.success === true) {
              setCookie('accessToken', refresh_data.accessToken, { path: '/' });
              setCookie('refreshToken', refresh_data.refreshToken, { path: '/' });
              dispatch(orderSlice.actions.request());
              getOrdersData(items)
              .then((data) => {
                if (data.success) {
                  dispatch(orderSlice.actions.success({
                    name: data.name,
                    number: data.order.number,
                    success: data.success
                  }))
                }
                else {
                  throw Error(data.message);
                }
              })
              .catch((error) => {
                dispatch(orderSlice.actions.failed());
                console.log(error);
              })
            }
            else {
              throw Error(refresh_data.message);
            }
          })
          .catch((error: Error) => {
            dispatch(orderSlice.actions.failed());
            console.log(error);
          });
        }
        else {
          throw Error(data.message);
        }
      })
      .catch((error) => {
        dispatch(orderSlice.actions.failed());
        console.log(error);
      })
     .finally(() => {
        dispatch(burgerConstructorSlice.actions.setBun({}));
        dispatch(burgerConstructorSlice.actions.clearIngredients());
        dispatch(itemsSlice.actions.clearValues());
      })
  }
}

interface orderState {
  orderData: INewOrder,
  orderRequest: boolean,
  orderFailed: boolean,
  orderSuccess: boolean,
  isOrderModalOpen: boolean,
}

const initialState: orderState = {
  orderData: {},
  orderRequest: false,
  orderFailed: false,
  orderSuccess: false,
  isOrderModalOpen: false,
}

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    request(state) {
      state.orderRequest = true;
      state.orderFailed = false;
      state.orderSuccess = false;
      state.orderData = {};
    },
    failed(state) {
      state.orderFailed = true;
      state.orderRequest = false;
      state.orderSuccess = false;
      state.orderData = {
        success: false
      }
    },
    success(state, action: PayloadAction<INewOrder>) {
      state.orderSuccess = true;
      state.orderRequest = false;
      state.orderFailed = false;
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
