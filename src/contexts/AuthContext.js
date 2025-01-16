import { useState, createContext, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const TOKEN_KEY = 'AUTH_TOKEN';
    const PROFILE_PICTURE_KEY = 'PROFILE_PICTURE';

    const [token, setToken] = useState(localStorage.getItem(TOKEN_KEY, '') || null);
    const [profilePicture, setProfilePicture] = (localStorage.getItem(PROFILE_PICTURE_KEY) || '');

    const login = (newToken, newProfilePicture) => {
        localStorage.setItem(TOKEN_KEY, newToken);
        localStorage.setItem(PROFILE_PICTURE_KEY, newProfilePicture);
        setToken(newToken);
        setProfilePicture(newProfilePicture);
    };

    const logout = () => {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(PROFILE_PICTURE_KEY);
        setToken(null);
        setProfilePicture('');
    };

    return (
        <AuthContext.Provider value={{ token, profilePicture, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);