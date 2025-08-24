import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Overview from './components/Overview'
import Distributions from './components/Distributions'
import Documents from './components/Documents'

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [currentView, setCurrentView] = useState('overview')

  // Listen for dark mode changes from Navbar
  useEffect(() => {
    const checkDarkMode = () => {
      const darkModeActive = document.documentElement.classList.contains('dark')
      setIsDarkMode(darkModeActive)
    }

    // Check initially
    checkDarkMode()

    // Set up observer to watch for class changes
    const observer = new MutationObserver(checkDarkMode)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })

    return () => observer.disconnect()
  }, [])

  const renderCurrentView = () => {
    switch (currentView) {
      case 'distributions':
        return <Distributions onNavigate={setCurrentView} />
      case 'documents':
        return <Documents onNavigate={setCurrentView} />
      case 'overview':
      default:
        return <Overview onNavigate={setCurrentView} />
    }
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <Navbar />
      <main className="w-full">
        {renderCurrentView()}
      </main>
    </div>
  )
}

export default App
