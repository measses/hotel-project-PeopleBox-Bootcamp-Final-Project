import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({
  children,
  isAuthenticated,
  userType,
  allowedTypes,
}) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (allowedTypes && !allowedTypes.includes(userType)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
