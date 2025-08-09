import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import {
  getUserByEmailAndPassword,
  getUserByUsernameAndPassword,
} from "../services/authServices";

const LoginPage = () => {
  const [userData, setUserData] = useState({
    usernameOrEmail: "",
    password: "",
  });
  const navigate = useNavigate();

  function handleChange(event) {
    const { name, value } = event.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function handleSubmit() {
    if (!userData.usernameOrEmail || !userData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const response = await getUserByUsernameAndPassword(
        userData.usernameOrEmail,
        userData.password
      );

      const responseEmail = await getUserByEmailAndPassword(
        userData.usernameOrEmail,
        userData.password
      );

      if (response.data.length === 0 && responseEmail.data.length === 0) {
        toast.error("Invalid credentials");
        return;
      }

      const responseData =
        response.data.length > 0 ? response.data : responseEmail.data;

      localStorage.setItem("userData", JSON.stringify(responseData[0]));

      window.dispatchEvent(
        new CustomEvent("userLogin", {
          detail: responseData[0],
        })
      );

      toast.success("Login successful");
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed. Please try again.");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-semibold text-gray-900 mb-8">
          Welcome to Airbnb
        </h1>

        <div className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username or Email
            </label>
            <input
              onChange={(e) => handleChange(e)}
              id="usernameOrEmail"
              name="usernameOrEmail"
              type="text"
              autoComplete="username"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-3 px-4 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              placeholder="Enter your username or email"
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
            <Link to="/auth/register" className="text-pink-600 hover:underline">
              Sign up
            </Link>
          </p>

          <button
            onClick={() => {
              handleSubmit();
            }}
            className="w-full py-3 mt-4 bg-gradient-to-r from-pink-600 to-red-500 text-white text-lg font-medium rounded-lg hover:opacity-90 transition cursor-pointer"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
