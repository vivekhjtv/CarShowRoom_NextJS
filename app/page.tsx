'use client';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
          Welcome to Car Showroom
        </h1>
      </div>

      <div className="inline-flex rounded-lg shadow-lg" role="group">
        <Link
          href="/user/login"
          className="px-8 py-4 text-lg font-medium text-white bg-blue-600 border border-blue-600 rounded-l-lg hover:bg-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 dark:bg-blue-500 dark:border-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-500"
        >
          Login
        </Link>
        <Link
          href="/user/registration"
          className="px-8 py-4 text-lg font-medium text-white bg-blue-600 border border-blue-600 rounded-r-lg hover:bg-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 dark:bg-blue-500 dark:border-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-500"
        >
          Register
        </Link>
      </div>
    </div>
  );
}
