import React, { useState } from "react";
import { HiBell, HiMoon, HiSun } from "react-icons/hi";

const NavBar = ({ darkMode, toggleDarkMode }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 shadow-md px-6 py-3 flex items-center justify-between
        ${darkMode ? "bg-gray-900" : "bg-white"}`}
    >
      {/* Left: Brand */}
      <div className={`text-lg font-semibold ${darkMode ? "text-white" : "text-gray-800"}`}>
        Shad's Dashboard
      </div>

      {/* Middle: Search */}
      <div className="hidden md:flex flex-1 justify-end pr-4">
        <input
          type="text"
          placeholder="Global search..."
          className={`w-48 px-3 py-1.5 border rounded-md text-sm focus:outline-none focus:ring-2
            ${darkMode
              ? "bg-gray-800 border-gray-700 text-gray-200 placeholder-gray-400 focus:ring-blue-500"
              : "bg-gray-50 border-gray-200 text-gray-700 placeholder-gray-400 focus:ring-blue-300"}`}
        />
      </div>

      {/* Right: Icons + User */}
      <div className="flex items-center space-x-4">
        {/* Bell */}
        <HiBell
          className={`w-6 h-6 cursor-pointer ${darkMode ? "text-gray-200" : "text-gray-600"}`}
        />

        {/* Toggle: Moon <-> Sun */}
        {darkMode ? (
          <HiSun
            onClick={toggleDarkMode}
            className="w-6 h-6 cursor-pointer text-yellow-400"
            title="Switch to Light mode"
          />
        ) : (
          <HiMoon
            onClick={toggleDarkMode}
            className="w-6 h-6 cursor-pointer text-blue-500"
            title="Switch to Dark mode"
          />
        )}

        {/* User */}
        <div className="hidden sm:flex items-center space-x-2">
          <img src="profile.svg" alt="user" className="w-8 h-8 rounded-full" />
          <span className={`font-medium ${darkMode ? "text-white" : "text-gray-700"}`}>
            Zuhair Shad
          </span>
        </div>

        {/* Mobile Menu Button */}
        <div className="sm:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="focus:outline-none"
          >
            <svg
              className={`w-6 h-6 ${darkMode ? "text-white" : "text-gray-700"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className={`sm:hidden absolute top-16 left-0 w-full shadow-md px-6 py-4
            ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"}`}
        >
          {/* Search */}
          <input
            type="text"
            placeholder="Global search..."
            className={`w-full px-3 py-2 mb-3 border rounded-md focus:outline-none focus:ring-2
              ${darkMode
                ? "bg-gray-800 border-gray-700 text-gray-200 placeholder-gray-400 focus:ring-blue-500"
                : "bg-gray-50 border-gray-200 text-gray-700 placeholder-gray-400 focus:ring-blue-300"}`}
          />

          {/* Icons + User */}
          <div className="flex items-center space-x-3">
            <HiBell
              className={`w-6 h-6 cursor-pointer ${darkMode ? "text-gray-200" : "text-gray-600"}`}
            />
            {darkMode ? (
              <HiSun
                onClick={toggleDarkMode}
                className="w-6 h-6 text-yellow-400 cursor-pointer"
              />
            ) : (
              <HiMoon
                onClick={toggleDarkMode}
                className="w-6 h-6 text-blue-500 cursor-pointer"
              />
            )}
            <img src="profile.svg" alt="user" className="w-8 h-8 rounded-full" />
            <span className={`font-medium ${darkMode ? "text-white" : "text-gray-700"}`}>
              Zuhair Shad
            </span>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
