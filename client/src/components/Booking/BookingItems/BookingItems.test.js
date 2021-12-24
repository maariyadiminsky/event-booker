import { render } from '../../../tests/utils';

import { bookingsMockData } from '../../../pages/Bookings/mocks';
import { eventsMockData } from '../../../pages/Events/mocks';

import BookingItems from './';

describe('<BookingItems />', () => {
    it('renders component', () => {
        const openCancelModal = jest.fn();

        const { getByText } = render(
            <BookingItems 
                bookings={bookingsMockData}
                openCancelModal={openCancelModal}
            />
        );

        const firstBooking = getByText(eventsMockData[2].title);
        const secondBooking = getByText(eventsMockData[0].title);
        const thirdBooking = getByText(eventsMockData[1].title);

        expect(firstBooking).toBeInTheDocument();
        expect(secondBooking).toBeInTheDocument();
        expect(thirdBooking).toBeInTheDocument();
    });
});