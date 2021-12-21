import { render, screen } from '../../tests/utils';
import userEvent from '@testing-library/user-event';

import { 
    MOCK,
    DEFAULT,
    ROOT_PATH,
    EVENTS,
    BOOKINGS,
    EVENTS_PATH,
    BOOKINGS_PATH,
    HOME,
} from '../../const';

import NavBar from './NavBar';
import { isActiveNavItem } from './NavMenu';

describe('<NavBar />', () => {
    it('renders component with all nav items', () => {
        render(<NavBar />);

        const homeButtonDiv = screen.getByText(HOME);
        const eventsButtonDiv = screen.getByText(EVENTS);
        const bookingsButtonDiv = screen.getByText(BOOKINGS);
        const nonExistentButtonDiv = screen.queryByText('someRandomButtonDiv');

        expect(homeButtonDiv).toBeInTheDocument();
        expect(eventsButtonDiv).toBeInTheDocument();
        expect(bookingsButtonDiv).toBeInTheDocument();
        expect(nonExistentButtonDiv).not.toBeInTheDocument();
    });

    it('renders mobile menu if user clicks mobile menu icon', () => {
        render(<NavBar />);

        const mobileMenuButton = screen.getByRole('button');
        expect(mobileMenuButton.className).toBe('outline-none');

        let homeButtons = screen.getAllByText(HOME);
        let eventButtons = screen.getAllByText(EVENTS);

        expect(homeButtons.length).toBe(1);
        expect(eventButtons.length).toBe(1);

        userEvent.click(mobileMenuButton);

        homeButtons = screen.getAllByText(HOME);
        const mobileHomeButton = homeButtons.length > 1 ? homeButtons[1] : null;
        const mobileHomeButtonClassName = mobileHomeButton ? mobileHomeButton.className : '';

        eventButtons = screen.getAllByText(EVENTS);
        const mobileEventButton = eventButtons.length > 1 ? eventButtons[1] : null;
        const mobileEventButtonClassName = mobileEventButton ? mobileEventButton.className : '';

        expect(homeButtons.length).toBe(2);
        expect(mobileHomeButton).toBeInTheDocument();
        const isActive = true;
        const isMobileButton = true;
        expect(mobileHomeButtonClassName).toBe(isActiveNavItem(isActive, isMobileButton));

        expect(eventButtons.length).toBe(2);
        expect(mobileEventButton).toBeInTheDocument();
        expect(mobileEventButtonClassName).toBe(isActiveNavItem(false, isMobileButton));
    });

    it('sets correct button to active when clicked', () => {
        render(<NavBar />);

        const homeButtonDiv = screen.getByText(HOME);
        const eventButtonDiv = screen.getByText(EVENTS);

        expect(homeButtonDiv.className).toBe(isActiveNavItem(true, false));
        expect(eventButtonDiv.className).toBe(isActiveNavItem(false, false));

        userEvent.click(eventButtonDiv);

        expect(homeButtonDiv.className).toBe(isActiveNavItem(false, false));
        expect(eventButtonDiv.className).toBe(isActiveNavItem(true, false));
    });
});