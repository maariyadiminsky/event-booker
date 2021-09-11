import React, { createContext, useState } from "react";
import { useHistory } from "react-router-dom";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [tokenExpiration, setTokenExpiration] = useState(null);
    const [userId, setUserId] = useState(null);
    const [path, setPath] = useState("");

    const history = useHistory();
    
    const signInUser = (userId, token, tokenExpiration) => {
        console.log("in sign in!", token);

        setUserId(userId);
        setToken(token);
        setTokenExpiration(tokenExpiration);

        if (path) {
            history.push(path);
        }
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
                signOutUser,
                path: [path, setPath]
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}