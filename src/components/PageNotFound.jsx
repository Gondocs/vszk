import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-12 rounded-lg shadow-lg">
        <h1 className="text-5xl font-semibold text-gray-800 mb-8">404 - Az oldal nem található</h1>
        <p className="text-gray-600 mt-2 mb-8 text-2xl">Az általad keresett oldal nem létezik.</p>
        <div className='items-center justify-center flex-col flex'>
        <Link to="/" className="mt-2 bg-blue-500 hover:bg-blue-600 text-white py-4 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105 text-2xl">
          Főoldalra
        </Link>

        </div>

      </div>
    </div>
  );
}

export default NotFound;
