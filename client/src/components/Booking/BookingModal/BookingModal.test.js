import { render } from '../../../tests/utils';

import { 
    BOOK_AN_EVENT,
    CREATE_BOOKING_FORM,
    ERROR_DATA_NO_RESPONSE,
    ERROR_SERVER_ERROR
} from '../../../const';
import { getEventNameForBooking } from '../../Form/FormOptions';
import { eventsMockData } from '../../../pages/Events/mocks';

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
        const { getByText } = render(
            <BookingModal 
                formType={formType}
                eventOptions={eventsMockData}
                handleOnSubmit={handleOnSubmit}
                toggleModal={toggleModal}
            />
        );

        const header = getByText(BOOK_AN_EVENT);
        const firstBooking = getByText(getEventNameForBooking(eventsMockData[2].title, eventsMockData[2].price, eventsMockData[2].date));
        const secondBooking = getByText(getEventNameForBooking(eventsMockData[0].title, eventsMockData[0].price, eventsMockData[0].date));
        const thirdBooking = getByText(getEventNameForBooking(eventsMockData[1].title, eventsMockData[1].price, eventsMockData[1].date));

        expect(header).toBeInTheDocument();
        expect(firstBooking).toBeInTheDocument();
        expect(secondBooking).toBeInTheDocument();
        expect(thirdBooking).toBeInTheDocument();
    });

    it('renders errors if they exist', () => {
        const errorsMock = [{ message: ERROR_DATA_NO_RESPONSE(true) }, { message: ERROR_SERVER_ERROR(true, 500) }];
        const { getByText } = render(
            <BookingModal 
                formType={formType}
                eventOptions={eventsMockData}
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