import { render, screen } from '../../../tests/utils';
import userEvent from '@testing-library/user-event';

import { CANCEL } from '@modules/common/const';
import Booking, { getDate } from '@modules/bookings/Booking';

describe('<Booking />', () => {
    let openCancelModal;
    let title;
    let date;

    beforeEach(() => {
        openCancelModal = jest.fn();
        title = 'someTitle';
        date = '2021-09-15T00:00:00.000Z';

        render(
            <Booking
                _id='1'
                color='red'
                eventTitle={title}
                eventDate={date}
                openCancelModal={openCancelModal}
            />
        );
    });

    it('renders component', () => {
        const titleDiv = screen.getByText(title);
        const dateDiv = screen.getByText(getDate(date));

        expect(titleDiv).toBeInTheDocument();
        expect(dateDiv).toBeInTheDocument();
    });

    it('cancels modal when cancel button is clicked', () => {
        const cancelButton = screen.getByRole('button', { name: CANCEL });
        
        expect(cancelButton).toBeInTheDocument();

        userEvent.click(cancelButton);

        expect(openCancelModal).toHaveBeenCalledTimes(1);
    });
});