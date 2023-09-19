import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import DropdownMenu from './dropDown';
import '../css/Navbar.css';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isDropdownVisible, setDropdownVisible] = useState(false);


  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleMouseEnter = () => {
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setDropdownVisible(false);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="mx-2 flex items-center">
    
        <Link to="/" className="text-white hover:text-gray-400 hidden md:block mr-24 ml-4 text-[1.3rem] hover-scale hover-scale:hover">
          Főoldal
        </Link>

        {/* Left Side - Szoftverek Dropdown */}

        <div
          className="relative group hidden md:block mr-16 ml-4"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <button className='text-white focus:outline-none'>Szoftverek</button>
          {isDropdownVisible && <DropdownMenu />}
        </div>

        {/* Left Side - Összehasonlítás */}
        <Link to="/osszehasonlitas" className="text-white hover:text-gray-400 hidden md:block mr-8 hover-scale hover-scale:hover">
          Összehasonlítás
        </Link>

        {/* Center - Search Bar */}
        <div className="flex-grow mx-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Keresés"
              className="pl-8 pr-10 py-2 rounded-lg bg-gray-700 text-white focus:outline-none w-full hover-scale hover-scale:hover"
            />
          </div>
        </div>

        {/* Right Side - Login and Register */}
        <Link to="/belepes" className="text-white hover:text-gray-400 ml-80 hover-scale hover-scale:hover" >
          Belépés
        </Link>
        <h5 className='text-white'>/</h5>
        <Link to="/regisztracio" className="text-white hover:text-gray-400 ml-0 hover-scale hover-scale:hover">
          Regisztráció
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
