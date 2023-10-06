import React from 'react';

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
  return (
    <div className="flex justify-center items-center mt-4">
      <ul className="flex space-x-2">
        {Array.from({ length: totalPages }).map((_, index) => (
          <li key={index}>
            <button
              className={`px-4 py-2 rounded-md ${
                currentPage === index + 1
                  ? "bg-gray-700 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-500 hover:text-white"
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
