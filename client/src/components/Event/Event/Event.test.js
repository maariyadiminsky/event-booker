import { render } from '../../../tests/utils';

import { REMOVE_BUTTON_TEXT } from '../../../const';

import { getDateInCorrectFormat } from '../../../utils/date';

import Event from './';

// renders notification if event is for todaysDate
// --> mock useNotificationBasedOnDate
// renders notification if event is expired
// --> mock useNotificationBasedOnDate
describe('<Event />', () => {
    let toggleCancelModal;
    let setCancelEventId;
    let event;

    beforeAll(() => {
        toggleCancelModal = jest.fn();
        setCancelEventId = jest.fn();

        event = {
            _id: '0',
            title: 'Sushi Event',
            description: 'Spend time with other sushi lovers',
            price: 70,
            date: '2021-09-15T00:00:00.000Z',
            user: { 
                _id: '1'
            }
        }
    });

    it('renders component', () => {
        const { getByText } = render(
            <Event 
                toggleCancelModal={toggleCancelModal}
                setCancelEventId={setCancelEventId}
                userId='1'
                event={event}
            />
        );

        const title = getByText(event.title);
        const description = getByText(event.description);
        const price = getByText(`$${event.price}`);
        const date = getByText(getDateInCorrectFormat(event.date));

        expect(title).toBeInTheDocument();
        expect(description).toBeInTheDocument();
        expect(price).toBeInTheDocument();
        expect(date).toBeInTheDocument();
    });

    it('renders remove option if user is creator of event', () => {
        const { getByRole } = render(
            <Event 
                toggleCancelModal={toggleCancelModal}
                setCancelEventId={setCancelEventId}
                userId='1'
                event={event}
            />
        );

        const removeButton = getByRole('button', { name: REMOVE_BUTTON_TEXT });

        expect(removeButton).toBeInTheDocument();
    });

    it('doesn\'t render remove option if user is not creator of event', () => {
        const { queryByText } = render(
            <Event 
                toggleCancelModal={toggleCancelModal}
                setCancelEventId={setCancelEventId}
                userId='2'
                event={event}
            />
        );

        const removeButton = queryByText(REMOVE_BUTTON_TEXT);

        expect(removeButton).not.toBeInTheDocument();
    });

    it('renders notification if event is for todays date', () => {

    });
});