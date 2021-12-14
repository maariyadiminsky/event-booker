import React from 'react';
import { NavLink } from 'react-router-dom';

import { DEFAULT, ROOT_PATH } from '../../const';

const NavItem = ({ children = DEFAULT.FUNCTION, buttonPath = ROOT_PATH, className = DEFAULT.STRING, handleOnClick = DEFAULT.NULL }) => (
    <NavLink to={buttonPath} onClick={handleOnClick}>
        <div className={className}>
            {children}
        </div>
    </NavLink> 
);

export default NavItem;