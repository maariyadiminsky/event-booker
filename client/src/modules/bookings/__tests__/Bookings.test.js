import { render } from '@modules/app/setupTests';
import { MockedProvider } from '@apollo/client/testing';
import userEvent from '@testing-library/user-event';

import { AuthContext } from '@modules/common/context/AuthContext';
import { 
    mocks, 
    bookingsMockData, 
    createNewBooking,
    newEventForNewBookings
} from '@modules/bookings/mocks';
import * as EventMocks from '@modules/events/mocks';
import { noEventsExistText } from '@modules/bookings/components/BookingModalContent';
import { getEventNameForBooking } from '@modules/common/form/FormOptions';
import { 
    MOCK, 
    BOOK_AN_EVENT,
    SUBMIT,
    CANCEL_BOOKING,
    CANCEL,
    YES_IM_SURE
} from '@modules/common/const';

import Bookings from '@modules/bookings/Bookings';

describe('<Bookings />', () => {
    let portalRoot;
    let loaderFirstChildClass;
    let authWrapper;

    beforeAll(() => {
        loaderFirstChildClass = 'h-3 w-3 m-3 mr-1 rounded-full bg-green-200 animate-bounce';

        portalRoot = document.getElementById('modal');
        if (!portalRoot) {
            portalRoot = document.createElement('div');
            portalRoot.setAttribute('id', 'modal');
            document.body.appendChild(portalRoot);
        }

        authWrapper = (children) => (
            <AuthContext.Provider value={{ token: MOCK.TOKEN, userId: '0' }}>
                {children}
            </AuthContext.Provider>
        );
    });

    it('renders component with button and existing bookings', async () => {
        const { container, findByText } = render(authWrapper(
            <MockedProvider mocks={mocks(MOCK.QUERY_TYPE.BOOKINGS_QUERY)} addTypename={false}>
                <Bookings />
            </MockedProvider>
        ));

        const loaderElement = container.firstChild.children[0];
        expect(loaderElement.className).toBe(loaderFirstChildClass);

        const createBookingButton = await findByText(BOOK_AN_EVENT);
        const firstBooking = await findByText(bookingsMockData[0].event.title);
        const secondBooking = await findByText(bookingsMockData[1].event.title);

        expect(createBookingButton).toBeInTheDocument();
        expect(firstBooking).toBeInTheDocument();
        expect(secondBooking).toBeInTheDocument();
    });

    it('displays message if no events exist to book', async () => {
        const { findByText } = render(authWrapper(
            <MockedProvider>
                <Bookings />
            </MockedProvider>
        ));

        const createBookingButton = await findByText(BOOK_AN_EVENT);

        userEvent.click(createBookingButton);

        const noEventsExistMessage = await findByText(noEventsExistText());
        
        expect(noEventsExistMessage).toBeInTheDocument();
    });

    it('user can book an existing event', async () => {
        const mockData = [...mocks(MOCK.QUERY_TYPE.BOOKINGS_QUERY), ...mocks(MOCK.QUERY_TYPE.CREATE_BOOKING_MUTATION, { eventId: newEventForNewBookings._id }), ...EventMocks.mocks(MOCK.QUERY_TYPE.EVENTS_QUERY)];
        
        const { findByRole, findByText } = render(authWrapper(
            <MockedProvider mocks={mockData} addTypename={false}>
                <Bookings />
            </MockedProvider>
        ));

        const createBookingButton = await findByText(BOOK_AN_EVENT);

        userEvent.click(createBookingButton);

        const { eventsMockData } = EventMocks;

        const eventOptionsSelector = await findByRole(MOCK.SELECTOR);
        const firstEventOption = await findByText(getEventNameForBooking(bookingsMockData[0].event.title, bookingsMockData[0].event.price, bookingsMockData[0].event.date));
        const secondEventOption = await findByText(getEventNameForBooking(bookingsMockData[1].event.title, bookingsMockData[1].event.price, bookingsMockData[1].event.date));
        const thirdEventOption = await findByText(getEventNameForBooking(eventsMockData[2].title, eventsMockData[2].price, eventsMockData[2].date));

        expect(eventOptionsSelector).toBeInTheDocument();
        expect(firstEventOption).toBeInTheDocument();
        expect(secondEventOption).toBeInTheDocument();
        expect(thirdEventOption).toBeInTheDocument();

        userEvent.selectOptions(eventOptionsSelector, [createNewBooking()._id]);

        expect(thirdEventOption.selected).toBe(true);

        const submitButton = await findByRole('button', { name: SUBMIT });

        userEvent.click(submitButton);

        const createdBooking = await findByText(createNewBooking().event.title);
        expect(createdBooking).toBeInTheDocument();
    });

    it('user can remove an existing booking', async () => {
        const mockData = [...mocks(MOCK.QUERY_TYPE.BOOKINGS_QUERY), ...mocks(MOCK.QUERY_TYPE.CANCEL_BOOKING_MUTATION, { bookingId: bookingsMockData[0]._id }), ...EventMocks.mocks(MOCK.QUERY_TYPE.EVENTS_QUERY)];
        
        const { findByRole, findAllByRole, findByText } = render(authWrapper(
            <MockedProvider mocks={mockData} addTypename={false}>
                <Bookings />
            </MockedProvider>
        ));

        const firstBooking = await findByText(bookingsMockData[0].event.title);
        const secondBooking = await findByText(bookingsMockData[1].event.title);
        const cancelBookingButtons = await findAllByRole('button', { name: CANCEL });

        expect(firstBooking).toBeInTheDocument();
        expect(secondBooking ).toBeInTheDocument();
        expect(cancelBookingButtons.length).toBe(2);
        
        userEvent.click(cancelBookingButtons[0]);

        const cancelBookingModalHeader = await findByText(CANCEL_BOOKING);
        const cancelConfirmButton = await findByRole('button', { name: YES_IM_SURE });

        expect(cancelBookingModalHeader).toBeInTheDocument();
        expect(cancelConfirmButton).toBeInTheDocument();

        userEvent.click(cancelConfirmButton);

        const cancelBookingButtonsAfterOneCancelled = await findAllByRole('button', { name: CANCEL });

        expect(cancelBookingButtonsAfterOneCancelled.length).toBe(1);
    });
});