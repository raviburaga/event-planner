import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://backend-event-planner.onrender.com/login', { email, password });
      const { token, user } = response.data;
      console.log('userid:', user._id, token);
      // Store user ID in local storage
      localStorage.setItem('userId', user._id);

      login(token, user);
      navigate('/');
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Login failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="max-w-md w-full p-8 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-pink-300">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold text-pink-300 mb-2">Email</label>
            <input
              id="email"
              type="email"
              className="mt-1 block w-full px-3 py-2 border border-pink-500 rounded-md shadow-sm bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-semibold text-pink-300 mb-2">Password</label>
            <input
              id="password"
              type="password"
              className="mt-1 block w-full px-3 py-2 border border-pink-500 rounded-md shadow-sm bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="w-full py-2 px-4 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition duration-300">Login</button>
        </form>
        <p className="text-sm text-pink-300 mt-2 text-center">
          Don't have an account?{' '}
          <Link to="/signup" className="text-pink-400 font-semibold hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
