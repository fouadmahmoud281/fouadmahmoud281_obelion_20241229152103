import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailLogin = async () => {
    try {
      const res = await axios.post('https://shopping-websiteapp-backend.cloud-stacks.com/api/login/email', {
        email,
        password
      });
      localStorage.setItem('token', res.data.token);
      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Email login failed', error.response.data.error);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <div className="email-login">
        <input
          type="email" 
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleEmailLogin}>Login with Email</button>
      </div>
    </div>
  );
};

export default Login;
