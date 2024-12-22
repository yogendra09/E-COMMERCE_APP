import { configureStore } from '@reduxjs/toolkit'
import { userReducer } from './Reducers/userReducer'
import { productReducer } from './Reducers/productReducer'

export const store = configureStore({
  reducer: {
    userReducer: userReducer.reducer,
    productReducer: productReducer.reducer,
  },
})