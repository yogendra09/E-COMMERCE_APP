import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

export const cartReducer = createSlice({
  name: "product",
  initialState,
  reducers: {
    updateCartProducts: (state, action) => {
      (state.products = action.payload);
    },
    addToCart: (state, action) => {
        (state.cart.push(action.payload));
    }
  },
});

// Action creators are generated for each case reducer function
export const {updateCartProducts, addToCart } = cartReducer.actions;

export default cartReducer.reducer;
