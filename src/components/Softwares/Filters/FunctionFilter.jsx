import React, { useState } from "react";
import { transliterate } from "../../api/transliteration.js";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import "../../../css/FilterButton.css";

function FunctionFilter(props) {
  const {
    FunctionsData,
    Maincategory,
    Subcategory,
    selectedFunctions,
    handleFunctionClick,
  } = props;

  const [parent] = useAutoAnimate(/* optional config */);

  const [collapsedCategories, setCollapsedCategories] = useState({});

  const toggleFuncCollapse = (categoryID) => {
    setCollapsedCategories((prevState) => ({
      ...prevState,
      [categoryID]: !prevState[categoryID],
    }));
  };

  return (
    <ul>
      {FunctionsData.map((category) => {
        const mainCategory = transliterate(category.category_group);
        const subCategory = transliterate(category.name);
        const isMainCategoryMatch = mainCategory === Maincategory;
        const isSubCategoryMatch = subCategory === Subcategory;
        const categoryID = category.categoryID;

        if (isMainCategoryMatch && (isSubCategoryMatch || !Subcategory)) {
          const isFuncCollapsed = collapsedCategories[categoryID];

          return (
            <li key={categoryID} ref={parent}>
              <h3
                className={`text-lg text-white my-4 p-2 rounded-xl text-center effect effect-5 hover:bg-gray-600 ${
                  isFuncCollapsed
                    ? "bg-gray-600 transition-class"
                    : "bg-gray-700 transition-class"
                }`}
                onClick={() => toggleFuncCollapse(categoryID)}
              >
                {category.name}
              </h3>
              {!isFuncCollapsed ? null : (
                <ul>
                  {category.func_list.map((func, index) => (
                    <li key={index} className="">
                      <label className="flex items-center text-md bg-white p-2 shadow-md mt-5 mb-5 rounded-xl pl-4 hover:bg-gray-200">
                        <input
                          type="checkbox"
                          checked={selectedFunctions.includes(func)}
                          onChange={() => handleFunctionClick(func)}
                          className="mr-2 cursor-pointer w-6 h-6"
                          style={{
                            minWidth: "25px",
                            maxWidth: "25px",
                            minHeight: "25px",
                            maxHeight: "25px",
                          }}
                        />
                        {func}
                      </label>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        }

        return null;
      })}
    </ul>
  );
}

export default FunctionFilter;
