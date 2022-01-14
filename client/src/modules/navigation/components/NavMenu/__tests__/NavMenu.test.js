import { render } from '@modules/app/setupTests';

import { 
    MOCK,
    DEFAULT,
    ACTIVE,
    EVENTS,
    BOOKINGS,
    HOME,
} from '@modules/common/const';

import NavMenu, { isActiveNavItem } from '@modules/navigation/components/NavMenu';

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
        const { getByText, queryByText } = render(
            <NavMenu 
                pathname={MOCK.PATH}
                authButtonText={MOCK.BUTTON_TEXT}
                handleOnPathDirect={setDirectPathTry}
                handleOnPathAfterSignIn={setPathIfUserSignsInSuccessfully}
                handleOnAuth={handleAuthButton}
                toggleMobileMenu={toggleMobileMenu}
            />
        );

        const homeButtonDiv = getByText(HOME);
        const eventsButtonDiv = getByText(EVENTS);
        const bookingsButtonDiv = getByText(BOOKINGS);
        const authButtonDiv = getByText(MOCK.BUTTON_TEXT);
        const nonExistentButtonDiv = queryByText('someRandomButtonDiv');

        expect(homeButtonDiv).toBeInTheDocument();
        expect(eventsButtonDiv).toBeInTheDocument();
        expect(bookingsButtonDiv).toBeInTheDocument();
        expect(authButtonDiv).toBeInTheDocument();
        expect(nonExistentButtonDiv).not.toBeInTheDocument();
    });

    it('sets correct nav item active on render', () => {
        const { getByRole } = render(
            <NavMenu 
                pathname={MOCK.PATH}
                authButtonText={MOCK.BUTTON_TEXT}
                handleOnPathDirect={setDirectPathTry}
                handleOnPathAfterSignIn={setPathIfUserSignsInSuccessfully}
                handleOnAuth={handleAuthButton}
                toggleMobileMenu={toggleMobileMenu}
            />
        );

        const homeButton = getByRole('link', { name: HOME });
        const eventsButton = getByRole('link', { name: EVENTS });
        const bookingsButton = getByRole('link', { name: BOOKINGS });

        expect(homeButton.className).toBe(ACTIVE);
        expect(eventsButton.className).toBe(DEFAULT.STRING);
        expect(bookingsButton.className).toBe(DEFAULT.STRING);
    })

    it('is aware when mobile menu is requested', () => {
        const { getByText } = render(
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

        const homeButtonDiv = getByText(HOME);

        expect(homeButtonDiv.className).toBe(isActiveNavItem(false, true));
    })
});