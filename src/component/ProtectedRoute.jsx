import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children,user, login }) => {
  let location = useLocation();
  // const user = useSelector((state) => state.app.user);

  return login && user?.role === "seller" ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
