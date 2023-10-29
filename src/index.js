import React from "react";
import ReactDOM from "react-dom/client";
import "./css/index.css";
import { Navbar } from "./components/Navbar/Navbar";
import reportWebVitals from "./reportWebVitals";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginPage from "./components/LoginAndRegister/loginPage";
import Register from "./components/LoginAndRegister/RegisterPage";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import { HomePage } from "./components/MainPage/MainPage";
import { Footer } from "./components/MainPage/Footer";
import SoftwareList from "./components/Softwares/SoftwareList";
import SoftwareDetail from "./components/Softwares/SoftwareDetail/SoftwareDetail";
import { Apitest } from "./components/api/apitest";
import { Toaster } from "react-hot-toast";
import { CompanyList } from "./components/Companies/CompanyList";
import CompanyDetail from "./components/Companies/CompanyDetail";

const isAuthenticated = !!localStorage.getItem("token"); // Check if the user is authenticated

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Toaster />
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              {" "}
              <HomePage /> <Footer />{" "}
            </>
          }
        >
          {" "}
        </Route>
        <Route
          path="/belepes"
          element={isAuthenticated ? <Navigate to="/" /> : <LoginPage />}
        >
          {" "}
        </Route>
        <Route
          path="/regisztracio"
          element={isAuthenticated ? <Navigate to="/" /> : <Register />}
        >
          {" "}
        </Route>
        <Route
          path="*"
          element={
            <>
              {" "}
              <PageNotFound />{" "}
            </>
          }
        >
          {" "}
        </Route>
        <Route
          path="/szoftverek"
          element={
            <>
              {" "}
              <SoftwareList /> <Footer />{" "}
            </>
          }
        >
          {" "}
        </Route>
        <Route
          path="/szoftverek/:Maincategory"
          element={
            <>
              {" "}
              <SoftwareList /> <Footer />{" "}
            </>
          }
        />
        <Route
          path="/szoftverek/:Maincategory/:Subcategory"
          element={
            <>
              {" "}
              <SoftwareList /> <Footer />{" "}
            </>
          }
        />
        <Route
          path="/szoftverek/:Maincategory/:SubCategory/:name"
          element={
            <>
              {" "}
              <SoftwareDetail /> <Footer />{" "}
            </>
          }
        />
        <Route
          path="/cegek/:name"
          element={
            <>
              {" "}
              <CompanyDetail /> <Footer />{" "}
            </>
          }
        />

        <Route
          path="/cegek/"
          element={
            <>
              {" "}
              <CompanyList /> <Footer />{" "}
            </>
          }
        />

        <Route path="/test" element={<Apitest />}></Route>
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
