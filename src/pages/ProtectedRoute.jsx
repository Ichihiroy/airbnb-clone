import { Navigate } from "react-router";

const ProtectedRoute = ({ children }) => {
  const userData = localStorage.getItem("userData");

  if (!userData) {
    return <Navigate to="/auth/login" replace />;
  }

  try {
    const user = JSON.parse(userData);
    if (!user || !user.email || !user.username) {
      localStorage.removeItem("userData");
      return <Navigate to="/auth/login" replace />;
    }
  } catch (error) {
    console.error("Invalid user data in localStorage:", error);
    localStorage.removeItem("userData");
    return <Navigate to="/auth/login" replace />;
  }

  // If user is authenticated, render the protected content
  return children;
};

export default ProtectedRoute;
