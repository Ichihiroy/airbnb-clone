import { Navigate } from "react-router";

const ProtectedAuthRoute = ({ children }) => {
  const userData = localStorage.getItem("userData");

  if (userData) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedAuthRoute;
