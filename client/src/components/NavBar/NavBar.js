import React, { useState, useEffect, useContext, } from 'react';
import { useLocation } from 'react-router-dom';

import { AuthContext } from '../../context/AuthContext';

import NavMenu from './NavMenu';
import NavItem from './NavItem';
import NavMobileButton from './NavMobileButton';

import {
    ROOT_PATH,
    AUTH_PATH,
    SIGN_IN,
    SIGN_OUT,
} from '../../const';

import './NavBar.css';

import logo from './logo.png';

const NavBar = () => {
    const { pathname } = useLocation();
    const [hasUserSignedIn, setHasUserSignedIn] = useState(false);
    const [shouldOpenMobileMenu, setShouldOpenMobileMenu] = useState(false);

    const { 
        token, 
        signOutUser,
        path: [, setPath]
    } = useContext(AuthContext);

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
            if (shouldOpenMobileMenu) {
                toggleMobileMenu();
            }
        } else {
            setPathIfUserSignsInSuccessfully(ROOT_PATH);
        }
    }

    const setDirectPathTry = (path) => token ? path : AUTH_PATH;

    const setPathIfUserSignsInSuccessfully = (pathToSet) => {
        if (shouldOpenMobileMenu) {
            toggleMobileMenu();
        }

        // no need to set since this means they are signing out
        if (hasUserSignedIn) return;

        setPath(pathToSet);
    }

    const renderAuthButtonText = () => hasUserSignedIn ? SIGN_OUT : SIGN_IN;

    const toggleMobileMenu = () => setShouldOpenMobileMenu(!shouldOpenMobileMenu);

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
                        <NavMenu
                            pathname={pathname}
                            authButtonText={renderAuthButtonText()}
                            handleOnPathDirect={setDirectPathTry}
                            handleOnPathAfterSignIn={setPathIfUserSignsInSuccessfully}
                            handleOnAuth={handleAuthButton}
                        />
                    </div>
                    <NavMobileButton handleOnClick={toggleMobileMenu} />
                </div>
                {shouldOpenMobileMenu && (
                    <NavMenu
                        isMobile
                        pathname={pathname}
                        authButtonText={renderAuthButtonText()}
                        handleOnPathDirect={setDirectPathTry}
                        handleOnPathAfterSignIn={setPathIfUserSignsInSuccessfully}
                        handleOnAuth={handleAuthButton}
                        toggleMobileMenu={toggleMobileMenu}
                    />
                )}
            </div>
        </nav>
    );
};

export default NavBar;