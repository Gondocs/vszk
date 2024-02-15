import React from "react";
import NoSoftwareSvg from "../assets/NoSoftwareSvg";

export function SoftwareNotFound({ filteredSoftwareData }) {
  return filteredSoftwareData.length === 0 ? (
    <div className="flex justify-center">
      <div className="bg-white rounded-25 py-12 w-full border border-gray-400 shadow-xl text-4xl text-center items-center">
        A keresett szoftver nem található.
        <NoSoftwareSvg />
      </div>
    </div>
  ) : null;
}
