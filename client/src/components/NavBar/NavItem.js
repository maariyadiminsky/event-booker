import React from 'react';
import { NavLink } from 'react-router-dom';

import { DEFAULT_PARAM, ROOT_PATH } from '../../const';

const NavItem = ({ children = DEFAULT_PARAM.FUNCTION_COMPONENT, buttonPath = ROOT_PATH, className = DEFAULT_PARAM.STRING, handleOnClick = DEFAULT_PARAM.NULL }) => (
    <NavLink to={buttonPath} onClick={handleOnClick}>
        <div className={className}>
            {children}
        </div>
    </NavLink> 
);

export default NavItem;