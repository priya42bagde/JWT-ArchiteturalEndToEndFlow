// Load the Express framework (helps build the server)
const express = require('express');

// Load CORS module to allow backend and frontend to talk (even if on different ports)
const cors = require('cors');

// Load cookie parser to read/write cookies (like tiny storage in browser)
const cookieParser = require('cookie-parser');

// Create the Express app
const app = express();

// Set the port number where our server will run
const PORT = 5000;

// This is a temporary place to store user data in memory (like a notepad that resets on refresh)
let users = []; // In-memory DB (avoid hardcoding for now)

// Allow frontend running on localhost:3000 to access this server
app.use(cors({
  origin: 'http://localhost:3000', // Only allow requests from this address
  credentials: true,              // Allow cookies to be sent along with requests
}));

// Middleware to read incoming JSON data (like reading form data from the frontend)
app.use(express.json());

// Middleware to read cookies sent by the browser
app.use(cookieParser());

/**
 * SIGNUP ROUTE - Runs when user clicks "Sign up"
 */
app.post('/api/signup', (req, res) => {
  // Extract email and password from the signup form
  const { email, password } = req.body;

  // Check if the user already exists
  const exists = users.find((user) => user.email === email);
  if (exists) {
    // If user found, send error saying "User already exists"
    return res.status(400).json({ message: 'User already exists' });
  }

  // If user doesn't exist, save their info to our in-memory database
  users.push({ email, password });

  // Create fake tokens (in real apps, tokens should be securely generated)
  const accessToken = 'mockAccessToken';
  const refreshToken = 'mockRefreshToken';

  // Save refreshToken in browser as a cookie
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true, // Prevents JavaScript from accessing it (for security)
    sameSite: 'Lax', // Helps protect against certain attacks (like CSRF)
    secure: false,   // Should be true in production with HTTPS
  });

  // Send back access token to frontend (usually used to access private routes)
  res.status(201).json({ accessToken });
});

/**
 * LOGOUT ROUTE - Runs when user clicks "Logout"
 */
app.post('/api/logout', (req, res) => {
  // Clear the refresh token cookie from the browser
  res.clearCookie('refreshToken', {
    httpOnly: true,
    sameSite: 'Lax',
    secure: false,
  });

  // Tell frontend the user has been logged out
  return res.status(200).json({ message: 'Logged out' });
});

/**
 * LOGIN ROUTE - Runs when user clicks "Login"
 */
app.post('/api/login', (req, res) => {
  // Extract email and password from the login form
  const { email, password } = req.body;

  // Check if there’s a matching user in the memory database
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) {
    // If not found, send an error message
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Create fake tokens just like signup
  const accessToken = 'mockAccessToken';
  const refreshToken = 'mockRefreshToken';

  // Save refreshToken in browser cookie
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    sameSite: 'Lax',
    secure: false,
  });

  // Send access token to frontend to use for protected routes
  res.status(200).json({ accessToken });
});

// Start the server and show a message in the terminal
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
