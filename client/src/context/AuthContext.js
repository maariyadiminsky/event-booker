import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [tokenExpiration, setTokenExpiration] = useState(null);
    const [userId, setUserId] = useState(null);
    
    const signInUser = (userId, token, tokenExpiration) => {
        console.log("in sign in!", token);

        setUserId(userId);
        setToken(token);
        setTokenExpiration(tokenExpiration);
    }

    const signOutUser = () => {
        setUserId(null);
        setToken(null);
        setTokenExpiration(null);

        console.log("user signed out!", token);
    }

    return (
        <AuthContext.Provider
            value={{
                userId,
                token,
                tokenExpiration,
                signInUser,
                signOutUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}