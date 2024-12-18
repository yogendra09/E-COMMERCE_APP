import axios from "@/utils/axios";
import { toast } from "react-toastify";



export const asyncUserLogin = (user) => async (dispatch) => {
    try {
      const { data } = await axios.post("/user/login", user);
      localStorage.setItem("token", data.token);
    //   dispatch(asyncCurrentUser());
    //   dispatch(asyncUpdateProduct());
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message)
      console.log(error.response.data.message || error);
    }
  };
  
  export const asyncUserLogout = () => async (dispatch) => {
    try {
      const { data } = await axios.post("/user/logout", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      
      if(data){
          localStorage.removeItem("token");
        //   dispatch(removeUser());
          toast.success(data.message)
      }else{
          toast.error("error occured")
      }
  
    } catch (error) {
      toast.error(error.response.data.message)
      console.log(error.response.data.message || error);
    }
  };