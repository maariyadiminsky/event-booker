import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';

import { AuthContext } from '@modules/common/context/AuthContext';

import NavMenu from '@modules/navigation/components/NavMenu';
import NavItem from '@modules/navigation/components/NavItem';
import NavMobileButton from '@modules/navigation/components/NavMobileButton';

import {
    DEFAULT,
    ROOT_PATH,
    AUTH_PATH,
    SIGN_IN,
    SIGN_OUT,
} from '@modules/common/const';

import logo from '@modules/navigation/images/Logo.png';

import '@modules/navigation/NavBar.css';

const NavBar = () => {
    const { pathname = ROOT_PATH } = useLocation();
    const [hasUserSignedIn = DEFAULT.BOOL_FALSE, setHasUserSignedIn = DEFAULT.NULL] = useState(false);
    const [shouldOpenMobileMenu = DEFAULT.BOOL_FALSE, setShouldOpenMobileMenu = DEFAULT.NULL] = useState(false);

    const { 
        token,
        signOutUser,
        path: [, setPath],
    } = useContext(AuthContext);

    useEffect(() => {
        if (token && !hasUserSignedIn) {
            setHasUserSignedIn(true);
        } else if (!token && hasUserSignedIn) {
            setHasUserSignedIn(false);
        }
    }, [token, hasUserSignedIn, setHasUserSignedIn])

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

    const setDirectPathTry = (path = ROOT_PATH) => token ? path : AUTH_PATH;

    const setPathIfUserSignsInSuccessfully = (pathToSet = ROOT_PATH) => {
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