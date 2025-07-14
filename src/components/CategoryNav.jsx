import React from "react";

const CategoryNav = () => (
  <div className="bg-white border-b border-gray-200 sticky top-20 z-40">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center space-x-8 py-4 overflow-x-auto">
        <div className="flex items-center space-x-2 whitespace-nowrap">
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9,22 9,12 15,12 15,22" />
          </svg>
          <span className="font-medium border-b-2 border-gray-900 pb-2">
            Homes
          </span>
        </div>
        <div className="flex items-center space-x-2 whitespace-nowrap">
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-red-400 to-pink-400 flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
          <span className="font-medium text-gray-600">Experiences</span>
          <span className="bg-gray-800 text-white text-xs px-2 py-1 rounded">
            NEW
          </span>
        </div>
        <div className="flex items-center space-x-2 whitespace-nowrap">
          <div className="w-5 h-5 rounded-full bg-gray-600 flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
          <span className="font-medium text-gray-600">Services</span>
          <span className="bg-gray-800 text-white text-xs px-2 py-1 rounded">
            NEW
          </span>
        </div>
      </div>
    </div>
  </div>
);

export default CategoryNav;
