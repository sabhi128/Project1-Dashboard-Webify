import React from 'react';

const NavBar = () => {
  return (
    <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Webify Dashboard</h1>
      <div>
        <button className="bg-white text-blue-600 px-3 py-1 rounded mr-2">Login</button>
        <button className="bg-white text-blue-600 px-3 py-1 rounded">Sign Up</button>
      </div>
    </div>
  );
};

export default NavBar;
