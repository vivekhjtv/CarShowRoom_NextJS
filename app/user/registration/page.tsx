'use client';
import React, { useState, FormEvent } from 'react';
import Link from 'next/link';
import { z } from 'zod';
import { registrationSchema } from '../../../schemas/validation';

interface FormData {
  username: string;
  email: string;
  password: string;
  role: string;
}

const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: '',
    role: 'user',
  });

  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validation = registrationSchema.safeParse(formData);

    if (!validation.success) {
      setValidationError(validation.error.errors[0].message);
      return;
    }
    setValidationError(null);
    setError(null);

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 409) {
          setError('User already exists. Please use a different email.');
        } else {
          setError(data.error || 'Registration failed');
        }
        setRegistrationSuccess(false);
        return;
      }
      setRegistrationSuccess(true);
      setError(null);

      setFormData({
        username: '',
        email: '',
        password: '',
        role: '',
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error registering user:', error.message);
        setError(error.message);
      } else {
        console.error('Error registering user:', error);
        setError('An unknown error occurred');
      }
      setRegistrationSuccess(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center p-4 bg-gray-100 dark:bg-gray-900">
      <form
        className="w-full max-w-md p-8 bg-white border mt-24 border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700"
        onSubmit={handleSubmit}
      >
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          Registration
        </h1>
        {validationError && (
          <div className="mb-4 text-red-600">{validationError}</div>
        )}
        {error && <div className="mb-4 text-red-600">{error}</div>}
        {registrationSuccess ? (
          <div className="mb-4 flex flex-col items-center">
            <p className="text-green-600 mb-2">
              Registration successful! You may now login.
            </p>

            <Link
              href="/user/login"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Login
            </Link>
          </div>
        ) : (
          <>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="username"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Username
              </label>
            </div>

            <div className="relative z-0 w-full mb-5 group">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Email address
              </label>
            </div>

            <div className="relative z-0 w-full mb-5 group">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="password"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Password
              </label>
            </div>

            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default RegistrationForm;
