// Import React to create a functional component
import React from 'react';

// Import Link to create navigation links without reloading the page
import { Link } from 'react-router-dom';

// Create a simple Home page component
const Home = () => (
  <div>
    {/* Main heading of the Home page */}
    <h1>Hello Everyone</h1>

    {/* Short welcome message and links to Login and Signup pages */}
    <p>
      Welcome to JWT Working Flow ! Please{' '}
      <Link to="/login">Login</Link> {/* Link to the login page */}
      {' '}or{' '}
      <Link to="/signup">Sign Up</Link>. {/* Link to the signup page */}
    </p>
  </div>
);

// Export the component so it can be used in routes (like in App.js)
export default Home;
