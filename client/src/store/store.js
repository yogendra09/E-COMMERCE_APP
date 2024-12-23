import { configureStore } from '@reduxjs/toolkit'
import { userReducer } from './Reducers/userReducer'
import { productReducer } from './Reducers/productReducer'
import { cartReducer } from './Reducers/cartReducer'

export const store = configureStore({
  reducer: {
    userReducer: userReducer.reducer,
    productReducer: productReducer.reducer,
    cartReducer:cartReducer.reducer
  },
})