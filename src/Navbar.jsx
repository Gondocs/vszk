import React, { useState } from 'react';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className=" mx-2 flex items-center">
        {/* Left Side - Logo */}
        <div className="text-white mr-8">
          <img src="https://www.adaptivewfs.com/wp-content/uploads/2020/07/logo-placeholder-image.png" alt="Logo" className="h-8 w-8" />
        </div>

        {/* Left Side - Szoftverek Dropdown */}
        <div className="relative group hidden md:block mr-16 ml-16">
          <button
            className="text-white focus:outline-none"
            onClick={toggleDropdown}
          >
            Szoftverek
          </button>
          {showDropdown && (
            <div className="absolute bg-gray-800 z-10 w-48 mt-2 py-2 space-y-2 border border-gray-700">
              {/* Add your dropdown options here */}
              <a href="#/" className="block px-4 py-2 text-white hover:bg-gray-600">
                Option 1
              </a>
              <a href="#/" className="block px-4 py-2 text-white hover:bg-gray-600">
                Option 2
              </a>
              {/* Add more options */}
            </div>
          )}
        </div>

        {/* Left Side - Összehasonlítás */}
        <a href="#/" className="text-white hover:text-gray-400 hidden md:block mr-8">
          Összehasonlítás
        </a>

        {/* Center - Search Bar */}
        <div className="flex-grow mx-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="pl-8 pr-10 py-2 rounded-lg bg-gray-700 text-white focus:outline-none w-full"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9 0a9 9 0 110 18A9 9 0 019 0zm0 1a8 8 0 100 16A8 8 0 009 1zm-1.293 4.293a1 1 0 00-1.414 1.414L6.586 9H4a1 1 0 100 2h2.586l-1.293 1.293a1 1 0 101.414 1.414l2-2a1 1 0 000-1.414l-2-2z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Right Side - Login/Register */}
        <a href="#/" className="text-white hover:text-gray-400 ml-8 ">
          Belépés/Regisztráció
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
