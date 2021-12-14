import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { AuthContext } from '../../../context/AuthContext';

import { 
    ROOT_PATH, 
    AUTH_PATH, 
    DEFAULT 
} from '../../../const';

const ProtectedRoute = ({ path = ROOT_PATH, component = DEFAULT.COMPONENT, exact = DEFAULT.BOOL_TRUE, isAuthRoute = DEFAULT.BOOL_FALSE }) => {
    const { token } = useContext(AuthContext);

    // no need to render this page if user already signed in
    if (isAuthRoute) {
        return (!token && <Route path={AUTH_PATH} component={component} />);
    }

    return (token ?
        <Route path={path} exact={exact} component={component} /> :
        <Redirect from={path} to={AUTH_PATH} exact component={DEFAULT.NULL} />
    );
}

ProtectedRoute.propTypes = {
    path: PropTypes.string.isRequired,
    exact: PropTypes.bool,
    isAuthRoute: PropTypes.bool,
    component: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
        PropTypes.func
    ]).isRequired,
};

export default ProtectedRoute;