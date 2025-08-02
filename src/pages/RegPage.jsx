import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import {
  registerUser,
  getUserByUsername,
  getUserByEmail,
} from "../services/authServices";

const RegPage = () => {
  const [userData, setUserData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  function handleChange(event) {
    const { name, value } = event.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function handleConfirmPasswordChange(event) {
    setConfirmPassword(event.target.value);
  }

  async function handleSubmit() {
    if (
      !userData.fullname ||
      !userData.username ||
      !userData.email ||
      !userData.password
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    if (userData.password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (userData.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    if (userData.password.length > 16) {
      toast.error("Password must be at most 16 characters long");
      return;
    }
    if (!/^[a-zA-Z0-9]+$/.test(userData.username)) {
      toast.error("Username can only contain letters and numbers");
      return;
    }
    if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(userData.email)
    ) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (userData.fullname.length < 2) {
      toast.error("Full name must be at least 2 characters long");
      return;
    }

    try {
      const usernameResponse = await getUserByUsername(userData.username);
      if (usernameResponse.data.length > 0) {
        toast.error("Username is already taken");
        return;
      }

      const emailResponse = await getUserByEmail(userData.email);
      if (emailResponse.data.length > 0) {
        toast.error("Email is already taken");
        return;
      }

      await registerUser(userData);
      toast.success("Registration successful");
      navigate("/auth/login");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration failed");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-semibold text-gray-900 mb-8">
          Create an Account
        </h1>

        <div className="space-y-6">
          <div>
            <label
              htmlFor="fullname"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              onChange={(e) => handleChange(e)}
              id="fullname"
              name="fullname"
              type="text"
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
              onChange={(e) => handleChange(e)}
              id="username"
              name="username"
              type="text"
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
              onChange={(e) => handleChange(e)}
              id="email"
              name="email"
              type="email"
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
              onChange={(e) => handleChange(e)}
              id="password"
              name="password"
              type="password"
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
              onChange={(e) => handleConfirmPasswordChange(e)}
              id="confirmPassword"
              name="confirmPassword"
              type="password"
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
            onClick={() => handleSubmit()}
            className="w-full py-3 mt-4 bg-gradient-to-r from-pink-600 to-red-500 text-white text-lg font-medium rounded-lg hover:opacity-90 transitio cursor-pointer"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegPage;
