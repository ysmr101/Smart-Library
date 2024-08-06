// src/pages/Login.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Login: React.FC = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
 const bodyData = new URLSearchParams({
      grant_type: 'password',
      username: userName,
      password: password,
      scope: '',
      client_id: 'string',
      client_secret: 'string',
    });
    try {
      // Simulate API call for login
     const response = await fetch('http://127.0.0.1:8000/users/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: bodyData.toString(),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      login(data.token, userName);
      navigate('/'); // Redirect to home page on successful login
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="bg-custom-bg h-screen flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-md shadow-lg w-96">
        <h2 className="text-white text-2xl mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="text-gray-400 block mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="bg-gray-700 text-white w-full px-3 py-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="text-gray-400 block mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-700 text-white w-full px-3 py-2 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded w-full"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
