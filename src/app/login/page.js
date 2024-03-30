'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a request to your server to authenticate the user
      const response = await axios.post('https://chat-data-gen-server.onrender.com/api/login', { email, password });

      if (response.status === 200) {
        // Authentication successful
        console.log(response.data.message);
        console.log('Logged in');

        // Navigate to the desired page after successful login
        router.push('/');

      } else {
        // Authentication failed
        alert(response.data.error || 'Login failed. Please try again later.');
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        // Registration failed due to existing email
        alert('Invalid email or password');
      } else {
        // Handle authentication error
        console.error('Login error:', err);
        alert('Login failed. Please try again later.');
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-center text-2xl font-bold mb-4">Login to your account</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block font-semibold text-gray-600">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block font-semibold text-gray-600">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border rounded-md"
            />
          </div>
          <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300">
            Sign In
          </button>
        </form>
        <Link href="/" className="block text-center mt-4 text-gray-600 hover:text-gray-700 transition duration-300">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default SignIn;