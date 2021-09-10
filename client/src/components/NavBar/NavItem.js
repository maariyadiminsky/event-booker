import React from "react";
import { NavLink  } from "react-router-dom";

const NavItem = ({ children, buttonPath, className }) => (
    <NavLink to={buttonPath}>
        <div className={className}>
            {children}
        </div>
    </NavLink> 
);

export default NavItem;