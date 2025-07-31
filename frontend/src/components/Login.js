// Import React and tools to manage input and shared authentication state
import React, { useState, useContext } from 'react';

// Import AuthContext to use the loginUser function
import { AuthContext } from '../context/AuthContext';

// Import useNavigate to redirect user to another page after login
import { useNavigate } from 'react-router-dom';

const Login = () => {
  // Get the loginUser function from global context
  const { loginUser } = useContext(AuthContext);

  // Tool to redirect user after successful login
  const navigate = useNavigate();

  // Store the email and password input values in state
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  // Function that runs when the login form is submitted
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload on form submit

    // Call the loginUser function and redirect to dashboard if login is successful
    loginUser(credentials, () => navigate('/dashboard'));
  };

  return (
    // Render the login form
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      {/* Email input field */}
      <input
        type="email"
        placeholder="Email"
        value={credentials.email} // Set the current value from state
        onChange={(e) =>
          setCredentials({ ...credentials, email: e.target.value }) // Update only email in the state
        }
        required // Make field mandatory
      />

      {/* Password input field */}
      <input
        type="password"
        placeholder="Password"
        value={credentials.password} // Set the current value from state
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value }) // Update only password in the state
        }
        required // Make field mandatory
      />

      {/* Submit button */}
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
