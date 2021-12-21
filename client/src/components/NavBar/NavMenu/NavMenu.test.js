import { render, screen } from '../../../tests/utils';

import { 
    MOCK,
    DEFAULT,
    ACTIVE,
    EVENTS,
    BOOKINGS,
    HOME,
} from '../../../const';

import NavMenu, { isActiveNavItem } from './';

describe('<NavMenu />', () => {
    let pathName;
    let setDirectPathTry;
    let setPathIfUserSignsInSuccessfully;
    let handleAuthButton;
    let toggleMobileMenu;

    beforeEach(() => {
        pathName = MOCK.PATH;
        setDirectPathTry = jest.fn(() => MOCK.WORKS_TEXT)
        setPathIfUserSignsInSuccessfully = jest.fn((path) => { pathName = path; })
        handleAuthButton = jest.fn(() => MOCK.WORKS_TEXT)
        toggleMobileMenu = jest.fn((path) => { pathName = path; });
    });

    it('renders component with all nav items', () => {
        render(
            <NavMenu 
                pathname={MOCK.PATH}
                authButtonText={MOCK.BUTTON_TEXT}
                handleOnPathDirect={setDirectPathTry}
                handleOnPathAfterSignIn={setPathIfUserSignsInSuccessfully}
                handleOnAuth={handleAuthButton}
                toggleMobileMenu={toggleMobileMenu}
            />
        );

        const homeButtonDiv = screen.getByText(HOME);
        const eventsButtonDiv = screen.getByText(EVENTS);
        const bookingsButtonDiv = screen.getByText(BOOKINGS);
        const authButtonDiv = screen.getByText(MOCK.BUTTON_TEXT);
        const nonExistentButtonDiv = screen.queryByText('someRandomButtonDiv');

        expect(homeButtonDiv).toBeInTheDocument();
        expect(eventsButtonDiv).toBeInTheDocument();
        expect(bookingsButtonDiv).toBeInTheDocument();
        expect(authButtonDiv).toBeInTheDocument();
        expect(nonExistentButtonDiv).not.toBeInTheDocument();
    });

    it('sets correct nav item active on render', () => {
        render(
            <NavMenu 
                pathname={MOCK.PATH}
                authButtonText={MOCK.BUTTON_TEXT}
                handleOnPathDirect={setDirectPathTry}
                handleOnPathAfterSignIn={setPathIfUserSignsInSuccessfully}
                handleOnAuth={handleAuthButton}
                toggleMobileMenu={toggleMobileMenu}
            />
        );

        const homeButton = screen.getByRole('link', { name: HOME });
        const eventsButton = screen.getByRole('link', { name: EVENTS });
        const bookingsButton = screen.getByRole('link', { name: BOOKINGS });

        expect(homeButton.className).toBe(ACTIVE);
        expect(eventsButton.className).toBe(DEFAULT.STRING);
        expect(bookingsButton.className).toBe(DEFAULT.STRING);
    })

    it('is aware when mobile menu is requested', () => {
        render(
            <NavMenu 
                isMobile
                pathname={MOCK.PATH}
                authButtonText={MOCK.BUTTON_TEXT}
                handleOnPathDirect={setDirectPathTry}
                handleOnPathAfterSignIn={setPathIfUserSignsInSuccessfully}
                handleOnAuth={handleAuthButton}
                toggleMobileMenu={toggleMobileMenu}
            />
        );

        const homeButtonDiv = screen.getByText(HOME);

        expect(homeButtonDiv.className).toBe(isActiveNavItem(false, true));
    })
});