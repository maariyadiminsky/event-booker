import { render } from '../../../tests/utils';

import BookingItems from './';

describe('<BookingItems />', () => {
    it('renders component', () => {
        const openCancelModal = jest.fn();
        const events = [
            {
                _id: '0',
                title: 'Sushi Event',
                price: 70,
                date: '2021-09-15T00:00:00.000Z',
                user: {
                    _id: '0'
                }
            },
            {
                _id: '1',
                title: 'Car Event',
                price: 25,
                date: '2021-09-16T00:00:00.000Z',
                user: {
                    _id: '1'
                }
            },
            {
                _id: '2',
                title: 'Concert Event',
                price: 200,
                date: '2021-09-17T00:00:00.000Z',
                user: {
                    _id: '2'
                }
            }
        ];
        const bookings = [
            {
                _id: '0',
                event: events[2]
            },
            {
                _id: '1',
                event: events[0]
            },
            {
                _id: '2',
                event: events[1]
            },
        ];

        const { getByText } = render(
            <BookingItems 
                bookings={bookings}
                openCancelModal={openCancelModal}
            />
        );

        const firstBooking = getByText(events[2].title);
        const secondBooking = getByText(events[0].title);
        const thirdBooking = getByText(events[1].title);

        expect(firstBooking).toBeInTheDocument();
        expect(secondBooking).toBeInTheDocument();
        expect(thirdBooking).toBeInTheDocument();
    });
});