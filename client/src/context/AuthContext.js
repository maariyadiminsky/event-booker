import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [tokenExpiration, setTokenExpiration] = useState(null);
    const [userId, setUserId] = useState(null);
    
    const signIn = () => {

    }

    const signOut = () => {

    }

    return (
        <AuthContext.Provider
            value={{
                token: [token, setToken],
                tokenExpiration: [tokenExpiration, setTokenExpiration],
                userId: [userId, setUserId],
                signIn,
                signOut
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}