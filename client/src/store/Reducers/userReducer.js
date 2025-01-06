import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  isAdmin: false,
};

export const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      (state.user = action.payload), (state.isAuthenticated = true);
    },
    removeUser: (state) => {
      (state.user = null), (state.isAuthenticated = false);
    },
    setAdmin: (state) => {
      state.isAdmin = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addUser, removeUser,setAdmin } = userReducer.actions;

export default userReducer.reducer;
