// Import React and its tools for handling form inputs and shared login context
import React, { useState, useContext } from 'react';

// Import the shared AuthContext to access the signup function
import { AuthContext } from '../context/AuthContext';

// Import useNavigate to redirect users after successful signup
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  // Get the signup function from the AuthContext
  const { signupUser } = useContext(AuthContext);

  // Get a tool to redirect the user to another page (like /login)
  const navigate = useNavigate();

  // Create variables to store form input values (email & password)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Function that runs when the user submits the signup form
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the page from reloading

    // Call the signup function and redirect to login if successful
    await signupUser(email, password, () => navigate('/login')); // ✅ now safe
  };

  return (
    // Render the signup form
    <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>

      {/* Email input field */}
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)} // Store input in email state
        value={email} // Set current value from state
        required // Don't allow empty email field
      />

      {/* Password input field */}
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)} // Store input in password state
        value={password} // Set current value from state
        required // Don't allow empty password field
      />

      {/* Submit button */}
      <button type="submit">Register</button>
    </form>
  );
};

// Export this component so it can be used in routes
export default SignUp;
