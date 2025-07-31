// Import React to use JSX (HTML-like syntax in JavaScript)
import React from 'react';

// Import Routes and Route to define different pages (URLs) in the app
import { Routes, Route } from 'react-router-dom';

// Import individual page components
import Login from './components/Login';             // Login screen
import SignUp from './components/Signup';           // Signup screen
import Dashboard from './components/Dashboard';     // User's dashboard after login
import PrivateRoute from './components/PrivateRoute'; // ✅ Used to protect private routes like Dashboard
import ProtectedRoute from './components/ProtectedRoute'; // ✅ Used to redirect logged-in users away from login/signup
import Home from './components/Home';               // Home page

// This is the main component that defines what shows up at each route (URL)
function App() {
  return (
    <Routes>
      {/* Home route, shown only if NOT logged in */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      {/* Login and Signup routes — always public */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      {/* ✅ Dashboard is now wrapped in PrivateRoute for session protection */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

// Make this component available to be used elsewhere (like in index.js)
export default App;
