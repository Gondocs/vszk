import React from 'react';
import { Link } from 'react-router-dom';

export const CompanyDetails = () => {

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white py-8 px-20 rounded-full shadow-lg mb-24 FadeInSmall">
        <h1 className="text-4xl font-semibold text-gray-800 mb-4 mt-4">CÉGEK</h1>
        <p className="text-gray-600 mt-2 mb-4 text-xl">CÉGDOLGOK.</p>
        <div className='items-center justify-center flex-col flex'>
        <Link to="/" className="mt-0 bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 text-xl">
          Főoldalra
        </Link>

        </div>

      </div>
    </div>
  );
}
