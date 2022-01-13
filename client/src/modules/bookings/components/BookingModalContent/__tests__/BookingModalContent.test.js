import { render } from '../../../tests/utils';

import BookingModalContent, { noEventsExistText } from '@modules/bookings/BookingModalContent';

import { getEventNameForBooking } from '@modules/form/FormOptions';
import { eventsMockData } from '@modules/events/__tests__/mocks';
import { 
    CREATE_BOOKING_FORM,
    NEVERMIND,
    SUBMIT,
} from '@modules/common/const';

describe('<BookingModalContent />', () => {
    let formType;
    let handleOnSubmit;
    let handleCancelButton;

    beforeAll(() => {
        formType = CREATE_BOOKING_FORM;
        handleOnSubmit = jest.fn();
        handleCancelButton = jest.fn();
    });

    it('renders component', () => {
        const { getByText, getByRole } = render(
            <BookingModalContent
                eventOptions={eventsMockData}
                formType={formType}
                handleOnSubmit={handleOnSubmit}
                handleCancelButton={handleCancelButton}
            />
        );

        
        const firstEvent = getByText(getEventNameForBooking(eventsMockData[2].title, eventsMockData[2].price, eventsMockData[2].date));
        const secondEvent = getByText(getEventNameForBooking(eventsMockData[0].title, eventsMockData[0].price, eventsMockData[0].date));
        const thirdEvent = getByText(getEventNameForBooking(eventsMockData[1].title, eventsMockData[1].price, eventsMockData[1].date));
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
        const someEvent = queryByText(getEventNameForBooking(eventsMockData[2].title, eventsMockData[2].price, eventsMockData[2].date));

        expect(noEventsExistTextEl).toBeInTheDocument();
        expect(someEvent).not.toBeInTheDocument();
    });
});