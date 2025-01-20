import { useState, createContext, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const TOKEN_KEY = 'AUTH_TOKEN';
    const EMAIL_KEY = 'EMAIL';
    const FULL_NAME_KEY = 'FULL_NAME';
    const PROFILE_PICTURE_KEY = 'PROFILE_PICTURE';

    const [token, setToken] = useState(localStorage.getItem(TOKEN_KEY) || null);
    const [email, setEmail] = useState(localStorage.getItem(EMAIL_KEY) || '');
    const [fullName, setFullName] = useState(localStorage.getItem(FULL_NAME_KEY) || '');
    const [profilePicture, setProfilePicture] = useState(localStorage.getItem(PROFILE_PICTURE_KEY) || '');

    const login = (newToken, newFullName, newEmail, newProfilePicture) => {
        localStorage.setItem(TOKEN_KEY, newToken);
        localStorage.setItem(EMAIL_KEY, newEmail);
        localStorage.setItem(FULL_NAME_KEY, newFullName);
        localStorage.setItem(PROFILE_PICTURE_KEY, newProfilePicture);

        setToken(newToken);
        setEmail(newEmail);
        setFullName(newFullName);
        setProfilePicture(newProfilePicture);
    };

    const logout = () => {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(EMAIL_KEY);
        localStorage.removeItem(FULL_NAME_KEY);
        localStorage.removeItem(PROFILE_PICTURE_KEY);

        setToken(null);
        setEmail('');
        setFullName('');
        setProfilePicture('');
    };

    return (
        <AuthContext.Provider value={{ token, email, fullName, profilePicture, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);