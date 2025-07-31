// Import React and the tool to access shared auth data (like if user is logged in)
import React, { useContext } from 'react';

// Import Navigate to redirect users to another page
import { Navigate } from 'react-router-dom';

// Import the AuthContext where we store login info
import { AuthContext } from '../context/AuthContext';

// This component protects public routes like "/login" or "/" from logged-in users
const ProtectedRoute = ({ children }) => {
  // Get the current user from AuthContext
  const { user } = useContext(AuthContext);

  // If user is already logged in, send them to dashboard
  return user ? <Navigate to="/dashboard" /> : children;

  // If user is not logged in, allow them to access the route (e.g., Home, Login, Signup)
};

export default ProtectedRoute;
