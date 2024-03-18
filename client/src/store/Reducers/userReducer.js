import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
}

export const userReducer = createSlice({
  name: 'counter',
  initialState,
  reducers: {
   
  },
})

// Action creators are generated for each case reducer function
export const {  } = userReducer.actions

export default userReducer.reducer