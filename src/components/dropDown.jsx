import React from "react";

const DropdownMenu = () => {
  return (
    <div className="absolute bg-gray-800 z-10 w-48 mt-0 py-2 space-y-2 border border-gray-700 text-white focus:outline-none">
      <ul className="mt-2 mb-4 ml-2 mr-2">
        <li className="block px-4 py-2 text-white hover:bg-gray-600">Menu 1</li>
        <li className="block px-4 py-2 text-white hover:bg-gray-600">Menu 2</li>
        <li className="block px-4 py-2 text-white hover:bg-gray-600">Menu 3</li>
        <li className="block px-4 py-2 text-white hover:bg-gray-600">Menu 4</li>
        <li className="block px-4 py-2 text-white hover:bg-gray-600">Menu 5</li>
        <li className="block px-4 py-2 text-white hover:bg-gray-600">Menu 6</li>
        <li className="block px-4 py-2 text-white hover:bg-gray-600">Menu 7</li>
      </ul>
    </div>
  );
};

export default DropdownMenu;