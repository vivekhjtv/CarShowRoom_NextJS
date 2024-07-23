'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState, FormEvent, useEffect } from 'react';
import { loginSchema } from '../../../schemas/validation';
import { useSession, signIn } from 'next-auth/react';
import { useUserContext } from '@/context/userContext';

const LoginForm = () => {
  const { user, setUser } = useUserContext();
  const { data: session } = useSession();
  const nextAuthUser = session?.user;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (nextAuthUser) {
      const saveUserToDB = async () => {
        try {
          const user = {
            username: nextAuthUser.name,
            email: nextAuthUser.email,
            password: 'test123',
            role: 'user',
          };
          const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
          });
          console.log(response);
          if (response.status == 409) {
            console.log('409 conflict - user already exists');
            router.push('/user/products');
            return;
          }

          if (!response.ok) {
            throw new Error('Failed to save user');
          }

          const data = await response.json();
          console.log(data);

          localStorage.setItem('user', JSON.stringify(data.user));

          // Store user data in a cookie
          const userData = JSON.stringify(data.user);
          const encodedUserData = encodeURIComponent(userData);
          document.cookie = `user=${encodedUserData}; path=/; max-age=3600`; // expires in 1 hour

          // Debug: Check if the cookie was set
          console.log('Set-Cookie:', document.cookie);

          setUser(data.user);
          router.push('/user/products');
          console.log('User saved to database and redirected');
        } catch (error) {
          console.error('Error saving user:', error);
        }
      };

      saveUserToDB();
    }
  }, [nextAuthUser, router, setUser]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validation = loginSchema.safeParse({ email, password });

    if (!validation.success) {
      setValidationError(validation.error.errors[0].message);
      return;
    }

    setLoading(true);
    setValidationError(null);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 404) {
          setError('User not found. Please check your email.');
        } else if (response.status === 401) {
          setError('Incorrect password. Please try again.');
        } else {
          setError(data.error || 'Login failed');
        }
        return;
      }
      console.log(data);
      setUser(data.user);
      localStorage.setItem('user', JSON.stringify(data.user));
      // Store user data in a cookie
      const userData = JSON.stringify(data.user);
      const encodedUserData = encodeURIComponent(userData);
      document.cookie = `user=${encodedUserData}; path=/; max-age=3600`; // expires in 1 hour

      router.push('/user/products');
      console.log('Login successful and redirected');
    } catch (error: any) {
      setError(error.message);
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center p-0 bg-gray-100">
      <form
        className="w-full max-w-md p-8 mt-24 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700"
        onSubmit={handleSubmit}
      >
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          Login
        </h1>
        {validationError && (
          <div className="mb-4 text-red-600">{validationError}</div>
        )}
        {error && <div className="mb-4 text-red-600">{error}</div>}
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="name@company.com"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            required
          />
        </div>
        <button
          type="submit"
          className={`w-full bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-white text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800 ${
            loading ? 'opacity-75 cursor-not-allowed' : ''
          }`}
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login to your account'}
        </button>
        <div className="mt-6 text-sm font-medium text-gray-500 dark:text-gray-300">
          Not registered?{' '}
          <Link
            href="/user/registration"
            className="text-blue-700 hover:underline dark:text-blue-500"
          >
            Create account
          </Link>
        </div>

        <div className="mt-4">
          <button
            type="button"
            onClick={async () => {
              await signIn('google');
            }}
            className="w-full bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-white text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-800"
          >
            Login with Google
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
