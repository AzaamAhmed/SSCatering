import React, { useState } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import Navbar from './Navbar';
import Footer from './Footer';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Use useNavigate hook instead of useHistory

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleRegister = async()=>{
    navigate('/register');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    const response = await fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();

    // Check if the response indicates successful login
    if (response.ok) {
      console.log('VALID')
      //navigate('/home'); 
      const { role } = data; // Access the 'role' value from the 'data' object
      console.log('User role:', role);
      if (role === 'user') {
        navigate('/home');
      } else {
        navigate('/admin');
      }



      

      function isSpclChar() {
        var iChars = "!@#$%^&*()+=-[]\\';,./{}|\":<>?";
        if (document.qfrm.q.value.indexOf(iChars) !== -1) {
            alert("The input contains special characters. These are not allowed.");
            return false;
        }
    }
    



      
    } else {
      // Handle invalid login
      console.log('Invalid login:', data.message);
      alert("Login Failed!!!");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-heading">Login</h2>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            className="input-field"
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            className="input-field"
          />
        </div>
        <button onClick={handleLogin} className="login-button">Login</button>
        <br></br>
        <br></br>
        <label onClick={handleRegister}>Create Account</label>
      </div>
    </div>
  );
}

export default Login;
