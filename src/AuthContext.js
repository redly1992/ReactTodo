// AuthContext.jsx
import { createContext, useContext, useState } from 'react';
import React from 'react'; // Add React import
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Dynamic state for user

    const login = (user) => setUser(user);
    const logout = () => setUser(null);

    // Context value includes user state and updater functions
    const contextValue = {
        user,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);