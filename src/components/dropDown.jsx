import React from "react";
import { Link } from "react-router-dom";
import '../css/dropDown.css';

const menuItems = [
  { label: "Menu 1", link: "/Menu1" },
  { label: "Menu 2", link: "/Menu2" },
  { label: "Menu 3", link: "/Menu3" },
  { label: "Menu 4", link: "/Menu4" },
  { label: "Menu 5", link: "/Menu5" },
  { label: "Menu 6", link: "/Menu6" },
  { label: "Menu 7", link: "/Menu7" },
  { label: "Menu 8", link: "/Menu8" },
  { label: "Menu 9", link: "/Menu9" },
];

const DropdownMenu = () => {
  return (
    <div className="absolute bg-gray-800 z-10 w-64 mt-0 py-2 space-y-2 border border-gray-700 text-white focus:outline-none">
      <ul className="mt-2 mb-4 ml-2 mr-2">
        {menuItems.map((item) => (
          <Link to={item.link} key={item.link}>
            <button className="block pl-6 pr-40 py-4 text-white hover:bg-gray-600 hover-scale">
              <li className="">{item.label}</li>
            </button>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default DropdownMenu;
