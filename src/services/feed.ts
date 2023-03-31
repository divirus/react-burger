import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFeedSliceState, IOrder } from '../shared/interfaces'
import { useAppDispatch } from '../services/hooks'
import { wsSlice } from './websocket';
import { ALL_ORDERS_WS_URL } from '../utils/api';

export const startFeed = () => {
  return (dispatch = useAppDispatch()) => {
    dispatch(wsSlice.actions.wsConnectionStart({ url: ALL_ORDERS_WS_URL }));
    dispatch(feedSlice.actions.request());
  }
}

export const stopFeed = () => {
  return (dispatch = useAppDispatch()) => {
    dispatch(wsSlice.actions.wsConnectionStop());
  }
}

const sortOrdersByDate = (orders: Array<IOrder>): Array<IOrder> => {
  return orders.sort(function(a: IOrder, b: IOrder): number {
    if (!!a.updatedAt && !!b.updatedAt) {
      const keyA: Date = new Date(a.updatedAt);
      const keyB: Date = new Date(b.updatedAt);
      return keyA.valueOf() - keyB.valueOf();
    }
    else return 0;
  });
}

const initialState: IFeedSliceState = {
  orders: [],
  feedRequest: false,
  feedFailed: false,
  feedSuccess: false,
  ordersTotal: 0,
  ordersTotalToday: 0
}

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    request(state) {
      state.feedRequest = true;
      state.feedFailed = false;
      state.feedSuccess = false;
    },
    failed(state) {
      state.feedFailed = true;
      state.feedRequest = false;
      state.feedSuccess = false;
    },
    success(state) {
      state.feedSuccess = true;
      state.feedRequest = false;
      state.feedFailed = false;
    },
    setOrdersData(state, action: PayloadAction<{
      orders: Array<IOrder>,
      total: number,
      totalToday: number
    }>) {
      state.orders = sortOrdersByDate(action.payload.orders);
      state.ordersTotal = action.payload.total;
      state.ordersTotalToday = action.payload.totalToday;
    }
  }
}) 
