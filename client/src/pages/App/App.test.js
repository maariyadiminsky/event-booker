import { render } from '../../tests/utils';
import {
    EVENTS,
    BOOKINGS,
    HOME,
    ROOT_PATH,
    DIV
} from '../../const';

import App from './';

describe('<App />', () => {
    it('renders component', () => {
        const { getByText, queryByText } = render(<App />);

        // if navbar renders its safe to assume App component is rendered
        const eventsLinkInNavbar = getByText(EVENTS);
        const bookingsLinkInNavbar = getByText(BOOKINGS);
        const homeLinkInNavbar = getByText(HOME);

        expect(eventsLinkInNavbar).toBeInTheDocument();
        expect(eventsLinkInNavbar.tagName).toBe(DIV);
        expect(bookingsLinkInNavbar).toBeInTheDocument();
        expect(bookingsLinkInNavbar.tagName).toBe(DIV);
        expect(homeLinkInNavbar).toBeInTheDocument();
        expect(homeLinkInNavbar.tagName).toBe(DIV);

        const someRenderLink = queryByText('someRandomLink');
        expect(someRenderLink).not.toBeInTheDocument();
    });

    it('renders Home Component by default', () => {
        const { getByText } = render(<App />, { route: ROOT_PATH });

        const textFromHomePage = getByText(/Create unique experiences/i);

        expect(textFromHomePage).toBeInTheDocument();
        expect(textFromHomePage.tagName).toBe(DIV);
    });
});
