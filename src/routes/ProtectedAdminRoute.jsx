import React from "react";
import { Navigate } from "react-router";

const ProtectedAdminRoute = ({ children }) => {
  const userData = localStorage.getItem("userData");
  const parsedUserData = userData ? JSON.parse(userData) : null;

  if (!parsedUserData?.role) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedAdminRoute;
