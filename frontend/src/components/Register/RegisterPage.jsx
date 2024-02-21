import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../css/loginAndRegister.css";
import RegisterSvg from "../assets/RegisterSvg";
import { post } from "../api/api";
import { showToast } from "../toasts/toast";
import { showToastLong } from "../toasts/toastLong";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const [formData, setFormData] = useState({
    lastname: "",
    firstname: "",
    email: "",
    password: "",
    country: "",
    settlement: "",
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

    // password validation
    const passwordErrors = [];

    if (formData.password.length < 6) {
      passwordErrors.push("Jelszó túl rövid (legalább 6 karakter szükséges)");
    }
    if (!/\d/.test(formData.password)) {
      passwordErrors.push("Nincsenek számok a jelszóban");
    }
    if (!/[A-Z]/.test(formData.password)) {
      passwordErrors.push("Nincsenek nagybetűk a jelszóban");
    }
    if (formData.password !== passwordConfirmation) {
      passwordErrors.push("A jelszavak nem egyeznek");
    }

    setPasswordErrors(passwordErrors);

    // check if any validation failed
    if (passwordErrors.length > 0) {
      showToast(
        "Hiba a jelszó mezők validálása során. Kérjük, ellenőrizze a hibákat.",
        "error"
      );
      return; // prevent form submission
    }

    console.log("Form Data:", formData);

    post
      .RegisterData(formData)
      .then(() => {
        showToastLong("Sikeres regisztráció!", "success");
        navigate(-1);
      })
      .catch((error) => {
        showToastLong(
          "Hiba történt a regisztráció közben: " + error.response.data,
          "error"
        );
        console.log(error);
      });
  };

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-center">
      <div
        className="w-1/3 p-8 bg-white rounded-lg shadow-lg marginRegister FadeInSmall"
        style={{ marginLeft: "8%" }}
      >
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
                htmlFor="lastname"
                className="block text-lg font-medium text-gray-700"
              >
                Vezetéknév
              </label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                onChange={handleChange}
                value={formData.lastname}
                autoComplete="family-name"
                required
                className="appearance-none block w-full px-4 py-3 border rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 text-lg mb-4 mt-2 hover-scale-loginandregister hover-scale-loginandregister:hover"
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
                className="appearance-none block w-full px-4 py-3 border rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 text-lg mb-4 mt-2 hover-scale-loginandregister hover-scale-loginandregister:hover"
                placeholder="mintajanos@gmail.com"
              />
            </div>

            {/* Add more form fields for the first column as needed */}
          </div>

          <div className="w-full md:w-1/2 pl-2">
            <div>
              <label
                htmlFor="firstname"
                className="block text-lg font-medium text-gray-700"
              >
                Keresztnév
              </label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                onChange={handleChange}
                value={formData.firstname}
                autoComplete="given-name"
                required
                className="appearance-none block w-full px-4 py-3 border rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 text-lg mb-4 mt-2 hover-scale-loginandregister hover-scale-loginandregister:hover"
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
                className="appearance-none block w-full px-4 py-3 border rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 text-lg  mb-4 mt-2 hover-scale-loginandregister hover-scale-loginandregister:hover"
                placeholder="Magyarország"
              />
            </div>
            {/*  more form fields for the second column here */}
          </div>

          <div className="w-full">
            <label
              htmlFor="city"
              className="block text-lg font-medium text-gray-700"
            >
              Város
            </label>
            <input
              id="settlement"
              name="settlement"
              type="city"
              onChange={handleChange}
              value={formData.settlement}
              autoComplete="city"
              className="appearance-none block w-full px-4 py-3 border rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 text-lg mb-4 mt-2 hover-scale-loginandregister hover-scale-loginandregister:hover"
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
              className="appearance-none block w-full px-4 py-3 border rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 text-lg mb-4 mt-2 hover-scale-loginandregister hover-scale-loginandregister:hover"
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
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              value={passwordConfirmation}
              autoComplete="new-password"
              required
              className="appearance-none block w-full px-4 py-3 border rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 text-lg mt-2 hover-scale-loginandregister hover-scale-loginandregister:hover"
              placeholder="Jelszó"
            />
          </div>
          {passwordErrors.length > 0 && (
            <div className="w-full text-red-500 mt-3">
              {passwordErrors.map((error, index) => (
                <p key={index}>{error}</p>
              ))}
            </div>
          )}

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

      <div
        className="flex FadeInSmall"
        style={{ marginLeft: "8%", marginRight: "8%" }}
      >
        <div>
          <RegisterSvg />
        </div>
      </div>
    </div>
  );
};

export default Register;
