// Auth.js
import axios from 'axios';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import Cookies from 'js-cookie'; // Import the js-cookie library

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [token, setToken_] = useState(Cookies.get('token')); // Use Cookies.get

    const setToken = (newToken) => {
        setToken_(newToken);
        Cookies.set('token', newToken); // Use Cookies.set
    };

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            Cookies.set('token', token);
        } else {
            delete axios.defaults.headers.common['Authorization'];
            Cookies.remove('token');
        }
    }, [token]);

    const contextValue = useMemo(
        () => ({
            token,
            setToken,
        }),
        [token],
    );

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthProvider;
