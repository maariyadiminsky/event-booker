import React, { createContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import { DEFAULT, ROOT_PATH } from '@modules/common/const';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children = DEFAULT.FUNCTION }) => {
    const [token = DEFAULT.NULL, setToken = DEFAULT.NULL] = useState(DEFAULT.NULL);
    
    // todo: set token with expiration date inside cookie storage
    const [tokenExpiration = DEFAULT.NULL, setTokenExpiration = DEFAULT.NULL] = useState(DEFAULT.NULL);
    const [userId = DEFAULT.NULL, setUserId = DEFAULT.NULL] = useState(DEFAULT.NULL);
    const [path = ROOT_PATH, setPath = DEFAULT.NULL] = useState(ROOT_PATH);

    const history = useHistory();
    
    const signInUser = (userId = DEFAULT.STRING, token = DEFAULT.STRING, tokenExpiration = DEFAULT.STRING) => {
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

AuthContextProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
        PropTypes.func
    ]).isRequired,
};