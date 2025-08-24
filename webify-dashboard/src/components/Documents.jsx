import React, { useEffect, useState } from 'react'
import CompanyAddress from './CompanyAddress'

const Documents = ({ onNavigate }) => {
  const [animateCharts, setAnimateCharts] = useState(false)

  // Trigger animations after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateCharts(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  // Handle navigation
  const handleNavigate = (view) => {
    if (onNavigate) {
      onNavigate(view)
    }
  }

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      document.documentElement.classList.contains('dark') ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* Navigation Tabs */}
      <div className={`border-b border-gray-300 ${
        document.documentElement.classList.contains('dark') ? 'border-gray-600' : 'border-gray-300'
      }`}>
        <div className="px-6 py-4">
          <div className="flex gap-8">
            <button 
              onClick={() => handleNavigate('overview')}
              className="text-white font-medium pb-2 hover:text-green-400 transition-colors duration-300"
            >
              Overview
            </button>
            <button className="text-white font-medium pb-2 border-b-2 border-green-500">
              Documents
            </button>
            <button 
              onClick={() => handleNavigate('distributions')}
              className="text-white font-medium pb-2 hover:text-green-400 transition-colors duration-300"
            >
              Distributions
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row">
        {/* Main Content Area */}
        <div className="flex-1 p-6">
          {/* Documents Content */}
          <div className={`bg-white rounded-xl shadow-lg p-4 lg:p-6 transition-all duration-1000 delay-300 ${
            animateCharts ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}>
            <h2 className="text-xl lg:text-2xl font-semibold text-gray-800 mb-4 lg:mb-6">Documents</h2>
            
            {/* Placeholder content */}
            <div className="text-center py-8 lg:py-12">
              <svg className="w-12 h-12 lg:w-16 lg:h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-base lg:text-lg font-medium text-gray-600 mb-2">No Documents Available</h3>
              <p className="text-sm lg:text-base text-gray-500">Documents will appear here when they become available.</p>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className={`w-full lg:w-auto transition-all duration-1000 delay-500 ${
          animateCharts ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
        }`}>
          <CompanyAddress />
        </div>
      </div>
    </div>
  )
}

export default Documents