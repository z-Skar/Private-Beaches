import { useState, createContext, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const TOKEN_KEY = 'AUTH_TOKEN';
    const PROFILE_PICTURE_KEY = 'PROFILE_PICTURE';
    const EMAIL_KEY = 'EMAIL';

    const [token, setToken] = useState(localStorage.getItem(TOKEN_KEY) || null);
    const [profilePicture, setProfilePicture] = useState(localStorage.getItem(PROFILE_PICTURE_KEY) || '');
    const [email, setEmail] = useState(localStorage.getItem(EMAIL_KEY) || '');

    const login = (newToken, newEmail, newProfilePicture) => {
        localStorage.setItem(TOKEN_KEY, newToken);
        localStorage.setItem(PROFILE_PICTURE_KEY, newProfilePicture);
        localStorage.setItem(EMAIL_KEY, newEmail);

        setToken(newToken);
        setProfilePicture(newProfilePicture);
        setEmail(newEmail);
    };

    const logout = () => {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(PROFILE_PICTURE_KEY);
        localStorage.removeItem(EMAIL_KEY);

        setToken(null);
        setProfilePicture('');
        setEmail('');
    };

    return (
        <AuthContext.Provider value={{ token, profilePicture, email, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);