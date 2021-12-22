import { render } from '../../tests/utils';
import Home from './';

describe('<Home />', () => {
    it('renders Home component', () => {
        const { getByText } = render(<Home />);

        const createNewExperiencesText = getByText(/Create unique experiences/i);
        const shareAndBookEventsText = getByText(/Share and book events at the palm of your hand/i);
        const startHereButton = getByText(/Start Here/i);

        expect(createNewExperiencesText).toBeInTheDocument();
        expect(shareAndBookEventsText).toBeInTheDocument();
        expect(startHereButton).toBeInTheDocument();
    });
});
