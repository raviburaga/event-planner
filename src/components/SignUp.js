// src/pages/SignUp.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://backend-event-planner.onrender.com/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        throw new Error('Error signing up');
      }

      alert('Sign up successful');
      navigate('/login');
    } catch (error) {
      console.error('Error signing up:', error);
      alert('Error signing up');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <form onSubmit={handleSubmit} className="max-w-md w-full p-8 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl  font-bold text-center mb-6 text-pink-300">Sign Up</h2>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-semibold text-pink-300 mb-2">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-pink-500 rounded-md bg-gray-700 text-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-semibold text-pink-300 mb-2">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-pink-500 rounded-md bg-gray-700 text-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-semibold text-pink-300 mb-2">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-pink-500 rounded-md bg-gray-700 text-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />
        </div>
        <button type="submit" className="w-full py-2 px-4 bg-pink-500 text-pink-500 rounded-md hover:bg-pink-600 transition duration-300">Sign Up</button>
        <p className="mt-4 text-center text-pink-300">
          Already have an account?{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-pink-400 font-semibold hover:underline"
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
