import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const AdminRoute = () => {
  const info = useSelector((state) => state.authenSlice.info);
  console.log(info, "info");
  const isLogin = info?.role === "ADMIN";
  console.log(isLogin, "isLogin");
  return isLogin ? <Outlet /> : <Navigate to={"/"} />;
};
