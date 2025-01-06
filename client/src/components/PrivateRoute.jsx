import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { asyncCurrentUser } from "@/store/Actions/userAction";
import { useDispatch, useSelector } from "react-redux";

const PrivateRoute = () => {
  const dispatch = useDispatch();
  const { isAuthenticated ,user} = useSelector((state) => state.userReducer);

  useEffect(()=>{
    console.log(user);
    dispatch(asyncCurrentUser());
  },[dispatch, isAuthenticated])
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
