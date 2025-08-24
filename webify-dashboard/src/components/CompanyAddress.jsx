import React from 'react'

const CompanyAddress = () => {
  return (
    <div className="w-full lg:w-72 bg-white shadow-lg p-4 lg:p-6">
      <div className="space-y-4 lg:space-y-6">
        {/* Company Address */}
                  <div>
            <h3 className="text-xs lg:text-sm font-bold uppercase tracking-wide mb-2 text-gray-600">
              COMPANY ADDRESS
            </h3>
            <p className="mb-1 text-sm lg:text-base text-gray-800">They think I'm hiding in the shadows but I am the shadows</p>
            <p className="text-sm lg:text-base text-gray-800 font-semibold">Gotham City</p>
          </div>

                  {/* Point of Contact */}
          <div>
            <h3 className="text-xs lg:text-sm font-bold uppercase tracking-wide mb-2 text-gray-600">
              POINT OF CONTACT
            </h3>
            <p className="mb-1 text-sm lg:text-base text-gray-800">Zuhair Shad</p>
            <p className="text-sm lg:text-base text-gray-600">Investor Relations</p>
          </div>

          {/* Phone/Fax */}
          <div>
            <h3 className="text-xs lg:text-sm font-bold uppercase tracking-wide mb-2 text-gray-600">
              PHONE/FAX
            </h3>
            <p className="text-sm lg:text-base text-gray-800">Sorry</p>
          </div>

          {/* Email */}
          <div>
            <h3 className="text-xs lg:text-sm font-bold uppercase tracking-wide mb-2 text-gray-600">
              EMAIL
            </h3>
            <a href="mailto:zuhairshad140@gmail.com" className="text-sm lg:text-base text-blue-600 hover:text-blue-800 transition-all duration-200 ease-in-out hover:scale-105 hover:font-medium break-all">
              zuhairshad140@gmail.com
            </a>
          </div>

          {/* Website */}
          <div>
            <h3 className="text-xs lg:text-sm font-bold uppercase tracking-wide mb-2 text-gray-600">
              WEBSITE
            </h3>
            <a href="https://batman.com" target="_blank" rel="noopener noreferrer" className="text-sm lg:text-base text-blue-600 hover:text-blue-800 transition-all duration-200 ease-in-out hover:scale-105 hover:font-medium break-all">
              https://batman.com
            </a>
          </div>
      </div>
    </div>
  )
}

export default CompanyAddress
