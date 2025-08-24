import React, { useState, useEffect } from 'react'

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Apply dark mode to document body when state changes
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
      document.body.classList.add('bg-gray-900')
      document.body.style.backgroundColor = '#111827' // Dark gray background
      document.body.style.color = '#ffffff'
    } else {
      document.documentElement.classList.remove('dark')
      document.body.classList.remove('bg-gray-900')
      document.body.style.backgroundColor = '#f9fafb' // Light gray background
      document.body.style.color = '#111827'
    }
  }, [isDarkMode])

  // Check for saved dark mode preference on component mount
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true'
    setIsDarkMode(savedDarkMode)
  }, [])

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode
    setIsDarkMode(newDarkMode)
    localStorage.setItem('darkMode', newDarkMode.toString())
  }

  return (
    <nav className={`shadow-sm border-b border-gray-200 px-4 lg:px-6 py-3 lg:py-4 transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'
    }`}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
        {/* Left Side - Dashboard Title */}
        <div className="flex items-center">
          <h1 className={`text-xl lg:text-2xl font-bold transition-colors duration-300 ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>Shad's Dashboard</h1>
        </div>

        {/* Right Side - Search, Icons, and User */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-0 sm:space-x-4">
          {/* Global Search */}
          <div className="relative flex-1 max-w-md mx-4">
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 z-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="8" strokeWidth="2"/>
                <path d="m21 21-4.35-4.35" strokeWidth="2"/>
              </svg>
              <input
                type="text"
                placeholder="Global search..."
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 ease-in-out"
              />
            </div>
          </div>

          {/* Notifications */}
          <div className="relative">
            <button className={`p-2 rounded-lg transition-colors duration-300 ${
              isDarkMode 
                ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
            }`}>
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-5 5v-5z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 17h6m-6 0V9a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3h3z"
                />
              </svg>
              {/* Notification Badge */}
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </button>
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-lg transition-colors duration-300 ${
              isDarkMode
                ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600'
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
            }`}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isDarkMode ? (
                // Sun icon for dark mode
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              ) : (
                // Moon icon for light mode
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              )}
            </svg>
          </button>

          {/* User Profile */}
          <div className="flex items-center space-x-2 lg:space-x-3">
            <div className="w-7 h-7 lg:w-8 lg:h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-xs lg:text-sm">
              Z
            </div>
            <span className={`text-sm lg:text-base font-medium transition-colors duration-300 ${
              isDarkMode ? 'text-gray-200' : 'text-gray-700'
            }`}>Zuhair Shad</span>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
