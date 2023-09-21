import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/loginAndRegister.css';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // registration logic 
    console.log('Form Data:', formData);
  };

  return (
    <div className="min-h-screen bg-slate-100	 flex flex-col items-center justify-center">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg marginRegister">
        <h2 className="text-3xl font-semibold text-center">Regisztráció</h2>


        <form className="mt-4 space-y-4" onSubmit={handleSubmit}>


          <div>
            <label htmlFor="lastName" className="block text-lg font-medium text-gray-700">
              Vezetéknév
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              onChange={handleChange}
              value={formData.lastName}
              autoComplete="family-name"
              required
              className="appearance-none block w-full px-4 py-3 border rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 text-xl mt-2"
              placeholder="Minta"
            />
          </div>

          <div>
            <label htmlFor="firstName" className="block text-lg font-medium text-gray-700">
              Keresztnév
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              onChange={handleChange}
              value={formData.firstName}
              autoComplete="given-name"
              required
              className="appearance-none block w-full px-4 py-3 border rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 text-xl mt-2"
              placeholder="János"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-lg font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={handleChange}
              value={formData.email}
              autoComplete="email"
              required
              className="appearance-none block w-full px-4 py-3 border rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 text-xl mt-2"
              placeholder="mintajanos@gmail.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-lg font-medium text-gray-700">
              Jelszó
            </label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={handleChange}
              value={formData.password}
              autoComplete="new-password"
              required
              className="appearance-none block w-full px-4 py-3 border rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 text-xl mt-2"
              placeholder="Jelszó"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-lg font-medium text-gray-700">
              Jelszó újra
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              onChange={handleChange}
              value={formData.confirmPassword}
              autoComplete="new-password"
              required
              className="appearance-none block w-full px-4 py-3 border rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 text-xl mt-2"
              placeholder="Jelszó"
            />
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-lg font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-6"
            >
              Regisztráció
            </button>
          </div>
          <p className="text-lg text-center mt-2">
          Már van fiókja?{' '}
          <Link to="/belepes" className="font-medium text-indigo-600 hover:text-indigo-500">
            Bejelentkezés
          </Link>
        </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
