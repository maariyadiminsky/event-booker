import { render, screen } from '../../tests/utils';
import Home from './';

describe('<Home />', () => {
    it('renders Home component', () => {
        render(<Home />);

        const createNewExperiencesText = screen.getByText(/Create unique experiences/i);
        const shareAndBookEventsText = screen.getByText(/Share and book events at the palm of your hand/i);
        const startHereButton = screen.getByText(/Start Here/i);

        expect(createNewExperiencesText).toBeInTheDocument();
        expect(shareAndBookEventsText).toBeInTheDocument();
        expect(startHereButton).toBeInTheDocument();
    });
});
