import { render } from '../../../tests/utils';

import { eventsMockData } from '../../../pages/Events/mocks';

import BookingItems from './';

describe('<BookingItems />', () => {
    it('renders component', () => {
        const openCancelModal = jest.fn();
        const bookings = [
            {
                _id: '0',
                event: eventsMockData[2]
            },
            {
                _id: '1',
                event: eventsMockData[0]
            },
            {
                _id: '2',
                event: eventsMockData[1]
            },
        ];

        const { getByText } = render(
            <BookingItems 
                bookings={bookings}
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