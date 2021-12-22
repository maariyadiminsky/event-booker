import { render } from '../../../tests/utils';

import EventItems from './';

describe('<EventItems />', () => {
    it('renders component', () => {
        const events = [
            {
                _id: '0',
                title: 'Sushi Event',
                description: 'Meet others who love sushi!',
                price: 70,
                date: '2021-09-15T00:00:00.000Z',
                user: {
                    _id: '1'
                }
            },
            {
                _id: '1',
                title: 'Car Event',
                description: 'Meet others who love cars!',
                price: 25,
                date: '2021-09-16T00:00:00.000Z',
                user: {
                    _id: '2'
                }
            },
            {
                _id: '2',
                title: 'Concert Event',
                description: 'Meet others who love music!',
                price: 200,
                date: '2021-09-17T00:00:00.000Z',
                user: {
                    _id: '1'
                }
            }
        ];

        const { getByText } = render(
            <EventItems
                events={events}
                userId='1'
                toggleCancelModal={jest.fn()}
                setCancelEventId={jest.fn()}
            />
        );

        const eventOne = getByText(events[0].title);
        const eventTwo = getByText(events[1].title);
        const eventThree = getByText(events[2].title);

        expect(eventOne).toBeInTheDocument();
        expect(eventTwo).toBeInTheDocument();
        expect(eventThree).toBeInTheDocument();
    });
});