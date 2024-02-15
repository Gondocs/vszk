import React, { useState, useEffect } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import "../../../../css/FilterButton.css";

function LanguageFilter({
  LanguageData,
  onLanguageChange,
  Maincategory,
  Subcategory,
}) {

  const [selectedLanguage, setSelectedLanguage] = useState([]);
  useEffect(() => {
    setSelectedLanguage([]);
    onLanguageChange([]); 
    // eslint-disable-next-line
  }, [Maincategory, Subcategory]);

  const handleLanguageClick = async (language) => {
    let updatedLanguage;

    if (selectedLanguage.includes(language)) {
      updatedLanguage = selectedLanguage.filter(
        (selected) => selected !== language
      );
    } else {
      updatedLanguage = [...selectedLanguage, language];
    }

    await setSelectedLanguage(updatedLanguage);

    onLanguageChange(updatedLanguage); // Call the callback function with the updated data
    console.log(updatedLanguage);
    console.log(selectedLanguage);
  };

  const [parent] = useAutoAnimate(/* optional config */);

  const [isLanguageCollapsed, setIsLanguageCollapsed] = useState(false);

  const toggleLanguageCollapse = () => {
    setIsLanguageCollapsed(!isLanguageCollapsed);
  };



  return (
    <ul ref={parent}>
      <h1
        className={`text-lg text-white my-4 p-2 rounded-xl text-center effect effect-5 hover:bg-gray-600 ${
          isLanguageCollapsed
            ? "bg-gray-600 transition-class"
            : "bg-gray-700 transition-class"
        }`}
        onClick={toggleLanguageCollapse}
      >
        Szoftver Nyelve
      </h1>
      {!isLanguageCollapsed ? null : (
        <ul>
          {LanguageData.map((language, index) => (
            <li key={index}>
              <label className="flex items-center text-md bg-white p-2 shadow-md mt-5 mb-5 rounded-xl pl-4 hover:bg-gray-200">
                <input
                  type="checkbox"
                  checked={selectedLanguage.includes(language)}
                  onChange={() => handleLanguageClick(language)}
                  className="mr-2 cursor-pointer w-6 h-6"
                  style={{
                    minWidth: "25px",
                    maxWidth: "25px",
                    minHeight: "25px",
                    maxHeight: "25px",
                  }}
                />
                {language}
              </label>
            </li>
          ))}
        </ul>
      )}
    </ul>
  );
}

export default LanguageFilter;
