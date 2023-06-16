import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { login } from '../../api/auth';
import GreenTop from '../../styles/GreenTop/GreenTop';

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await login({
        email,
        password
      });
  
      if (response.token) {
        localStorage.setItem('token', response.token);
  
        console.log('Login successful');
          
        navigate('/home');
      } else {
        console.log('Invalid token');
      }
    } catch (error) {
      console.log('Login failed');
      console.error(error);
    }
  };

  return (
    <div className="container light-green-background">
      <GreenTop />
      <h4>Login</h4>
      <form>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Email"
            id="username"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control mb-8"
            placeholder="Enter password"
            id="pwd"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group form-check">
          <label className="form-check-label">
            <input className="form-check-input" type="checkbox" /> Remember me
          </label>
        </div>
        <button
          id="login"
          type="submit"
          className="btn btn-success"
          onClick={handleSubmit}
        >
          Login
        </button>
      </form>

      <p>Don't have an account?</p>
      <button id="button_click" type="submit" className="btn btn-sm btn-success"
      onClick={() => navigate('/signup')}
      >
        Sign up
      </button> 
    </div>
  );
};

export default SignIn;