import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'tailwindcss/tailwind.css';
import { SignIn, SignUp, Home, WelcomeHome } from './components/index.js';

function App() {
  // Check if the user is logged in by verifying the token in local storage
  const isLoggedIn = !!localStorage.getItem('token');

  // PrivateRoute component for protecting routes
  const PrivateRoute = ({ element, path }) => {
    return isLoggedIn ? (
      element
    ) : (
      <Navigate to="/signin" replace state={{ from: path }} />
    );
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomeHome />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<PrivateRoute element={<Home />} path="/home" />} />
      </Routes>
    </Router>
  );
}

export default App;



