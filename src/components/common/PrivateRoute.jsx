import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  return user ? children : <Navigate to="/login" />; //kullanıcı varsa children'ı render et, yoksa login sayfasına yönlendir
};

export default PrivateRoute;
