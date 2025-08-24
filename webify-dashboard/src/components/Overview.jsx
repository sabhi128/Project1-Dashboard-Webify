import React, { useEffect, useState } from 'react'
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
  Filler,
  RadialLinearScale
} from 'chart.js'
import { Line, Bar, Pie, Radar } from 'react-chartjs-2'
import RightSidebar from './RightSidebar'

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
  Filler,
  RadialLinearScale
)

const Overview = ({ onNavigate }) => {
  const [animateCharts, setAnimateCharts] = useState(false)
  const [selectedPeriod, setSelectedPeriod] = useState('quarterly')

  // Trigger animations after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateCharts(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

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

  // Account Value Data (Line Chart)
  const accountValueData = {
    labels: ['Q1 23', 'Q2 23', 'Q3 23'],
    datasets: [
      {
        label: 'Account Value',
        data: [65000, 120000, 123370.80],
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#10B981',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 6
      }
    ]
  }

  // Net Return Data (Bar Chart)
  const netReturnData = {
    labels: ['Q1 23', 'Q2 23', 'Q3 23'],
    datasets: [
      {
        label: 'Net Return',
        data: [1000, 2200, 3370.80],
        backgroundColor: '#10B981',
        borderRadius: 8,
        borderSkipped: false
      }
    ]
  }

  // Cashflow History Data (Line Chart)
  const cashflowData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: 'Cashflow',
        data: [950, 1200, 1500, 1850],
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#3B82F6',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 6
      }
    ]
  }

  // Portfolio Allocation Data (Pie Chart)
  const portfolioData = {
    labels: ['Real Estate', 'Tech', 'Healthcare', 'Other'],
    datasets: [
      {
        data: [40, 25, 20, 15],
        backgroundColor: [
          '#10B981', // Green
          '#3B82F6', // Blue
          '#F59E0B', // Orange
          '#EF4444'  // Red
        ],
        borderColor: '#ffffff',
        borderWidth: 2,
        hoverOffset: 4
      }
    ]
  }

  // Performance Trend Data (Area Line Chart)
  const performanceData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Performance',
        data: [400, 450, 600, 580, 700, 780],
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#3B82F6',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 6
      }
    ]
  }

  // Risk Analysis Data (Radar Chart)
  const riskData = {
    labels: ['Liquidity', 'Market', 'Credit', 'Operational', 'Reputation'],
    datasets: [
      {
        label: 'Risk Score A',
        data: [65, 35, 40, 30, 70],
        backgroundColor: 'rgba(239, 68, 68, 0.2)',
        borderColor: '#EF4444',
        borderWidth: 2,
        pointBackgroundColor: '#EF4444',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 4
      },
      {
        label: 'Risk Score B',
        data: [110, 105, 75, 80, 85],
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        borderColor: '#3B82F6',
        borderWidth: 2,
        pointBackgroundColor: '#3B82F6',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 4
      }
    ]
  }

  // Chart options with animations
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
        ticks: {
          callback: function(value) {
            return '$' + value.toLocaleString()
          }
        }
      },
      x: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      }
    }
  }

  const performanceChartOptions = {
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
        borderColor: '#3B82F6',
        borderWidth: 1
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        },
        max: 800
      },
      x: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      }
    }
  }

  const barChartOptions = {
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
        ticks: {
          callback: function(value) {
            return '$' + value.toLocaleString()
          }
        }
      },
      x: {
        grid: {
          display: false
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
        position: 'right',
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
          label: function(context) {
            return context.label + ': ' + context.parsed + '%'
          }
        }
      }
    }
  }

  const radarChartOptions = {
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
        bodyColor: '#ffffff'
      }
    },
    scales: {
      r: {
        beginAtZero: true,
        max: 140,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        },
        ticks: {
          stepSize: 35
        }
      }
    }
  }

return (
    <div className={`min-h-screen flex flex-col lg:flex-row lg:gap-8 overflow-x-hidden transition-all duration-500 ${
    document.documentElement.classList.contains('dark') ? 'bg-gray-900' : 'bg-gray-50'
  }`}>
      {/* Main Content Area */}
<div className={`w-full lg:w-2/3 xl:w-3/4 min-w-0 p-6 lg:pr-0 transition-colors duration-300 ${
  document.documentElement.classList.contains('dark') ? 'bg-gray-900' : ''
} bg-white`}> 
{/* Top Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className={`rounded-xl shadow-lg p-6 text-center transition-all duration-700 delay-200 transition-colors duration-300 ${
            animateCharts ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          } ${
            document.documentElement.classList.contains('dark') ? 'bg-gray-800' : 'bg-white'
          }`}>
            <h3 className={`text-lg font-semibold mb-2 transition-colors duration-300 ${
              document.documentElement.classList.contains('dark') ? 'text-gray-300' : 'text-gray-600'
            }`}>Contribution</h3>
            <p className="text-3xl font-bold text-green-600">$120,000</p>
          </div>
          <div className={`rounded-xl shadow-lg p-6 text-center transition-all duration-700 delay-400 transition-colors duration-300 ${
            animateCharts ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          } ${
            document.documentElement.classList.contains('dark') ? 'bg-gray-800' : 'bg-white'
          }`}>
            <h3 className={`text-lg font-semibold mb-2 transition-colors duration-300 ${
              document.documentElement.classList.contains('dark') ? 'text-gray-300' : 'text-gray-600'
            }`}>Distributions</h3>
            <p className="text-3xl font-bold text-green-600">$3,370.80</p>
          </div>
          <div className={`rounded-xl shadow-lg p-6 text-center transition-all duration-700 delay-600 transition-colors duration-300 ${
            animateCharts ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          } ${
            document.documentElement.classList.contains('dark') ? 'bg-gray-800' : 'bg-white'
          }`}>
            <h3 className={`text-lg font-semibold mb-2 transition-colors duration-300 ${
              document.documentElement.classList.contains('dark') ? 'text-gray-300' : 'text-gray-600'
            }`}>Cash Yield</h3>
            <p className="text-3xl font-bold text-green-600">9%</p>
          </div>
        </div>

        {/* Time Period Selection */}
        <div className={`flex justify-end gap-4 mb-6 transition-all duration-700 delay-800 ${
          animateCharts ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <button 
            onClick={() => handlePeriodChange('quarterly')}
            className={`px-6 py-2 rounded-lg font-semibold transition-colors duration-300 ${
              selectedPeriod === 'quarterly' ? 'bg-green-600 text-white' : 'bg-white text-gray-700 border border-gray-300'
            }`}
          >
            Quarterly
          </button>
          <button 
            onClick={() => handlePeriodChange('yearly')}
            className={`px-6 py-2 rounded-lg font-semibold transition-colors duration-300 ${
              selectedPeriod === 'yearly' ? 'bg-green-600 text-white' : 'bg-white text-gray-700 border border-gray-300'
            }`}
          >
            Yearly
          </button>
        </div>

        {/* Navigation to Distributions */}
        <div className={`flex justify-center mb-6 transition-all duration-700 delay-900 ${
          animateCharts ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <button 
            onClick={() => handleNavigate('distributions')}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 shadow-lg"
          >
            View Distributions
          </button>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Account Value Chart */}
          <div className={`rounded-xl shadow-lg p-6 transition-all duration-1000 delay-1000 transition-colors duration-300 ${
            animateCharts ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          } ${
            document.documentElement.classList.contains('dark') ? 'bg-gray-800' : 'bg-white'
          }`}>
            <h2 className={`text-xl font-semibold mb-2 transition-colors duration-300 ${
              document.documentElement.classList.contains('dark') ? 'text-white' : 'text-gray-800'
            }`}>Account Value</h2>
            <p className="text-3xl font-bold text-green-600 mb-4">$123,370.80</p>
            <div className="h-64">
              <Line data={accountValueData} options={lineChartOptions} />
            </div>
          </div>

          {/* Net Return Chart */}
          <div className={`rounded-xl shadow-lg p-6 transition-all duration-1000 delay-1200 transition-colors duration-300 ${
            animateCharts ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          } ${
            document.documentElement.classList.contains('dark') ? 'bg-gray-800' : 'bg-white'
          }`}>
            <h2 className={`text-xl font-semibold mb-2 transition-colors duration-300 ${
              document.documentElement.classList.contains('dark') ? 'text-white' : 'text-gray-800'
            }`}>Net Return</h2>
            <p className="text-3xl font-bold text-green-600 mb-4">$3,370.80</p>
            <div className="h-64">
              <Bar data={netReturnData} options={barChartOptions} />
            </div>
          </div>
        </div>

        {/* Additional Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Cashflow History Chart */}
          <div className={`rounded-xl shadow-lg p-6 transition-all duration-1000 delay-1400 transition-colors duration-300 ${
            animateCharts ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          } ${
            document.documentElement.classList.contains('dark') ? 'bg-gray-800' : 'bg-white'
          }`}>
            <h2 className={`text-xl font-semibold mb-2 transition-colors duration-300 ${
              document.documentElement.classList.contains('dark') ? 'text-white' : 'text-gray-800'
            }`}>Cashflow History</h2>
            <div className="h-64">
              <Line data={cashflowData} options={lineChartOptions} />
            </div>
          </div>

          {/* Portfolio Allocation Chart */}
          <div className={`rounded-xl shadow-lg p-6 transition-all duration-1000 delay-1600 transition-colors duration-300 ${
            animateCharts ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          } ${
            document.documentElement.classList.contains('dark') ? 'bg-gray-800' : 'bg-white'
          }`}>
            <h2 className={`text-xl font-semibold mb-2 transition-colors duration-300 ${
              document.documentElement.classList.contains('dark') ? 'text-white' : 'text-gray-800'
            }`}>Portfolio Allocation</h2>
            <div className="h-64">
              <Pie data={portfolioData} options={pieChartOptions} />
            </div>
          </div>
        </div>

        {/* Performance and Risk Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Performance Trend Chart */}
          <div className={`rounded-xl shadow-lg p-6 transition-all duration-1000 delay-1800 transition-colors duration-300 ${
            animateCharts ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          } ${
            document.documentElement.classList.contains('dark') ? 'bg-gray-800' : 'bg-white'
          }`}>
            <h2 className={`text-xl font-semibold mb-2 transition-colors duration-300 ${
              document.documentElement.classList.contains('dark') ? 'text-white' : 'text-gray-800'
            }`}>Performance Trend</h2>
            <div className="h-64">
              <Line data={performanceData} options={performanceChartOptions} />
            </div>
          </div>

          {/* Risk Analysis Chart */}
          <div className={`rounded-xl shadow-lg p-6 transition-all duration-1000 delay-2000 transition-colors duration-300 ${
            animateCharts ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          } ${
            document.documentElement.classList.contains('dark') ? 'bg-gray-800' : 'bg-white'
          }`}>
            <h2 className={`text-xl font-semibold mb-2 transition-colors duration-300 ${
              document.documentElement.classList.contains('dark') ? 'text-white' : 'text-gray-800'
            }`}>Risk Analysis</h2>
            <div className="h-64">
              <Radar data={riskData} options={radarChartOptions} />
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className={`w-full lg:w-1/3 xl:w-1/4 min-w-0 max-w-full p-6 lg:pl-0 lg:pr-6 transition-colors duration-300 ${
      document.documentElement.classList.contains('dark') ? 'bg-gray-900' : 'bg-white'
    }`}>
      <RightSidebar animateCharts={animateCharts} />
    </div>
    </div>
  )
}

export default Overview
