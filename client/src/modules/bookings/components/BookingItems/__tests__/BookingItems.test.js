import { render } from '@modules/app/setupTests';

import { bookingsMockData } from '@modules/bookings/mocks';

import BookingItems from '@modules/bookings/components/BookingItems';

describe('<BookingItems />', () => {
    it('renders component', () => {
        const openCancelModal = jest.fn();

        const { getByText } = render(
            <BookingItems 
                bookings={bookingsMockData}
                openCancelModal={openCancelModal}
            />
        );

        const firstBooking = getByText(bookingsMockData[0].event.title);
        const secondBooking = getByText(bookingsMockData[1].event.title);

        expect(firstBooking).toBeInTheDocument();
        expect(secondBooking).toBeInTheDocument();
    });
});