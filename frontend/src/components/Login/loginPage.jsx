import React, { useState } from "react";
import "../../css/loginAndRegister.css";
import LoginSvg from "../assets/LoginSvg";
import { post } from "../api/api";
import { useNavigate } from "react-router-dom";
import { showToastLong } from "../toasts/toastLong";
import { useAuth } from "../Auth/Auth";

function LoginPage() {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
    post.LoginData(formData)
      .then(({ token, userID, email, firstname, lastname}) => {
        setToken(token)
        localStorage.setItem("userID", userID);
        localStorage.setItem("email", email);
        localStorage.setItem("firstname", firstname);
        localStorage.setItem("lastname", lastname);
        
        navigate("/", { replace: true });
        showToastLong("Sikeres Bejelentkezés!", "success");
      })
      .catch((error) => {
        showToastLong(
          "Hiba történt a belépés közben: " + error.response.data,
          "error"
        );
        console.log(error);
      });
  };
  

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-center">
      {/* Left side with SVG */}
      <div className="flex FadeInSmall" style={{ marginLeft: "8%" }}>
        <LoginSvg />
      </div>

      {/* Right side with login form */}
      <div
        className="p-10 bg-white max-w-xl rounded-lg shadow-md marginLogin FadeInSmall"
        style={{ marginRight: "8%" }}
      >
        <h2 className="text-3xl font-semibold text-center hover-scale-loginandregister hover-scale-loginandregister:hover">
          Jelentkezz be a fiókodba
        </h2>
        <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-lg font-medium text-gray-700"
            >
              Email
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="appearance-none block w-full px-4 py-3 border rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 text-xl hover-scale-loginandregister hover-scale-loginandregister:hover"
                placeholder="minta@gmail.com"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-lg font-medium text-gray-700"
            >
              Jelszó
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="appearance-none block w-full px-4 py-3 border rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 text-xl hover-scale-loginandregister hover-scale-loginandregister:hover"
                placeholder="Jelszó"
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-5 w-5 text-indigo-500 focus:ring-indigo-500 border-gray-300 rounded hover-scale hover-scale:hove"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-lg text-gray-900"
              >
                Emlékezz rám
              </label>
            </div>
            <div className="text-lg ml-4">
              <a
                href="/#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Elfelejtetted a jelszódat?
              </a>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-lg font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover-scale-loginandregister hover-scale-loginandregister:hover"
            >
              Bejelentkezés
            </button>
          </div>
        </form>
        <div className="text-lg text-center mt-4">
          Nincs még fiókod?{" "}
          <a
            href="/regisztracio"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Regisztrálj itt
          </a>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
