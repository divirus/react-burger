import { combineReducers } from '@reduxjs/toolkit'
import { itemsSlice } from "./items";
import { burgerConstructorSlice } from "./burger-constructor";
import { orderSlice } from "./order";
import { userSlice } from '../user';

const rootReducer = combineReducers(
  {
    items: itemsSlice.reducer,
    order: orderSlice.reducer,    
    burgerConstructor: burgerConstructorSlice.reducer,
    user: userSlice.reducer,
  }
)

export default rootReducer