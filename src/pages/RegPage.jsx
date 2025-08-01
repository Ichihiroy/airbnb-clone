import React from "react";
import { Link } from "react-router";

const RegPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-semibold text-gray-900 mb-8">
          Create an Account
        </h1>

        <form className="space-y-6">
          <div>
            <label
              htmlFor="fullname"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              id="fullname"
              name="fullname"
              type="text"
              required
              placeholder="Enter your full name"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-3 px-4 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            />
          </div>

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
              required
              placeholder="Choose a username"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-3 px-4 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="Enter your email"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-3 px-4 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
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
              required
              placeholder="Create a password"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-3 px-4 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              placeholder="Re-enter password"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-3 px-4 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            />
          </div>

          <p>
            Already have an account?{" "}
            <Link to="/auth/login" className="text-pink-600 hover:underline">
              Sign in
            </Link>
          </p>

          <p className="text-xs text-gray-500">
            By continuing, you agree to our{" "}
            <a href="#" className="text-black underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-black underline">
              Privacy Policy
            </a>
            .
          </p>

          <button
            type="submit"
            className="w-full py-3 mt-4 bg-gradient-to-r from-pink-600 to-red-500 text-white text-lg font-medium rounded-lg hover:opacity-90 transition"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegPage;
