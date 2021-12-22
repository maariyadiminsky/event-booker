import { render } from '../../../tests/utils';

import BookingModalContent, { noEventsExistText } from './';

import { getEventNameForBooking } from '../../Form/FormOptions';
import { 
    MOCK, 
    CREATE_BOOKING_FORM,
    NEVERMIND,
    SUBMIT,
} from '../../../const';

describe('<BookingModalContent />', () => {
    let formType;
    let handleOnSubmit;
    let handleCancelButton;
    let eventOptionsMock;

    beforeAll(() => {
        eventOptionsMock = MOCK.events;
        formType = CREATE_BOOKING_FORM;
        handleOnSubmit = jest.fn();
        handleCancelButton = jest.fn();
    });

    it('renders component', () => {
        const { getByText, getByRole } = render(
            <BookingModalContent
                eventOptions={eventOptionsMock}
                formType={formType}
                handleOnSubmit={handleOnSubmit}
                handleCancelButton={handleCancelButton}
            />
        );

        
        const firstEvent = getByText(getEventNameForBooking(eventOptionsMock[2].title, eventOptionsMock[2].price, eventOptionsMock[2].date));
        const secondEvent = getByText(getEventNameForBooking(eventOptionsMock[0].title, eventOptionsMock[0].price, eventOptionsMock[0].date));
        const thirdEvent = getByText(getEventNameForBooking(eventOptionsMock[1].title, eventOptionsMock[1].price, eventOptionsMock[1].date));
        const confirmButton = getByRole('button', { name: SUBMIT });
        const cancelButton = getByRole('button', { name: NEVERMIND });

        expect(firstEvent).toBeInTheDocument();
        expect(secondEvent).toBeInTheDocument();
        expect(thirdEvent).toBeInTheDocument();
        expect(confirmButton).toBeInTheDocument();
        expect(cancelButton).toBeInTheDocument();
    });

    it('renders text if no events exist', () => {
        const { queryByText, getByText } = render(
            <BookingModalContent
                eventOptions={[]}
                formType={formType}
                handleOnSubmit={handleOnSubmit}
                handleCancelButton={handleCancelButton}
            />
        );

        const noEventsExistTextEl = getByText(noEventsExistText());
        const someEvent = queryByText(getEventNameForBooking(eventOptionsMock[2].title, eventOptionsMock[2].price, eventOptionsMock[2].date));

        expect(noEventsExistTextEl).toBeInTheDocument();
        expect(someEvent).not.toBeInTheDocument();
    });
});