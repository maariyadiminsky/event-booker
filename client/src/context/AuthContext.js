import React, { createContext, useState } from "react";
import { useHistory } from "react-router-dom";

import { ROOT_PATH } from "../const";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    // todo: store tokenExpiration in localStorage so doesn't reset on refresh
    const [tokenExpiration, setTokenExpiration] = useState(null);
    const [userId, setUserId] = useState(null);
    const [path, setPath] = useState("");

    const history = useHistory();
    
    const signInUser = (userId, token, tokenExpiration) => {
        setUserId(userId);
        setToken(token);
        setTokenExpiration(tokenExpiration);

        history.push(path ? path : ROOT_PATH);
    }

    const signOutUser = () => {
        setUserId(null);
        setToken(null);
        setTokenExpiration(null);
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