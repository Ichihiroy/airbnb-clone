import React from "react";
import { Link } from "react-router";

const LoginPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-semibold text-gray-900 mb-8">
          Welcome to Airbnb
        </h1>

        <form className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-3 px-4 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-3 px-4 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              placeholder="Enter your password"
            />
          </div>

          <p className="text-xs text-gray-500">
            Your credentials are encrypted. Read our{" "}
            <a href="#" className="text-black underline">
              Privacy Policy
            </a>
            .
          </p>
          <p>
            Don't have an account?{" "}
            <Link
              href="/auth/register"
              className="text-pink-600 hover:underline"
            >
              Sign up
            </Link>
          </p>

          <button
            type="submit"
            className="w-full py-3 mt-4 bg-gradient-to-r from-pink-600 to-red-500 text-white text-lg font-medium rounded-lg hover:opacity-90 transition cursor-pointer"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
