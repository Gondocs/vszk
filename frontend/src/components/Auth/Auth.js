// Auth.js

import axios from 'axios';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [token, setToken_] = useState(localStorage.getItem('token'));
    const [userData, setUserData] = useState({
        userID: localStorage.getItem('userID'),
        email: localStorage.getItem('email'),
        firstname: localStorage.getItem('firstname'),
        lastname: localStorage.getItem('lastname'),
    });

    const setToken = (newToken) => {
        setToken_(newToken);
        localStorage.setItem('token', newToken);
    };

    const setUserInfo = (data) => {
        setUserData(data);
        localStorage.setItem('userID', data.userID);
        localStorage.setItem('email', data.email);
        localStorage.setItem('firstname', data.firstname);
        localStorage.setItem('lastname', data.lastname);
    };

    useEffect(() => {
        if (token) {
          axios.defaults.headers.common['Authorization'] = "Bearer " + token;
          localStorage.setItem('token', token);
        } else {
          delete axios.defaults.headers.common['Authorization'];
          localStorage.removeItem('token');
        }
    }, [token]);
    
    const contextvalue = useMemo(
        () => ({
            token,
            setToken,
            userData,
            setUserInfo,
        }),
        [token, userData],
    );

    return (
        <AuthContext.Provider value={contextvalue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthProvider;
