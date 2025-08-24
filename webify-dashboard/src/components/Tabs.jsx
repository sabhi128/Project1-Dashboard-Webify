import React, { useRef, useEffect, useState } from "react";

const Tabs = ({ activeTab, setActiveTab, darkMode }) => {
  const [underlineStyle, setUnderlineStyle] = useState({});
  const tabs = [
    { label: "Overview" },
    { label: "Documents" },
    { label: "Distributions" },
  ];
  const tabRefs = useRef({});

  useEffect(() => {
    const currentTab = tabRefs.current[activeTab];
    if (currentTab) {
      setUnderlineStyle({
        width: currentTab.offsetWidth,
        left: currentTab.offsetLeft,
      });
    }
  }, [activeTab]);

  const inactive = darkMode ? "text-gray-300" : "text-gray-600";
  const active = darkMode ? "text-blue-400" : "text-blue-600";
  const border = darkMode ? "border-gray-700" : "border-gray-300";
  const underline = darkMode ? "bg-blue-400" : "bg-blue-600";

  return (
    <div className="w-full flex flex-col items-center mt-4">
      <div
        className={`flex relative border-b ${border} w-full sm:w-4/5 justify-center overflow-x-auto`}
      >
        <div className="flex space-x-6 sm:space-x-12 px-2 sm:px-0">
          {tabs.map((tab) => (
            <button
              key={tab.label}
              ref={(el) => (tabRefs.current[tab.label] = el)}
              onClick={() => setActiveTab(tab.label)}
              className={`pb-3 text-base sm:text-lg font-medium relative whitespace-nowrap hover:no-underline ${
                activeTab === tab.label ? active : inactive
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Underline stays only under active tab */}
        <div
          className={`absolute bottom-0 h-[2px] ${underline} transition-all duration-300`}
          style={underlineStyle}
        />
      </div>
    </div>
  );
};

export default Tabs;
