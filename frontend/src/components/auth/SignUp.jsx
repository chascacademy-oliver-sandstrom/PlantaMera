import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Button, Container, Form } from 'react-bootstrap';
import { register } from '../../api/auth';
import GreenTop from '../../styles/GreenTop/GreenTop';

const SignUp = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
    return regex.test(email);
  };

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      alert("Felaktig e-postadress. Vänligen försök igen.");
      return;
    }

    try {
      const response = await register({ userName, email, password, firstName, lastName });
      console.log(response);

    // Store the JWT token and points in localStorage
    localStorage.setItem('token', response.token);
    localStorage.setItem('points', response.points);

      // Redirect user to the login page, show a success message, or perform any other action based on your requirements.
      navigate('/home');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <div className="container">
        <GreenTop />
        <h4>Sign up</h4>
        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <input type="text" aria-label="First name" className="form-control" placeholder="Firstname" required value={firstName}
              onChange={(e) => setFirstName(e.target.value)} />
          </div>
          <div className="form-group">
            <input type="text" aria-label="Last name" className="form-control" placeholder="Lastname" required value={lastName}
              onChange={(e) => setLastName(e.target.value)} />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">@</span>
            <input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" required value={userName}
              onChange={(e) => setUserName(e.target.value)} />
          </div>

          <div className="form-group">

            <input type="email" className="form-control" placeholder="Email address" id="email" required value={email}
              onChange={handleEmailChange} />
          </div>
          <div className="form-group">

            <input type="password" className="form-control" placeholder="Enter password" id="pwd" required value={password}
              onChange={(e) => setPassword(e.target.value)} />
          </div>
          {/* <div className="form-group">
              <input type="password" className="form-control" placeholder="Enter the password again" id="pwd" required />
            </div> */}

          <button type="submit" className="btn btn-success" onClick={handleSubmit}>Sign up</button>
        </form>

        <p>I have an account?</p>
        <button id="button_click" type="submit" className="btn btn-sm btn-success login" onClick={() => navigate('/signin')}>Login</button>


      </div>
    </Container>
  );
};

export default SignUp;
