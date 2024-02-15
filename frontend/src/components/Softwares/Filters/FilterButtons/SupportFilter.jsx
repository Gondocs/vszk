import React, { useState, useEffect } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import "../../../../css/FilterButton.css";

function SupportFilter({ SupportData, onSupportChange, Maincategory, Subcategory  }) {
  const [parent] = useAutoAnimate(/* optional config */);

  const [isSupportCollapsed, setIsSupportCollapsed] = useState(false);

  const toggleSupportCollapse = () => {
    setIsSupportCollapsed(!isSupportCollapsed);
  };

  const [selectedSupport, setSelectedSupport] = useState([]);
  useEffect(() => {
    setSelectedSupport([]);
    onSupportChange([]);
    // eslint-disable-next-line
  }, [Maincategory, Subcategory]);

  const handleSupportClick = async (Os) => {
    let updatedSupport;

    if (selectedSupport.includes(Os)) {
      updatedSupport = selectedSupport.filter(
        (selected) => selected !== Os
      );
    } else {
      updatedSupport = [...selectedSupport, Os];
    }

    await setSelectedSupport(updatedSupport);

    onSupportChange(updatedSupport); // Call the callback function with the updated data
    console.log(updatedSupport);
    console.log(selectedSupport);
  };

  return (
    <ul ref={parent}>
      <h1
        className={`text-lg text-white my-4 p-2 rounded-xl text-center effect effect-5 hover:bg-gray-600 ${
          isSupportCollapsed
            ? "bg-gray-600 transition-class"
            : "bg-gray-700 transition-class"
        }`}
        onClick={toggleSupportCollapse}
      >
        Támogatás Nyelve
      </h1>
      {!isSupportCollapsed ? null : (
        <ul>
          {SupportData.map((Support, index) => (
            <li key={index}>
              <label className="flex items-center text-md bg-white p-2 shadow-md mt-5 mb-5 rounded-xl pl-4 hover:bg-gray-200 ">
                <input
                  type="checkbox"
                  checked={selectedSupport.includes(Support)}
                  onChange={() => handleSupportClick(Support)}
                  className="mr-2 cursor-pointer w-6 h-6"
                  style={{
                    minWidth: "25px",
                    maxWidth: "25px",
                    minHeight: "25px",
                    maxHeight: "25px",
                  }}
                />
                {Support}
              </label>
            </li>
          ))}
        </ul>
      )}
    </ul>
  );
}

export default SupportFilter;
