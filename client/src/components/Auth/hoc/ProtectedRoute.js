import React, { useContext } from "react";

import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";

import { AUTH_PATH } from "../../../const";

const ProtectedRoute = ({ path, component, exact = true, isAuthRoute = false }) => {
    const { token } = useContext(AuthContext);

    // no need to render this page if user already signed in
    if (isAuthRoute) {
        return (!token && <Route path={AUTH_PATH} component={component} />);
    }

    return (token ?
        <Route path={path} exact={exact} component={component} /> :
        <Redirect from={path} to={AUTH_PATH} exact component={null} />
    );
}

export default ProtectedRoute;