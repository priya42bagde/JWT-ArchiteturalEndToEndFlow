// Import React and useContext to access global auth state
import React, { useContext } from 'react';

// Import the AuthContext to access user info and logout function
import { AuthContext } from '../context/AuthContext';

// Import useNavigate to redirect users after logout
import { useNavigate } from 'react-router-dom';

// Dashboard component (visible only after login)
const Dashboard = () => {
  // Destructure logoutUser and user from the AuthContext
  const { logoutUser, user } = useContext(AuthContext);

  // Hook to programmatically navigate the user
  const navigate = useNavigate();

  // Function to log the user out and redirect to the home page
  const handleLogout = () => {
    logoutUser(() => navigate('/')); // 👈 Go back to home after logout
  };

  return (
    <div>
      {/* Welcome message showing the user's email, or "User" as fallback */}
      <h1>Welcome, {user?.email || 'User'}!</h1>

      {/* Logout button triggers the handleLogout function */}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

// Export the Dashboard component so it can be used in routes
export default Dashboard;
