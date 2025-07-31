// Import React library (used to build UI components)
import React from 'react';

// Import ReactDOM to interact with the actual web page (HTML DOM)
import ReactDOM from 'react-dom/client';

// Import the main App component (the heart of your React app)
import App from './App';

// Import AuthProvider to manage login/logout state globally
import { AuthProvider } from './context/AuthContext';

// Import BrowserRouter to enable page navigation without full reload (React Router)
import { BrowserRouter } from 'react-router-dom';

// Get the root HTML element where the React app will be displayed
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the entire app on the screen
root.render(
  // Enable routing inside the app (like moving between pages: /login, /signup, /dashboard)
  <BrowserRouter>
  
    {/* Provide global auth context (helps to access login info anywhere in app) */}
    <AuthProvider>
    
      {/* Render the main application component */}
      <App />
      
    </AuthProvider>
    
  </BrowserRouter>
);
