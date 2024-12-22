import { toast } from 'react-toastify';
// import axios from '@/utils/axios';
import axios from 'axios';
import { updateProducts } from '@/store/Reducers/productReducer';
import { PRODUCT_API_URL } from '../../constants/apiUrl';

export const asyncUpdateProduct = () => async (dispatch) => {
    try {
      const { data } = await axios.get(`${PRODUCT_API_URL}/products?limit=100`);
      console.log(data.products)
       dispatch(updateProducts(data.products))
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.response.data.message || error);
    }
  };

  // export const asyncAddUpdateProduct = (product) => async (dispatch) => {
  //   try {
  //     const { data } = await axios.post("/product/addupdateproduct",product);
  //      dispatch(updateProducts(data.data))
  //      toast.success(data.message)
  //   } catch (error) {
  //     toast.error(error.response.data.message)
  //     console.log(error.response.data.message || error);
  //   }
  // };

  // export const asyncDeleteProduct = (product) => async (dispatch) => {
  //   try {
  //     const { data } = await axios.post("/product/deleteproduct",product);
  //      dispatch(updateProducts(data.data))
  //      toast.success(data.message)
  //   } catch (error) {
  //     toast.error(error.response.data.message)
  //     console.log(error.response.data.message || error);
  //   }
  // };