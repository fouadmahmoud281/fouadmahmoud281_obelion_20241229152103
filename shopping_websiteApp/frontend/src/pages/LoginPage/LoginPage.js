import React, { useState } from 'react';
import './LoginPage.css';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleGoogleLoginSuccess = async (response) => {
    try {
      const res = await axios.post('https://shopping-websiteapp-backend.cloud-stacks.com/api/login/google', {
        tokenId: response.tokenId,
      });
      localStorage.setItem('token', res.data.token);
      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Google login error:', error.response.data.error);
    }
  };

  const handleFacebookLoginSuccess = async (response) => {
    try {
      const res = await axios.post('https://shopping-websiteapp-backend.cloud-stacks.com/api/login/facebook', {
        accessToken: response.accessToken,
        userID: response.userID,
      });
      localStorage.setItem('token', res.data.token);
      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Facebook login error:', error.response.data.error);
    }
  };

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
      <div className="social-login">
        <GoogleLogin
          clientId="YOUR_GOOGLE_CLIENT_ID"
          buttonText="Login with Google"
          onSuccess={handleGoogleLoginSuccess}
          onFailure={(error) => console.error('Google login error:', error)}
          cookiePolicy={'single_host_origin'}
        />
        <FacebookLogin
          appId="YOUR_FACEBOOK_APP_ID"
          autoLoad={false}
          fields="name,email,picture"
          callback={handleFacebookLoginSuccess}
          textButton="Login with Facebook"
        />
      </div>
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