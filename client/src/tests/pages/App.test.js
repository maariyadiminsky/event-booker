import { render, screen } from '../utils';
import App from '../../pages/App';
import {
    EVENTS,
    BOOKINGS,
    HOME,
    ROOT_PATH
} from '../../const';


describe('App', () => {
    test('renders App component', () => {
        render(<App />);

        // if navbar renders its safe to assume App component is rendered
        const eventsLinkInNavbar = screen.getByText(EVENTS);
        const bookingsLinkInNavbar = screen.getByText(BOOKINGS);
        const homeLinkInNavbar = screen.getByText(HOME);

        expect(eventsLinkInNavbar).toBeInTheDocument();
        expect(bookingsLinkInNavbar).toBeInTheDocument();
        expect(homeLinkInNavbar).toBeInTheDocument();

        const someRenderLink = screen.queryByText('someRandomLink');
        expect(someRenderLink).not.toBeInTheDocument();
    });

    test('renders Home Component by default', () => {
        render(<App />, { route: ROOT_PATH });

        const textFromHomePage = screen.getByText(/Create unique experiences/i);

        expect(textFromHomePage).toBeInTheDocument();
    });
});
