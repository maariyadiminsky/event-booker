import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";

import NavItem from "./NavItem";

import {
    ROOT_PATH,
    EVENTS_PATH,
    BOOKINGS_PATH,
    AUTH_PATH,
    EVENTS,
    BOOKINGS,
    SIGN_IN,
    SIGN_OUT,
    HOME
} from "../../const";

import "./NavBar.css";

import logo from "./logo.png";

const isActiveNavItem = (navItemState, isMobile = false) => {
    if (isMobile) return navItemState ? "active-mobile-nav-item" : "mobile-nav-item";

    return navItemState ? "active-nav-item" : "nav-item";
}
const NavBar = () => {
    const { pathname } = useLocation();
    const [hasUserSignedIn, setHasUserSignedIn] = useState(false);
    const [shouldOpenMobileMenu, setShouldOpenMobileMenu] = useState(false);
    const [navItemsActive, setNavItemsActive] = useState({
        home: false,
        bookings: false,
        events: false
    });

    const { 
        token, 
        signOutUser,
        path: [path, setPath]
    } = useContext(AuthContext);

    useEffect(() => {
        switch(pathname) {
            case ROOT_PATH:
                setNavItemsActive({
                    home: true,
                    bookings: false,
                    events: false
                });
                break;
            case EVENTS_PATH:
                setNavItemsActive({
                    home: false,
                    bookings: false,
                    events: true
                });
                break;
            case BOOKINGS_PATH:
                setNavItemsActive({
                    home: false,
                    bookings: true,
                    events: false
                });
                break;
            default:
                setNavItemsActive({
                    home: false,
                    bookings: false,
                    events: false
                });
                break;
        }

    }, [pathname])

    useEffect(() => {
        if (token && !hasUserSignedIn) {
            setHasUserSignedIn(true);
        } else if (!token && hasUserSignedIn) {
            setHasUserSignedIn(false);
        }
    }, [token, hasUserSignedIn])

    // either sign them in or set the path to route them too if signed in successfully
    const handleAuthButton = () => {
        if (hasUserSignedIn) {
            signOutUser();
            if (shouldOpenMobileMenu) toggleMobileMenu();
        } else {
            setPathIfUserSignsInSuccessfully(ROOT_PATH);
        }
    }

    const setDirectPathTry = (path) => token ? path : AUTH_PATH;

    const setPathIfUserSignsInSuccessfully = (pathToSet) => {
        if (shouldOpenMobileMenu) toggleMobileMenu();

        // no need to set since this means they are signing out
        if (hasUserSignedIn) return;

        setPath(pathToSet);
    }

    const renderAuthButtonText = () => hasUserSignedIn ? SIGN_OUT : SIGN_IN;

    const toggleMobileMenu = () => setShouldOpenMobileMenu(!shouldOpenMobileMenu);

    const renderMobileButton = () => (
        <div className="md:hidden flex px-10">
            <button 
                className="outline-none"
                onClick={toggleMobileMenu}
            >
                <svg className="w-10 h-10 text-green-400 hover:text-green-300"
                    x-show="!showMenu"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
            </button>
        </div>
    );
    
    const renderMobileMenu = () => (shouldOpenMobileMenu && (
        <div className="md:hidden mobile-menu">
            <ul className="">
                <li>
                    <NavItem 
                        className={isActiveNavItem(navItemsActive.home, true)}
                        buttonPath={ROOT_PATH}
                        handleOnClick={toggleMobileMenu}
                    >
                        {HOME}
                    </NavItem>
                </li>
                <li>
                    <NavItem 
                        className={isActiveNavItem(navItemsActive.events, true)}
                        buttonPath={EVENTS_PATH}
                        handleOnClick={toggleMobileMenu}
                    >
                        {EVENTS}
                    </NavItem>
                </li>
                <li>
                    <NavItem 
                        className={isActiveNavItem(navItemsActive.bookings, true)}
                        buttonPath={setDirectPathTry(BOOKINGS_PATH)}
                        handleOnClick={() => setPathIfUserSignsInSuccessfully(BOOKINGS_PATH)}
                    >
                        {BOOKINGS}
                    </NavItem>
                </li>
                <li>
                    <NavItem 
                        className="py-4 px-4 text-white bg-green-400 text-lg"
                        buttonPath={AUTH_PATH}
                        handleOnClick={handleAuthButton}
                    >
                        {renderAuthButtonText()}
                    </NavItem>
                </li>
            </ul>
        </div>
    ));

    return (
        <nav className="bg-white shadow-lg">
            <div className="md:container mx-auto">
                <div className="md:px-0 mx-auto flex flex-wrap justify-between">
                    <NavItem buttonPath={ROOT_PATH}>
                        <img 
                            className="transform scale-90 p-5" 
                            src={logo} 
                            alt="logo"
                        />
                    </NavItem>
                    <div className="my-auto hidden md:flex md:flex-wrap items-center space-x-10 mr-10">
                        <NavItem 
                            className={isActiveNavItem(navItemsActive.home)}
                            buttonPath={ROOT_PATH}
                        >
                            {HOME}
                        </NavItem>
                        <NavItem 
                            className={isActiveNavItem(navItemsActive.events)}
                            buttonPath={EVENTS_PATH}
                        >
                            {EVENTS}
                        </NavItem>
                        <NavItem 
                            className={isActiveNavItem(navItemsActive.bookings)}
                            buttonPath={setDirectPathTry(BOOKINGS_PATH)}
                            handleOnClick={() => setPathIfUserSignsInSuccessfully(BOOKINGS_PATH)}
                        >
                            {BOOKINGS}
                        </NavItem>
                        <NavItem 
                            className="py-3 px-12 text-lg text-white bg-green-400 rounded hover:bg-green-300 transition duration-300"
                            buttonPath={AUTH_PATH}
                            handleOnClick={handleAuthButton}
                        >
                            {renderAuthButtonText()}
                        </NavItem>
                    </div>
                    {renderMobileButton()}
                </div>
                {renderMobileMenu()}
            </div>
        </nav>
    );
};

export default NavBar;