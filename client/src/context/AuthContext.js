import React, { createContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { DEFAULT_PARAM, ROOT_PATH } from '../const';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children = DEFAULT_PARAM.FUNCTION_COMPONENT }) => {
    const [token = DEFAULT_PARAM.NULL, setToken = DEFAULT_PARAM.NULL] = useState(DEFAULT_PARAM.NULL);
    
    // todo: set token with expiration date inside cookie storage
    const [tokenExpiration = DEFAULT_PARAM.NULL, setTokenExpiration = DEFAULT_PARAM.NULL] = useState(DEFAULT_PARAM.NULL);
    const [userId = DEFAULT_PARAM.NULL, setUserId = DEFAULT_PARAM.NULL] = useState(DEFAULT_PARAM.NULL);
    const [path = ROOT_PATH, setPath = DEFAULT_PARAM.NULL] = useState(ROOT_PATH);

    const history = useHistory();
    
    const signInUser = (userId = DEFAULT_PARAM.STRING, token = DEFAULT_PARAM.STRING, tokenExpiration = DEFAULT_PARAM.STRING) => {
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