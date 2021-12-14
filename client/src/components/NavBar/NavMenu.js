import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import NavItem from './NavItem';

import {
    DEFAULT,
    ROOT_PATH,
    EVENTS_PATH,
    BOOKINGS_PATH,
    AUTH_PATH,
    EVENTS,
    BOOKINGS,
    HOME,
} from '../../const';

const isActiveNavItem = (navItemState = DEFAULT.BOOL_FALSE, isMobile = DEFAULT.BOOL_FALSE) => {
    if (isMobile) return navItemState ? 'active-mobile-nav-item' : 'mobile-nav-item';

    return navItemState ? 'active-nav-item' : 'nav-item';
};

const authButtonCSS = {
    main: 'py-3 px-12 text-lg text-white bg-green-400 rounded hover:bg-green-300 transition duration-300',
    mobile: 'py-4 px-4 text-white bg-green-400 text-lg',
};

const NavMenu = ({ 
    pathname = ROOT_PATH, authButtonText = DEFAULT.STRING, isMobile = DEFAULT.BOOL_FALSE, 
    handleOnPathDirect = DEFAULT.NULL, handleOnPathAfterSignIn = DEFAULT.NULL, handleOnAuth = DEFAULT.NULL, toggleMobileMenu = DEFAULT.NULL
}) => {
    const [navItemsActive, setNavItemsActive] = useState({
        home: false,
        bookings: false,
        events: false
    });

    useEffect(() => {
        setNavItemsActive({
            home: pathname === ROOT_PATH,
            bookings: pathname === BOOKINGS_PATH,
            events: pathname === EVENTS_PATH
        });
    }, [pathname])

    return (
        <Fragment>
            <NavItem 
                className={isActiveNavItem(navItemsActive.home, isMobile)}
                buttonPath={ROOT_PATH}
                handleOnClick={toggleMobileMenu}
            >
                {HOME}
            </NavItem>
            <NavItem 
                className={isActiveNavItem(navItemsActive.events, isMobile)}
                buttonPath={EVENTS_PATH}
                handleOnClick={toggleMobileMenu}
            >
                {EVENTS}
            </NavItem>
            <NavItem 
                className={isActiveNavItem(navItemsActive.bookings, isMobile)}
                buttonPath={handleOnPathDirect(BOOKINGS_PATH)}
                handleOnClick={() => handleOnPathAfterSignIn(BOOKINGS_PATH)}
            >
                {BOOKINGS}
            </NavItem>
            <NavItem 
                className={isMobile ? authButtonCSS.mobile : authButtonCSS.main}
                buttonPath={AUTH_PATH}
                handleOnClick={handleOnAuth}
            >
                {authButtonText}
            </NavItem>
        </Fragment>
    );
}

NavMenu.propTypes = {
    pathname: PropTypes.string.isRequired,
    authButtonText: PropTypes.string.isRequired,
    isMobile: PropTypes.bool,
    handleOnPathDirect: PropTypes.func.isRequired,
    handleOnPathAfterSignIn: PropTypes.func.isRequired,
    handleOnAuth: PropTypes.func.isRequired,
    toggleMobileMenu: PropTypes.func.isRequired,
};

export default NavMenu;