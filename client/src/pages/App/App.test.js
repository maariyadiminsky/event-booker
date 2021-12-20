import { render, screen } from '../../tests/utils';
import App from './';
import {
    EVENTS,
    BOOKINGS,
    HOME,
    ROOT_PATH
} from '../../const';

describe('<App />', () => {
    it('renders App component', () => {
        const wrapper = render(<App />);

        // if navbar renders its safe to assume App component is rendered
        const eventsLinkInNavbar = wrapper.getByText(EVENTS);
        const bookingsLinkInNavbar = wrapper.getByText(BOOKINGS);
        const homeLinkInNavbar = wrapper.getByText(HOME);

        expect(eventsLinkInNavbar).toBeInTheDocument();
        expect(bookingsLinkInNavbar).toBeInTheDocument();
        expect(homeLinkInNavbar).toBeInTheDocument();

        const someRenderLink = wrapper.queryByText('someRandomLink');
        expect(someRenderLink).not.toBeInTheDocument();
    });

    it('renders Home Component by default', () => {
        const wrapper = render(<App />, { route: ROOT_PATH });

        const textFromHomePage = wrapper.getByText(/Create unique experiences/i);

        expect(textFromHomePage).toBeInTheDocument();
    });
});
