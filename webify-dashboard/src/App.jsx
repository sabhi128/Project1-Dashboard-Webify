// import { useState } from 'react'
// import './index.css';
// import NavBar from './components/NavBar'
// import Overview from './components/Overview';
// import Documents from './components/Documents';
// import Distributions from './components/Distributions';
// import Tabs from './components/Tabs';

// function App() {
//   const [activeTab, setActiveTab] = useState("Overview");

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Navbar fixed */}
//       <NavBar />

//       {/* Push Tabs below navbar */}
//       <div className="pt-[60px]">
//         <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
//       </div>

//       {/* Push Content below navbar + tabs */}
//       <div className="p-6 mt-6">
//         {activeTab === "Overview" && <Overview />}
//         {activeTab === "Documents" && <Documents />}
//         {activeTab === "Distributions" && <Distributions />}
//       </div>
//     </div>
//   )
// }

// export default App

import React, { useEffect, useState } from "react";
import "./index.css";
import NavBar from "./components/NavBar";
import Tabs from "./components/Tabs";
import Overview from "./components/Overview";
import Documents from "./components/Documents";
import Distributions from "./components/Distributions";

function App() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [darkMode, setDarkMode] = useState(false);

  // Global body colors (same dark effect across app)
  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? "#000" : "#fff";
    document.body.style.color = darkMode ? "#fff" : "#000";
  }, [darkMode]);

  return (
    <div className={darkMode ? "min-h-screen bg-black text-white" : "min-h-screen bg-gray-100 text-black"}>
      {/* Fixed Navbar */}
      <NavBar darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />

      {/* Space below fixed navbar, then Tabs (transparent UI) */}
      <div className="pt-[60px]">
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} darkMode={darkMode} />
      </div>

      {/* Page content */}
      <div className="p-6">
        {activeTab === "Overview" && <Overview />}
        {activeTab === "Documents" && <Documents darkMode={darkMode} />}
        {activeTab === "Distributions" && <Distributions />}
      </div>
    </div>
  );
}

export default App;
