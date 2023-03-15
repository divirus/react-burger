import thunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './recipe/';
import { wsMiddleware } from './middleware/ws-middleware';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(
        thunk,
        wsMiddleware()
      ),
  devTools: process.env.NODE_ENV !== 'production',
  }); 

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch