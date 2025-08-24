import React, { useEffect, useState } from 'react'
import RightSidebar from './RightSidebar'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import { Line, Pie } from 'react-chartjs-2'

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const Distributions = ({ onNavigate }) => {
  const [animateCharts, setAnimateCharts] = useState(false)
  const [darkMode] = useState(false)
  const [selectedPeriod, setSelectedPeriod] = useState('quarterly')
  const [selectedFilters, setSelectedFilters] = useState({
    ytd: 'YTD',
    type: 'All',
    status: 'All'
  })
  const [openDropdown, setOpenDropdown] = useState(null)

  // ✅ Download center state
  const [downloads, setDownloads] = useState([])

  // ✅ Download handler
  const handleDownload = (filePath, fileName) => {
    // File download trigger
    const link = document.createElement("a");
    link.href = filePath;
    link.download = fileName;
    link.click();

    // Add to download center
    setDownloads(prev => [...prev, { name: fileName, path: filePath }]);
  };


  // Trigger animations after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateCharts(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openDropdown && !event.target.closest('.relative')) {
        setOpenDropdown(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [openDropdown])

  // Handle period selection
  const handlePeriodChange = (period) => {
    setSelectedPeriod(period)
  }

  // Handle navigation
  const handleNavigate = (view) => {
    if (onNavigate) {
      onNavigate(view)
    }
  }

  // Handle dropdown toggle
  const toggleDropdown = (dropdownName) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName)
  }

  // Handle filter selection
  const handleFilterChange = (filterType, value) => {
    setSelectedFilters(prev => ({ ...prev, [filterType]: value }))
    setOpenDropdown(null)
  }

  // Dynamic Payout History Data based on filters
  const getPayoutHistoryData = () => {
    let data = []

    // Base data for different filter combinations
    if (selectedFilters.ytd === 'YTD' && selectedFilters.type === 'All' && selectedFilters.status === 'All') {
      data = [600, 650, 700, 750, 800, 850, 900, 950, 1000, 1050, 1100, 1150]
    } else if (selectedFilters.ytd === 'YTD' && selectedFilters.type === 'Cash' && selectedFilters.status === 'All') {
      data = [500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000, 1050]
    } else if (selectedFilters.ytd === 'YTD' && selectedFilters.type === 'Reinvested' && selectedFilters.status === 'All') {
      data = [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100]
    } else if (selectedFilters.ytd === 'YTD' && selectedFilters.type === 'All' && selectedFilters.status === 'Paid') {
      data = [400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950]
    } else if (selectedFilters.ytd === 'YTD' && selectedFilters.type === 'All' && selectedFilters.status === 'Scheduled') {
      data = [200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200]
    } else if (selectedFilters.ytd === '12M' && selectedFilters.type === 'All' && selectedFilters.status === 'All') {
      data = [800, 850, 900, 950, 1000, 1050, 1100, 1150, 1200, 1250, 1300, 1350]
    } else if (selectedFilters.ytd === 'All' && selectedFilters.type === 'All' && selectedFilters.status === 'All') {
      data = [400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950]
    } else {
      // Default data
      data = [600, 650, 700, 750, 800, 850, 900, 950, 1000, 1050, 1100, 1150]
    }

    return {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          label: 'Payout History',
          data: data,
          borderColor: '#10B981',
          backgroundColor: 'rgba(16, 185, 129, 0.2)',
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#10B981',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
          pointRadius: 4
        }
      ]
    }
  }

  // Breakdown Data (Pie Chart)
  const breakdownData = {
    labels: ['Cash', 'Reinvested'],
    datasets: [
      {
        data: [75, 25],
        backgroundColor: [
          '#10B981', // Green
          '#3B82F6'  // Blue
        ],
        borderColor: '#ffffff',
        borderWidth: 2,
        hoverOffset: 4
      }
    ]
  }

  // Chart options
  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: animateCharts ? 2000 : 0,
      easing: 'easeOutQuart'
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#10B981',
        borderWidth: 1
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        },
        max: Math.max(...getPayoutHistoryData().datasets[0].data) + 100
      },
      x: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      }
    }
  }

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: animateCharts ? 2000 : 0,
      easing: 'easeOutQuart'
    },
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          usePointStyle: true,
          pointStyle: 'rect'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        callbacks: {
          label: function (context) {
            return context.label + ': ' + context.parsed + '%'
          }
        }
      }
    }
  }

  // Sample data for the table
  const tableData = [
    { date: 'Jan 31, 2025', amount: '$820.25', type: 'Cash', status: 'Paid', file: '2025-01-31 - distribution.json' },
    { date: 'Feb 28, 2025', amount: '$805.1', type: 'Cash', status: 'Paid', file: '2025-02-28 - distribution.json' },
    { date: 'Mar 31, 2025', amount: '$840', type: 'Reinvested', status: 'Paid', file: '2025-03-31 - distribution.json' },
    { date: 'Apr 30, 2025', amount: '$860.75', type: 'Cash', status: 'Paid', file: '2025-04-30 - distribution.json' },
    { date: 'May 31, 2025', amount: '$910.4', type: 'Cash', status: 'Paid', file: '2025-05-31 - distribution.json' },
    { date: 'Jun 30, 2025', amount: '$935.1', type: 'Reinvested', status: 'Paid', file: '2025-06-30 - distribution.json' },
    { date: 'Jul 31, 2025', amount: '$950', type: 'Cash', status: 'Paid', file: '2025-07-31 - distribution.json' },
    { date: 'Aug 31, 2025', amount: '$975.5', type: 'Cash', status: 'Paid', file: '2025-08-31 - distribution.json' },
    { date: 'Sep 30, 2025', amount: '$990.25', type: 'Reinvested', status: 'Scheduled', file: '2025-09-30 - distribution.json' },
    { date: 'Oct 31, 2025', amount: '$1,010', type: 'Cash', status: 'Scheduled', file: '2025-10-31 - distribution.json' },
    { date: 'Nov 30, 2025', amount: '$1,025.75', type: 'Cash', status: 'Scheduled', file: '2025-11-30 - distribution.json' },
    { date: 'Dec 31, 2025', amount: '$1,040.5', type: 'Cash', status: 'Scheduled', file: '2025-12-31 - distribution.json' }
  ];


  return (
    <div className="min-h-screen bg-gray-50">

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row">
        {/* Main Content Area */}
        <div className="w-full lg:w-3/4 xl:w-4/5 p-6">

          {/* Filter and Search Bar */}
          <div className={`flex items-center justify-between mb-20 transition-all duration-700 delay-200 ${animateCharts ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
            <div className="flex items-center space-x-4">
              <button className="flex mb-25 items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-blue-50 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-200/50 transition-all duration-300 ease-in-out transform hover:scale-105 hover:-translate-y-1">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
                </svg>
                Filters
              </button>

              {/* Filters Row */}
              <div className="flex items-center space-x-4 mb-25 relative z-20">

                {/* YTD Dropdown */}
                <div className="relative ml-4 z-50">
                  <button
                    onClick={() => toggleDropdown('ytd')}
                    className="flex items-center justify-between px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-blue-50 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-200/50 transition-all duration-300 ease-in-out transform hover:scale-105 hover:-translate-y-1 min-w-[80px]"
                  >
                    {selectedFilters.ytd}
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openDropdown === 'ytd' && (
                    <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-50">
                      {['YTD', '12M', 'All'].map((option) => (
                        <button
                          key={option}
                          onClick={() => handleFilterChange('ytd', option)}
                          className={`w-full px-3 py-2 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-all duration-150 ease-in-out ${selectedFilters.ytd === option ? 'bg-blue-600 text-white' : 'text-gray-700 hover:text-gray-900'
                            }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Type Dropdown */}
                <div className="relative ml-4 z-50">
                  <button
                    onClick={() => toggleDropdown('type')}
                    className="flex items-center justify-between px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-blue-50 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-200/50 transition-all duration-300 ease-in-out transform hover:scale-105 hover:-translate-y-1 min-w-[80px]"
                  >
                    {selectedFilters.type}
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openDropdown === 'type' && (
                    <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-50">
                      {['All', 'Cash', 'Reinvested'].map((option) => (
                        <button
                          key={option}
                          onClick={() => handleFilterChange('type', option)}
                          className={`w-full px-3 py-2 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-all duration-150 ease-in-out ${selectedFilters.type === option ? 'bg-blue-600 text-white' : 'text-gray-700 hover:text-gray-900'
                            }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Status Dropdown */}
                <div className="relative ml-4 z-50">
                  <button
                    onClick={() => toggleDropdown('status')}
                    className="flex items-center justify-between px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-blue-50 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-200/50 transition-all duration-300 ease-in-out transform hover:scale-105 hover:-translate-y-1 min-w-[80px]"
                  >
                    {selectedFilters.status}
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openDropdown === 'status' && (
                    <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-50">
                      {['All', 'Paid', 'Scheduled'].map((option) => (
                        <button
                          key={option}
                          onClick={() => handleFilterChange('status', option)}
                          className={`w-full px-3 py-2 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-all duration-150 ease-in-out ${selectedFilters.status === option ? 'bg-blue-600 text-white' : 'text-gray-700 hover:text-gray-900'
                            }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>


              <div className="relative ml-4">
                <input
                  type="text"
                  placeholder="Search date, type, status, a..."
                  className="pl-10 mb-25 pr-4 py-2 w-80 bg-white border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 hover:border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 ease-in-out"
                />
                <svg className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = "/downloads/distributions.csv"; // public folder path
                  link.download = "distributions.csv";       // download file name
                  link.click();
                }}
                className="flex items-center mb-25 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-green-50 hover:border-green-400 hover:shadow-lg hover:shadow-green-200/50 transition-all duration-300 ease-in-out transform hover:scale-105 hover:-translate-y-1"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                CSV
              </button>

              <button
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = "/downloads/distributions.ics"; // public folder path
                  link.download = "distributions.ics";       // download file name
                  link.click();
                }}
                className="flex items-center mb-25 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-blue-50 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-200/50 transition-all duration-300 ease-in-out transform hover:scale-105 hover:-translate-y-1"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                ICS
              </button>

              <button className="flex items-center mb-25 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-purple-50 hover:border-purple-400 hover:shadow-lg hover:shadow-purple-200/50 transition-all duration-300 ease-in-out transform hover:scale-105 hover:-translate-y-1">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Recurring
              </button>
              <button className="p-2 bg-white border mb-25 border-gray-300 rounded-lg text-gray-700 hover:bg-orange-50 hover:border-orange-400 hover:shadow-lg hover:shadow-orange-200/50 transition-all duration-300 ease-in-out transform hover:scale-105 hover:-translate-y-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <button className="p-2 bg-white border mb-25 border-gray-300 rounded-lg text-gray-700 hover:bg-orange-50 hover:border-orange-400 hover:shadow-lg hover:shadow-orange-200/50 transition-all duration-300 ease-in-out transform hover:scale-105 hover:-translate-y-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>

          {/* Metric Cards */}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 transition-all duration-700 delay-400 ${animateCharts ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center relative overflow-hidden">
              {/* Light greenish left border/shade */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-green-200 to-green-300"></div>
              <div className="flex items-center justify-center mb-2">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-600 mb-2">YTD Distributions</h3>
              <p className="text-3xl font-bold text-green-600">$11,163.6</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 text-center relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-green-200 to-green-300"></div>
              <div className="flex items-center justify-center mb-2">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-600 mb-2">Paid (filtered)</h3>
              <p className="text-3xl font-bold text-green-600">$7,097.1</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 text-center relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-green-200 to-green-300"></div>
              <div className="flex items-center justify-center mb-2">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-600 mb-2">Scheduled (filtered)</h3>
              <p className="text-3xl font-bold text-green-600">$4,066.5</p>
            </div>
          </div>

          {/* Time Period Selection */}
          <div className={`flex justify-end gap-4 mb-6 transition-all duration-700 delay-600 ${animateCharts ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
            <button
              onClick={() => handlePeriodChange('quarterly')}
              className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg transform hover:scale-105 hover:-translate-y-1 ${selectedPeriod === 'quarterly' ? 'bg-green-600 text-white hover:bg-green-700 hover:shadow-green-400/50' : 'bg-white text-gray-700 border border-gray-300 hover:bg-green-50 hover:border-green-400 hover:shadow-green-200/50'
                }`}
            >
              Quarterly
            </button>
            <button
              onClick={() => handlePeriodChange('yearly')}
              className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg transform hover:scale-105 hover:-translate-y-1 ${selectedPeriod === 'yearly' ? 'bg-green-600 text-white hover:bg-green-700 hover:shadow-green-400/50' : 'bg-white text-gray-700 border border-gray-300 hover:bg-green-50 hover:border-green-400 hover:shadow-green-200/50'
                }`}
            >
              Yearly
            </button>
          </div>

          {/* Payout History Chart */}
          <div className={`bg-white rounded-xl shadow-lg p-6 mb-6 transition-all duration-1000 delay-800 ${animateCharts ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Payout History</h2>
            <div className="h-64">
              <Line
                key={`${selectedFilters.ytd}-${selectedFilters.type}-${selectedFilters.status}`}
                data={getPayoutHistoryData()}
                options={lineChartOptions}
              />
            </div>
          </div>

          {/* Data Table */}
          <div className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-1000 delay-1000 ${animateCharts ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left">
                      <input type="checkbox" className="rounded border-gray-300 text-green-600 focus:ring-green-500" />
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Amount</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Type</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {tableData.map((row, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <input type="checkbox" className="rounded border-gray-300 text-green-600 focus:ring-green-500" />
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{row.date}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{row.amount}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${row.type === 'Cash'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-blue-100 text-blue-800'
                          }`}>
                          {row.type}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          {row.status === 'Paid' ? (
                            <>
                              <svg className="w-4 h-4 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span className="text-sm text-green-600">Paid</span>
                            </>
                          ) : (
                            <>
                              <svg className="w-4 h-4 text-orange-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span className="text-sm text-orange-600">Scheduled</span>
                            </>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => {
                              const link = document.createElement("a");
                              link.href = `/downloads/${row.file}`;
                              link.download = row.file;               // same file name
                              link.click();
                            }}
                            className="flex items-center px-3 py-1 bg-white border border-gray-300 rounded text-xs text-gray-700 hover:bg-blue-50 hover:border-blue-400 hover:shadow-md transition-all duration-200 ease-in-out transform hover:scale-105"
                          >
                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Statement
                          </button>


                          {row.status === 'Scheduled' && (
                            <button className="flex items-center px-3 py-1 bg-white border border-gray-300 rounded text-xs text-gray-700 hover:bg-green-50 hover:border-green-400 hover:shadow-md transition-all duration-200 ease-in-out transform hover:scale-105">
                              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              Mark Paid
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Page 2 / 2 • 12 results</span>
                <div className="flex space-x-2">
                  <button className="p-2 bg-white border border-gray-300 rounded text-gray-700 hover:bg-gray-50 hover:border-gray-400 hover:shadow-md transition-all duration-200 ease-in-out transform hover:scale-105">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button className="p-2 bg-white border border-gray-300 rounded text-gray-700 hover:bg-gray-50 hover:border-gray-400 hover:shadow-md transition-all duration-200 ease-in-out transform hover:scale-105">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Widget Cards */}
          <div className={`grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6 transition-all duration-1000 delay-1200 ${animateCharts ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}>
            {/* Breakdown Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Breakdown (filtered)</h3>
              </div>
              <div className="h-32 mb-4">
                <Pie data={breakdownData} options={pieChartOptions} />
              </div>
              <div className="text-center">
                <span className="text-sm text-gray-600">Cash - 75%</span>
              </div>
            </div>

            {/* Bank Instructions Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Bank Instructions</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-gray-600">Bank:</span>
                  <p className="text-sm font-medium text-gray-900">First Federal</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Account:</span>
                  <p className="text-sm font-medium text-gray-900">**** 4821</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Routing:</span>
                  <p className="text-sm font-medium text-gray-900">*****123</p>
                </div>
              </div>

              {/* Download Button */}
              <div className="mt-6">
                <button
                  onClick={() => {
                    const link = document.createElement("a");
                    link.href = "/downloads/bank-instructions.txt";  // public folder path
                    link.download = "bank-instructions.txt";         // file name for download
                    link.click();
                  }}
                  className="flex items-center px-4 py-2 
               bg-green-600 text-white 
               text-sm font-medium rounded-lg shadow-md 
               hover:bg-green-700 hover:shadow-green-400/50 
               transition-all duration-300 ease-in-out transform hover:scale-105"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v16h16V4H4zm4 8h8m-4 4v-8" />
                  </svg>
                  Download
                </button>
              </div>

            </div>


            {/* Download Center Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Download Center</h3>
                <button className="text-sm text-gray-500 hover:text-gray-700 transition-all duration-200 ease-in-out hover:scale-105 hover:font-medium">Clear</button>
              </div>
              <div className="text-center py-8">
                <p className="text-sm text-gray-500">No files yet. Use CSV/ICS/Statement.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-full lg:w-1/4 xl:w-1/5 p-6">
          <RightSidebar animateCharts={animateCharts} darkMode={darkMode} />
        </div>
      </div>
    </div>
  )
}

export default Distributions
