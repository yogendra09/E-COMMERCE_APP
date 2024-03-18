import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
}

export const sellerReducer = createSlice({
  name: 'counter',
  initialState,
  reducers: {
   
  },
})

// Action creators are generated for each case reducer function
export const {  } = sellerReducer.actions

export default sellerReducer.reducer