import axios from 'axios';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [token, setToken_] = useState(localStorage.getItem('token'));

    const setToken = (newToken) => {
        setToken_(newToken);
        localStorage.setItem('token', newToken);
      };
      

    useEffect(() => {
        if (token) {
          axios.defaults.headers.common['Authorization'] = "Bearer " + token;
          localStorage.setItem('token', token);
          const username = localStorage.getItem("username");
          console.log("token: " + token);
          console.log("Username: " + username);
        } else {
          delete axios.defaults.headers.common['Authorization'];
          console.log("token: " + token);
          localStorage.removeItem('token');
        }
      }, [token]);
      

    const contextvalue = useMemo(
        () => ({
            token,
            setToken,
        }),
        [token],
    );

    return (
        <AuthContext.Provider value={contextvalue}>
            {children}
        </AuthContext.Provider>
    );
};

    export const useAuth = () => {
        return useContext(AuthContext);
    }

    export default AuthProvider;