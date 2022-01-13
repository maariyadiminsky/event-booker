import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import { DEFAULT, ROOT_PATH } from '@modules/common/const';

const NavItem = ({ children = DEFAULT.FUNCTION, buttonPath = ROOT_PATH, className = DEFAULT.STRING, handleOnClick = DEFAULT.NULL }) => (
    <NavLink to={buttonPath} onClick={handleOnClick}>
        <div data-testid="nav-item" className={className}>
            {children}
        </div>
    </NavLink> 
);

NavItem.propTypes = {
    className: PropTypes.string,
    buttonPath: PropTypes.string,
    handleOnClick: PropTypes.func,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
        PropTypes.func
    ]).isRequired,
};

export default NavItem;