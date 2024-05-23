import AuthProvider from "./components/Auth/Auth";
import Routes from "./components/Routes/Routes";
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
