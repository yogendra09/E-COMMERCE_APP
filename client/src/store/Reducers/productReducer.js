import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  selectedProduct:null
};

export const productReducer = createSlice({
  name: "product",
  initialState,
  reducers: {
    updateProducts: (state, action) => {
      (state.products = action.payload);
    },
    selectedProduct: (state, action) => {
        (state.selectedProduct = action.payload);
    }
  },
});

// Action creators are generated for each case reducer function
export const {updateProducts,selectedProduct } = productReducer.actions;

export default productReducer.reducer;
