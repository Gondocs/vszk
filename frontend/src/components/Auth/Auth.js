// Auth.js
import axios from 'axios';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import Cookies from 'js-cookie'; // Import the js-cookie library

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [token, setToken_] = useState(Cookies.get('token')); // Use Cookies.get
    const [userData, setUserData_] = useState({
        userID: Cookies.get('userID'),
        email: Cookies.get('email'),
        firstname: Cookies.get('firstname'),
        lastname: Cookies.get('lastname'),
    });

    const setToken = (newToken) => {
        setToken_(newToken);
        Cookies.set('token', newToken, { httpOnly: true }); // Use Cookies.set
    };

    const setUserData = (newUserData) => {
        setUserData_(newUserData);
        Cookies.set('userID', newUserData.userID);
        Cookies.set('email', newUserData.email);
        Cookies.set('firstname', newUserData.firstname);
        Cookies.set('lastname', newUserData.lastname);
    };

    const deleteUserData = () => {
        Cookies.remove('userID'); // Use Cookies.remove
        Cookies.remove('email');
        Cookies.remove('firstname');
        Cookies.remove('lastname');
    };

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            Cookies.set('token', token, { httpOnly: true });
        } else {
            delete axios.defaults.headers.common['Authorization'];
            Cookies.remove('token', { httpOnly: true });
        }
    }, [token]);

    const contextValue = useMemo(
        () => ({
            token,
            setToken,
            userData,
            setUserData,
            deleteUserData, // Use the corrected function name
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
};

export default AuthProvider;
