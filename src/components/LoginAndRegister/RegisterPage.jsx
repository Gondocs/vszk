import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../css/loginAndRegister.css";
import RegisterSvg from "../assets/RegisterSvg";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    city: "",
    password: "",
    confirmPassword: "",
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
    console.log("Form Data:", formData);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-center">
      {/* Left side with SVG */}

      {/* Right side with register form */}

      <div className="w-1/3 p-8 bg-white rounded-lg shadow-lg marginRegister FadeInSmall">
        <h2 className="text-3xl font-semibold text-center hover-scale-loginandregister hover-scale-loginandregister:hover">
          Regisztráció
        </h2>

        <form
          className="mt-4 flex flex-wrap justify-between"
          onSubmit={handleSubmit}
        >
          <div className="w-full md:w-1/2 pr-2">
            <div>
              <label
                htmlFor="lastName"
                className="block text-lg font-medium text-gray-700"
              >
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
                className="appearance-none block w-full px-4 py-3 border rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 text-xl mb-4 mt-2 hover-scale-loginandregister hover-scale-loginandregister:hover"
                placeholder="Minta"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-lg font-medium text-gray-700"
              >
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
                className="appearance-none block w-full px-4 py-3 border rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 text-xl mb-4 mt-2 hover-scale-loginandregister hover-scale-loginandregister:hover"
                placeholder="mintajanos@gmail.com"
              />
            </div>

            {/* Add more form fields for the first column as needed */}
          </div>

          <div className="w-full md:w-1/2 pl-2">
            <div>
              <label
                htmlFor="firstName"
                className="block text-lg font-medium text-gray-700"
              >
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
                className="appearance-none block w-full px-4 py-3 border rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 text-xl mb-4 mt-2 hover-scale-loginandregister hover-scale-loginandregister:hover"
                placeholder="János"
              />
            </div>

            <div>
              <label
                htmlFor="country"
                className="block text-lg font-medium text-gray-700"
              >
                Ország
              </label>
              <input
                id="country"
                name="country"
                type="country"
                onChange={handleChange}
                value={formData.country}
                required
                className="appearance-none block w-full px-4 py-3 border rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 text-xl  mb-4 mt-2 hover-scale-loginandregister hover-scale-loginandregister:hover"
                placeholder="Magyarország"
              />
            </div>

            {/* Add more form fields for the second column as needed */}
          </div>

          <div className="w-full">
            <label
              htmlFor="city"
              className="block text-lg font-medium text-gray-700"
            >
              Város
            </label>
            <input
              id="city"
              name="city"
              type="city"
              onChange={handleChange}
              value={formData.city}
              autoComplete="city"
              required
              className="appearance-none block w-full px-4 py-3 border rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 text-xl mb-4 mt-2 hover-scale-loginandregister hover-scale-loginandregister:hover"
              placeholder="Budapest"
            />
          </div>

          <div className="w-full">
            <label
              htmlFor="password"
              className="block text-lg font-medium text-gray-700"
            >
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
              className="appearance-none block w-full px-4 py-3 border rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 text-xl mb-4 mt-2 hover-scale-loginandregister hover-scale-loginandregister:hover"
              placeholder="Jelszó"
            />
          </div>

          <div className="w-full">
            <label
              htmlFor="confirmPassword"
              className="block text-lg font-medium text-gray-700"
            >
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
              className="appearance-none block w-full px-4 py-3 border rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 text-xl mt-2 hover-scale-loginandregister hover-scale-loginandregister:hover"
              placeholder="Jelszó"
            />
          </div>

          <div className="w-full">
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-lg font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-6 hover-scale-loginandregister hover-scale-loginandregister:hover"
            >
              Regisztráció
            </button>
          </div>
        </form>

        <p className="text-lg text-center mt-2">
          Már van fiókja?{" "}
          <Link
            to="/belepes"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Bejelentkezés
          </Link>
        </p>
      </div>

      <div className="flex FadeInSmall" style={{ marginLeft: "8%" }}>
        <RegisterSvg />
      </div>
    </div>
  );
};

export default Register;
