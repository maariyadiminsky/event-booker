import React, { useContext } from 'react';

import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';

import { 
    ROOT_PATH, 
    AUTH_PATH, 
    DEFAULT_PARAM 
} from '../../../const';

const ProtectedRoute = ({ path = ROOT_PATH, component = DEFAULT_PARAM.FUNCTION_COMPONENT, exact = DEFAULT_PARAM.BOOL_TRUE, isAuthRoute = DEFAULT_PARAM.BOOL_FALSE }) => {
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