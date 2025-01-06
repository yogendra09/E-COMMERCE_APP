import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sodeMenu: [],
};

export const sideMenuReducer = createSlice({
  name: "sideMenu",
  initialState,
  reducers: {
    updateSideMenu: (state, action) => {
      (state.products = action.payload);
    },
    addToCart: (state, action) => {
        (state.cart.push(action.payload));
    }
  },
});

// Action creators are generated for each case reducer function
export const {updateSideMenu  } = sideMenuReducer.actions;

export default sideMenuReducer.reducer;
