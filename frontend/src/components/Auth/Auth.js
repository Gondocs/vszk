// Auth.js
import axios from 'axios';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [token, setToken_] = useState(localStorage.getItem('token'));
    const [userData, setUserData_] = useState({
        userID: localStorage.getItem('userID'),
        email: localStorage.getItem('email'),
        firstname: localStorage.getItem('firstname'),
        lastname: localStorage.getItem('lastname'),
    });

    const setToken = (newToken) => {
        setToken_(newToken);
        localStorage.setItem('token', newToken);
    };

    const setUserData = (newUserData) => {
        setUserData_(newUserData);
        localStorage.setItem('userID', newUserData.userID);
        localStorage.setItem('email', newUserData.email);
        localStorage.setItem('firstname', newUserData.firstname);
        localStorage.setItem('lastname', newUserData.lastname);
    };

    const DeleteUserData = () => {
      localStorage.removeItem('userID');
      localStorage.removeItem('email');
      localStorage.removeItem('firstname');
      localStorage.removeItem('lastname');
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

    const contextValue = useMemo(
        () => ({
            token,
            setToken,
            userData,
            setUserData,
            DeleteUserData,
        }),
        [token, userData],
    );

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
}

export default AuthProvider;
