import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../Auth/Auth";
import { ProtectedRoute } from "./ProtectedRoute";
import Register from "../Register/RegisterPage";
import PageNotFound from "../PageNotFound/PageNotFound";
import { HomePage } from "../MainPage/MainPage";
import { Footer } from "../MainPage/Footer";
import SoftwareList from "../Softwares/SoftwareList";
import SoftwareDetail from "../Softwares/SoftwareDetail/SoftwareDetail";
import { Apitest } from "../api/apitest";
import { CompanyList } from "../Companies/CompanyList";
import CompanyDetail from "../Companies/CompanyDetail";
import Compare from "../Compare/Compare";
import LoginPage from "../Login/loginPage";
import { Navbar } from "../Navbar/Navbar";

const Routes = () => {
  const { token } = useAuth();

  // Define public routes accessible to all users
  const routesForPublic = [
    {
      path: "/",
      element: (
        <div>
          <Navbar /> <HomePage /> <Footer />
        </div>
      ),
    },
    {
      path: "/*",
      element: (
        <div>
          <Navbar /> <PageNotFound />
        </div>
      ),
    },
    {
      path: "/osszehasonlitas",
      element: (
        <div>
          <Navbar /> <Compare /> <Footer />
        </div>
      ),
    },
    {
      path: "/szoftverek",
      element: (
        <div>
          <Navbar />
          <SoftwareList /> <Footer />
        </div>
      ),
    },
    {
      path: "/szoftverek/:Maincategory",
      element: (
        <div>
          <Navbar /> <SoftwareList /> <Footer />
        </div>
      ),
    },
    {
      path: "/szoftverek/:Maincategory/:Subcategory",
      element: (
        <div>
          <Navbar /> <SoftwareList /> <Footer />
        </div>
      ),
    },
    {
      path: "/szoftverek/:Maincategory/:SubCategory/:name",
      element: (
        <div>
          <Navbar /> <SoftwareDetail /> <Footer />
        </div>
      ),
    },
    {
      path: "/cegek/:name",
      element: (
        <div>
          <Navbar /> <CompanyDetail /> <Footer />
        </div>
      ),
    },
    {
      path: "/cegek",
      element: (
        <div>
          <Navbar /> <CompanyList /> <Footer />
        </div>
      ),
    },
    {
      path: "/test",
      element: (
        <div>
          <Navbar /> <Apitest />
        </div>
      ),
    },
    {
      path: "/belepes",
      element: (
        <div>
          <Navbar /> <LoginPage />
        </div>
      ),
    },
    {
      path: "/belepes",
      element: (
        <div>
          <Navbar /> <LoginPage />
        </div>
      ),
    },
  ];

  // Define routes accessible only to authenticated users
  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
      children: [
        {
          path: "/homepage",
          element: <div>User Home Page</div>,
        },
        {
          path: "/authtest",
          element: <div>Auth test: {JSON.stringify(localStorage.getItem("username"))}</div>,
        },
      ],
    },
  ];

  // Routes accessible only to non-authenticated users
  const routesForNotAuthenticatedOnly = [
    {
      path: "/belepes",
      element: (
        <div>
         <Navbar /> <LoginPage />
        </div>
      ),
    },
    {
      path: "/regisztracio",
      element: (
        <div>
         <Navbar /> <Register />
        </div>
      ),
    },
  ];

  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter([
    ...routesForPublic,
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />;
};

export default Routes;