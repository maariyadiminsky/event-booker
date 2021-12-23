import { render } from '../../../tests/utils';
import userEvent from '@testing-library/user-event';

import { 
    EVENTS,
    BOOKINGS,
    HOME,
} from '../../../const';

import NavBar from './';
import { isActiveNavItem } from '../NavMenu';

describe('<NavBar />', () => {
    it('renders component with all nav items', () => {
        const { getByText, queryByText } = render(<NavBar />);

        const homeButtonDiv = getByText(HOME);
        const eventsButtonDiv = getByText(EVENTS);
        const bookingsButtonDiv = getByText(BOOKINGS);
        const nonExistentButtonDiv = queryByText('someRandomButtonDiv');

        expect(homeButtonDiv).toBeInTheDocument();
        expect(eventsButtonDiv).toBeInTheDocument();
        expect(bookingsButtonDiv).toBeInTheDocument();
        expect(nonExistentButtonDiv).not.toBeInTheDocument();
    });

    it('renders mobile menu if user clicks mobile menu icon', () => {
        const { getByRole, getAllByText } = render(<NavBar />);

        const mobileMenuButton = getByRole('button');
        expect(mobileMenuButton.className).toBe('outline-none');

        let homeButtons = getAllByText(HOME);
        let eventButtons = getAllByText(EVENTS);

        expect(homeButtons.length).toBe(1);
        expect(eventButtons.length).toBe(1);

        userEvent.click(mobileMenuButton);

        homeButtons = getAllByText(HOME);
        const mobileHomeButton = homeButtons.length > 1 ? homeButtons[1] : null;
        const mobileHomeButtonClassName = mobileHomeButton ? mobileHomeButton.className : '';

        eventButtons = getAllByText(EVENTS);
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
        const { getByText } = render(<NavBar />);

        const homeButtonDiv = getByText(HOME);
        const eventButtonDiv = getByText(EVENTS);

        expect(homeButtonDiv.className).toBe(isActiveNavItem(true, false));
        expect(eventButtonDiv.className).toBe(isActiveNavItem(false, false));

        userEvent.click(eventButtonDiv);

        expect(homeButtonDiv.className).toBe(isActiveNavItem(false, false));
        expect(eventButtonDiv.className).toBe(isActiveNavItem(true, false));
    });
});