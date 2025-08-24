import React from "react";

const RightSidebar = ({ animateCharts, darkMode }) => {
  return (
    <aside
      className={`w-72 rounded-lg shadow-lg p-6 transition-all duration-1000 delay-500
        ${animateCharts ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}
        max-lg:w-full max-lg:mt-6
        ${darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"}`}
    >
      <div className="space-y-6">
        {/* Company Address */}
        <section>
          <h3 className={`text-sm font-bold uppercase tracking-wide mb-2 ${darkMode ? "text-gray-300" : "text-gray-900"}`}>
            COMPANY ADDRESS
          </h3>
          <p className={`${darkMode ? "text-gray-200" : "text-gray-900"} mb-1`}>
            They think I'm hiding in the shadows but I am the shadows
          </p>
          <p className={`${darkMode ? "text-gray-100" : "text-gray-900"} font-semibold`}>
            Gotham City
          </p>
        </section>

        {/* Point of Contact */}
        <section>
          <h3 className={`text-sm font-bold uppercase tracking-wide mb-2 ${darkMode ? "text-gray-300" : "text-gray-900"}`}>
            POINT OF CONTACT
          </h3>
          <p className={`${darkMode ? "text-gray-200" : "text-gray-900"} mb-1`}>Zuhair Shad</p>
          <p className={`${darkMode ? "text-gray-400" : "text-gray-700"}`}>Investor Relations</p>
        </section>

        {/* Phone/Fax */}
        <section>
          <h3 className={`text-sm font-bold uppercase tracking-wide mb-2 ${darkMode ? "text-gray-300" : "text-gray-900"}`}>
            PHONE/FAX
          </h3>
          <p className={`${darkMode ? "text-gray-200" : "text-gray-900"}`}>Sorry</p>
        </section>

        {/* Email */}
        <section>
          <h3 className={`text-sm font-bold uppercase tracking-wide mb-2 ${darkMode ? "text-gray-300" : "text-gray-900"}`}>
            EMAIL
          </h3>
          <a
            href="mailto:zuhairshad140@gmail.com"
            className={`${darkMode ? "text-green-400 hover:text-green-300" : "text-green-700 hover:text-green-800"} transition-all duration-200 ease-in-out hover:scale-105 hover:font-medium`}
          >
            zuhairshad140@gmail.com
          </a>
        </section>

        {/* Website */}
        <section>
          <h3 className={`text-sm font-bold uppercase tracking-wide mb-2 ${darkMode ? "text-gray-300" : "text-gray-900"}`}>
            WEBSITE
          </h3>
          <a
            href="https://batman.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`${darkMode ? "text-green-400 hover:text-green-300" : "text-green-700 hover:text-green-800"} transition-all duration-200 ease-in-out hover:scale-105 hover:font-medium`}
          >
            https://batman.com
          </a>
        </section>
      </div>
    </aside>
  );
};

export default RightSidebar;
