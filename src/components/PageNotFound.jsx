import React from 'react';
import { Link } from 'react-router-dom';
import '../css/PageNotFound.css';

const NotFound = () => {

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white py-8 px-20 rounded-full shadow-lg mb-24 FadeInSmall">
        <h1 className="text-4xl font-semibold text-gray-800 mb-4 mt-4">404 - Az oldal nem található</h1>
        <p className="text-gray-600 mt-2 mb-4 text-xl">Az általad keresett oldal nem létezik.</p>
        <div className='items-center justify-center flex-col flex'>
        <Link to="/" className="mt-0 bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 text-xl">
          Főoldalra
        </Link>

        </div>

      </div>
    </div>
  );
}

export default NotFound;
