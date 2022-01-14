import { MOCK, DEFAULT } from '@modules/common/const';
import { 
    EVENTS_QUERY, 
    CREATE_EVENT_MUTATION, 
    REMOVE_EVENT_MUTATION 
} from '@modules/events/queries';

export const mocks = (queryType, variables = DEFAULT.NULL) => {
    let query;

    switch(queryType) {
        case MOCK.QUERY_TYPE.EVENTS_QUERY:
            query = EVENTS_QUERY;
            break;
        case MOCK.QUERY_TYPE.CREATE_EVENT_MUTATION:
            query = CREATE_EVENT_MUTATION;
            break;
        case MOCK.QUERY_TYPE.REMOVE_EVENT_MUTATION:
            query = REMOVE_EVENT_MUTATION;
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
        case MOCK.QUERY_TYPE.EVENTS_QUERY:
            return {
                events: eventsMockData
            };
        case MOCK.QUERY_TYPE.CREATE_EVENT_MUTATION:
            return {
                createEvent: createNewEvent(true)
            }
        case MOCK.QUERY_TYPE.REMOVE_EVENT_MUTATION:
            return {
                removeEvent: {
                    title: eventToCancel.title
                }
            };
        default:
            return {}
    }
}

export const createNewEvent = (shouldIncludeId = false) => {
    const event = shouldIncludeId ? { _id: '3', ...newEvent } : { ...newEvent };

    delete event.userId;

    return {
        ...event,
        user: {
            _id: '1'
        }
    };
}

export const newEvent = {
    userId: '0',
    title: 'Movie Event',
    description: 'Meet others who love movies!',
    price: 70,
    date: '2021-09-20'
};

export const eventsMockData = [
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
            _id: '0'
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

export const eventToCancel = eventsMockData[1];