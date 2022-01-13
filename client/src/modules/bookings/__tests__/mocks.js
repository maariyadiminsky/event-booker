import { 
    BOOKINGS_QUERY, 
    CREATE_BOOKING_MUTATION, 
    CANCEL_BOOKING_MUTATION 
} from '@modules/bookings/queries';
import { eventsMockData } from '@modules/events/__tests__/mocks';
import { DEFAULT, MOCK } from '@modules/common/const';

export const mocks = (queryType, variables = DEFAULT.NULL) => {
    let query;

    switch(queryType) {
        case MOCK.QUERY_TYPE.BOOKINGS_QUERY:
            query = BOOKINGS_QUERY;
            break;
        case MOCK.QUERY_TYPE.CREATE_BOOKING_MUTATION:
            query = CREATE_BOOKING_MUTATION;
            break;
        case MOCK.QUERY_TYPE.CANCEL_BOOKING_MUTATION:
            query = CANCEL_BOOKING_MUTATION;
            break;
        default:
            query = '';
    }

    return setup(query, queryType, variables);
};

const setup = (query, queryType, variables) => ([
    {
        request: {
            query,
            variables
        },
        result: {
            data: getServerMockData(queryType)
        }
    },    
]);

const getServerMockData = (queryType) => {
    switch(queryType) {
        case MOCK.QUERY_TYPE.BOOKINGS_QUERY:
            return {
                bookings: bookingsMockData
            };
        case MOCK.QUERY_TYPE.CREATE_BOOKING_MUTATION:
            return {
                createBooking: createNewBooking()
            }
        case MOCK.QUERY_TYPE.CANCEL_BOOKING_MUTATION:
            return {
                cancelBooking: {
                    title: bookingsMockData[0].event.title
                }
            }
        default:
            return {}
    }
};

export const newEventForNewBookings = eventsMockData[2];
export const createNewBooking = () => ({
    _id: '2',
    event: {
        title: newEventForNewBookings.title,
        date: newEventForNewBookings.date
    }
});

export const bookingsMockData = [
    {
        _id: '0',
        event: eventsMockData[1]
    },
    {
        _id: '1',
        event: eventsMockData[0]
    }
];