import React from "react";
import { Link } from "react-router";
import { Home, ArrowLeft, RefreshCw, AlertTriangle } from "lucide-react";

const ErrorPage = () => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        {/* Error Icon */}
        <div className="mb-8">
          <div className="relative">
            <div className="w-32 h-32 mx-auto bg-rose-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="h-16 w-16 text-rose-500" />
            </div>
          </div>
        </div>

        {/* Error Content */}
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Oops! Page not found
          </h2>
          <p className="text-gray-600 leading-relaxed mb-2">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Don't worry, let's get you back on track!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center px-6 py-3  text-white font-medium rounded-lg bg-gradient-to-r from-[#FF385C] to-[#FF385C] hover:from-rose-600 hover:to-pink-700  transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <Home className="h-5 w-5 mr-2" />
              Go Home
            </Link>

            <button
              onClick={handleRefresh}
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <RefreshCw className="h-5 w-5 mr-2" />
              Try Again
            </button>
          </div>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center text-gray-500 hover:text-gray-700 transition-colors duration-200"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Go back to previous page
          </button>
        </div>

        {/* Additional Help */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">
            Still having trouble? Here are some helpful links:
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link
              to="/"
              className="text-rose-600 hover:text-rose-700 transition-colors duration-200"
            >
              Browse Properties
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
