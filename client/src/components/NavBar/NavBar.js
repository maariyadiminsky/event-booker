import React from "react";
import { NavLink } from "react-router-dom";

// import AuthButton from "../AuthButton";

import logo from "./logo.png";

const NavBar = () => {
    return (
        <nav className="p-3 bg-indigo-600">
            <div className="md:container px-4 md:px-0 mx-auto flex justify-between">
                <NavLink to="/">
                    <img 
                        className="transform scale-75" 
                        src={logo} 
                        alt="logo"
                    />
                </NavLink>
                {/* <AuthButton /> */}
            </div>
        </nav>
    );
};

export default NavBar;