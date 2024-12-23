import { updateCartProducts } from "../Reducers/cartReducer";
import axios from '../../utils/axios';
import { toast } from 'react-toastify';
import { BASE_URL } from "../../constants/apiUrl";

export const asyncUpdateProduct = () => async (dispatch) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/`);
      console.log(data.products)
       dispatch(updateCartProducts(data.products))
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.response.data.message || error);
    }
  };