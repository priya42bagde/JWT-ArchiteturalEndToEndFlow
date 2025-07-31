// Import React and a tool to access shared login state
import React, { useContext } from 'react';

// Import Navigate to redirect users to another route (e.g., login page)
import { Navigate } from 'react-router-dom';

// Import AuthContext to check if user is logged in
import { AuthContext } from '../context/AuthContext';

// This component protects private pages (like dashboard) from non-logged-in users
const PrivateRoute = ({ children }) => {
  // Get the current user from context
  const { user } = useContext(AuthContext);

  // If user exists (logged in), show the protected content (children)
  // Else, redirect them to login page
  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
