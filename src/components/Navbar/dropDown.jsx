import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import '../../css/dropDown.css';
import { get } from '../api/api';

const DropdownMenu = () => {
  const [MainCategoryData, setMainCategoryData] = useState([]);

  useEffect(() => {
    get.Category().then((data) => setMainCategoryData(data));
  }, []);

  const uniqueCategories = Array.from(
    new Set(MainCategoryData.map((category) => category.categoryGroup.name))
  );
 
  console.log(MainCategoryData);

  return (
    <div className="absolute bg-gray-800 z-10 w-max mt-0 py-2 border border-gray-700 text-white focus:outline-none FadeInSmall">
      <ul className="mt-2 mb-2 ml-4 mr-4">
        {uniqueCategories.map((categoryName) => (
          <Link to={categoryName} key={categoryName}>
            <button className="w-full block text-left pl-6 pr-6 py-4 text-white hover:bg-gray-600">
              <li className="">{categoryName}</li>
            </button>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default DropdownMenu;
