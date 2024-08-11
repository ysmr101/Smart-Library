
import React, { useState } from 'react';
import {jwtDecode} from 'jwt-decode';
import {useNavigate} from "react-router-dom";

interface LoginFormProps {
  onLoginSuccess: (token: string, role: string) => void;
}

interface DecodedToken {
  role: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
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
      const response = await fetch('http://127.0.0.1:8000/users/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: bodyData.toString(),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.access_token;


        const decoded: DecodedToken = jwtDecode(token);
        console.log(decoded.role)
        const role = decoded.role;
        setSuccess('Login successful!');
        setError('');
        setTimeout(() => {
          onLoginSuccess(token, role);
        }, 3000);

        navigate('/');
        // window.location.reload();
        console.log('Login successful, token:', token);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Login failed');
        setSuccess('');
        console.error('Login failed:', errorData);
      }
    } catch (err) {
      console.error('Error during login:', err);
      setError('An error occurred during login.');
      setSuccess('');
    }
  };

  return (
      <div className="flex-grow flex items-center justify-center">
        <form className="bg-custom-blue p-6 rounded-md w-6/12" onSubmit={handleSubmit}>
          <h2 className="text-white text-xl mb-4 flex justify-center">Log In</h2>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          {success && <div className="text-green-500 mb-4">{success}</div>}
          <label className="block text-white">User Name</label>
          <input
              type="text"
              className="w-full p-2 mb-4 border-2 rounded-md text-white bg-custom-blue"
              placeholder="User123"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
          />
          <label className="block text-white">Password</label>
          <input
              type="password"
              className="w-full p-2 mb-4 border-2 rounded-md text-white bg-custom-blue"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex justify-center">
            <button type="submit" className="bg-custom-teal text-white p-2 rounded-md">
              Log In
            </button>
          </div>
        </form>
      </div>
  );
};

export default LoginForm;
