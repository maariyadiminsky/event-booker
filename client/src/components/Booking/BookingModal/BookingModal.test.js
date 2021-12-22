import { render } from '../../../tests/utils';

import { 
    BOOK_AN_EVENT,
    CREATE_BOOKING_FORM,
    ERROR_DATA_NO_RESPONSE,
    ERROR_SERVER_ERROR,
    MOCK
} from '../../../const';
import { getEventNameForBooking } from '../../Form/FormOptions';

import BookingModal from './';

describe('<BookingModal />', () => {
    let toggleModal;
    let handleOnSubmit;
    let formType;

    let portalRoot;

    beforeAll(() => {
        formType = CREATE_BOOKING_FORM;
        toggleModal = jest.fn();
        handleOnSubmit = jest.fn();

        portalRoot = document.getElementById('modal');
        if (!portalRoot) {
            portalRoot = document.createElement('div');
            portalRoot.setAttribute('id', 'modal');
            document.body.appendChild(portalRoot);
        }
    });

    it('renders component', () => {
        const eventOptionsMock = MOCK.events;
        const { getByText } = render(
            <BookingModal 
                formType={formType}
                eventOptions={eventOptionsMock}
                handleOnSubmit={handleOnSubmit}
                toggleModal={toggleModal}
            />
        );

        const header = getByText(BOOK_AN_EVENT);
        const firstBooking = getByText(getEventNameForBooking(eventOptionsMock[2].title, eventOptionsMock[2].price, eventOptionsMock[2].date));
        const secondBooking = getByText(getEventNameForBooking(eventOptionsMock[0].title, eventOptionsMock[0].price, eventOptionsMock[0].date));
        const thirdBooking = getByText(getEventNameForBooking(eventOptionsMock[1].title, eventOptionsMock[1].price, eventOptionsMock[1].date));

        expect(header).toBeInTheDocument();
        expect(firstBooking).toBeInTheDocument();
        expect(secondBooking).toBeInTheDocument();
        expect(thirdBooking).toBeInTheDocument();
    });

    it('renders errors if they exist', () => {
        const eventOptionsMock = MOCK.events;
        const errorsMock = [{ message: ERROR_DATA_NO_RESPONSE(true) }, { message: ERROR_SERVER_ERROR(true, 500) }];
        const { getByText } = render(
            <BookingModal 
                formType={formType}
                eventOptions={eventOptionsMock}
                handleOnSubmit={handleOnSubmit}
                toggleModal={toggleModal}
                errors={errorsMock}
            />
        );

        const firstError = getByText(errorsMock[0].message);
        const secondError = getByText(errorsMock[1].message);

        expect(firstError).toBeInTheDocument();
        expect(secondError).toBeInTheDocument();
    });
});