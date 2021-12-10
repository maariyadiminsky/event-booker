import React from 'react';
import { NavLink } from 'react-router-dom';

const NavItem = ({ children, buttonPath, className, handleOnClick = null }) => (
    <NavLink to={buttonPath} onClick={handleOnClick}>
        <div className={className}>
            {children}
        </div>
    </NavLink> 
);

export default NavItem;