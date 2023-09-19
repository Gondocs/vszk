import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className=" mx-2 flex items-center">
    
        <Link to="/" className="text-white hover:text-gray-400 hidden md:block mr-24 ml-4 text-[1.3rem]">
          Főoldal
        </Link>

        {/* Left Side - Szoftverek Dropdown */}
        <div className="relative group hidden md:block mr-16 ml-4">
          <button
            className="text-white focus:outline-none"
            onMouseOver={() => toggleDropdown()} 
            onMouseOut={() => {/*toggleDropdown()}*/}} // TODO: need to add keeping dropdown open when hovering over the other options!!! 
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
        <Link to="/osszehasonlitas" className="text-white hover:text-gray-400 hidden md:block mr-8">
          Összehasonlítás
        </Link>

        {/* Center - Search Bar */}
        <div className="flex-grow mx-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Keresés"
              className="pl-8 pr-10 py-2 rounded-lg bg-gray-700 text-white focus:outline-none w-full"
            />
          </div>
        </div>

        {/* Right Side - Login and Register */}
        <Link to="/belepes" className="text-white hover:text-gray-400 ml-80" >
          Belépés
        </Link>
        <h5 className='text-white'>/</h5>
        <Link to="/regisztracio" className="text-white hover:text-gray-400 ml-0">
          Regisztráció
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
