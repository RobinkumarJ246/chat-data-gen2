'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';

const Register = () => {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://chat-data-gen-server.onrender.com/api/register', formData);

      if (response.status === 200) {
        console.log(response.data.message);

        const emailResponse = await axios.post('https://chat-data-gen-server.onrender.com/api/welcome-mail', {
          toEmail: formData.email,
          subject: 'Account creation success',
          htmlContent: `
            <head>
              <meta charset="UTF-8">
              <meta http-equiv="X-UA-Compatible" content="IE=edge">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Welcome to ChatDataGen</title>
            </head>
            <body style="font-family: Arial, sans-serif;">
              <!-- Header -->
              <header style="background-color: #f0f0f0; padding: 20px;">
                  <h1 style="margin: 0; color: #333;">Welcome to ChatDataGen</h1>
              </header>
              <!-- Content -->
              <section style="padding: 20px;">
                  <p>Hello ${formData.userName},</p>
                  <p>Welcome to ChatDataGen! We're excited to have you on board.</p>
                  <p>This webapp is created to help data scientists and AI model engineers to craft conversational datasets using simpler steps.</p>
                  <p>The platform is still in beta development and can have bugs and errors, so please let us know your valuable feedback and suggestions that will greatly improve our solution.</p>
                  <p>We thank you once again for joining us in the early stage</p>
              </section>
              <!-- Footer -->
              <footer style="background-color: #f0f0f0; padding: 20px; text-align: center;">
                  <p style="margin: 0;">Best regards,<br> Innovatexcel team</p>
              </footer>
            </body>
          </html>
          `,
        });

        console.log(emailResponse.data.message);

        console.log('Logged in');
        router.push('/');
      } else {
        // Registration failed
        alert(response.data.error || 'Registration is failed. Please try again later.');
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        // Registration failed due to existing email
        alert('Email already exists. Please login instead.');
      } else {
        // Other errors
        console.error('Registration error:', err);
        alert('Registration failed. Please try again later.');
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-center text-2xl font-bold mb-4">Register your account</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block font-semibold text-gray-600">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="userName" className="block font-semibold text-gray-600">User Name</label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block font-semibold text-gray-600">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block font-semibold text-gray-600">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
            />
          </div>

          <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300">
            Register
          </button>
        </form>
        <Link href="/" className="block text-center mt-4 text-gray-600 hover:text-gray-700 transition duration-300">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Register;