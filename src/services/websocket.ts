import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IWsState } from '../shared/interfaces';

const initialState: IWsState = {
  wsConnected: false,
  wsError: false,
}

export const wsSlice = createSlice({
  name: 'ws',
  initialState,
  reducers: {
    wsConnectionStart(state, action: PayloadAction<{url: string, token?: string}>) {},

    wsConnectionStop(state) {
      state.wsConnected = false;
      state.wsError = false;
    },

    wsConnectionSuccess(state) {
      state.wsConnected = true;
      state.wsError = false;
    },

    wsConnectionError(state) {
      state.wsConnected = false;
      state.wsError = true;
    },

    wsConnectionClosed(state) {
      state.wsConnected = false;
      state.wsError = false;
    }
  }
}) 

