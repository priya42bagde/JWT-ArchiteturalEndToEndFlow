// Import React and necessary tools
import React, { createContext, useState } from 'react';

// Import axios to make HTTP requests to the backend
import axios from 'axios';

// Create a context — like a shared storage space for auth info (login, signup, user)
export const AuthContext = createContext();

// Create a wrapper (provider) that shares login/signup/logout functions and user info
export const AuthProvider = ({ children }) => {
  // Track the current user (null means not logged in)
  const [user, setUser] = useState(null);

  /**
   * SIGNUP FUNCTION
   * Sends email and password to backend to create a new account
   */
  const signupUser = async (email, password, callback) => {
    try {
      // Send POST request to backend with email & password
      const res = await axios.post(
        'http://localhost:5000/api/signup',
        { email, password },
        { withCredentials: true } // allow sending cookies
      );

      // If signup is successful, show alert
      alert('Signup successful');

      // If a callback is passed, run it (e.g., navigate to login page)
      if (typeof callback === 'function') callback(); // ✅ Safe callback check
    } catch (err) {
      // If signup fails, show error message from backend (or a generic one)
      alert(err.response?.data?.message || 'Signup failed');
      throw err; // rethrow so the form knows something went wrong
    }
  };

  /**
   * LOGIN FUNCTION
   * Sends user credentials to backend to log them in
   */
  const loginUser = async (credentials, callback) => {
    try {
      // Send login request with credentials
      const res = await axios.post(
        'http://localhost:5000/api/login',
        credentials,
        { withCredentials: true }
      );

      // If successful, store user info in state
      setUser({ email: credentials.email });

      // Redirect (e.g., to dashboard)
      callback();
    } catch (err) {
      // Show error message if login fails
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  /**
   * LOGOUT FUNCTION
   * Calls backend to clear session/cookie and resets user in frontend
   */
  const logoutUser = async (callback) => {
    try {
      // Tell backend to clear the refresh token
      await axios.post('http://localhost:5000/api/logout', {}, { withCredentials: true });

      // Remove user info from state
      setUser(null);

      // Show success message
      alert('Logged out successfully');

      // Redirect or do something after logout
      callback();
    } catch (err) {
      alert('Logout failed');
    }
  };

  // This allows every component in the app to access user info & auth functions
  return (
    <AuthContext.Provider value={{ user, signupUser, loginUser, logoutUser }}>
      {children} {/* This means wrap all child components (like App, pages) */}
    </AuthContext.Provider>
  );
};
