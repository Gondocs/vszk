import { Route, Router } from "react-router-dom";
import AuthProvider from "./components/Auth/Auth";
import Routes from "./components/Routes/Routes";
import { Navbar } from "./components/Navbar/Navbar";
import { Toaster } from "react-hot-toast";

function TestApp() {
    return (
      <AuthProvider>
        <Toaster />
        <Routes />
      </AuthProvider>
    );
  }
  
  export default TestApp;