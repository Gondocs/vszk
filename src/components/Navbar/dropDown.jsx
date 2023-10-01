import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../css/dropDown.css";
import { get } from "../api/api";
import { transliterate } from "../api/transliteration";
import { showToast } from "../toasts/toast";

const DropdownMenu = () => {
  const [MainCategoryData, setMainCategoryData] = useState([]);
  const [hoveredCategory, setHoveredCategory] = useState(null);

  useEffect(() => {
    get
      .Category()
      .then((data) => {
        setMainCategoryData(data);
      })
      .catch((error) => {
        showToast("Hiba történt az adatok lekérése közben", "error");
      });
  }, []);

  const uniqueCategories = Array.from(
    new Set(MainCategoryData.map((category) => category.categoryGroup.name))
  );

  console.log(MainCategoryData);

  return (
    <div className="absolute bg-gray-800 z-10 w-max mt-0 py-2 border border-gray-700 text-white focus:outline-none FadeInSmall">
      <ul className="mt-2 mb-2">
        {uniqueCategories.map((categoryName) => (
          <li
            key={categoryName}
            className="relative group"
            onMouseEnter={() => setHoveredCategory(categoryName)}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            <Link to={`/szoftverek/${transliterate(categoryName)}`}>
              <button className="w-full block text-left pl-6 pr-6 py-4 text-white hover:bg-gray-600">
                {categoryName}
              </button>
            </Link>

            <ul
              className={`py-2 sub-menu absolute top-0 left-full bg-gray-800 ${
                hoveredCategory === categoryName
                  ? "FadeInSmall"
                  : "invisible opacity-0"
              }`}
            >
              {MainCategoryData.filter(
                (category) => category.categoryGroup.name === categoryName
              ).map((subcategory) => (
                <Link
                  to={`/szoftverek/${transliterate(
                    categoryName
                  )}/${transliterate(subcategory.name)}`}
                  key={subcategory.name}
                >
                  <button className="w-full block text-left pl-6 pr-6 py-4 text-white hover:bg-gray-600 hover:opacity-100">
                    {subcategory.name}
                  </button>
                </Link>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropdownMenu;
