import { Navigate } from "react-router";

const ProtectedRoute = ({ children }) => {
  const userData = localStorage.getItem("userData");

  // If no user data in localStorage, redirect to login
  if (!userData) {
    return <Navigate to="/auth/login" replace />;
  }

  // Try to parse the user data to make sure it's valid
  try {
    const user = JSON.parse(userData);
    // Check if user object has required properties (optional validation)
    if (!user || !user.email || !user.username) {
      localStorage.removeItem("userData"); // Clean up invalid data
      return <Navigate to="/auth/login" replace />;
    }
  } catch (error) {
    // If parsing fails, remove corrupted data and redirect
    console.error("Invalid user data in localStorage:", error);
    localStorage.removeItem("userData");
    return <Navigate to="/auth/login" replace />;
  }

  // If user is authenticated, render the protected content
  return children;
};

export default ProtectedRoute;
