import React, { useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import "../../../../css/FilterButton.css";

function OsFilter({ OsData, selectedOs, handleOSClick }) {
  const [parent] = useAutoAnimate(/* optional config */);

  const [isOSCollapsed, setIsOSCollapsed] = useState(false);

  const toggleOSeCollapse = () => {
    setIsOSCollapsed(!isOSCollapsed);
  };

  return (
    <ul ref={parent}>
      <h1
        className={`text-lg text-white my-4 p-2 rounded-xl text-center effect effect-5 hover:bg-gray-600 ${
          isOSCollapsed
            ? "bg-gray-600 transition-class"
            : "bg-gray-700 transition-class"
        }`}
        onClick={toggleOSeCollapse}
      >
        Operációs Rendszerek
      </h1>
      {!isOSCollapsed ? null : (
        <ul>
          {OsData.map((OS, index) => (
            <li key={index}>
              <label className="flex items-center text-md bg-white p-2 shadow-md mt-5 mb-5 rounded-xl pl-4 hover:bg-gray-200 ">
                <input
                  type="checkbox"
                  checked={selectedOs.includes(OS)}
                  onChange={() => handleOSClick(OS)}
                  className="mr-2 cursor-pointer w-6 h-6"
                  style={{
                    minWidth: "25px",
                    maxWidth: "25px",
                    minHeight: "25px",
                    maxHeight: "25px",
                  }}
                />
                {OS}
              </label>
            </li>
          ))}
        </ul>
      )}
    </ul>
  );
}

export default OsFilter;
