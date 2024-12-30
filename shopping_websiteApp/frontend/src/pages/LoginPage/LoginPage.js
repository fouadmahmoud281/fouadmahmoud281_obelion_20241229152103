import React, { useState } from 'react';
import './LoginPage.css';
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); 
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://shopping-websiteapp-backend.cloud-stacks.com/api/login/email', {
        email,
        password,
      });
      localStorage.setItem('token', res.data.token);
      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Email login error:', error.response.data.error);
    }
  };

  return (
    <div className="login-page">
      <h1>Login</h1>
      <form onSubmit={handleEmailLogin} className="email-login">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login with Email</button>
      </form>
    </div>
  );
};

export default LoginPage;
