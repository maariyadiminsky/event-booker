import { render } from '../../../tests/utils';

import { bookingsMockData } from '@modules/bookings/';

import BookingItems from '@modules/bookings/BookingItems/__tests__/mocks';

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