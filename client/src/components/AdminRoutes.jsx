import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { asyncCurrentUser } from "@/store/Actions/userAction";
import { useDispatch, useSelector } from "react-redux";

const AdminRoutes = () => {
  const dispatch = useDispatch();
  const { isAdmin } = useSelector((state) => state.userReducer);

  useEffect(()=>{
    dispatch(asyncCurrentUser());
  },[dispatch, isAdmin]);
  return isAdmin ? <Outlet /> : <Navigate to="/login" replace />;
};

export default AdminRoutes;
