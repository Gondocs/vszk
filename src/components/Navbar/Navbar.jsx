import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import DropdownMenu from './dropDown';
import '../../css/Navbar.css';

const Navbar = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);


  const handleMouseEnter = () => {
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setDropdownVisible(false);
  };

  return (
    <nav className="bg-gray-800 p-4 rounded-lg">
      <div className="flex items-center">
    
        <Link to="/" className="text-white hover:text-gray-400 block mr-24 ml-4 text-[1.5rem] hover-scale hover-scalemain hover-scalemain:hover">
          Főoldal
        </Link>

        {/* Left Side - Szoftverek Dropdown */}

        <div
          className="relative group block mr-16 ml-4"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Link to={'/szoftverek'}>
          <button className={`text-white ${isDropdownVisible ? 'text-gray-400' : 'hover:text-gray-400'} block mr-8 hover-scale hover-scale:hover text-[1.2rem]`}>
          Szoftverek
        </button>
          </Link>
          {isDropdownVisible && <DropdownMenu />}
        </div>

        {/* Left Side - Összehasonlítás */}
        <Link to="/osszehasonlitas" className="text-white hover:text-gray-400 block mr-24 hover-scale hover-scale:hover text-[1.2rem]">
          Összehasonlítás
        </Link>

        {/* Center - Search Bar */}
        <div className="flex-grow">
          <div className="relative">
            <input
              type="text"
              placeholder="Keresés"
              className="pl-8 pr-10 py-2 rounded-lg bg-gray-700 text-white focus:outline-none w-full hover-scale hover-scale:hover"
            />
          </div>
        </div>

        {/* Right Side - Login and Register */}
        <Link to="/belepes" className="text-white hover:text-gray-400 ml-40 hover-scale hover-scale:hover text-[1rem]" >
          Belépés
        </Link>
        <h5 className='text-white px-1'>/</h5>
        <Link to="/regisztracio" className="text-white hover:text-gray-400 mr-4 hover-scale hover-scale:hover text-[1rem]">
          Regisztráció
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
