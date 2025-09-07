import React, { useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { autoInstance } from '../utils/axiosAutoInstance';


import { API_PATHS } from '../config'; // or wherever your routes live

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token } = response.data;
      localStorage.setItem('token', token);
      window.location.href = '/dashboard'; // or wherever you want to redirect
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div>
      <input type="email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
