import React, { useState } from 'react';
#import { GoogleLogin } from 'react-google-login';
#import FacebookLogin from 'react-facebook-login';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  //const handleGoogleLogin = async (response) => {
    //try {
     //const res = await axios.post('https://shopping-websiteapp-backend.cloud-stacks.com/api/login/google', {
    //tokenId: response.tokenId
   //});
      //localStorage.setItem('token', res.data.token);
     //window.location.href = '/dashboard';
    //} catch (error) {
    //console.error('Google login failed', error.response.data.error);
   //}
  //};

  /*const handleFacebookLogin = async (response) => {
    try {
      const res = await axios.post('https://shopping-websiteapp-backend.cloud-stacks.com/api/login/facebook', {
        accessToken: response.accessToken,
        userID: response.userID
      });
      localStorage.setItem('token', res.data.token);
      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Facebook login failed', error.response.data.error);
    }
  };
*/
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
      /*<GoogleLogin
        clientId="YOUR_GOOGLE_CLIENT_ID"
        buttonText="Login with Google"
        onSuccess={handleGoogleLogin}
        onFailure={handleGoogleLogin}
        cookiePolicy={'single_host_origin'}
        className="google-login-button"
      />*/
      /*<FacebookLogin
        appId="YOUR_FACEBOOK_APP_ID"
        autoLoad={false}
        fields="name,email,picture"
        callback={handleFacebookLogin}
        cssClass="facebook-login-button"
        textButton="Login with Facebook"
      />*/
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
