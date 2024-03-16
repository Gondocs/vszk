// Auth.js
import axios from 'axios';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import Cookies from 'js-cookie'; // Import the js-cookie library
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [token, setToken_] = useState(Cookies.get('token')); // Use Cookies.get

    {/*}
    const setToken = (newToken) => {
        setToken_(newToken);
        Cookies.set('token', newToken); // Use Cookies.set
    }; */}

    const setToken = (newToken) => {
        setToken_(newToken);
        if (newToken) {
            const decodedToken = jwtDecode(newToken);
            Cookies.set('token', newToken, { expires: decodedToken.exp }); // TODO: FIX, THIS IS IN DAYS
        } else {
            Cookies.remove('token');
        }
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
