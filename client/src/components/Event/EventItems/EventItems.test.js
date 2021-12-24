import { render } from '../../../tests/utils';

import { eventsMockData } from '../../../pages/Events/mocks';

import EventItems from './';

describe('<EventItems />', () => {
    it('renders component', () => {
        const { getByText } = render(
            <EventItems
                events={eventsMockData}
                userId='1'
                toggleCancelModal={jest.fn()}
                setCancelEventId={jest.fn()}
            />
        );

        const eventOne = getByText(eventsMockData[0].title);
        const eventTwo = getByText(eventsMockData[1].title);
        const eventThree = getByText(eventsMockData[2].title);

        expect(eventOne).toBeInTheDocument();
        expect(eventTwo).toBeInTheDocument();
        expect(eventThree).toBeInTheDocument();
    });
});