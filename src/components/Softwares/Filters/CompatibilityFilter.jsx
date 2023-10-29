import React, { useState } from "react";

function CompatibilityFilter({
  CompatibilityData,
  handleCompatibilityClick,
  selectedCompatibility,
}) {
  const [isCompatibilityCollapsed, setIsCompatibilityCollapsed] =
    useState(false);

  const toggleCompatibilityCollapse = () => {
    setIsCompatibilityCollapsed(!isCompatibilityCollapsed);
  };

  return (
    <ul>
      <h1
        className={`text-lg text-white my-4 p-2 rounded-xl text-center hover-scale-element:hover hover-scale-element ${
          isCompatibilityCollapsed
            ? "bg-gray-600 transition-class"
            : "bg-gray-700 transition-class"
        }`}
        onClick={toggleCompatibilityCollapse}
      >
        Kompatibilítás
      </h1>
      {!isCompatibilityCollapsed ? null : (
        <ul>
          {CompatibilityData.map((compatibility, index) => (
            <li key={index}>
              <label className="flex items-center text-md bg-white p-2 shadow-md mt-5 mb-5 rounded-xl pl-4 hover-scale-element:hover hover-scale-element hover:bg-gray-100">
                <input
                  type="checkbox"
                  checked={selectedCompatibility.includes(compatibility)}
                  onChange={() => handleCompatibilityClick(compatibility)}
                  className="mr-2 cursor-pointer w-6 h-6"
                  style={{
                    minWidth: "25px",
                    maxWidth: "25px",
                    minHeight: "25px",
                    maxHeight: "25px",
                  }}
                />
                {compatibility}
              </label>
            </li>
          ))}
        </ul>
      )}
    </ul>
  );
}

export default CompatibilityFilter;
