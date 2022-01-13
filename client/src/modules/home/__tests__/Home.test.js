import { render } from '../../tests/utils';

import { 
    EVENTS_PATH,
    CREATE_UNIQUE_EXPERIENCES, 
    SHARE_AND_BOOK_EVENTS 
} from '@modules/common/const';

import Home, { buttonText } from '@modules/home/Home';

describe('<Home />', () => {
    it('renders Home component', () => {
        const { getByRole, getByText } = render(<Home />);

        const createNewExperiencesText = getByText(CREATE_UNIQUE_EXPERIENCES);
        const shareAndBookEventsText = getByText(SHARE_AND_BOOK_EVENTS);
        const startHereButton = getByRole('link', { name: buttonText() });

        expect(createNewExperiencesText).toBeInTheDocument();
        expect(shareAndBookEventsText).toBeInTheDocument();
        expect(startHereButton).toBeInTheDocument();
        expect(startHereButton).toHaveAttribute('href', EVENTS_PATH);
    });
});
